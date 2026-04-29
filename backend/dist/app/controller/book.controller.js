"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const book_schema_1 = require("../schemas/book.schema");
const book_models_1 = require("../models/book.models");
const checkObjectId_1 = require("../utils/checkObjectId");
const getBooks = async (req, res, next) => {
    const { filter = "", sort = "desc", limit = "", page = "", } = req.query;
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;
    console.log({ filter, sort, limit });
    const books = await book_models_1.Book.find(filter ? { genre: filter } : {})
        .sort({ createdAt: sort === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parsedLimit);
    const total = await book_models_1.Book.countDocuments();
    return res.status(200).json({
        success: true,
        message: "Books retrieve successfully",
        data: books,
        total,
    });
};
exports.getBooks = getBooks;
const getBookById = async (req, res, next) => {
    const bookId = req.params.id;
    (0, checkObjectId_1.checkObjectId)(bookId, res);
    const book = await book_models_1.Book.findById(bookId);
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
exports.getBookById = getBookById;
const createBook = async (req, res, next) => {
    try {
        const parseBody = book_schema_1.bookZodSchema.safeParse(req.body);
        if (!parseBody.success) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: parseBody.error.errors,
            });
        }
        const newBook = await book_models_1.Book.create({
            ...parseBody.data,
        });
        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBook = createBook;
const updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        (0, checkObjectId_1.checkObjectId)(bookId, res);
        const parsedBody = book_schema_1.bookUpdateZodSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: parsedBody.error.errors,
            });
        }
        const updatedBook = await book_models_1.Book.findByIdAndUpdate({ _id: bookId }, { ...parsedBody.data }, { new: true });
        if (updatedBook?.copies === 0) {
            await book_models_1.Book.checkAvailablity(bookId);
        }
        return res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res, next) => {
    try {
        const bookdId = req.params.id;
        (0, checkObjectId_1.checkObjectId)(bookdId, res);
        const deletedBook = await book_models_1.Book.findByIdAndDelete(bookdId);
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
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBook = deleteBook;
