import { prisma } from "@/config";
import { Prisma } from "@prisma/client";
//import { string } from "joi";

async function findByWord(word: string, select?: Prisma.WordArgs) {
  const words = prisma.word.findMany({
    where: {
      word,
    },
  });

  return (await words).length ? true : false;
}

async function create(data: Prisma.WordCreateInput) {
  try {
    return prisma.word.create({
      data,
    });
  } catch (err) {
    console.log(err.message);
  }
  // const { word } = data;
  // const existingWord = await prisma.word.findMany({ where: { word: word } });

  // if (existingWord) {
  //   return prisma.word.update({
  //     where: { id: existingWord[0].id },
  //     data,
  //   });
  // } else {
  //   return prisma.word.create({
  //     data,
  //   });
  // }
}

async function update(data: Prisma.WordCreateInput) {
  const { word } = data;
  const existingWord = await prisma.word.findMany({ where: { word: word } });

  if (existingWord) {
    return prisma.word.update({
      where: { id: existingWord[0].id },
      data,
    });
  } else {
    return prisma.word.create({
      data,
    });
  }
}
// return (await words).length ? true : false;
// }

async function getWords(number: number) {
  const words = await prisma.word.findMany({
    take: number,
    orderBy: {
      interval: "asc",
    },
  });

  return words;
}

async function getWordByName(word: string) {
  const words = await prisma.word.findMany({
    where: {
      word: word,
    },
  });

  return words;
}

const wordRepository = {
  findByWord,
  create,
  update,
  getWords,
  getWordByName,
};

export default wordRepository;
