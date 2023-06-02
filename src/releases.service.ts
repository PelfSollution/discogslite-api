import prisma from "./prisma-client";

export default {
  async getAll() {
    return prisma.discogsRelease.findMany();
  },

  async getById(id: number) {
    return prisma.discogsRelease.findUnique({
      where: { id: Number(id) },
    });
  },

  async create(data: any) {
    const { title, year, artistId, genreId } = data;
    const artist = await prisma.discogsArtist.findUnique({
      where: { id: Number(artistId) },
    });
    const genre = await prisma.discogsGenre.findUnique({
      where: { id: Number(genreId) },
    });

    if (!artist || !genre) {
      return null;
    }
    const newRelease = await prisma.discogsRelease.create({
      data: {
        title,
        year: Number(year),
        artistId: Number(artistId),
        genreId: Number(genreId),
      },
    });
    return newRelease;
  },

  async update(id: number, data: any) {
    const { title, year, artistId, genreId } = data;
    const updatedRelease = await prisma.discogsRelease.update({
      where: { id: Number(id) },
      data: {
        title,
        year: Number(year),
        artistId: Number(artistId),
        genreId: Number(genreId),
      },
    });
    return updatedRelease;
  },

  async delete(id: number) {
    const deletedRelease = await prisma.discogsRelease.delete({
      where: { id: Number(id) },
    });
    return deletedRelease;
  },
};
