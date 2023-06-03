import { Router, Request, Response, NextFunction } from "express";
import { validateReleaseBody, validateParams, asyncHandler } from "./utils";
import releasesService from "./releases.service";

const router = Router();

// GET /releases
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const releases = await releasesService.getAll();
    res.status(200).json({ Releases: releases });
  })
);

// GET /releases/:id
router.get(
  "/:id",
  validateParams(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const release = await releasesService.getById(Number(id));
    if (!release) {
      return res.status(404).json({ error: "Release no encontrada" });
    }
    res.status(200).json({ Release: release });
  })
);

// GET /search/:title
router.get(
  "/search/:title",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.params;
    const releases = await releasesService.searchByTitle(title);
    res.status(200).json({ Releases: releases });
  })
);


// POST /releases
router.post(
  "/",
  validateReleaseBody(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const newRelease = await releasesService.create(req.body);
    if (!newRelease) {
      return res
        .status(400)
        .json({
          error: `No se pudo crear la release. Verifique los datos proporcionados.`,
        });
    }
    res.status(201).json({ Release: newRelease });
  })
);

// PUT /releases/:id
router.put(
  "/:id",
  validateParams(),
  validateReleaseBody(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedRelease = await releasesService.update(Number(id), req.body);
    if (!updatedRelease) {
      return res.status(404).json({ error: "Release no encontrada" });
    }
    res.status(200).json({ Release: updatedRelease });
  })
);

// DELETE /releases/:id
router.delete(
  "/:id",
  validateParams(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deleted = await releasesService.delete(Number(id));
    if (!deleted) {
      return res.status(404).json({ error: "Release no encontrada" });
    }
    res.status(200).json({ message: "Release eliminada con éxito" });
  })
);

export default router;
