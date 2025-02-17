import { v4 as uuidv4 } from 'uuid';
import { createWooCommerceClient } from '@/utils/woocommerce';
import { logger } from '@/utils/logger';
import { DynamoDB } from 'aws-sdk';


export interface ImportRequest {
    websiteUrl: string;
    consumerKey: string;
    consumerSecret: string;
}

export interface ImportStatus {
    importId: string;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
    startTime: string;
    websiteUrl: string;
    categoriesCount?: number;
    error?: string;
}

const dynamodb = new DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || 'us-east-1'
});


export class CategoryService {
    // In-memory storage for local development
    private static imports = new Map<string, ImportStatus>();

    static async triggerImport(request: ImportRequest): Promise<ImportStatus> {
        try {
            // Validate WooCommerce credentials
            const client = createWooCommerceClient(
                request.websiteUrl,
                request.consumerKey,
                request.consumerSecret
            );

            // Test the connection
            await client.get('products/categories', { per_page: 1 });

            const importId = uuidv4();
            const importStatus: ImportStatus = {
                importId,
                status: 'pending',
                startTime: new Date().toISOString(),
                websiteUrl: request.websiteUrl
            };

            // Store in memory for local development
            this.imports.set(importId, importStatus);

            // In AWS, this would trigger SQS/Lambda
            if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
                // AWS Logic here
            } else {
                // Simulate async processing for local development
                setTimeout(() => this.processImport(importId, request), 1000);
            }

            return importStatus;
        } catch (error) {
            logger.error('Error triggering import', { error });
            throw error;
        }
    }

    static async getImportStatus(importId: string, websiteUrl: string) {
        const params = {
            TableName: process.env.IMPORTS_TABLE!,
            Key: {
                importId,
                websiteUrl
            }
        };

        console.log('DynamoDB params:', params); 

        const result = await dynamodb.get(params).promise();

        console.log('DynamoDB result:', result); 

        if (!result.Item) {
            throw new Error('Import not found');
        }

        return result.Item;
    }

    private static async processImport(importId: string, request: ImportRequest) {
        try {
            const status = this.imports.get(importId);
            if (!status) return;

            // Update status to in-progress
            status.status = 'in-progress';
            this.imports.set(importId, status);

            const client = createWooCommerceClient(
                request.websiteUrl,
                request.consumerKey,
                request.consumerSecret
            );

            // Fetch categories
            const response = await client.get('products/categories');

            // Update status to completed
            status.status = 'completed';
            status.categoriesCount = response.data.length;
            this.imports.set(importId, status);
        } catch (error: any) {
            // Update status to failed
            const status = this.imports.get(importId);
            if (status) {
                status.status = 'failed';
                status.error = error.message;
                this.imports.set(importId, status);
            }
            logger.error('Error processing import', { error });
        }
    }

    static async deleteCategory(categoryId: string, websiteUrl: string): Promise<void> {
        // Implementation for delete category
        // In AWS, this would delete from DynamoDB
        logger.info('Category deleted', { categoryId, websiteUrl });
    }
}