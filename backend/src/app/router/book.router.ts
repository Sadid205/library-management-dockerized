import { Router } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controller/book.controller";

const bookRouter: Router = Router();

bookRouter.get("/books", getBooks as any);
bookRouter.get("/books/:id", getBookById as any);
bookRouter.post("/books", createBook as any);
bookRouter.put("/books/:id", updateBook as any);
bookRouter.delete("/books/:id", deleteBook as any);

export default bookRouter;
