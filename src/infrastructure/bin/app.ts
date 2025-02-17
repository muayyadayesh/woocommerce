import * as cdk from 'aws-cdk-lib';
import { WooCommerceApiStack } from '@/infrastructure/lib/woocommerce-api-stack';

const app = new cdk.App();

// You can specify multiple environments here
new WooCommerceApiStack(app, 'WooCommerceApiStack-Dev', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION || 'us-east-1'
    },
    stackName: 'woocommerce-api-dev',
    description: 'WooCommerce Categories API (Development)',
});

app.synth();