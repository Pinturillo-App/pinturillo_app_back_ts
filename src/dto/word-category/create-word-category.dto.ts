import Joi from 'joi';


export class CreateWordCategoryDto {
    idWord: number;
    idCategory: number;
}

export const createWordCategorySchema = Joi.object({
    idWord: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Word id must be a number.',
            'number.integer': 'Word id must be an integer.',
            'number.positive': 'Word id must be a positive number.',
            'any.required': 'Word id is required.'
        }),
    idCategory: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Category id must be a number.',
            'number.integer': 'Category id must be an integer.',
            'number.positive': 'Category id must be a positive number.',
            'any.required': 'Category id is required.'
        }),
}).options({ abortEarly: false });