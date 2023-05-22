import { Router, Request, Response, NextFunction } from "express";
import prisma from "./prisma-client";
import { validateReleaseBody , validateParams } from "./utils";

const router = Router();

// GET /releases
router.get("/", async (req, res, next) => {
  try {
    const releases = await prisma.discogsRelease.findMany();
    res.status(200).json({ Releases: releases });
  } catch (e) {
    next(e);
  }
});

// GET /releases/:id
router.get(
  "/:id",
  validateParams(),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Entrando a GET /releases/:id");
    try {
      const { id } = req.params;
      console.log(`Buscando el release con ID: ${id}`);
      const release = await prisma.discogsRelease.findUnique({
        where: { id: Number(id) },
      });
      console.log(`Resultado de la consulta: ${release}`);
      if (!release) {
        return res.status(404).json({ error: "Release no encontrada" });
      }
      console.log("Terminando GET /releases/:id");
      res.status(200).json({ Release: release });
    } catch (e) {
      next(e);
    }
  }
);

// POST /releases
router.post(
  "/",
  validateReleaseBody(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (e) {
      next(e);
    }
  }
);

// PUT /releases/:id
router.put(
  "/:id",
  validateParams(),
  validateReleaseBody(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (e) {
      next(e);
    }
  }
);

// DELETE /releases/:id
router.delete(
  "/:id",
  validateParams(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedRelease = await prisma.discogsRelease.delete({
        where: { id: Number(id) },
      });

      if (!deletedRelease) {
        return res.status(404).json({ error: "Release no encontrada" });
      }

      res.status(200).json({ Release: deletedRelease });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
