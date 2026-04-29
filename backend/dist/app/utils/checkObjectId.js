"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const checkObjectId = (id, res) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ success: false, message: "ObjectId not valid", data: {} });
    }
};
exports.checkObjectId = checkObjectId;
