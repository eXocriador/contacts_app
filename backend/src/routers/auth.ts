import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { validateBody } from '../middlewares/validateBody';
import {
  authSchema,
  loginSchema,
  loginWithGoogleOAuthSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../validation/auth';
import {
  register,
  login,
  logout,
  getCurrentUser,
  refresh,
  sendResetEmail,
  handleResetPassword,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
  updateProfileController,
  changePassword,
} from '../controllers/auth';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { upload } from '../middlewares/upload';

const router = Router();

router.post('/register', validateBody(authSchema), ctrlWrapper(register));
router.post('/login', validateBody(loginSchema), ctrlWrapper(login));
router.post('/refresh', ctrlWrapper(refresh));
router.post(
  '/forgot-password',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(sendResetEmail),
);
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(handleResetPassword),
);
router.get('/google/url', ctrlWrapper(getGoogleOAuthUrlController));
router.post(
  '/google',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);
router.post('/logout', authenticate, ctrlWrapper(logout));
router.get('/current', authenticate, ctrlWrapper(getCurrentUser));
router.patch(
  '/profile',
  authenticate,
  upload.single('photo'),
  validateBody(updateProfileSchema),
  ctrlWrapper(updateProfileController),
);
router.patch(
  '/change-password',
  authenticate,
  validateBody(changePasswordSchema),
  ctrlWrapper(changePassword),
);

export default router;
