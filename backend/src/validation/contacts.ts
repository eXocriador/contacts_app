import Joi from 'joi';
import { ContactRequest, UpdateContactRequest } from '../types/models';
import { typeList } from '../constants/contacts';

export const contactSchema = Joi.object<ContactRequest>({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid(...typeList)
    .required(),
});

export const updateContactSchema = Joi.object<UpdateContactRequest>({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phoneNumber: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean().optional(),
  // КЛЮЧОВЕ ВИПРАВЛЕННЯ: робимо поле необов'язковим для PATCH-запитів.
  // Якщо фронтенд його не надішле, валідація пройде.
  // Якщо надішле - воно буде перевірено на валідність.
  contactType: Joi.string()
    .valid(...typeList)
    .optional(),
});
