import {
  Typography,
  Table,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { forwardRef, memo, useMemo } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

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
    return (
      <Typography variant="subtitle1" color="primary" component="p">
        Sorry, no data
      </Typography>
    );
  }

  return (
    <TableVirtuoso
      style={{ height: 600 }}
      data={booksToRender}
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
        <StyledTableRow>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell>Title</StyledTableCell>
          <StyledTableCell>Author</StyledTableCell>
          <StyledTableCell>Year of publication</StyledTableCell>
        </StyledTableRow>
      )}
      itemContent={(_, { id, authorId, title, year }) => (
        <>
          <StyledTableCell component="th" scope="row">
            {id}
          </StyledTableCell>
          <StyledTableCell>{title}</StyledTableCell>
          <StyledTableCell>
            {writers[authorId].firstName} {writers[authorId].lastName}
          </StyledTableCell>
          <StyledTableCell>{year}</StyledTableCell>
        </>
      )}
    />
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.primary.light,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default memo(BooksTable);
