"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const db_password = process.env.DB_PASSWORD;
const db_user = process.env.DB_USER;
async function main() {
    try {
        await mongoose_1.default.connect(`mongodb+srv://${db_user}:${db_password}@library-management.m2znq0w.mongodb.net/library-management?retryWrites=true&w=majority&appName=library-management`);
        console.log("Connected to mongodb using mongoose");
        _1.default.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
