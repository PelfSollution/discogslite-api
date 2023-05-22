import { Router, Request, Response, NextFunction } from "express";
import prisma from "./prisma-client";
import { validateReleaseBody, validateParams, asyncHandler } from "./utils";

const router = Router();

// GET /releases
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const releases = await prisma.discogsRelease.findMany();
    res.status(200).json({ Releases: releases });
  })
);

// GET /releases/:id
router.get(
  "/:id",
  validateParams(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const release = await prisma.discogsRelease.findUnique({
      where: { id: Number(id) },
    });
    if (!release) {
      return res.status(404).json({ error: "Release no encontrada" });
    }
    res.status(200).json({ Release: release });
  })
);

// POST /releases
router.post(
  "/",
  validateReleaseBody(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title, year, artistId, genreId } = req.body;
    const artist = await prisma.discogsArtist.findUnique({
      where: { id: Number(artistId) },
    });
    const genre = await prisma.discogsGenre.findUnique({
      where: { id: Number(genreId) },
    });
    if (!artist) {
      return res
        .status(400)
        .json({ error: `El artista con ID ${artistId} no existe` });
    }
    if (!genre) {
      return res
        .status(400)
        .json({ error: `El género con ID ${genreId} no existe` });
    }
    const newRelease = await prisma.discogsRelease.create({
      data: {
        title,
        year: Number(year),
        artistId: Number(artistId),
        genreId: Number(genreId),
      },
    });
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
    const { title, year, artistId, genreId } = req.body;
    const updatedRelease = await prisma.discogsRelease.update({
      where: { id: Number(id) },
      data: {
        title,
        year: Number(year),
        artistId: Number(artistId),
        genreId: Number(genreId),
      },
    });

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
    const deletedRelease = await prisma.discogsRelease.delete({
      where: { id: Number(id) },
    });

    if (!deletedRelease) {
      return res.status(404).json({ error: "Release no encontrada" });
    }

    res.status(200).json({ Release: deletedRelease });
  })
);

export default router;
