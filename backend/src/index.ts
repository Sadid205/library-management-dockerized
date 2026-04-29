import express, { Application, NextFunction, Request, Response } from "express";
import bookRouter from "./app/router/book.router";
import borrowRouter from "./app/router/borrow.router";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const frontend_url = process.env.FRONTEND_URL;
const allowedOrigins = ["http://localhost:5173"];
if (frontend_url) {
  allowedOrigins.push(frontend_url);
}

const app: Application = express();
app.use(express.json());
app.use(cors({ origin: allowedOrigins }));
app.use("/api", bookRouter);
app.use("/api", borrowRouter);

app.get("/", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "UP", message: "Welcome to library management app" });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route Not Found" });
});
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
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

export default app;
