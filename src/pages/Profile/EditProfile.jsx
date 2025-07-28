import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import ConfirmDeleteModal from "../../Components/ConfirmDeleteModal";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Loader2 from "../../Components/Loaders/Loader2/Loader2";

const EditProfile = () => {
  const URI = import.meta.env.VITE_URI;

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoding, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = JSON.parse(localStorage.getItem("token"));

  // Separate states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  useEffect(() => {
    setName(user.name || "");
    setEmail(user.email || "");
    setPhone(user.mobile || "");
    setPassword(user.password || "");
  }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!name || !phone || !password || !email) {
      toast.error("Provide Data!");
      return;
    }
    try {
      const response = await axios.put(
        `${URI}/admin/update`,
        {
          email: email,
          name: name,
          password: password,
          mobile: phone,
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

      await localStorage.setItem("user", JSON.stringify(response.data.user));
      await localStorage.setItem("token", JSON.stringify(response.data.token));

      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      toast.error(`${error.message}`);
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!user.email || !user.name) {
      toast.error("User data missing!");
      return;
    }

    try {
      await axios.delete(`${URI}/admin/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          adminEmail: user.email,
          name: user.name,
        },
      });

      toast.success("Account deleted successfully!");
      localStorage.clear();
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to delete account.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-4 pt-20 pb-10 mt-10">
        <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Edit Profile
            </h2>
            <button
              onClick={() => navigate("/settings")}
              className="text-gray-600 hover:text-red-600"
              title="Settings"
            >
              <i className="fa-solid fa-gear text-lg"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password Field with Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-sm"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash" />
                ) : (
                  <i className="fa-solid fa-eye" />
                )}
              </span>
            </div>

            {isLoding ? (
              <></>
            ) : (
              <>
                {" "}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded shadow"
                >
                  Save Changes
                </button>
              </>
            )}
          </form>

          {isLoding ? (
            <div className="flex items-center justify-center mt-4">
              <Loader2 />
            </div>
          ) : (
            <>
              {" "}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-5">
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded"
                >
                  Logout
                </button>
                <button
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
      <ToastContainer />
      <Footer />
    </>
  );
};

export default EditProfile;
