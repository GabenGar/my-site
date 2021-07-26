import { NextFunction, Request, Response } from "express";

interface ExpressCallback {
  (req:Request, res:Response, next:NextFunction): void
}
