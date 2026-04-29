"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowZODSchema = void 0;
const zod_1 = require("zod");
const luxon_1 = require("luxon");
exports.borrowZODSchema = zod_1.z.object({
    book: zod_1.z
        .string({
        required_error: "Book is required",
        invalid_type_error: "Book must be a valid ObjectId",
    })
        .length(24, { message: "Book must be a valid 24-charecter ObjectId" }),
    quantity: zod_1.z
        .number({
        required_error: "Quantity is required.",
        invalid_type_error: "Quantity must be number",
    })
        .positive({ message: "Quantity must be greater than 0" }),
    dueDate: zod_1.z
        .preprocess((arg) => {
        const jsDate = new Date(arg);
        if (isNaN(jsDate.getTime()))
            return arg;
        return jsDate;
    }, zod_1.z.date({ invalid_type_error: "Due Date must be a valid date", required_error: "Due Date is required" }))
        .refine((date) => {
        const tomorrowBD = luxon_1.DateTime.now()
            .setZone("Asia/Dhaka")
            .startOf("day")
            .plus({ day: 1 });
        return luxon_1.DateTime.fromJSDate(date).setZone("Asia/Dhaka") >= tomorrowBD;
    }, {
        message: "Due Date must be at least tomorrow (Bangladesh Time)",
    }),
});
