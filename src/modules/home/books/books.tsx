import { ChangeEvent, memo, useCallback, useState } from 'react';

import Dropdown from 'components/dropdown';
import Input from 'components/input';
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

  const setSearchValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBookForSearching(e.target.value);
  }, []);

  return (
    <div>
      <div className="flex mb-4 space-x-4">
        <Input value={bookForSearching} onChange={setSearchValue} />
        <Dropdown
          value={chosenNationality}
          options={dropdownOptions}
          placeholder="Nationality"
          onChange={setChosenNationality}
        />
      </div>
      <BooksTable
        chosenNationality={chosenNationality}
        chosenWriterId={chosenWriterId}
        bookForSearching={bookForSearching}
      />
    </div>
  );
};

export default memo(Books);
