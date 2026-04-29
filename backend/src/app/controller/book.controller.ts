import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.models";
import { bookUpdateZodSchema, bookZodSchema } from "../schemas/book.schema";

import { checkObjectId } from "../utils/checkObjectId";

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    filter = "",
    sort = "desc",
    limit = "",
    page = "",
  } = req.query as {
    filter?: string;
    sort?: "asc" | "desc";
    limit?: string;
    page?: string;
  };
  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const skip = (parsedPage - 1) * parsedLimit;

  console.log({ filter, sort, limit });
  const books = await Book.find(filter ? { genre: filter } : {})
    .sort({ createdAt: sort === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(parsedLimit);
  const total = await Book.countDocuments();
  return res.status(200).json({
    success: true,
    message: "Books retrieve successfully",
    data: books,
    total,
  });
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookId = req.params.id;
  checkObjectId(bookId as string, res);

  const book = await Book.findById(bookId);
  if (!book) {
    return res
      .status(404)
      .json({ success: false, message: "Book not found", data: {} });
  }
  return res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parseBody = bookZodSchema.safeParse(req.body);
    if (!parseBody.success) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: parseBody.error.errors,
      });
    }
    const newBook = await Book.create({
      ...parseBody.data,
    });
    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookId = req.params.id;
    checkObjectId(bookId as string, res);
    const parsedBody = bookUpdateZodSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: parsedBody.error.errors,
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      { _id: bookId },
      { ...parsedBody.data },
      { new: true },
    );
    if (updatedBook?.copies === 0) {
      await Book.checkAvailablity(bookId as string);
    }
    return res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookdId = req.params.id as string;
    checkObjectId(bookdId, res);
    const deletedBook = await Book.findByIdAndDelete(bookdId);
    if (deletedBook === null) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: deletedBook,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    next(error);
  }
};
