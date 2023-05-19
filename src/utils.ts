import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
}

export function validateInput(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

  
    const { id } = req.params;
  
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "El ID debe ser un número" });
    }
  
    next();
  }