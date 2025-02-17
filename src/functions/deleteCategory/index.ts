import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { createError, createResponse } from '@/utils/response';
import { logger } from '@/utils/logger';
import { deleteFromCache } from '@/utils/cache';

const dynamodb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const categoryId = event.pathParameters?.categoryId;
        const websiteUrl = event.queryStringParameters?.websiteUrl;

        if (!categoryId || !websiteUrl) {
            return createError(400, 'categoryId and websiteUrl are required');
        }

        // Delete from DynamoDB
        const params = {
            TableName: process.env.CATEGORIES_TABLE!,
            Key: {
                categoryId,
                websiteUrl
            },
            ReturnValues: 'ALL_OLD'
        };

        const result = await dynamodb.delete(params).promise();

        if (!result.Attributes) {
            return createError(404, 'Category not found');
        }

        // Clear cache
        deleteFromCache(`category-${categoryId}-${websiteUrl}`);

        logger.info('Category deleted successfully', { categoryId, websiteUrl });

        return createResponse(200, {
            message: 'Category deleted successfully',
            categoryId,
            websiteUrl
        });
    } catch (error) {
        logger.error('Error deleting category', { error });
        return createError(500, 'Internal server error');
    }
};