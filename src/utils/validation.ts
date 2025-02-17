import * as Joi from 'joi';

export const importRequestSchema = Joi.object({
    websiteUrl: Joi.string().uri().required(),
    consumerKey: Joi.string().required(),
    consumerSecret: Joi.string().required(),
});

export const validateRequest = (schema: Joi.Schema, data: any) => {
    const { error, value } = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    return value;
};