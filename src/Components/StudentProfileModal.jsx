import React, { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import PaymentSection from "../pages/Profile/PaymentSection";
import Loader from "../Components/Loaders/Loader2/Loader2";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Loader3 from "../Components/Loaders/Loader3/Loader3";
import Loader4 from "./Loaders/Loader4/Loader4";

const StudentProfileModal = ({ user, onClose }) => {
  const navigate = useNavigate();

  // State variables
  const [payment, setPayment] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.userEmail || "");
  const [editPhone, setEditPhone] = useState(user?.mobile || "");
  const [editMonthDate, setMonthDate] = useState(user?.monthDate || "");
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [editLoader, setEditLoader] = useState(false);
  const [messType, setMessType] = useState(user?.messType || "");

  // Admin details
  const admin = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const adminEmail = admin?.email || "";
  const userEmail = user?.userEmail || "";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteConfirm = async () => {
    const URI = import.meta.env.VITE_URI;
    setDeleteLoader(true);
    try {
      const response = await axios.delete(`${URI}/admin/deleteuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          userEmail: userEmail,
          adminEmail: adminEmail,
        },
      });
      toast.success("Account deleted Successful!");
      setTimeout(() => {
        navigate("/dashboard");
        onClose();
        setDeleteLoader(false);
      }, 2000);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`${error.message}`);
      setDeleteLoader(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false); // close modal when user cancels
  };
  // Utility functions
  const getDaysFromStartOfMonth = (dateStr) => {
    if (!dateStr) return 0;
    const [day, month, year] = dateStr.split("/");
    const targetDate = new Date(`${year}-${month}-${day}`);
    const startOfMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      1
    );
    const diffTime = targetDate - startOfMonth;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const formatToDayMonth = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} of ${month}`;
  };

  // Payment handling
  const handlePayment = async () => {
    setIsLoading(true);
    const URI = import.meta.env.VITE_URI;

    if (!payment || !paymentDate || !userEmail || !adminEmail) {
      toast.error("Please fill in all fields correctly.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${URI}/admin/makepayment`,
        { amount: payment, paymentDate, isDone, adminEmail, userEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.msg);
      setTimeout(() => {
        navigate("/dashboard");
        onClose();
      }, 600);
    } catch (err) {
      toast.error("Payment failed. Try again.");
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    const URI = import.meta.env.VITE_URI;
    setEditLoader(true);
    try {
      if (
        !editEmail ||
        !editMonthDate ||
        !editName ||
        !editPhone ||
        !adminEmail
      ) {
        toast.error("Provide Data!");
        setEditLoader(false);
        return;
      }

      const response = await axios.put(
        `${URI}/admin/edituser`,
        {
          name: editName,
          mobile: editPhone,
          monthDate: editMonthDate,
          adminEmail: adminEmail,
          userEmail: userEmail,
          newEmail: editEmail,
          messType: messType,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(response.data.msg);

      navigate("/dashboard");
      onClose();
      setEditLoader(false);
    } catch (error) {
      toast.error(`${error.message}`);
      setEditLoader(false);
    }
  };

  const getDaysSinceMonthDate = (monthDateStr) => {
    if (!monthDateStr) return 0;

    // Correct format: YYYY-MM-DD
    const [year, month, day] = monthDateStr.split("-").map(Number);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create the payment date using current year and month from today
    let paymentDate = new Date(today.getFullYear(), today.getMonth(), day);
    paymentDate.setHours(0, 0, 0, 0);

    // If today's date is earlier in the month than the payment day, subtract one month
    if (today < paymentDate) {
      paymentDate.setMonth(paymentDate.getMonth() - 1);
    }

    const diffInTime = today - paymentDate;
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    return diffInDays;
  };

  const daysPassed = getDaysSinceMonthDate(user?.monthDate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-black relative w-full max-w-4xl mx-4 my-8">
        {/* Close & Edit Buttons */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-2xl"
        >
          &times;
        </button>
        <button
          onClick={() => setIsEditOpen(true)}
          className="absolute top-2 left-2 text-gray-600 hover:text-black text-sm flex items-center gap-1"
        >
          <i className="fas fa-pen" /> Edit
        </button>

        {/* Profile Overview */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center mb-2">
            <div className="w-15">
              {deleteLoader ? (
                <>
                  <Loader4 />
                </>
              ) : (
                <>
                  {" "}
                  <div className="w-15 h-15 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white text-lg">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </>
              )}
            </div>
            <div>
              {deleteLoader ? (
                <>
                  <Loader3 />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                </>
              )}
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  user?.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user?.isActive ? "Active User" : "Inactive User"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#d9232d] text-white font-semibold px-4 py-1 rounded hover:bg-[#b81e26] transition m-4"
            >
              Delete User!
            </button>
            <ConfirmDeleteModal
              isOpen={isModalOpen}
              onClose={handleDeleteCancel}
              onConfirm={handleDeleteConfirm}
            />
            {daysPassed < 25 && (
              <p className="text-green-700 text-sm">
                Payment completed for this month!
              </p>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-700">
          <div>
            <strong>Start Date:</strong> {user?.startDate}
          </div>
          <div>
            <strong>Phone:</strong> {user?.mobile}
          </div>
          <div>
            <strong>Email:</strong> {user?.userEmail}
          </div>
        </div>

        {/* Payment Info */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3 text-sm text-gray-700">
          <div>
            <strong>No of Days:</strong>
            <span
              className={`font-semibold ml-1 ${
                daysPassed >= 25 ? "text-red-600" : "text-green-700"
              }`}
            >
              {daysPassed}
            </span>
          </div>
          <div>
            <strong>Month Date:</strong> {formatToDayMonth(user?.monthDate)}
          </div>
          <div>
            <span
              className={`px-5 mt-10 py-1 rounded-full text-xs font-semibold ${
                user.messType === "Veg"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.messType}
            </span>
          </div>
        </div>

        {/* Payment Form */}

        <form className="space-y-3 mt-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Payment Amount"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d9232d] text-sm"
              required
            />
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d9232d] text-sm"
              required
            />
          </div>
          {!isLoading ? (
            <button
              onClick={handlePayment}
              className="w-full bg-[#d9232d] text-white font-semibold py-2 rounded hover:bg-[#b81e26] transition"
            >
              Make Payment
            </button>
          ) : (
            <>
              <Loader />
            </>
          )}
        </form>

        {/* Payment History */}
        <div className="mt-6 max-h-64 overflow-y-auto border border-gray-200 rounded p-3">
          <PaymentSection payments={user?.payments} />
        </div>

        {/* Edit Modal */}
        {isEditOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                onClick={() => setIsEditOpen(false)}
                className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              <h3 className="text-center text-xl font-semibold text-[#862627] mb-4">
                Edit User
              </h3>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#862627]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#862627]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#862627]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Month Date
                  </label>
                  <input
                    type="date"
                    value={editMonthDate}
                    onChange={(e) => setMonthDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#862627]"
                    required
                  />
                </div>

                <select
                  className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d9232d] bg-transparent text-gray-500 cursor-pointer"
                  required
                  value={messType}
                  onChange={(e) => setMessType(e.target.value)}
                >
                  <option value="" disabled>
                    Select Mess Type
                  </option>
                  <option value="Veg">Veg</option>
                  <option value="Non Veg">Non Veg</option>
                </select>

                <div className="flex justify-end gap-3 pt-4">
                  {editLoader ? (
                    <>
                      <Loader />
                    </>
                  ) : (
                    <>
                      {" "}
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                        onClick={() => setIsEditOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#862627] hover:bg-[#6c1f1f] text-white rounded text-sm"
                        onClick={handleEdit}
                      >
                        Save Changes
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default StudentProfileModal;
