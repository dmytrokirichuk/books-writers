import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;

const Th = ({ children }: Props) => (
  <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase">
    {children}
  </th>
);

const Td = ({ children }: Props) => (
  <td className="py-4 px-6 text-sm font-medium text-cyan-500 whitespace-nowrap">{children}</td>
);

const THead = ({ children }: Props) => (
  <thead className="bg-cyan-500 w-full">
    <tr>{children}</tr>
  </thead>
);

const TRow = ({ children }: Props) => <tr className="bg-white">{children}</tr>;

const TBody = ({ children }: Props) => (
  <tbody className="divide-y divide-cyan-500">{children}</tbody>
);

const Table = ({ children }: Props) => (
  <div className="w-full mx-auto">
    <div className="flex flex-col">
      <div className="overflow-x-auto shadow-md sm:rounded-md border border-cyan-500">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full table-fixed">{children}</table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Object.assign(Table, {
  THead,
  TBody,
  TRow,
  Th,
  Td,
});
