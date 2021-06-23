import { NextFunction, Request, Response } from "express";


export function ensureAdmin (request: Request, response: Response, next: NextFunction) {
  // CHECK if Admin user
  const admin = true;

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "Unauthorized User"
  })
}