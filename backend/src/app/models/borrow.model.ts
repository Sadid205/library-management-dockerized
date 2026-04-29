import mongoose, { Schema, model } from "mongoose";
import { IBorrow } from "../interfaces/Iborrow.interface";

const borrowSchema = new Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "book is required."],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required."],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value.",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "dueDate is required"],
      validate: {
        validator: function (value: string) {
          return !isNaN(Date.parse(value));
        },
      },
    },
  },
  { versionKey: false, timestamps: true }
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
