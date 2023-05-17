import { PrismaClient } from "@prisma/client";
console.log("Se Crea el Prisma Client!!!");
const prisma = new PrismaClient();
export default prisma;
