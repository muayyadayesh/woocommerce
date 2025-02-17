#!/bin/bash

set -e  # Exit on error

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found"
    exit 1
fi

echo "Starting deployment process..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Run tests
echo "Running tests..."
npm test

# Build TypeScript
echo "Building TypeScript..."
npm run build

echo "CDK bootstrapping..."
cdk bootstrap

# Deploy infrastructure
echo "Deploying infrastructure..."
cdk deploy --require-approval never

# Update API documentation
echo "Updating API documentation..."
if [ -f "./docs/openapi.yaml" ]; then
    aws s3 cp ./docs/openapi.yaml "s3://${STACK_NAME}-${STAGE}-docs/openapi.yaml"
else
    echo "Warning: OpenAPI documentation not found"
fi

echo "Deployment completed successfully!"