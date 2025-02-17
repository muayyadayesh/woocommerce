# WooCommerce Categories API Documentation

## Base URL
`https://{api-id}.execute-api.{region}.amazonaws.com/prod`

## Endpoints

### 1. Import Categories
**POST** `/categories`

Triggers an asynchronous import of product categories from a WooCommerce website.

#### Request Body
```json
{
  "websiteUrl": "string",
  "consumerKey": "string",
  "consumerSecret": "string"
}
```

#### Response
```json
{
  "importId": "string",
  "status": "pending",
  "startTime": "string",
  "websiteUrl": "string"
}
```

Status Code: 202 Accepted

### 2. Check Import Status
**GET** `/imports/{importId}/status`

Retrieves the status of a specific import process.

#### Query Parameters
- `websiteUrl` (required): The WooCommerce website URL

#### Response
```json
{
  "importId": "string",
  "status": "pending|in-progress|completed|failed",
  "startTime": "string",
  "websiteUrl": "string",
  "categoriesCount": "number",
  "error": "string"
}
```

Status Code: 200 OK

### 3. Get Categories by Import
**GET** `/imports/{importId}/categories`

Retrieves all categories from a specific import.

#### Query Parameters
- `websiteUrl` (required): The WooCommerce website URL

#### Response
```json
{
  "categories": [
    {
      "categoryId": "string",
      "name": "string",
      "slug": "string",
      "parent": "number",
      "description": "string",
      "lastUpdated": "string"
    }
  ],
  "count": "number"
}
```

Status Code: 200 OK

### 4. Delete Category
**DELETE** `/categories/{categoryId}`

Deletes a specific category.

#### Query Parameters
- `websiteUrl` (required): The WooCommerce website URL

#### Response
```json
{
  "message": "Category deleted successfully",
  "categoryId": "string",
  "websiteUrl": "string"
}
```

Status Code: 200 OK

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "string",
  "details": ["string"]
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Too many requests from this IP, please try again after 15 minutes"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "string" // Only in development
}
```

## Rate Limiting
- 100 requests per IP address per 15-minute window
- Applies to all endpoints

## Security
- CORS enabled
- HTTPS required
- Request validation using Joi
- API key required in headers
