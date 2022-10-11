import books from '../../books.json';
import writers from '../../writers.json';

import { BookDTO, WriterDTO } from './models';

export const getBooksAndWriters = (
  setError: (value: boolean) => void,
  setLoading: (value: boolean) => void,
  setBooksAndWriters: ({
    booksDTO,
    writersDTO,
  }: {
    booksDTO: BookDTO[];
    writersDTO: WriterDTO[];
  }) => void,
) => {
  // simulation of receiving data from the server
  // getting all the data at once, because the books depend on the writers
  Promise.all([writers, books])
    .then(() => {
      setBooksAndWriters({ booksDTO: books, writersDTO: writers });
    })
    .catch(() => setError(true))
    .finally(() => setLoading(false));
};
