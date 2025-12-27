import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar';
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

export const initMongoConnection = async (): Promise<void> => {
  try {
    // #region agent log
    await writeLog({
      location: 'initMongoConnection.ts:12',
      message: 'Starting MongoDB connection',
      data: { hasMongoUri: !!process.env.MONGODB_URI },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'post-fix',
      hypothesisId: 'A',
    });
    // #endregion

    const mongoUri = getEnvVar(
      'MONGODB_URI',
      'mongodb://localhost:27017/contacts_app',
    );

    // #region agent log
    await writeLog({
      location: 'initMongoConnection.ts:16',
      message: 'MongoDB URI retrieved',
      data: {
        uriLength: mongoUri.length,
        uriPrefix: mongoUri.substring(0, 20) + '...',
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'post-fix',
      hypothesisId: 'A',
    });
    // #endregion

    // #region agent log
    await writeLog({
      location: 'initMongoConnection.ts:20',
      message: 'Attempting mongoose.connect',
      data: {},
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'post-fix',
      hypothesisId: 'A',
    });
    // #endregion

    await mongoose.connect(mongoUri);

    // #region agent log
    await writeLog({
      location: 'initMongoConnection.ts:24',
      message: 'MongoDB connection successful',
      data: { readyState: mongoose.connection.readyState },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'post-fix',
      hypothesisId: 'A',
    });
    // #endregion
  } catch (error) {
    // #region agent log
    await writeLog({
      location: 'initMongoConnection.ts:27',
      message: 'MongoDB connection error',
      data: {
        errorMessage: error instanceof Error ? error.message : String(error),
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'post-fix',
      hypothesisId: 'A',
    });
    // #endregion
    throw error;
  }
};
