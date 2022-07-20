import { memo, useMemo } from 'react';

import Table from 'components/table';
import { useGetWriters } from 'contexts/global-state';

type Props = {
  chosenNationality: string;
  writerForSearching: string;
  setWriter: (id: number, name: string) => void;
};

const WritersTable = ({ chosenNationality, writerForSearching, setWriter }: Props) => {
  const writers = useGetWriters();

  const writersToRender = useMemo(
    () =>
      Object.values(writers).filter(({ firstName, lastName, nationality }) => {
        // lowercase values
        const lcWriterNationality = nationality.toLowerCase();
        const lcChosenNationality = chosenNationality.toLowerCase();
        const lcName = `${firstName} ${lastName}`.toLowerCase();
        const lcWriter = writerForSearching.toLocaleLowerCase();

        return lcName.includes(lcWriter) && lcWriterNationality.includes(lcChosenNationality);
      }),
    [chosenNationality, writerForSearching, writers],
  );

  if (writersToRender.length === 0) {
    return <div>Sorry, no data</div>;
  }

  return (
    <Table>
      <Table.THead>
        <Table.Th>ID</Table.Th>
        <Table.Th>Name</Table.Th>
        <Table.Th>Nationality</Table.Th>
        <Table.Th>Number of books</Table.Th>
      </Table.THead>
      <Table.TBody>
        {writersToRender.map(({ id, firstName, lastName, nationality, books }) => (
          <Table.TRow key={id}>
            <Table.Td>{id}</Table.Td>
            <Table.Td>
              {firstName} {lastName}
            </Table.Td>
            <Table.Td>{nationality}</Table.Td>
            <Table.Td>
              <button
                onClick={() => setWriter(id, `${firstName} ${lastName}`)}
                type="button"
                className="p-2 hover:scale-110 hover:text-sky-900 duration-300"
              >
                {books.length || 'No books'}
              </button>
            </Table.Td>
          </Table.TRow>
        ))}
      </Table.TBody>
    </Table>
  );
};

export default memo(WritersTable);
