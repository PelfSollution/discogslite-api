import { Router } from "express";
import prisma from "./prisma-client";

// GET /discogs/

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await prisma.discogsGenre.findMany();
    res.status(200).json({ Genres: result, ok: true });
  } catch (e) {
    next(e);
  }
});

export default router;