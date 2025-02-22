import React from "react";

interface Issuance {
  issuance_id: string;
  book_id: string;
  issued_by: string;
  issuance_date: string;
  target_return_date: string;
  issuance_status: string;
}

interface IssuanceListProps {
  issuances: Issuance[];
}

const IssuanceList: React.FC<IssuanceListProps> = ({ issuances }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow-md rounded">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Issuance ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Book ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Issued By
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Issuance Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Target Return Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {issuances.map((iss) => (
            <tr key={iss.issuance_id}>
              <td className="px-6 py-4 whitespace-nowrap">{iss.issuance_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{iss.book_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{iss.issued_by}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(iss.issuance_date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(iss.target_return_date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {iss.issuance_status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuanceList;
