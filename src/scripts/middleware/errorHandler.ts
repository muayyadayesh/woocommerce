import { ErrorRequestHandler } from 'express';
import { logger } from '@/utils/logger';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public details?: any
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error('Error occurred', {
        error: err,
        path: req.path,
        method: req.method
    });

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.message,
            details: err.details
        });
        return; 
    }

    // Default error
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });

    return; 
};