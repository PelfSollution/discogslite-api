import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import artistsRouter from "./artists";
import releasesRouter from "./releases";
import genresRouter from "./genres";
import { errorHandler, asyncHandler } from "./utils";
import https from "https";
import fs from "fs";
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/artists", artistsRouter);
app.use("/releases", releasesRouter);
app.use("/genres", genresRouter);

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("Bienvenido a Discogs!");
  })
);

app.get("/insomnia.json", (req, res) => {
  res.sendFile(__dirname + "../insomnia/insomnia.json");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.use(errorHandler);

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  try {
    const privateKey = fs.readFileSync(
      path.resolve(__dirname, '../../sslcerts/privkey.pem'),
      "utf8"
    );
    const certificate = fs.readFileSync(
      path.resolve(__dirname, '../../sslcerts/fullchain.pem'),
      "utf8"
    );

    const httpsOptions = {
      key: privateKey,
      cert: certificate,
    };

    const server = https.createServer(httpsOptions, app);

    console.log(`Discogs API listening on:${SERVER_PORT}!!`);
  } catch (error) {
    console.error("Error reading SSL certificate files:", error);
  }
});