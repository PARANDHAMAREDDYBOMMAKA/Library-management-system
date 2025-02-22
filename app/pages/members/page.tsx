"use client";

import React, { useEffect, useState } from "react";
import MemberList from "./MemberList";
import MemberForm from "./MemberForm";
import { getMembers } from "../../services/members";

const MembersPage = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchMembers = async () => {
    const fetchedMembers = await getMembers();
    setMembers(fetchedMembers);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = (newMember: any) => {
    setMembers((prev) => [...prev, newMember]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Members</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Member
        </button>
      </div>
      <MemberList members={members} />
      {showModal && (
        <MemberForm
          onSuccess={handleAddMember}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MembersPage;
