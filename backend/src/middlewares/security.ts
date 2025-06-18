import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from '../utils/config';

// Функція для визначення дозволених origins
const getCorsOrigins = (): string | string[] => {
  if (config.CORS_ORIGIN === '*') {
    return [
      'https://contacts.exocriador.art',
      'http://localhost:3000',
      'http://localhost:5173',
    ];
  }

  // Якщо CORS_ORIGIN - це список через кому
  if (config.CORS_ORIGIN.includes(',')) {
    return config.CORS_ORIGIN.split(',').map(origin => origin.trim());
  }

  return config.CORS_ORIGIN;
};

export const corsOptions = {
  origin: getCorsOrigins(),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'X-Requested-With',
  ],
  exposedHeaders: ['Set-Cookie'],
  credentials: true,
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export const rateLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req: Request): boolean => {
    if (config.NODE_ENV === 'development') return true;
    if (req.path.startsWith('/health')) return true;
    return false;
  },
});

export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://accounts.google.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      connectSrc: [
        "'self'",
        'https://accounts.google.com',
        'https://oauth2.googleapis.com',
        'https://api.exocriador.art',
      ],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'", 'https://accounts.google.com'],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
});

export const requestSizeLimiter = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const MAX_REQUEST_SIZE = '10mb';
  if (
    req.headers['content-length'] &&
    parseInt(req.headers['content-length']) > 10 * 1024 * 1024
  ) {
    res.status(413).json({ message: 'Request entity too large' });
    return;
  }
  next();
};

export const securityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload',
  );

  if (
    req.method === 'POST' ||
    req.method === 'PUT' ||
    req.method === 'DELETE'
  ) {
    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
};
