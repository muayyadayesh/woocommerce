import { ErrorRequestHandler } from 'express';
export declare class AppError extends Error {
    statusCode: number;
    message: string;
    details?: any | undefined;
    constructor(statusCode: number, message: string, details?: any | undefined);
}
export declare const errorHandler: ErrorRequestHandler;
