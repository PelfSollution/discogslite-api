import { Router, Request, Response, NextFunction } from "express";
import prisma from "./prisma-client";
import { validateArtistBody, validateParams, asyncHandler } from "./utils";

const router = Router();

// GET /artists
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const artists = await prisma.discogsArtist.findMany();
    res.status(200).json({ Artists: artists });
  })
);

// GET /artists/:id
router.get(
  "/:id",
  validateParams(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const artist = await prisma.discogsArtist.findUnique({
      where: { id: Number(id) },
    });

    if (!artist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.status(200).json({ Artist: artist });
  })
);

// POST /artists
router.post(
  "/",
  validateArtistBody(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const newArtist = await prisma.discogsArtist.create({
      data: { name },
    });
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
    const updatedArtist = await prisma.discogsArtist.update({
      where: { id: Number(id) },
      data: { name },
    });

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
    const deletedArtist = await prisma.discogsArtist.delete({
      where: { id: Number(id) },
    });

    if (!deletedArtist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.status(200).json({ Artist: deletedArtist });
  })
);

export default router;
