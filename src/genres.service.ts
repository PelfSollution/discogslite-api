import prisma from "./prisma-client";

export default {
  async getAll() {
    return prisma.discogsGenre.findMany();
  },

  async getById(id: number) {
    return prisma.discogsGenre.findUnique({
      where: { id: Number(id) },
    });
  },

  async create(name: string) {
    return prisma.discogsGenre.create({
      data: { name },
    });
  },

  async update(id: number, name: string) {
    return prisma.discogsGenre.update({
      where: { id: Number(id) },
      data: { name },
    });
  },

  async delete(id: number) {
    return prisma.discogsGenre.delete({
      where: { id: Number(id) },
    });
  },
};
