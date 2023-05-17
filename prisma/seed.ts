import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./albums.json"), "utf-8")
  );

  for (let artistData of data.artists) {
    const artist = await prisma.discogsArtist.create({
      data: {
        name: artistData.name,
      },
    });
    console.log(`Artista creado ${artist.name} id (${artist.id})`);
    let genre = await prisma.discogsGenre.findUnique({
      where: { name: artistData.genre },
    });

    if (!genre) {
      genre = await prisma.discogsGenre.create({
        data: { name: artistData.genre },
      });
      console.log(`Genero creado ${genre.name} id (${genre.id})`);
    }

    for (let albumData of artistData.albums) {
      const album = await prisma.discogsRelease.create({
        data: {
          title: albumData.title,
          year: albumData.year,
          artistId: artist.id,
          genreId: genre.id,
        },
      });
      console.log(
        `Album creado ${album.title} id (${album.id}) del artista ${artist.name}`
      );
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




