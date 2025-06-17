import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(100, 'Password must not exceed 100 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  );

export const authSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

export const requestResetEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: passwordSchema,
});

export const loginWithGoogleOAuthSchema = z.object({
  code: z.string().min(1, 'Code is required'),
});

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters')
      .optional(),
    email: z.string().email('Invalid email address').optional(),
    currentPassword: z.string().optional(),
    password: passwordSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password && !data.currentPassword) {
      ctx.addIssue({
        path: ['currentPassword'],
        message: 'Current password is required to set a new password',
        code: z.ZodIssueCode.custom,
      });
    }
    if (!data.name && !data.email && !data.password && !data.currentPassword) {
      ctx.addIssue({
        path: ['name'],
        message:
          'At least one field (name, email, currentPassword, or password) must be provided for profile update',
        code: z.ZodIssueCode.custom,
      });
    }
  });
