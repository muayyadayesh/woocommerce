import { APIGatewayProxyHandler } from 'aws-lambda';
import { CategoryService } from '@/services/categoryService';
import { DynamoDB, SQS } from 'aws-sdk';

const dynamodb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
    const sqs = new SQS();

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Request body is required' })
            };
        }
        console.log('Calling CategoryService.triggerImport');

        const status = await CategoryService.triggerImport(JSON.parse(event.body));
        // Save import status to DynamoDB
        console.log('Saving to DynamoDB:', status);
        await dynamodb.put({
            TableName: process.env.IMPORTS_TABLE!,
            Item: status
        }).promise();
        console.log('Saved successfully to DynamoDB');

        // trigger SQS
        const { websiteUrl, consumerKey, consumerSecret } = JSON.parse(event.body);
        const importId = status.importId;

        console.log('Trigger SQS', websiteUrl, consumerKey, consumerSecret, importId);

        await sqs.sendMessage({
            QueueUrl: process.env.IMPORT_QUEUE_URL!,
            MessageBody: JSON.stringify({
                importId,
                websiteUrl,
                consumerKey,
                consumerSecret
            })
        }).promise();


        return {
            statusCode: 202,
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

