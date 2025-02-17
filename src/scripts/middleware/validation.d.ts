import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
export declare const validateRequest: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const schemas: {
    importRequest: Joi.ObjectSchema<any>;
    queryParams: Joi.ObjectSchema<any>;
};
