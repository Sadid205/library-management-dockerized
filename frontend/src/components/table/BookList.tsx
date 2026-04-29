import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/interfaces/Ibook";
import { useGetAllBooksQuery } from "@/redux/services/book";
import { BookMutationDialog } from "../dialog/bookMutationDialog";
import Loader from "../loader/Loader";
import { DeleteAlertDialog } from "../dialog/alertDialog";
import { BorrowDialog } from "../dialog/borrowDialog";
import { PaginationComponent } from "../layout/Pagination";
import { useAppSelector } from "@/redux/hook";
import { selectPage } from "@/redux/features/counter/paginationSlice";
interface Props {
  bookMutation?: boolean;
  title?: string;
}
export function BookListTable({ title, bookMutation }: Props) {
  const { page } = useAppSelector(selectPage);
  // const page = 3;
  const limit = 10;
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetAllBooksQuery({ limit, page });
  const maxPage = Math.ceil((response && response.total) / limit);
  console.log(maxPage);
  return (
    <div>
      <h1 className="text-3xl text-center m-10">
        {title ? title : "Choose Your Book! "}
      </h1>
      <div className="flex justify-end">
        {bookMutation ? <BookMutationDialog mode="create" /> : ""}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availablity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response &&
              response.data.map((book: IBook) => (
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>
                    {book.available ? "Available" : "Unavailable"}
                  </TableCell>
                  <TableCell className="flex gap-4">
                    {/* <Edit /> */}
                    <BorrowDialog
                      isAvailable={book.available}
                      refetch={refetch}
                      id={book._id}
                    />
                    <BookMutationDialog mode="view" book={book} />
                    <BookMutationDialog mode="update" book={book} />
                    <DeleteAlertDialog id={book._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          {/* <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell> */}
          {/* <TableFooter>
            <TableRow></TableRow>
          </TableFooter> */}
        </Table>
      )}
      <div className="mt-5 min-w-max flex justify-center">
        <PaginationComponent maxPage={maxPage} />
      </div>
    </div>
  );
}
