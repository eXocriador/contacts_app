import { Request, Response, NextFunction, RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { ZodSchema, ZodError } from 'zod';

export const validateBody =
  (schema: ZodSchema): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        const messages = err.errors.map(({ message }) => message).join(', ');
        next(createHttpError(400, messages));
      } else {
        next(err);
      }
    }
  };
