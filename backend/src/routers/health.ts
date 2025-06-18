import { Router } from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import os from 'os';
import { config } from '../utils/config';
import { logInfo } from '../utils/logger';

const router = Router();

// Simple health check for load balancers
router.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('pong');
});

// Detailed health check with metrics
router.get('/', (req: Request, res: Response) => {
  const startTime = process.hrtime();

  try {
    const dbState = mongoose.connection.readyState;
    const dbStatusMap: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    const dbStatus = dbStatusMap[dbState] || 'unknown';

    // Check if database is healthy
    const isDbHealthy = dbState === 1;
    const isHealthy = isDbHealthy;

    // System information (limited in production)
    const systemInfo =
      config.NODE_ENV === 'production'
        ? {
            platform: process.platform,
            arch: process.arch,
            nodeVersion: process.version,
            cpus: os.cpus().length,
            memoryUsage: {
              total: Math.round(os.totalmem() / 1024 / 1024), // MB
              free: Math.round(os.freemem() / 1024 / 1024), // MB
              used: Math.round((os.totalmem() - os.freemem()) / 1024 / 1024), // MB
            },
            loadAverage: os.loadavg(),
          }
        : {
            platform: process.platform,
            arch: process.arch,
            nodeVersion: process.version,
            cpus: os.cpus().length,
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            loadAverage: os.loadavg(),
          };

    // Process information
    const processInfo = {
      uptime: Math.round(process.uptime()),
      memoryUsage: {
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024), // MB
        heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024), // MB
        heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024), // MB
        external: Math.round(process.memoryUsage().external / 1024 / 1024), // MB
      },
      pid: process.pid,
      env: config.NODE_ENV,
    };

    // Database information
    const dbInfo = {
      status: dbStatus,
      collections: Object.keys(mongoose.connection.collections).length,
      models: Object.keys(mongoose.connection.models).length,
    };

    // Calculate response time
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const responseTime = (seconds * 1000 + nanoseconds / 1000000).toFixed(2);

    const healthData = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      checks: {
        database: isDbHealthy ? 'healthy' : 'unhealthy',
        memory:
          process.memoryUsage().heapUsed < 500 * 1024 * 1024
            ? 'healthy'
            : 'warning', // 500MB limit
        uptime: process.uptime() > 0 ? 'healthy' : 'unhealthy',
      },
      system: systemInfo,
      process: processInfo,
      database: dbInfo,
      responseTime: `${responseTime}ms`,
    };

    // Log health check in production
    if (config.NODE_ENV === 'production') {
      logInfo('Health check performed', {
        status: healthData.status,
        responseTime: healthData.responseTime,
        dbStatus: healthData.database.status,
      });
    }

    res.status(isHealthy ? 200 : 503).json(healthData);
  } catch (error) {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const responseTime = (seconds * 1000 + nanoseconds / 1000000).toFixed(2);

    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      responseTime: `${responseTime}ms`,
    });
  }
});

export default router;
