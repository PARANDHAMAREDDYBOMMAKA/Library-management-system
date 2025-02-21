import React from "react";
import Table from "../../components/Table";

interface Issuance {
  issuance_id: string;
  book_id: string;
  issuance_status: string;
}

interface IssuanceListProps {
  issuances: Issuance[];
}

const IssuanceList: React.FC<IssuanceListProps> = ({ issuances }) => {
  return <Table columns={["issuance_id", "book_id", "issuance_status"]} data={issuances} />;
};

export default IssuanceList;
