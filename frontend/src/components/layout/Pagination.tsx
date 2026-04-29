import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { selectPage } from "@/redux/features/counter/paginationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { increment, decrement } from "@/redux/features/counter/paginationSlice";

interface Props {
  maxPage: number;
}

export function PaginationComponent({ maxPage }: Props) {
  const { page } = useAppSelector(selectPage);
  const dispatch = useAppDispatch();
  console.log(page);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {page > 0 ? (
            <PaginationPrevious
              onClick={() => dispatch(decrement())}
              href="#"
            />
          ) : (
            ""
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => dispatch(decrement())} href="#">
            {page > 1 ? page - 1 : ""}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          {page < maxPage ? (
            <PaginationLink onClick={() => dispatch(increment())} href="#">
              {page + 1}
            </PaginationLink>
          ) : (
            ""
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          {page < maxPage ? (
            <PaginationNext onClick={() => dispatch(increment())} href="#" />
          ) : (
            ""
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
