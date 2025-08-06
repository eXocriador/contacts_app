import pinoHttp from 'pino-http';
import { Request, Response, NextFunction } from 'express';
import { getEnvVar } from '../utils/getEnvVar';

const isDevelopment = getEnvVar('NODE_ENV') === 'development';

// Create structured logger
const logger = pinoHttp({
  level: isDevelopment ? 'debug' : 'info',
  customLogLevel: (req: Request, res: Response, err: Error) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    }
    if (res.statusCode >= 500 || err) {
      return 'error';
    }
    return 'info';
  },
  customSuccessMessage: (req: Request, res: Response) => {
    return `${req.method} ${req.url} - ${res.statusCode}`;
  },
  customErrorMessage: (req: Request, res: Response, err: Error) => {
    return `${req.method} ${req.url} - ${res.statusCode} - ${err.message}`;
  },
  serializers: {
    req: (req: Request) => ({
      method: req.method,
      url: req.url,
      headers: {
        'user-agent': req.get('user-agent'),
        'x-forwarded-for': req.get('x-forwarded-for'),
      },
      body: req.body,
    }),
    res: (res: Response) => ({
      statusCode: res.statusCode,
      headers: res.getHeaders(),
    }),
    err: (err: Error) => ({
      message: err.message,
      stack: err.stack,
      name: err.name,
    }),
  },
  customProps: (req: Request, res: Response) => ({
    requestId: req.id,
    userId: (req as any).user?.id,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    responseTime: res.getHeader('X-Response-Time'),
  }),
});

export { logger };

// Performance monitoring middleware
export const performanceMonitor = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      userId: (req as any).user?.id,
      ip: req.ip,
    };

    // Log slow requests
    if (duration > 1000) {
      logger.logger.warn(logData, 'Slow request detected');
    }

    // Log errors
    if (res.statusCode >= 400) {
      logger.logger.error(logData, 'Request failed');
    }
  });

  next();
};
