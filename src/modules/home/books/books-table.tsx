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
import { memo, useMemo } from 'react';

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
    <TableContainer component={Paper}>
      <Table aria-label="books table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Author</StyledTableCell>
            <StyledTableCell>Year of publication</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {booksToRender.map(({ id, title, authorId, year }) => (
            <StyledTableRow key={id}>
              <StyledTableCell component="th" scope="row">
                {id}
              </StyledTableCell>
              <StyledTableCell>{title}</StyledTableCell>
              <StyledTableCell>
                {writers[authorId].firstName} {writers[authorId].lastName}
              </StyledTableCell>
              <StyledTableCell>{year}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
