"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrows = exports.borrow = void 0;
const borrow_schema_1 = require("../schemas/borrow.schema");
const book_models_1 = require("../models/book.models");
const checkAvailableBooks_1 = require("../utils/checkAvailableBooks");
const borrow_model_1 = require("../models/borrow.model");
const borrow = async (req, res, next) => {
    try {
        const parsedBody = borrow_schema_1.borrowZODSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                success: false,
                error: parsedBody.error.errors,
            });
        }
        const { book: bookId, quantity, dueDate } = parsedBody.data;
        const bookData = await book_models_1.Book.findById(bookId);
        if (bookData === null) {
            return res.status(400).json({ success: false, message: "Not found" });
        }
        const isAvailable = (0, checkAvailableBooks_1.checkAvailableBooks)(bookData, quantity, res);
        if (isAvailable === false) {
            return res
                .status(400)
                .json({ success: false, message: "Insufficient amount" });
        }
        const borrow = await borrow_model_1.Borrow.create({ ...parsedBody.data });
        const borrowedBook = await book_models_1.Book.findByIdAndUpdate(bookId, {
            copies: bookData && bookData.copies - quantity,
        }, { new: true });
        if (borrowedBook?.copies === 0) {
            await book_models_1.Book.checkAvailablity(bookId);
        }
        return res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.borrow = borrow;
const getBorrows = async (req, res, next) => {
    try {
        const books = await borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookList",
                },
            },
            {
                $unwind: "$bookList",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookList.title",
                        isbn: "$bookList.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        return res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBorrows = getBorrows;
