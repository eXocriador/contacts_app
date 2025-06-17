import { z } from 'zod';
import { typeList } from '../constants/contacts';

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must not exceed 20 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .min(3, 'Phone number must be at least 3 characters')
    .max(20, 'Phone number must not exceed 20 characters'),
  isFavourite: z.boolean().optional(),
  contactType: z.enum(typeList),
});

export const updateContactSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must not exceed 20 characters')
      .optional(),
    email: z.string().email('Invalid email address').optional(),
    phoneNumber: z
      .string()
      .min(3, 'Phone number must be at least 3 characters')
      .max(20, 'Phone number must not exceed 20 characters')
      .optional(),
    isFavourite: z.boolean().optional(),
    contactType: z.enum(typeList).optional(),
  })
  .superRefine((data, ctx) => {
    if (Object.keys(data).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one field must be provided for update',
      });
    }
  });
