import { Router } from "express";
import { borrow, getBorrows } from "../controller/borrow.controller";

const borrowRouter = Router();

borrowRouter.post("/borrow", borrow as any);
borrowRouter.get("/borrow", getBorrows as any);

export default borrowRouter;
