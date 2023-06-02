import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import artistsRouter from "./artists";
import releasesRouter from "./releases";
import genresRouter from "./genres";
import { errorHandler, asyncHandler } from "./utils";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

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

app.get("/insomnia/insomnia.json", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../insomnia/insomnia.json"), (err) => {
    if (err) {
      next(err);
    }
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.use(errorHandler);

const { SERVER_PORT, NODE_ENV } = process.env;

if (NODE_ENV === "production") {
  try {
    const privateKey = fs.readFileSync(
      path.resolve(__dirname, "../../sslcerts/privkey.pem"),
      "utf8"
    );
    const certificate = fs.readFileSync(
      path.resolve(__dirname, "../../sslcerts/fullchain.pem"),
      "utf8"
    );

    const httpsOptions = {
      key: privateKey,
      cert: certificate,
    };

    console.log("Private Key Length:", httpsOptions.key.length);
    console.log("Certificate Length:", httpsOptions.cert.length);

    const server = https.createServer(httpsOptions, app);

    server.listen(SERVER_PORT, () => {
      console.log(`Discogs API listening on HTTPS:${SERVER_PORT}!!`);
    });
  } catch (error) {
    console.error("Error reading SSL certificate files:", error);
  }
} else {
  const server = http.createServer(app);

  server.listen(SERVER_PORT, () => {
    console.log(`Discogs API listening on HTTP:${SERVER_PORT}!!`);
  });
}
