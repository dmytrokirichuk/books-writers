export type Writer = {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  books: string[];
};

export type Book = {
  id: number;
  title: string;
  authorId: number;
  year: number;
};

export type Writers = Record<number, Writer>;

export type Books = Record<number, Book>;

export type BookDTO = {
  id: number;
  title: string;
  author_id: number;
  year: number;
};

export type WriterDTO = {
  id: number;
  first_name: string;
  last_name: string;
  nationality: string;
};

export const ID_COL_WIDTH_PERCENT = 10;
export const MAIN_COL_WIDTH_PERCENT = 40;
