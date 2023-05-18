import { Router } from "express";
import prisma from "./prisma-client";

const router = Router();

// GET /artists
router.get("/", async (req, res, next) => {
  try {
    const artists = await prisma.discogsArtist.findMany();
    res.status(200).json({ Artists: artists });
  } catch (e) {
    next(e);
  }
});

// GET /artists/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await prisma.discogsArtist.findUnique({
      where: { id: Number(id) },
    });

    if (!artist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.status(200).json({ Artist: artist });
  } catch (e) {
    next(e);
  }
});

// POST /artists
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const newArtist = await prisma.discogsArtist.create({
      data: { name },
    });
    res.status(201).json({ Artist: newArtist });
  } catch (e) {
    next(e);
  }
});

// PUT /artists/:id
router.put("/:id", async (req, res, next) => {
  try {
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
  } catch (e) {
    next(e);
  }
});

// DELETE /artists/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedArtist = await prisma.discogsArtist.delete({
      where: { id: Number(id) },
    });

    if (!deletedArtist) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    res.status(200).json({ Artist: deletedArtist });
  } catch (e) {
    next(e);
  }
});

export default router;
