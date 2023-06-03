import prisma from "./prisma-client";

export default {
  async getAll() {
    return prisma.discogsRelease.findMany({
      where: { deletedAt: null },
    });
  },

  async getById(id: number) {
    const release = await prisma.discogsRelease.findUnique({
      where: { id: Number(id) },
    });

    if (release && release.deletedAt) {
      return null;
    }

    return release;
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

  async softDelete(id: number) {
    return prisma.discogsRelease.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  },

  async getAllDeletedReleases() {
    return prisma.discogsRelease.findMany({
      where: { deletedAt: { not: null } },
      include: { artist: true },
    });
  },

  async searchByTitle(title: string) {
    return prisma.discogsRelease.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
  },
};
