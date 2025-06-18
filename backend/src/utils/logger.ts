import pino from 'pino';
import { config } from './config';

// Create structured logger for production
const loggerConfig: any = {
  level: config.NODE_ENV === 'production' ? 'info' : 'debug',
  formatters: {
    level: (label: string) => {
      return { level: label };
    },
    log: (object: any) => {
      return object;
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    env: config.NODE_ENV,
    pid: process.pid,
  },
};

// Add transport only for development
if (config.NODE_ENV !== 'production') {
  loggerConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  };
}

const logger = pino(loggerConfig);

// Production-safe logging functions
export const logInfo = (message: string, data?: any) => {
  if (config.NODE_ENV === 'production') {
    logger.info({ message, data });
  } else {
    logger.info(data ? { message, data } : { message });
  }
};

export const logError = (message: string, error?: any) => {
  if (config.NODE_ENV === 'production') {
    logger.error({
      message,
      error: error?.message || error,
      stack: error?.stack,
      code: error?.code,
    });
  } else {
    logger.error(error ? { message, error } : { message });
  }
};

export const logWarn = (message: string, data?: any) => {
  if (config.NODE_ENV === 'production') {
    logger.warn({ message, data });
  } else {
    logger.warn(data ? { message, data } : { message });
  }
};

export const logDebug = (message: string, data?: any) => {
  if (config.NODE_ENV !== 'production') {
    logger.debug(data ? { message, data } : { message });
  }
};

export default logger;
