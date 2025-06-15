import Joi from 'joi';
import { AuthRequest, RequestResetEmailRequest, ResetPasswordRequest, LoginWithGoogleOAuthRequest, UpdateProfileRequest } from '../types/models';
import { emailRegex } from '../constants/auth';

export const authSchema = Joi.object<AuthRequest>({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object<AuthRequest>({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

export const requestResetEmailSchema = Joi.object<RequestResetEmailRequest>({
  email: Joi.string().pattern(emailRegex).required(),
});

export const resetPasswordSchema = Joi.object<ResetPasswordRequest>({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const loginWithGoogleOAuthSchema = Joi.object<LoginWithGoogleOAuthRequest>({
  code: Joi.string().required(),
  state: Joi.string(),
  error: Joi.string(),
  error_description: Joi.string(),
});

export const updateProfileSchema = Joi.object<UpdateProfileRequest>({
  name: Joi.string().min(2).optional(),
  email: Joi.string().pattern(emailRegex).optional(),
  currentPassword: Joi.string().min(6).optional(),
  newPassword: Joi.string().min(6).optional(),
}).custom((obj, helpers) => {
  if (obj.newPassword && !obj.currentPassword) {
    return helpers.error('any.invalid', { message: 'Current password is required to set a new password' });
  }
  if (!obj.name && !obj.email && !obj.newPassword) {
    return helpers.error('any.invalid', { message: 'At least one field must be provided' });
  }
  return obj;
});
