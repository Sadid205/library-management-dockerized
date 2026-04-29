import mongoose, { ObjectId } from "mongoose";
import { Response } from "express";

export const checkObjectId = (id: string, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "ObjectId not valid", data: {} });
  }
};
