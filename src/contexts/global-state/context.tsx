import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { BookDTO, Books, WriterDTO, Writers } from 'modules/home';
import { normaliseBooksAndWriters } from 'modules/home/utils';

type ContextType = {
  books: Books;
  writers: Writers;
  nationalities: string[];
  setData: ({ booksDTO, writersDTO }: { booksDTO: BookDTO[]; writersDTO: WriterDTO[] }) => void;
};

// context allows to transform the backend data to the frontend data
// because the backend data does not correspond to our frontend part
const Context = createContext<ContextType>({
  writers: [],
  books: [],
  nationalities: [],
  setData: () => null,
});

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [writers, setWriters] = useState<Writers>({});
  const [books, setBooks] = useState<Books>({});

  const setData = useCallback(
    ({ booksDTO, writersDTO }: { booksDTO: BookDTO[]; writersDTO: WriterDTO[] }) => {
      const { allBooks, allWriters, writersNationalities } = normaliseBooksAndWriters(
        booksDTO,
        writersDTO,
      );

      setBooks(allBooks);
      setWriters(allWriters);
      setNationalities(writersNationalities);
    },
    [],
  );

  const value = useMemo(
    () => ({
      writers,
      books,
      nationalities,
      setData,
    }),
    [books, setData, writers, nationalities],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useGetWriters = () => {
  const { writers } = useContext(Context);

  return writers;
};

export const useGetBooks = () => {
  const { books } = useContext(Context);

  return books;
};

export const useSetBooksAndWriters = () => {
  const { setData } = useContext(Context);

  return setData;
};

export const useGetNationalities = () => {
  const { nationalities } = useContext(Context);

  return nationalities;
};

export default GlobalStateProvider;
