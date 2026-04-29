"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [3, "Please entire a title at least 3 charecters"],
        maxlength: [255, "Please keep the title under 255 charecters"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
        minlength: [3, "Please entire an author at least 3 charecters"],
        maxlength: [255, "Please keep the author under 255 charecters"],
    },
    genre: {
        type: String,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
        required: [true, "Genre is required"],
    },
    isbn: {
        type: String,
        required: [true, "ISBN number is required"],
        unique: [true, "ISBN number must be unique"],
    },
    description: {
        type: String,
        required: false,
    },
    copies: {
        type: Number,
        required: [true, "Copies number is required"],
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value",
        },
    },
    available: {
        type: Boolean,
        required: false,
        default: false,
    },
}, { versionKey: false, timestamps: true });
bookSchema.static("checkAvailablity", async function (bookId) {
    await exports.Book.findOneAndUpdate({ _id: bookId }, { available: false });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
