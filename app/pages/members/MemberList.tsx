import React from "react";
import Table from "../../components/Table";

interface Member {
  mem_id: string;
  mem_name: string;
  mem_email: string;
}

interface MemberListProps {
  members: Member[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
  return <Table columns={["mem_id", "mem_name", "mem_email"]} data={members} />;
};

export default MemberList;
