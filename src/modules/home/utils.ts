import { BookDTO, Books, WriterDTO, Writers } from './models';

export const normaliseBooksAndWriters = (booksDTO: BookDTO[], writersDTO: WriterDTO[]) => {
  const writersNationalities: string[] = [];
  const allWriters: Writers = {};
  const allBooks: Books = {};

  writersDTO.forEach(({ id, first_name, last_name, nationality }) => {
    if (!writersNationalities.includes(nationality)) {
      writersNationalities.push(nationality);
    }

    allWriters[id] = {
      id,
      nationality,
      firstName: first_name,
      lastName: last_name,
      books: [],
    };
  });

  booksDTO.forEach(({ id, title, author_id, year }) => {
    if (allWriters[author_id]) {
      allWriters[author_id].books = [...allWriters[author_id].books, title];
    } else {
      allWriters[author_id].books = [title];
    }

    allBooks[id] = {
      id,
      title,
      year,
      authorId: author_id,
    };
  });

  return { allBooks, allWriters, writersNationalities };
};
