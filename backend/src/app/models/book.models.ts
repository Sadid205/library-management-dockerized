import { model, ObjectId, Schema, SchemaTypeOptions } from "mongoose";
import { BookStaticMethods, IBook } from "../interfaces/Ibook.interface";

const bookSchema = new Schema<IBook, BookStaticMethods>(
  {
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
    } as any,
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
  },
  { versionKey: false, timestamps: true }
);

bookSchema.static("checkAvailablity", async function (bookId: ObjectId) {
  await Book.findOneAndUpdate({ _id: bookId }, { available: false });
});

export const Book = model<IBook, BookStaticMethods>("Book", bookSchema);
