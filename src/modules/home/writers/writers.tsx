import { ChangeEvent, memo, useCallback, useState } from 'react';

import Dropdown from 'components/dropdown';
import Input from 'components/input';
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

  const setSearchValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWriterForSearching(e.target.value);
  }, []);

  return (
    <div>
      <div className="flex mb-4 space-x-4">
        <Input value={writerForSearching} onChange={setSearchValue} />
        <Dropdown
          value={chosenNationality}
          options={dropdownOptions}
          placeholder="Nationality"
          onChange={setChosenNationality}
        />
      </div>
      <WritersTable
        chosenNationality={chosenNationality}
        writerForSearching={writerForSearching}
        setWriter={setWriter}
      />
      {chosenWriter && (
        <div className="mt-4 flex items-center space-x-2">
          <p className="text-cyan-500">Current author: {chosenWriter}</p>
          <button
            aria-label="clear selection"
            className="text-red-600 rounded-full w-[26px]"
            type="button"
            onClick={() => {
              chooseWriter(undefined);
              setChosenWriter(undefined);
            }}
          >
            &#215;
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(Writers);
