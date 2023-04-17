import wordRepository from "@/repositories/words-repository";
import { Word } from "@prisma/client";
import { supermemo, SuperMemoItem } from "supermemo";
import { supermemo2 } from "../sm2-service";
import { duplicatedEmailError } from "../users-service";
import { duplicatedWordError, noWordError } from "./error";

async function callSupermemo(
  interval: number,
  repetition: number,
  efactor: number,
  quality: number
) {
  let item: SuperMemoItem = {
    interval: interval,
    repetition: repetition,
    efactor: efactor,
  };
  console.log(efactor);
  item = supermemo2(item, quality);
  console.log("aqui");
  console.log(item);

  //if (item.efactor > 2.5) item.efactor = 2.5;
  //if (item.efactor < 1.3) item.efactor = 1.3;

  return item;
}

//POST
// {
//   "word":"because",
//   "quality":3
// }

export async function createWord({
  word,
  quality,
}: {
  word: string;
  quality: number;
}): Promise<Word> {
  // await canEnrollOrFail();

  const wordExist = await getWordServiceByName(word);
  if (wordExist.length > 0) {
    console.log("aqui");
    const wordObjectSuperMemo = await callSupermemo(
      wordExist[0].interval,
      wordExist[0].repetition,
      wordExist[0].efactor,
      quality
    );
    console.log(wordObjectSuperMemo);
    return wordRepository.update({
      word: word,
      interval: wordObjectSuperMemo.interval,
      repetition: wordObjectSuperMemo.repetition,
      efactor: wordObjectSuperMemo.efactor,
    });
  }

  return wordRepository.create({
    word: word,
  });

  //await validateUniqueWordOrFail(word);

  //const hashedPassword = await bcrypt.hash(password, 12);
}

async function validateUniqueWordOrFail(word: string) {
  const wordExist = await wordRepository.findByWord(word);

  if (wordExist) {
    throw duplicatedWordError();
  }
}

async function getWordService(numberWords: number) {
  const words = await wordRepository.getWords(numberWords);
  //console.log("dentro de service");
  //console.log(words);
  if (!words) {
    throw noWordError();
  }
  return words;
}

async function getWordByName(word: string) {
  const words = await wordRepository.getWordByName(word);
  //console.log("dentro de service");
  //console.log(words);
  if (words.length === 0) {
    return false;
  }
  return true;
}

//getWordByName

async function getWordServiceByName(word: string) {
  const wordFound = await wordRepository.getWordByName(word);
  return wordFound;
}

const userService = {
  createWord,
  getWordService,
  getWordByName,
};

//export * from "./errors";
export default userService;
