//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
  const prisma = new PrismaClient();

  async function main() {
    // Create users
    const user1 = await prisma.user.create({
      data: {
        email: "user1@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: "user2@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    });

    const user3 = await prisma.user.create({
      data: {
        email: "user3@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    });

    // Create sessions
    const session1 = await prisma.session.create({
      data: {
        token: "token1",
        user: {
          connect: { id: user1.id },
        },
      },
    });

    const session2 = await prisma.session.create({
      data: {
        token: "token2",
        user: {
          connect: { id: user2.id },
        },
      },
    });

    const session3 = await prisma.session.create({
      data: {
        token: "token3",
        user: {
          connect: { id: user3.id },
        },
      },
    });

    // Create words
    const words: {
      word: string;
      interval: number;
      createdAt: Date;
      updatedAt: Date;
    }[] = [];

    for (let i = 0; i < 22; i++) {
      const ef = Math.random() * (2.5 - 1.3) + 1.3;
      const score = Math.floor(Math.random() * 35);

      words.push({
        word: `Word${i + 1}`,
        interval: score,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await prisma.word.createMany({
      data: words,
    });
  }

  main()
    .catch((e) => console.error(e))
    .finally(async () => {
      await prisma.$disconnect();
    });
}
