import { ComponentPropsWithoutRef, memo } from 'react';

type Props = ComponentPropsWithoutRef<'input'>;

const Input = (props: Props) => (
  <input
    {...props}
    className="w-full text-sm font-normal border border-cyan-500 h-10 px-2 rounded focus:outline-none"
  />
);

export default memo(Input);
