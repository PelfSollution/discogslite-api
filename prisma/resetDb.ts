import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetDb() {
  await prisma.discogsRelease.deleteMany();
  await prisma.discogsGenre.deleteMany();
  await prisma.discogsArtist.deleteMany();

}

resetDb()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Base de Datos Borrada")
    await prisma.$disconnect();
  });
