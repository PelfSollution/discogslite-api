import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
}

export function validateParams() {
  return [
    check("id")
      .isNumeric()
      .withMessage("El ID debe ser un número")
      .custom((value, { req }) => {
        return true;
      }),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
}

export function validateBody() {
  return [
    check("title").notEmpty().withMessage("El título es obligatorio"),
    check("year").isNumeric().withMessage("El año debe ser un número"),
    check("artistId")
      .isNumeric()
      .withMessage("El ID del artista debe ser un número"),
    check("genreId")
      .isNumeric()
      .withMessage("El ID del género debe ser un número"),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
}
