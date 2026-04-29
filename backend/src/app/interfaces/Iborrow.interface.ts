import { Date, ObjectId } from "mongoose";

export interface IBorrow {
  book: ObjectId;
  quantity: number;
  dueDate: Date;
}
