import prisma from "./prisma-client";

export default {
  async getAll() {
    return prisma.discogsArtist.findMany();
  },

  async getById(id: number) {
    return prisma.discogsArtist.findUnique({
      where: { id: Number(id) },
    });
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

  async getArtistWithReleases(id: number) {
    return prisma.discogsArtist.findUnique({
      where: { id: Number(id) },
      include: { releases: true },
    });
  },
  async searchByName(name: string) {
    return prisma.discogsArtist.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  },
};
