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
    return <div className="p-6">Sorry, something went wrong</div>;
  }

  if (loading) {
    return <div className="p-6">Loading</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 p-6">
      <WritersSection
        chosenNationality={chosenNationality}
        setChosenNationality={setChosenNationality}
        chooseWriter={setChosenWriterId}
      />
      <BooksSection
        chosenNationality={chosenNationality}
        setChosenNationality={setChosenNationality}
        chosenWriterId={chosenWriterId}
      />
    </div>
  );
};

export default Home;
