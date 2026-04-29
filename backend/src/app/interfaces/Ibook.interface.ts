import { Model, ObjectId } from "mongoose";

export enum Genre {
  FICTION,
  NON_FICTION,
  SCIENCE,
  HISTORY,
  BIOGRAPHY,
  FANTASY,
}
export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BookStaticMethods extends Model<IBook> {
  checkAvailablity(bookId: string): void;
}
