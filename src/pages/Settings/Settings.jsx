import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import Loader2 from "../../Components/Loaders/Loader2/Loader2";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = JSON.parse(localStorage.getItem("token"));
  const [isLoaidng, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const email = user.email || "";
  const password = user.password || "";

  const [currentPassword, setCurrentPassword] = useState(password);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    const URI = import.meta.env.VITE_URI;
    setIsLoading(true);

    try {
      const response = await axios.put(
        `${URI}/admin/changepassword`,
        {
          password: password,
          newPassword: newPassword,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.result) {
        toast.error(`${response.data.msg}`);
        setIsLoading(false);
        return;
      }
      toast.success("Password changed successfully!");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setCurrentPassword(response.data.user.password);
      setNewPassword("");
      setConfirmPassword("");
      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      toast.error(`${error.message}`);
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!forgotEmail) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success(`Password reset link sent to ${forgotEmail}`);
    setForgotEmail("");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-4 py-8 pt-20 mt-5">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm shadow"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Change Password Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Change Password
              </h3>

              {/* Current Password */}
              <div className="mb-4 relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <span
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      current: !prev.current,
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  <i
                    className={`fa-solid ${
                      showPassword.current ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </span>
              </div>

              {/* New Password */}
              <div className="mb-4 relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <span
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      new: !prev.new,
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  <i
                    className={`fa-solid ${
                      showPassword.new ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </span>
              </div>

              {/* Confirm Password */}
              <div className="mb-4 relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <span
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  <i
                    className={`fa-solid ${
                      showPassword.confirm ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </span>
              </div>

              {isLoaidng ? (
                <>
                  <div className="flex items-center justify-center">
                    <Loader2 />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <button
                    onClick={handlePasswordChange}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded shadow"
                  >
                    Change Password
                  </button>
                </>
              )}
            </div>

            {/* Forgot Password Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Forgot Password
              </h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button
                onClick={handleForgotPassword}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded shadow"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Settings;
