#!/bin/bash

set -e  # Exit on error

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found"
    exit 1
fi

echo "Starting cleanup process..."

# Confirm destruction
read -p "Are you sure you want to destroy the stack '${STACK_NAME}-${STAGE}'? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Destruction cancelled"
    exit 1
fi

# Delete API documentation from S3
echo "Removing API documentation..."
aws s3 rm "s3://${STACK_NAME}-${STAGE}-docs/openapi.yaml" || true

# Destroy infrastructure
echo "Destroying infrastructure..."
cdk destroy --force

echo "Cleanup completed successfully!"