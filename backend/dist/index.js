"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_router_1 = __importDefault(require("./app/router/book.router"));
const borrow_router_1 = __importDefault(require("./app/router/borrow.router"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const frontend_url = process.env.FRONTEND_URL;
const allowedOrigins = ["http://localhost:5173"];
if (frontend_url) {
    allowedOrigins.push(frontend_url);
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: allowedOrigins }));
app.use("/api", book_router_1.default);
app.use("/api", borrow_router_1.default);
app.get("/", (_req, res) => {
    res
        .status(200)
        .json({ status: "UP", message: "Welcome to library management app" });
});
app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({
            message: "Something went wrong",
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
    }
});
exports.default = app;
