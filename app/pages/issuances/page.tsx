"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import IssuanceList from "./IssuanceList";
import IssuanceForm from "./IssuanceForm";
import { getIssuances } from "../../services/issuances";
import { ArrowLeft } from "lucide-react";

const IssuancesPage = () => {
  const router = useRouter();
  const [issuances, setIssuances] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchIssuances = async () => {
    const data = await getIssuances();
    setIssuances(data);
  };

  useEffect(() => {
    fetchIssuances();
  }, []);

  const handleAddIssuance = (newIssuance: any) => {
    setIssuances((prev) => [...prev, newIssuance]);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-5 h-5 cursor-pointer" />
        {/* <h1 className="text-2xl font-bold">Issuances</h1> */}
      </button>

      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Issuance
        </button>
      </div>

      <IssuanceList issuances={issuances} />

      {showModal && (
        <IssuanceForm
          onSuccess={handleAddIssuance}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default IssuancesPage;
