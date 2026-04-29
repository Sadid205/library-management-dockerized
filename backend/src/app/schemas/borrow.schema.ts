import { z } from "zod";
import { DateTime } from "luxon";

export const borrowZODSchema = z.object({
  book: z
    .string({
      required_error: "Book is required",
      invalid_type_error: "Book must be a valid ObjectId",
    })
    .length(24, { message: "Book must be a valid 24-charecter ObjectId" }),
  quantity: z
    .number({
      required_error: "Quantity is required.",
      invalid_type_error: "Quantity must be number",
    })
    .positive({ message: "Quantity must be greater than 0" }),
  dueDate: z
    .preprocess((arg) => {
      const jsDate = new Date(arg as string);
      if (isNaN(jsDate.getTime())) return arg;
      return jsDate;
    }, z.date({ invalid_type_error: "Due Date must be a valid date", required_error: "Due Date is required" }))
    .refine(
      (date) => {
        const tomorrowBD = DateTime.now()
          .setZone("Asia/Dhaka")
          .startOf("day")
          .plus({ day: 1 });
        return DateTime.fromJSDate(date).setZone("Asia/Dhaka") >= tomorrowBD;
      },
      {
        message: "Due Date must be at least tomorrow (Bangladesh Time)",
      }
    ),
});
