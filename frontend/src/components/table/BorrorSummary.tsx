import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBorrowRes } from "@/interfaces/Iborrow";
import { useGetAllBorrowQuery } from "@/redux/services/borrow";
import Loader from "../loader/Loader";

export function BorrowSummary() {
  const { data: borrows, isLoading } = useGetAllBorrowQuery(undefined);
  console.log(borrows);
  return (
    <div>
      <h1 className="text-3xl text-center mb-5 mt-5">Total Borrow Summary</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Book Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Quantity Borrowed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrows &&
              borrows.data &&
              borrows.data.map((borrow: IBorrowRes) => (
                <TableRow key={borrow._id}>
                  <TableCell className="font-medium">
                    {borrow.book.title}
                  </TableCell>
                  <TableCell>{borrow.book.isbn}</TableCell>
                  <TableCell>{borrow.totalQuantity}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      )}
    </div>
  );
}
