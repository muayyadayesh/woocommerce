const mockCategory = require('./mockData');

export class MockWooCommerceClient {
    async get(endpoint: string, params: any) {
        if (endpoint === 'products/categories') {
            return {
                data: [mockCategory],
            };
        }
        throw new Error(`Unexpected endpoint: ${endpoint}`);
    }
}