"use client"

import React, { useEffect, useState } from "react";
import IssuanceList from "./IssuanceList";
import { getIssuances } from "../../services/issuances";

const IssuancesPage = () => {
  const [issuances, setIssuances] = useState([]);

  useEffect(() => {
    getIssuances().then(setIssuances);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issuances</h1>
      <IssuanceList issuances={issuances} />
    </div>
  );
};

export default IssuancesPage;
