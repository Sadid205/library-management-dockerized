export interface IBorrow {
  _id: string;
  book: string;
  quantity: number;
  dueDate: Date | undefined;
}

export interface IBorrowRes {
  _id: string;
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export type IBorrowWithoutId = Omit<IBorrow, "_id">;
