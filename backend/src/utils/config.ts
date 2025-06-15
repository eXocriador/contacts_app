import { getEnvVar } from './getEnvVar';

interface Config {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET: string;
  MONGODB_URI: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  SMTP_FROM: string;
  CORS_ORIGIN: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;
}

const validateConfig = (): Config => {
  const config: Config = {
    NODE_ENV: getEnvVar('NODE_ENV', 'development'),
    PORT: Number(getEnvVar('PORT', '3000')),
    JWT_SECRET: getEnvVar('JWT_SECRET'),
    MONGODB_URI: getEnvVar('MONGODB_URI'),
    SMTP_HOST: getEnvVar('SMTP_HOST'),
    SMTP_PORT: Number(getEnvVar('SMTP_PORT', '587')),
    SMTP_USER: getEnvVar('SMTP_USER'),
    SMTP_PASSWORD: getEnvVar('SMTP_PASSWORD'),
    SMTP_FROM: getEnvVar('SMTP_FROM'),
    CORS_ORIGIN: getEnvVar('CORS_ORIGIN', '*'),
    RATE_LIMIT_WINDOW_MS: Number(getEnvVar('RATE_LIMIT_WINDOW_MS', '900000')), // 15 minutes
    RATE_LIMIT_MAX: Number(getEnvVar('RATE_LIMIT_MAX', '100')),
  };

  // Validate required fields
  const requiredFields: (keyof Config)[] = ['JWT_SECRET', 'MONGODB_URI', 'SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM'];

  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Missing required environment variable: ${field}`);
    }
  }

  // Validate numeric fields
  const numericFields: (keyof Config)[] = ['PORT', 'SMTP_PORT', 'RATE_LIMIT_WINDOW_MS', 'RATE_LIMIT_MAX'];
  for (const field of numericFields) {
    if (isNaN(config[field] as number)) {
      throw new Error(`Invalid numeric value for environment variable: ${field}`);
    }
  }

  return config;
};

export const config = validateConfig();
