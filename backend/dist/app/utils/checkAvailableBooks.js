"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAvailableBooks = void 0;
const checkAvailableBooks = (bookData, quantity, res) => {
    if (bookData && bookData.copies < quantity) {
        return false;
    }
    return true;
};
exports.checkAvailableBooks = checkAvailableBooks;
