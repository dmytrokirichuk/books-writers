import client from 'services';

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
  const getBooks = client.get('/books.json');
  const getWriters = client.get('/writers.json');

  // getting all the data at once, because the books depend on the writers
  Promise.all([getBooks, getWriters])
    .then((values) => {
      const [booksData, writersData] = values;

      setBooksAndWriters({ booksDTO: booksData.data, writersDTO: writersData.data });
    })
    .catch(() => setError(true))
    .finally(() => setLoading(false));
};
