import Joi from "joi";
import { Types } from 'mongoose';



export const createSchema = Joi.object({
  title:Joi.string().min(2),
  description:Joi.string().required(),
  file:Joi.array().items({
    fieldname:Joi.string().valid("images").required(),
  originalname:Joi.string().required(),
  encoding:Joi.string().required(),
  mimetype:Joi.string().required(),
  size:Joi.number().required(),
  destination:Joi.string().required(),
  filename:Joi.string().required(),
  path:Joi.string().required(),
  buffer:Joi.binary().required()
  }),

}).or('title','file')






export const updateSchema = Joi.object({
  title:Joi.string().min(2),
  description:Joi.string(),
  id:Joi.custom((value,helpers)=>{
    if (Types.ObjectId.isValid(value)) {
      return true
    } else {
      return helpers.message("id is required")
    }
  }).required(),
  file:Joi.array().items({
    fieldname:Joi.string().valid("images").required(),
  originalname:Joi.string().required(),
  encoding:Joi.string().required(),
  mimetype:Joi.string().required(),
  size:Joi.number().required(),
  destination:Joi.string().required(),
  filename:Joi.string().required(),
  path:Joi.string().required()
  }),

}).or('title','file').required()


export const softDeleteSchema = Joi.object({
  id:Joi.custom((value,helpers)=>{
    if (Types.ObjectId.isValid(value)) {
      return true
    } else {
      return helpers.message("id is required")
    }
  }).required(),
}).required()

export const resetSchema = Joi.object({
  id:Joi.custom((value,helpers)=>{
    if (Types.ObjectId.isValid(value)) {
      return true
    } else {
      return helpers.message("id is required")
    }
  }).required(),
}).required()


export const getSingle = Joi.object({
  id:Joi.custom((value,helpers)=>{
    if (Types.ObjectId.isValid(value)) {
      return true
    } else {
      return helpers.message("id is required")
    }
  }).required(),
}).required()
