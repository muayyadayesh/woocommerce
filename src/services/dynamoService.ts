import { DynamoDB } from 'aws-sdk';
import { ImportStatus } from '@/services/categoryService';

const dynamodb = new DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || 'us-east-1',
});

export class DynamoService {
    static async saveImport(importStatus: ImportStatus): Promise<void> {
        const params = {
            TableName: process.env.IMPORTS_TABLE!,
            Item: importStatus
        };

        console.log('Saving import to DynamoDB:', {
            TableName: process.env.IMPORTS_TABLE,
            Item: importStatus
        });

        await dynamodb.put(params).promise();
        console.log('Import saved successfully');

    }

    static async getImport(importId: string, websiteUrl: string): Promise<ImportStatus | null> {
        const params = {
            TableName: process.env.IMPORTS_TABLE!,
            Key: {
                importId,
                websiteUrl
            }
        };

        const result = await dynamodb.get(params).promise();
        return result.Item as ImportStatus || null;
    }

    static async updateImportStatus(
        importId: string,
        websiteUrl: string,
        status: string,
        additionalData?: Partial<ImportStatus>
    ): Promise<void> {
        const params = {
            TableName: process.env.IMPORTS_TABLE!,
            Key: {
                importId,
                websiteUrl
            },
            UpdateExpression: 'SET #status = :status, lastUpdated = :lastUpdated',
            ExpressionAttributeNames: {
                '#status': 'status'
            },
            ExpressionAttributeValues: {
                ':status': status,
                ':lastUpdated': new Date().toISOString(),
                ...additionalData
            }
        };

        await dynamodb.update(params).promise();
    }
}