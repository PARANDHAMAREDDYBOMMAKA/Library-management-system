import React, { useEffect, useState } from "react";
import MemberList from "./MemberList";
import { getMembers } from "../../services/members";

const MembersPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers().then(setMembers);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <MemberList members={members} />
    </div>
  );
};

export default MembersPage;
