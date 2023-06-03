import prisma from "./prisma-client";

export default {
  async getAll() {
    return prisma.discogsArtist.findMany({
      where: { deletedAt: null },
    });
  },

  async getById(id: number) {
    const artist = await prisma.discogsArtist.findUnique({
      where: { id: Number(id) },
    });

    if (!artist || artist.deletedAt !== null) {
      return null;
    }

    return artist;
  },

  async create(name: string) {
    return prisma.discogsArtist.create({
      data: { name },
    });
  },

  async update(id: number, name: string) {
    return prisma.discogsArtist.update({
      where: { id: Number(id) },
      data: { name },
    });
  },

  async delete(id: number) {
    return prisma.discogsArtist.delete({
      where: { id: Number(id) },
    });
  },

  async softDelete(id: number) {
    const artist = await prisma.discogsArtist.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    const releases = await prisma.discogsRelease.updateMany({
      where: { artistId: Number(id) },
      data: { deletedAt: new Date() },
    });

    const deletedReleases = await prisma.discogsRelease.findMany({
      where: { artistId: Number(id), deletedAt: { not: null } },
      include: { artist: true },
    });

    return { artist, deletedReleases };
  },

  async getAllDeleted() {
    return prisma.discogsArtist.findMany({
      where: { deletedAt: { not: null } },
    });
  },

  async getArtistWithReleases(id: number) {
    const artist = await prisma.discogsArtist.findUnique({
      where: { id: Number(id) },
      include: { releases: true },
    });

    if (artist && artist.deletedAt) {
      return null;
    }

    return artist;
  },

  async searchByName(name: string) {
    return prisma.discogsArtist.findMany({
      where: {
        name: {
          contains: name,
        },
        deletedAt: null,
      },
    });
  },
};
