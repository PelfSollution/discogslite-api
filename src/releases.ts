import { Router } from "express";
import prisma from "./prisma-client";
import { validateInput } from "./utils";

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
router.get("/:id", validateInput, async (req, res, next) => {
  try {
    const { id } = req.params;
    const release = await prisma.discogsRelease.findUnique({
      where: { id: Number(id) },
    });

    if (!release) {
      return res.status(404).json({ error: "Release no encontrada" });
    }

    res.status(200).json({ Release: release });
  } catch (e) {
    next(e);
  }
});

// POST /releases
router.post("/", async (req, res, next) => {
  try {
    const { title, year, artistId, genreId } = req.body;
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
});

// PUT /releases/:id
router.put("/:id", validateInput, async (req, res, next) => {
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
});

// DELETE /releases/:id
router.delete("/:id", validateInput, async (req, res, next) => {
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
});

export default router;
