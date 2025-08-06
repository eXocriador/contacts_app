import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { getEnvVar } from '../utils/getEnvVar';
import { TEMP_UPLOAD_DIR } from '../constants';

// File validation
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  // Check file type
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.',
      ),
    );
  }

  // Check file extension
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  if (!allowedExtensions.includes(ext)) {
    return cb(
      new Error(
        'Invalid file extension. Only .jpg, .jpeg, .png, .gif, and .webp files are allowed.',
      ),
    );
  }

  // Check for malicious file names
  const maliciousPatterns = /[<>:"/\\|?*\x00-\x1f]/;
  if (maliciousPatterns.test(file.originalname)) {
    return cb(new Error('Invalid file name.'));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxFileSize,
    files: 1, // Only allow 1 file per request
  },
});
