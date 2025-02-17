import { APIGatewayProxyHandler } from 'aws-lambda';
import { CategoryService } from '@/services/categoryService';


export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const importId = event.pathParameters?.importId;
        const websiteUrl = event.queryStringParameters?.websiteUrl;

        if (!importId || !websiteUrl) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'importId and websiteUrl are required' })
            };
        }

        const status = await CategoryService.getImportStatus(importId, websiteUrl);

        return {
            statusCode: 200,
            body: JSON.stringify(status)
        };
    } catch (error: any) {
        console.error('Error in trigger import:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal server error',
                error: error.message,
                stack: error.stack,
                time: new Date().toISOString()
            })
        };
    }
};