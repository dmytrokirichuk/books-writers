import {
  Button,
  TableRow,
  Typography,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  Paper,
} from '@mui/material';
import { forwardRef, memo, useMemo } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import { useGetWriters } from 'contexts/global-state';

import { Writer } from '../models';

import StyledTableCell from './styled-table-cell';
import StyledTableRow from './styled-table-row';

type Props = {
  chosenNationality: string;
  writerForSearching: string;
  setWriter: (id: number, name: string) => void;
};

const BooksTable = ({ chosenNationality, writerForSearching, setWriter }: Props) => {
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
    return (
      <Typography variant="subtitle1" color="primary" component="p">
        Sorry, no data
      </Typography>
    );
  }

  const chooseWriter = ({ id, firstName, lastName, books }: Writer) => {
    if (!books.length) {
      return undefined;
    }

    return setWriter(id, `${firstName} ${lastName}`);
  };

  return (
    <TableVirtuoso
      style={{ height: 600 }}
      data={writersToRender}
      components={{
        Scroller: forwardRef((props, ref) => (
          <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => <Table {...props} style={{ borderCollapse: 'separate' }} />,
        TableHead,
        TableRow: StyledTableRow,
        TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
      }}
      fixedHeaderContent={() => (
        <TableRow>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Nationality</StyledTableCell>
          <StyledTableCell>Number of books</StyledTableCell>
        </TableRow>
      )}
      itemContent={(_, { id, firstName, lastName, nationality, books }) => (
        <>
          <StyledTableCell component="th" scope="row">
            {id}
          </StyledTableCell>
          <StyledTableCell>
            {firstName} {lastName}
          </StyledTableCell>
          <StyledTableCell>{nationality}</StyledTableCell>
          <StyledTableCell>
            <Button
              size="small"
              variant="text"
              onClick={() => chooseWriter({ id, firstName, lastName, nationality, books })}
            >
              {books.length || 'No books'}
            </Button>
          </StyledTableCell>
        </>
      )}
    />
  );
};

export default memo(BooksTable);
