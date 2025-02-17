import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            res.status(400).json({
                error: 'Validation error',
                details: errorMessages
            });
            return;
        }

        next();
    };
};

// Validation schemas
export const schemas = {
    importRequest: Joi.object({
        websiteUrl: Joi.string().uri().required(),
        consumerKey: Joi.string().required(),
        consumerSecret: Joi.string().required()
    }),

    queryParams: Joi.object({
        websiteUrl: Joi.string().uri().required()
    })
};