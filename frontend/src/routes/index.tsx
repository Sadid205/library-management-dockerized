import App from "@/App";
import { BookListTable } from "@/components/table/BookList";
import { BorrowSummary } from "@/components/table/BorrorSummary";
import { createBrowserRouter } from "react-router";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: BookListTable,
      },
      {
        path: "books",
        Component: BookListTable,
      },
      {
        // index: true,
        path: "add-books",
        element: (
          <div>
            <BookListTable bookMutation={true} title="Add Book" />
          </div>
        ),
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
