"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MemberList from "./MemberList";
import MemberForm from "./MemberForm";
import { getMembers } from "../../services/members";
import { ArrowLeft } from "lucide-react";

const MembersPage = () => {
  const router = useRouter();
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
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-5 h-5 cursor-pointer" />
        {/* <h1 className="text-2xl font-bold">Members</h1> */}
      </button>

      <div className="flex justify-end items-center mb-4">
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
