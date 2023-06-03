import { Router, Request, Response, NextFunction } from "express";
import { validateArtistBody, validateParams, asyncHandler } from "./utils";
import artistsService from "./artists.service";

const router = Router();

// GET /artists
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const artists = await artistsService.getAll();
    res.status(200).json({ Artists: artists });
  })
);

// GET /artists/:id
router.get(
  "/:id",
  validateParams(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const artist = await artistsService.getById(Number(id));

    if (!artist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.status(200).json({ Artist: artist });
  })
);

// GET /search/:name

router.get(
  "/search/:name",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    const artists = await artistsService.searchByName(name);
    res.status(200).json({ Artists: artists });
  })
);

// GET /artists/:id/releases
router.get(
  "/:id/releases",
  validateParams(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const artist = await artistsService.getArtistWithReleases(Number(id));

    if (!artist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.status(200).json({ Artist: artist, Releases: artist.releases });
  })
);

// POST /artists
router.post(
  "/",
  validateArtistBody(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const newArtist = await artistsService.create(name);
    res.status(201).json({ Artist: newArtist });
  })
);

// PUT /artists/:id
router.put(
  "/:id",
  validateParams(),
  validateArtistBody(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedArtist = await artistsService.update(Number(id), name);

    if (!updatedArtist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.status(200).json({ Artist: updatedArtist });
  })
);

// DELETE /artists/:id
router.delete(
  "/:id",
  validateParams(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedArtist = await artistsService.delete(Number(id));

    if (!deletedArtist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.status(200).json({ Artist: deletedArtist });
  })
);

export default router;
