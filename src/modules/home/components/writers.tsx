import CancelIcon from '@mui/icons-material/Cancel';
import { TextField, IconButton, Typography, Grid } from '@mui/material';
import { ChangeEvent, memo, useCallback, useState } from 'react';

import Dropdown from 'components/dropdown';
import { useGetNationalities } from 'contexts/global-state';

import WritersTable from './writers-table';

type Props = {
  chosenNationality: string;
  chooseWriter: (value?: number) => void;
  setChosenNationality: (value: string) => void;
};

const Writers = ({ chosenNationality, chooseWriter, setChosenNationality }: Props) => {
  const [writerForSearching, setWriterForSearching] = useState('');
  const [chosenWriter, setChosenWriter] = useState<string>();
  const dropdownOptions = useGetNationalities();

  const setWriter = useCallback(
    (writerId: number, name: string) => {
      chooseWriter(writerId);
      setWriterForSearching('');
      setChosenWriter(name);
    },
    [chooseWriter],
  );

  const setSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setWriterForSearching(e.target.value);
  };

  return (
    <Grid container rowSpacing={2}>
      <Grid container item spacing={2}>
        <Grid item xs={6}>
          <TextField
            value={writerForSearching}
            onChange={setSearchValue}
            id="outlined-search"
            label="Search writers"
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
        <WritersTable
          chosenNationality={chosenNationality}
          writerForSearching={writerForSearching}
          setWriter={setWriter}
        />
      </Grid>
      {chosenWriter && (
        <Grid container spacing={2} item xs={12} alignItems="center">
          <Grid item>
            <Typography variant="subtitle1" color="primary" component="p">
              Current author: <span style={{ textDecoration: 'underline' }}>{chosenWriter}</span>
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                chooseWriter(undefined);
                setChosenWriter(undefined);
              }}
            >
              <CancelIcon color="warning" />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(Writers);
