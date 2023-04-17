import wordService from "@/services/words-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { useParams } from "react-router-dom";

export async function wordsPost(req: Request, res: Response) {
  const { word, quality } = req.body;

  try {
    const wordCreated = await wordService.createWord({
      word,
      quality,
    });
    return res.status(httpStatus.CREATED).json({
      id: wordCreated.id,
      word: wordCreated.word,
      interval: wordCreated.interval,
      efactor: wordCreated.efactor,
      dateCreation: wordCreated.createdAt,
    });
  } catch (error) {
    if (error.name === "DuplicatedWordError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function wordsGet(req: Request, res: Response) {
  const numberOfWords = 10;

  try {
    const wordsList = await wordService.getWordService(numberOfWords);
    console.log(wordsList);
    return res.status(httpStatus.CREATED).send(wordsList);
  } catch (error) {
    if (error.name === "DuplicatedWordError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function wordsExist(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const wordExist: boolean = await wordService.getWordByName(word);

    return res.status(httpStatus.CREATED).send(wordExist);
  } catch (error) {
    console.log(
      "/nerror on route /:word, impossible to get word from database"
    );
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
