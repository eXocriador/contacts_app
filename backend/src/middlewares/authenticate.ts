import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/index';
import User from '../db/models/user';
import Session from '../db/models/session';
import { getEnvVar } from '../utils/getEnvVar';
import createHttpError from 'http-errors';
import { appendFile } from 'fs/promises';
import { join } from 'path';

const LOG_PATH = join(process.cwd(), '.cursor', 'debug.log');

const writeLog = async (data: any): Promise<void> => {
  try {
    await appendFile(LOG_PATH, JSON.stringify(data) + '\n', 'utf8');
  } catch (err) {
    // Ignore log write errors
  }
};

// Lazy loading JWT_SECRET to avoid errors during module import
const getJwtSecret = (): string => {
  // #region agent log
  writeLog({
    location: 'authenticate.ts:getJwtSecret',
    message: 'Loading JWT_SECRET',
    data: {
      hasJwtSecret: !!process.env.JWT_SECRET,
      envKeys: Object.keys(process.env).filter(k => k.includes('JWT')),
    },
    timestamp: Date.now(),
    sessionId: 'debug-session',
    runId: 'post-fix',
    hypothesisId: 'B',
  }).catch(() => {});
  // #endregion

  try {
    return getEnvVar('JWT_SECRET');
  } catch (error) {
    // #region agent log
    writeLog({
      location: 'authenticate.ts:getJwtSecret',
      message: 'JWT_SECRET not found, using default for development',
      data: {
        error: error instanceof Error ? error.message : String(error),
        nodeEnv: process.env.NODE_ENV,
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'post-fix',
      hypothesisId: 'B',
    }).catch(() => {});
    // #endregion

    // Allow default value only in development
    if (process.env.NODE_ENV === 'development') {
      return getEnvVar('JWT_SECRET', 'dev-secret-key-change-in-production');
    }
    throw error;
  }
};

export const authenticate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw createHttpError(401, 'Authentication required');
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw createHttpError(401, 'Authentication required');
    }

    let decoded: { id: string; exp: number };
    try {
      const jwtSecret = getJwtSecret();
      decoded = jwt.verify(accessToken, jwtSecret) as {
        id: string;
        exp: number;
      };
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        throw createHttpError(401, 'Access token expired');
      }
      throw createHttpError(401, 'Invalid access token');
    }

    const session = await Session.findOne({
      userId: decoded.id,
      accessToken: accessToken,
      accessTokenValidUntil: { $gt: new Date() },
    });

    if (!session) {
      throw createHttpError(
        401,
        'Authentication required: No active session or token invalid.',
      );
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throw createHttpError(401, 'Authentication required: User not found.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (createHttpError.isHttpError(error)) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
