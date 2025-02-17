import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class MockDynamoDBClient {
    private items: { [key: string]: any } = {};

    async put(params: DocumentClient.PutItemInput) {
        const table = params.TableName;
        const item = params.Item;
        if (!this.items[table]) {
            this.items[table] = {};
        }
        this.items[table][JSON.stringify(item)] = item;
        return { promise: () => Promise.resolve({}) };
    }

    async get(params: DocumentClient.GetItemInput) {
        const table = params.TableName;
        const key = params.Key;
        const items = this.items[table] || {};
        const item = Object.values(items).find(
            (i: any) => i.id === key.id && i.websiteUrl === key.websiteUrl
        );
        return { promise: () => Promise.resolve({ Item: item }) };
    }

    async delete(params: DocumentClient.DeleteItemInput) {
        const table = params.TableName;
        const key = params.Key;
        const items = this.items[table] || {};
        const itemKey = Object.keys(items).find(
            (k) => items[k].id === key.id && items[k].websiteUrl === key.websiteUrl
        );
        if (itemKey) {
            const deletedItem = items[itemKey];
            delete items[itemKey];
            return { promise: () => Promise.resolve({ Attributes: deletedItem }) };
        }
        return { promise: () => Promise.resolve({}) };
    }
}

export class MockSQSClient {
    async sendMessage(params: any) {
        return {
            promise: () =>
                Promise.resolve({
                    MessageId: 'test-message-id',
                }),
        };
    }
}


