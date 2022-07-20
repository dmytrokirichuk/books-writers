import { useSelect } from 'downshift';
import { memo } from 'react';

type Props = {
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
};

const Dropdown = ({ value, options, placeholder, onChange }: Props) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useSelect({
    items: options,
    selectedItem: value,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      onChange(newSelectedItem || '');
    },
  });

  return (
    <div className="relative">
      <div
        className={`flex justify-between min-w-[200px] rounded border border-cyan-500 h-10 ${
          value && 'divide-x divide-cyan-500'
        }`}
      >
        <button
          aria-label="toggle menu"
          className="text-sm font-medium text-cyan-500 relative flex justify-between w-full items-center px-2"
          type="button"
          {...getToggleButtonProps()}
        >
          <span>{selectedItem || placeholder}</span>
          <span className="px-2">{isOpen ? <>&#8593;</> : <>&#8595;</>}</span>
        </button>
        {value && (
          <button
            aria-label="clear selection"
            className="p-2 bg-white font-medium rounded-r text-cyan-500"
            type="button"
            onClick={() => {
              selectItem('');
            }}
          >
            &#215;
          </button>
        )}
      </div>
      <ul
        {...getMenuProps()}
        className={isOpen ? 'border border-gray-700 rounded absolute w-full bg-white top-12' : ''}
      >
        {isOpen &&
          options.map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
              key={item}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(Dropdown);
