import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';

export class WooCommerceApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // DynamoDB Tables
        const categoriesTable = new dynamodb.Table(this, 'CategoriesTable', {
            tableClass: dynamodb.TableClass.STANDARD,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'categoryId', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'websiteUrl', type: dynamodb.AttributeType.STRING },
        });

        // Adding Global Secondary Index (GSI)
        categoriesTable.addGlobalSecondaryIndex({
            indexName: 'importId-index',
            partitionKey: { name: 'importId', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'websiteUrl', type: dynamodb.AttributeType.STRING } 
        });


        const importsTable = new dynamodb.Table(this, 'ImportsTable', {
            partitionKey: { name: 'websiteUrl', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'importId', type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            pointInTimeRecovery: true,
        });

        // SQS Queue for Import Processing
        const importQueue = new sqs.Queue(this, 'ImportQueue', {
            visibilityTimeout: cdk.Duration.seconds(300),
            retentionPeriod: cdk.Duration.days(14),
            deadLetterQueue: {
                queue: new sqs.Queue(this, 'DeadLetterQueue', {
                    retentionPeriod: cdk.Duration.days(14),
                }),
                maxReceiveCount: 3,
            },
        });

        // Lambda Functions
        const lambdaEnvironment = {
            CATEGORIES_TABLE: categoriesTable.tableName,
            IMPORTS_TABLE: importsTable.tableName,
            IMPORT_QUEUE_URL: importQueue.queueUrl,
        };

        const lambdaRole = new iam.Role(this, 'LambdaRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
            ],
            inlinePolicies: {
                'DynamoDBIndexQuery': new iam.PolicyDocument({
                    statements: [
                        new iam.PolicyStatement({
                            actions: ['dynamodb:Query'],
                            resources: [`${categoriesTable.tableArn}/index/*`]
                        })
                    ]
                })
            }
        });

        // Grant DynamoDB permissions
        categoriesTable.grantReadWriteData(lambdaRole);
        importsTable.grantReadWriteData(lambdaRole);
        importQueue.grantSendMessages(lambdaRole);
        importQueue.grantConsumeMessages(lambdaRole);

        const triggerImportFunction = new lambda.Function(this, 'TriggerImport', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('dist/functions/triggerImport'),
            environment: lambdaEnvironment,
            role: lambdaRole,
            timeout: cdk.Duration.seconds(30),
            memorySize: 256,
        });

        const dlq = new sqs.Queue(this, 'LambdaDLQ', {
            retentionPeriod: cdk.Duration.days(14),
        });

        const processImportFunction = new lambda.Function(this, 'ProcessImport', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('dist/functions/processImport'),
            environment: lambdaEnvironment,
            role: lambdaRole,
            timeout: cdk.Duration.seconds(300),
            memorySize: 512,
            deadLetterQueueEnabled: true, 
            deadLetterQueue: dlq,

        });

        const checkImportStatusFunction = new lambda.Function(this, 'CheckImportStatus', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('dist/functions/checkImportStatus'),
            environment: lambdaEnvironment,
            role: lambdaRole,
            timeout: cdk.Duration.seconds(30),
            memorySize: 256,
        });

        const deleteCategoryFunction = new lambda.Function(this, 'DeleteCategory', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('dist/functions/deleteCategory'),
            environment: lambdaEnvironment,
            role: lambdaRole,
            timeout: cdk.Duration.seconds(30),
            memorySize: 256,
        });

        const getCategoriesFunction = new lambda.Function(this, 'GetCategories', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('dist/functions/getCategories'),
            environment: lambdaEnvironment,
            role: lambdaRole, 
            timeout: cdk.Duration.seconds(30),
            memorySize: 256,
        });

        // API Gateway
        const api = new apigateway.RestApi(this, 'WooCommerceApi', {
            restApiName: 'WooCommerce Categories API',
            deploy: true,
            deployOptions: {
                stageName: 'prod',
                loggingLevel: apigateway.MethodLoggingLevel.INFO,  // Enable Logging
                dataTraceEnabled: true,  // Enable full request/response logging
                metricsEnabled: true,  // Enable CloudWatch Metrics
            },
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS
            }
        });
        // API Resources and Methods
        const categories = api.root.addResource('categories');
        const imports = api.root.addResource('imports');
        const importId = imports.addResource('{importId}');
        const categoriesForImport = importId.addResource('categories');
        const category = categories.addResource('{categoryId}');
        const importStatus = importId.addResource('status');

        categories.addMethod('POST', new apigateway.LambdaIntegration(triggerImportFunction));
        importStatus.addMethod('GET', new apigateway.LambdaIntegration(checkImportStatusFunction));
        category.addMethod('DELETE', new apigateway.LambdaIntegration(deleteCategoryFunction));
        categoriesForImport.addMethod('GET', new apigateway.LambdaIntegration(getCategoriesFunction));

        processImportFunction.addEventSource(
            new lambdaEventSources.SqsEventSource(importQueue)
        );

        // SSM Parameters for Configuration
        new ssm.StringParameter(this, 'ApiEndpoint', {
            parameterName: '/woocommerce/api/endpoint',
            stringValue: api.url,
            description: 'WooCommerce Categories API Endpoint',
        });

        // Outputs
        new cdk.CfnOutput(this, 'ApiEndpointOutput', {
            value: api.url,
            description: 'API Endpoint URL',
        });
    }
}