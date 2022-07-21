import { Grid, TextField } from '@mui/material';
import { ChangeEvent, memo, useState } from 'react';

import Dropdown from 'components/dropdown';
import { useGetNationalities } from 'contexts/global-state';

import BooksTable from './books-table';

type Props = {
  chosenNationality: string;
  chosenWriterId?: number;
  setChosenNationality: (value: string) => void;
};

const Books = ({ chosenWriterId, chosenNationality, setChosenNationality }: Props) => {
  const [bookForSearching, setBookForSearching] = useState('');
  const dropdownOptions = useGetNationalities();

  const setSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setBookForSearching(e.target.value);
  };

  return (
    <Grid container rowSpacing={2}>
      <Grid container item spacing={2}>
        <Grid item xs={6}>
          <TextField
            value={bookForSearching}
            onChange={setSearchValue}
            id="outlined-search"
            label="Search books"
            type="search"
            color="success"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Dropdown
            size="small"
            color="success"
            value={chosenNationality}
            options={dropdownOptions}
            placeholder="Nationality"
            onChange={setChosenNationality}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <BooksTable
          chosenNationality={chosenNationality}
          chosenWriterId={chosenWriterId}
          bookForSearching={bookForSearching}
        />
      </Grid>
    </Grid>
  );
};

export default memo(Books);
