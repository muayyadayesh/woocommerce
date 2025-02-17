import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { logger } from '@/utils/logger';


const defaultCredentials = {
    url: process.env.WOOCOMMERCE_URL,
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
};


export const createWooCommerceClient = (
    url: string = defaultCredentials.url!,
    consumerKey: string = defaultCredentials.consumerKey!,
    consumerSecret: string = defaultCredentials.consumerSecret!
) => {
    return new WooCommerceRestApi({
        url,
        consumerKey,
        consumerSecret,
        version: 'wc/v3',
    });
};

export const validateWooCommerceCredentials = async (
    url: string,
    consumerKey: string,
    consumerSecret: string
): Promise<boolean> => {
    try {
        const client = createWooCommerceClient(url, consumerKey, consumerSecret);
        await client.get('products/categories', { per_page: 1 });
        return true;
    } catch (error) {
        logger.error('WooCommerce credential validation failed', { error });
        throw new Error('Invalid WooCommerce credentials');
    }
};

