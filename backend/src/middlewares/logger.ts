import pinoHttp from 'pino-http';
import { getEnvVar } from '../utils/getEnvVar';
import { Request, Response } from 'express';

const isDevelopment: boolean = getEnvVar('NODE_ENV') === 'development';

export const logger = pinoHttp({
  level: isDevelopment ? 'info' : 'warn',
  transport: isDevelopment ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
    },
  } : undefined as any,
  customLogLevel: (req: Request, res: Response, error?: Error): string => {
    if (error) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'silent'; // Не логуємо успішні запити
  },
  customErrorMessage: (req: Request, res: Response, error: Error): string => {
    return `${req.method} ${req.url} - ${error.message}`;
  },
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'req.body.password'],
    remove: true
  }
});
