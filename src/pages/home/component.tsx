import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useSetBooksAndWriters } from 'contexts/global-state';
import { BooksSection, getBooksAndWriters, WritersSection } from 'modules/home';

const Home = () => {
  const [chosenWriterId, setChosenWriterId] = useState<number>();
  const [chosenNationality, setChosenNationality] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const setBooksAndWriters = useSetBooksAndWriters();

  useEffect(() => {
    getBooksAndWriters(setError, setLoading, setBooksAndWriters);
  }, [setBooksAndWriters]);

  if (error) {
    return (
      <Grid p={2}>
        <Typography variant="subtitle1" color="primary" component="p">
          Sorry, something went wrong
        </Typography>
      </Grid>
    );
  }

  if (loading) {
    return (
      <Grid p={2}>
        <Typography variant="subtitle1" color="primary" component="p">
          Loading
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={12} md={6}>
        <WritersSection
          chosenNationality={chosenNationality}
          setChosenNationality={setChosenNationality}
          chooseWriter={setChosenWriterId}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <BooksSection
          chosenNationality={chosenNationality}
          setChosenNationality={setChosenNationality}
          chosenWriterId={chosenWriterId}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
