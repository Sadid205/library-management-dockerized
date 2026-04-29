import { z } from "zod";

export const bookZodSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .regex(/\p{L}/u, {
      message: "Title must contain at least one letter (not just numbers)",
    })
    .min(3, { message: "Please entire a title at least 3 charecters" })
    .max(255, "Please keep the title under 255 charecters"),
  author: z
    .string({
      required_error: "Author is required",
      invalid_type_error: "Author must be a string",
    })
    .regex(/\p{L}/u, {
      message: "Author must contain at least one letter (not just numbers)",
    })
    .min(3, "Please entire an author at least 3 charecters")
    .max(255, "Please keep the author under 255 charecters"),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      required_error: "Genre is required",
      invalid_type_error: "Genre must be a string",
    }
  ),
  isbn: z
    .string({ required_error: "ISBN number is required" })
    .regex(/^(?:97[89]\d{10}|\d{9}[0-9Xx])$/, {
      message:
        "Invalid ISBN number. It must be 10 or 13 digits (like 9783161484100 or 123456789X)",
    }),
  description: z
    .string()
    .regex(/\p{L}/u, {
      message:
        "Description must contain at least one letter (not just numbers)",
    })
    .optional(),
  copies: z
    .number({
      required_error: "Copies number is required",
      invalid_type_error: "Please provide a number",
    })
    .min(0, { message: "Copies number must be 0 or greater" }),
  available: z.boolean().default(false),
});

export const bookUpdateZodSchema = bookZodSchema.partial();
