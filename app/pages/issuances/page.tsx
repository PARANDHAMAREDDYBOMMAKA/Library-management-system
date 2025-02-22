"use client";

import React, { useEffect, useState } from "react";
import IssuanceList from "./IssuanceList";
import IssuanceForm from "./IssuanceForm";
import { getIssuances } from "../../services/issuances";

const IssuancesPage = () => {
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Issuances</h1>
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
