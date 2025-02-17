export const createResponse = (statusCode: number, body: any) => ({
    statusCode,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
});

export const createError = (statusCode: number, message: string) => ({
    statusCode,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ error: message }),
});

