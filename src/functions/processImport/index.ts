import { SQSHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { createWooCommerceClient } from '@/utils/woocommerce';
import { logger } from '@/utils/logger';

const dynamodb = new DynamoDB.DocumentClient();

interface ImportMessage {
    importId: string;
    websiteUrl: string;
    consumerKey: string;
    consumerSecret: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    parent: number;
    description: string;
}

export const handler: SQSHandler = async (event) => {
    try {
        for (const record of event.Records) {
            const message: ImportMessage = JSON.parse(record.body);
            const { importId, websiteUrl, consumerKey, consumerSecret } = message;

            logger.info('Processing import', { importId, websiteUrl });

            // Update import status to in-progress
            await updateImportStatus(importId, websiteUrl, 'in-progress');

            try {
                const client = createWooCommerceClient(websiteUrl, consumerKey, consumerSecret);

                // Fetch all categories
                const categories = await fetchAllCategories(client);
                logger.info('Categories fetched', { count: categories.length });

                // Process categories in batches
                const batchSize = 25;
                for (let i = 0; i < categories.length; i += batchSize) {
                    const batch = categories.slice(i, i + batchSize);
                    await saveCategoriesBatch(batch, importId, websiteUrl);
                }

                // Update import status to completed
                await updateImportStatus(importId, websiteUrl, 'completed', {
                    categoriesCount: categories.length
                });

                logger.info('Import completed successfully', { importId, categoriesCount: categories.length });
            } catch (error: any) {
                logger.error('Error during import process', { error, importId });
                await updateImportStatus(importId, websiteUrl, 'failed', {
                    error: error.message
                });
                throw error;
            }
        }
    } catch (error) {
        logger.error('Error processing SQS messages', { error });
        throw error;
    }
};

async function fetchAllCategories(client: any): Promise<Category[]> {
    const categories: Category[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
        const response = await client.get('products/categories', {
            per_page: perPage,
            page: page,
        });

        categories.push(...response.data);

        if (response.data.length < perPage) {
            break;
        }

        page++;
    }

    return categories;
}

async function saveCategoriesBatch(categories: Category[], importId: string, websiteUrl: string) {
    const batchWriteItems = categories.map(category => ({
        PutRequest: {
            Item: {
                categoryId: category.id.toString(),
                websiteUrl,
                importId,
                name: category.name,
                slug: category.slug,
                parent: category.parent,
                description: category.description,
                lastUpdated: new Date().toISOString()
            }
        }
    }));

    const params = {
        RequestItems: {
            [process.env.CATEGORIES_TABLE!]: batchWriteItems
        }
    };

    try {
        await dynamodb.batchWrite(params).promise();
    } catch (error) {
        logger.error('Error saving categories batch', { error });
        throw error;
    }
}

async function updateImportStatus(
    importId: string,
    websiteUrl: string,
    status: string,
    additionalData: object = {}
) {
    const params = {
        TableName: process.env.IMPORTS_TABLE!,
        Key: {
            websiteUrl,
            importId
        },
        UpdateExpression: 'SET #status = :status, lastUpdated = :lastUpdated',
        ExpressionAttributeNames: {
            '#status': 'status'
        },
        ExpressionAttributeValues: {
            ':status': status,
            ':lastUpdated': new Date().toISOString(),
            ...Object.entries(additionalData).reduce((acc, [key, value]) => ({
                ...acc,
                [`:${key}`]: value
            }), {})
        }
    };

    if (Object.keys(additionalData).length > 0) {
        params.UpdateExpression += `, ${Object.keys(additionalData)
            .map(key => `#${key} = :${key}`)
            .join(', ')}`;
        Object.keys(additionalData).forEach(key => {
            params.ExpressionAttributeNames[`#${key}`] = key;
        });
    }

    try {
        await dynamodb.update(params).promise();
    } catch (error) {
        logger.error('Error updating import status', { error, importId });
        throw error;
    }
}