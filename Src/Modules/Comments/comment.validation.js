import Joi from "joi";

export const createSchema = Joi.object({
  text:Joi.string(),
  file:Joi.object({
    fieldname:Joi.string().valid("image").required(),
    originalname:Joi.string().required(),
    encoding:Joi.string().required(),
    mimetype:Joi.string().required(),
    size:Joi.number().required(),
    destination:Joi.string().required(),
    filename:Joi.string().required(),
    path:Joi.string().required()
  }),
  postId:Joi.custom((value,helpers)=>{
    if (Types.ObjectId.isValid(value)) {
      return true
    } else {
      return helpers.message("id is required")
    }
  }).required(),

}).or('text','file')


// ====== comment Single ==============
export const getSingle = Joi.object({
  id:Joi.custom((value,helpers)=>{
    if (Types.ObjectId.isValid(value)) {
      return true
    } else {
      return helpers.message("id is required")
    }
  }).required(),
}).required()



