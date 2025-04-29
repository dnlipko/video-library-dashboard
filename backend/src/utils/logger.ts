import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};

export const errorLogger = (err: Error, _req: Request, _res: Response, next: NextFunction) => {
  console.error(`${new Date().toISOString()} - Error: ${err.message}`);
  console.error(err.stack);
  next(err);
}; 