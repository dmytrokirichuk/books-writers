import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { FormControlProps } from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import { memo } from 'react';
import type { Merge } from 'type-fest';

type Props = Merge<
  FormControlProps,
  {
    value: string;
    options: string[];
    placeholder: string;
    onChange: (value: string) => void;
  }
>;

const Dropdown = ({ value, options, placeholder, onChange, size, color }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size={size} fullWidth color={color}>
      <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={placeholder}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(Dropdown);
