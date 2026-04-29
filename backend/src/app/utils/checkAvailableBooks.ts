import { Response } from "express";
import { IBook } from "../interfaces/Ibook.interface";

export const checkAvailableBooks = (
  bookData: IBook | null,
  quantity: number,
  res: Response
): boolean => {
  if (bookData && bookData.copies < quantity) {
    return false;
  }
  return true;
};
