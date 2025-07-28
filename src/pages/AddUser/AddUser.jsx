import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import Loader2 from "../../Components/Loaders/Loader2/Loader2";
import { useNavigate } from "react-router";

const AddUser = () => {
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [payment, setPayment] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [monthDate, setMonthDate] = useState("");
  const [messType, setMessType] = useState("");

  const navigate = useNavigate();

  const adminPresent = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const adminEmail = adminPresent ? adminPresent.email : "abc@gmail.com";

  const addUser = async () => {
    setIsLoading(true);
    const URI = import.meta.env.VITE_URI;

    try {
      if (
        !name ||
        !userEmail ||
        !isActive ||
        !startDate ||
        !phone ||
        !messType
      ) {
        toast.error("Please provide all required fields.");
        setIsLoading(false);
        return;
      }

      const userMonthDate = startDate;
      setMonthDate(userMonthDate);

      const response = await axios.post(
        `${URI}/admin/adduser`,
        {
          name,
          userEmail,
          adminEmail,
          isActive,
          startDate,
          mobile: phone,
          monthDate: userMonthDate,
          messType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.result) {
        toast.error(response.data.msg);
        setIsLoading(false);
        return;
      }

      toast.success(response.data.msg);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 mt-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white">
          <div className="w-full md:w-1/2 bg-[#ecebf2] p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-6">Add Student</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                addUser();
              }}
            >
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d9232d]"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d9232d]"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d9232d]"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d9232d] text-gray-500"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d9232d] text-gray-500"
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
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#d9232d] text-white font-semibold rounded py-2 hover:bg-[#b81e26] transition flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 /> : "ADD STUDENT"}
              </button>
            </form>
          </div>

          <ToastContainer />

          <div className="w-full md:w-1/2 bg-gradient-to-br from-[#d9232d] to-[#c01623] text-white p-8 flex flex-col justify-center items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              alt="Kitchen Icon"
              className="w-24 h-24 mb-4 opacity-90"
            />
            <h2 className="text-2xl font-bold mb-2">
              Welcome to Shiva's Kitchen!
            </h2>
            <p className="text-sm">Add users to manage the mess efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
