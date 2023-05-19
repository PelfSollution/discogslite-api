import { Router } from "express";
import prisma from "./prisma-client";
import { validateInput } from "./utils";

const router = Router();

// GET /genres
router.get("/", async (req, res, next) => {
  try {
    const genres = await prisma.discogsGenre.findMany();
    res.status(200).json({ Genres: genres });
  } catch (e) {
    next(e);
  }
});

// GET /genres/:id
router.get("/:id", validateInput, async (req, res, next) => {
  try {
    const { id } = req.params;
    const genre = await prisma.discogsGenre.findUnique({
      where: { id: Number(id) },
    });

    if (!genre) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    res.status(200).json({ Genre: genre });
  } catch (e) {
    next(e);
  }
});

// POST /genres
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const newGenre = await prisma.discogsGenre.create({
      data: { name },
    });
    res.status(201).json({ Genre: newGenre });
  } catch (e) {
    next(e);
  }
});

// PUT /genres/:id
router.put("/:id", validateInput, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedGenre = await prisma.discogsGenre.update({
      where: { id: Number(id) },
      data: { name },
    });

    if (!updatedGenre) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    res.status(200).json({ Genre: updatedGenre });
  } catch (e) {
    next(e);
  }
});

// DELETE /genres/:id
router.delete("/:id", validateInput, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGenre = await prisma.discogsGenre.delete({
      where: { id: Number(id) },
    });

    if (!deletedGenre) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    res.status(200).json({ Genre: deletedGenre });
  } catch (e) {
    next(e);
  }
});

export default router;
