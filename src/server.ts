import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import artistsRouter from "./artists";
import releasesRouter from "./releases";
import genresRouter from "./genres";
import { errorHandler} from "./utils";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/artists", artistsRouter);
app.use("/releases", releasesRouter);
app.use("/genres", genresRouter);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json("Bienvenido a Discogs!");
  } catch (e) {
    next(e);
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    type: err.constructor.name,
    message: err.message,
  });
});

app.use(errorHandler); 

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`Discogs API listening on:${SERVER_PORT}!!`);
});
