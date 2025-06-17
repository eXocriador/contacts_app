import Joi from 'joi';
import { ContactRequest, UpdateContactRequest } from '../types/models';
import { typeList } from '../constants/contacts';

// Схема для створення контакту
export const contactSchema = Joi.object<ContactRequest>({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  // Виправлення: Joi тепер коректно обробить "true" або "false" з FormData
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid(...typeList)
    .required(),
});

// Схема для оновлення контакту
export const updateContactSchema = Joi.object<UpdateContactRequest>({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phoneNumber: Joi.string().min(3).max(20),
  // Виправлення: Joi тепер коректно обробить "true" або "false" з FormData
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid(...typeList),
}).min(1); // Вимагає наявності хоча б одного поля для оновлення
