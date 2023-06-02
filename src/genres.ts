import { Router, Request, Response, NextFunction } from "express";
import { validateArtistBody, validateParams, asyncHandler } from "./utils";
import genresService from "./genres.service";

const router = Router();

// GET /genres
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genresService.getAll();
    res.status(200).json({ Genres: genres });
  })
);

// GET /genres/:id
router.get(
  "/:id",
  validateParams(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const genre = await genresService.getById(Number(id));

    if (!genre) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    res.status(200).json({ Genre: genre });
  })
);

// POST /genres
router.post(
  "/",
  validateArtistBody(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const newGenre = await genresService.create(name);
    res.status(201).json({ Genre: newGenre });
  })
);

// PUT /genres/:id
router.put(
  "/:id",
  validateParams(),
  validateArtistBody(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedGenre = await genresService.update(Number(id), name);

    if (!updatedGenre) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    res.status(200).json({ Genre: updatedGenre });
  })
);

// DELETE /genres/:id
router.delete(
  "/:id",
  validateParams(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedGenre = await genresService.delete(Number(id));

    if (!deletedGenre) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    res.status(200).json({ Genre: deletedGenre });
  })
);

export default router;
