// src/functions/getCategories/handler.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB.DocumentClient();

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

        const params = {
            TableName: process.env.CATEGORIES_TABLE!,
            IndexName: 'importId-index',
            KeyConditionExpression: 'importId = :importId AND websiteUrl = :websiteUrl',
            ExpressionAttributeValues: {
                ':importId': importId,
                ':websiteUrl': websiteUrl
            }
        };

        console.log('Query params:', params);
        const result = await dynamodb.query(params).promise();
        console.log('Query result:', result);

        return {
            statusCode: 200,
            body: JSON.stringify({
                categories: result.Items,
                count: result.Items?.length || 0
            })
        };
    } catch (error: any) {
        console.error('Error fetching categories:', error);
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