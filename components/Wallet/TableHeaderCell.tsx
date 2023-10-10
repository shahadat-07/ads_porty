import React, { ReactNode } from 'react';

interface TableHeaderCellProps {
    children: ReactNode;
  }

const TableHeaderCell = ({ children }: TableHeaderCellProps) => {
  return (
    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
      {children}
    </th>
  );
}

export default TableHeaderCell
