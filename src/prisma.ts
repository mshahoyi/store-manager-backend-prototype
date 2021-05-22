import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: process.env.NODE_ENV === "production" ? "minimal" : "pretty",
});

export default prisma;
