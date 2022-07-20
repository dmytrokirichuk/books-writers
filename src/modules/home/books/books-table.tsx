import { memo, useMemo } from 'react';

import Table from 'components/table';
import { useGetBooks, useGetWriters } from 'contexts/global-state';

type Props = {
  chosenNationality: string;
  chosenWriterId?: number;
  bookForSearching: string;
};

const BooksTable = ({ chosenWriterId, chosenNationality, bookForSearching }: Props) => {
  const writers = useGetWriters();
  const books = useGetBooks();

  const booksToRender = useMemo(
    () =>
      Object.values(books).filter(({ title, authorId }) => {
        // lowercase values
        const lcWriterNationality = writers[authorId].nationality.toLowerCase();
        const lcChosenNationality = chosenNationality.toLowerCase();
        const lcBook = bookForSearching.toLowerCase();
        const lcTitle = title.toLowerCase();

        if (chosenWriterId) {
          return (
            authorId === chosenWriterId &&
            lcTitle.includes(lcBook) &&
            lcWriterNationality.includes(lcChosenNationality)
          );
        }

        return lcTitle.includes(lcBook) && lcWriterNationality.includes(lcChosenNationality);
      }),
    [bookForSearching, books, chosenNationality, chosenWriterId, writers],
  );

  if (booksToRender.length === 0) {
    return <div>Sorry, no data</div>;
  }

  return (
    <Table>
      <Table.THead>
        <Table.Th>ID</Table.Th>
        <Table.Th>Title</Table.Th>
        <Table.Th>Author</Table.Th>
        <Table.Th>Year of publication</Table.Th>
      </Table.THead>
      <Table.TBody>
        {booksToRender.map(({ id, title, authorId, year }) => (
          <Table.TRow key={id}>
            <Table.Td>{id}</Table.Td>
            <Table.Td>{title}</Table.Td>
            <Table.Td>
              {writers[authorId].firstName} {writers[authorId].lastName}
            </Table.Td>
            <Table.Td>{year}</Table.Td>
          </Table.TRow>
        ))}
      </Table.TBody>
    </Table>
  );
};

export default memo(BooksTable);
