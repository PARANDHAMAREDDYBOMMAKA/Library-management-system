import React from "react";

type TableProps = {
  columns: string[];
  data: any[];
};

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col, index) => (
            <th key={index} className="border p-2 text-left">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="border p-2">
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
