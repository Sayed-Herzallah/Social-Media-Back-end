import Joi from "joi";

export const chatSchema = Joi.object({
    message: Joi.string(),

    // التغيير هنا: files بقت array of objects
    file: Joi.array().items(
        Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/jpg', 'image/webp').required(),
            size: Joi.number().max(5000000).required(),
            // buffer: Joi.binary().required()
        })
    )
    
}).or("message", "file");