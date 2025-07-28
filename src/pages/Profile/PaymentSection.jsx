import React, { useState } from "react";

const PaymentSection = ({ payments = [] }) => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPayments =
    activeTab === "all"
      ? payments
      : payments.filter((p) => p.status === activeTab);

  return (
    <div className="bg-white rounded-md shadow-sm p-3 mb-4">
      {/* Tabs */}
      <div className="flex text-xs font-medium text-gray-500 border-b border-gray-200 mb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-2 py-1 ${
            activeTab === "all"
              ? "text-blue-600 border-b-2 border-blue-500"
              : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-2 py-1 ${
            activeTab === "pending"
              ? "text-yellow-600 border-b-2 border-yellow-500"
              : ""
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-2 py-1 ${
            activeTab === "completed"
              ? "text-green-600 border-b-2 border-green-500"
              : ""
          }`}
        >
          Completed
        </button>
      </div>

      {/* Ultra-Compact Payment Entries */}
      <div className="space-y-0.5">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((pay) => (
            <div
              key={pay.paymentDate + pay.amount}
              className="flex items-center justify-between text-xs text-gray-600 px-2 py-1 border rounded border-gray-100 bg-gray-50"
            >
              <span>{pay.paymentDate}</span>
              <span className="font-medium text-gray-800">₹{pay.amount}</span>
              <span
                className={`${
                  pay.isDone ? "text-green-500" : "text-yellow-500"
                } font-semibold`}
              >
                {pay.isDone ? "✔" : "●"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400">No payments to display.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentSection;
