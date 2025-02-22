"use client";

import React, { useState } from "react";

interface IssuanceFormProps {
  onSuccess: (newIssuance: {
    issuance_id: string;
    book_id: string;
    issuance_status: string;
  }) => void;
  onClose: () => void;
}

const IssuanceForm: React.FC<IssuanceFormProps> = ({ onSuccess, onClose }) => {
  const [bookId, setBookId] = useState("");
  const [issuanceMember, setIssuanceMember] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [targetReturnDate, setTargetReturnDate] = useState("");
  const [issuanceStatus, setIssuanceStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/issuances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_id: Number(bookId),
          issuance_member: Number(issuanceMember),
          issued_by: issuedBy,
          target_return_date: targetReturnDate,
          issuance_status: issuanceStatus,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Something went wrong");
      } else {
        onSuccess(data);
        onClose();
      }
    } catch (err) {
      setError("Failed to add issuance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Issuance</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Book ID</label>
            <input
              type="text"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Issuance Member
            </label>
            <input
              type="text"
              value={issuanceMember}
              onChange={(e) => setIssuanceMember(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Issued By</label>
            <input
              type="text"
              value={issuedBy}
              onChange={(e) => setIssuedBy(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Target Return Date
            </label>
            <input
              type="date"
              value={targetReturnDate}
              onChange={(e) => setTargetReturnDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Issuance Status
            </label>
            <select
              value={issuanceStatus}
              onChange={(e) => setIssuanceStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Status</option>
              <option value="Issued">Issued</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Adding..." : "Add Issuance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssuanceForm;
