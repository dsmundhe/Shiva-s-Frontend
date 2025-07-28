import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import Navbar from "../../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader2 from "../../Components/Loaders/Loader2/Loader2";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const URI = import.meta.env.VITE_URI;
    setIsLoading(true);
    if (!email || !password) {
      toast.error("Please Provide data!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${URI}/admin/login`, {
        email,
        password,
      });
      if (response.data.result == false) {
        toast.error(`${response.data.msg}`);
        setIsLoading(false);
        return;
      }
      await localStorage.setItem("user", JSON.stringify(response.data.user));
      await localStorage.setItem("token", JSON.stringify(response.data.token));
      toast.success(`${response.data.msg}`);
      navigate("/");
    } catch (error) {
      toast.error(`${error.message}`);
      setIsLoading(false);
    }
  };
  const diffToast = () => {
    toast.success("Login Successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden mt-15">
          {/* Left Side: Login Form */}
          <div className="w-full md:w-1/2 bg-[#ecebf2] p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

            {/* Social Icons */}
            <div className="flex justify-center gap-4 mb-6 mt-1">
              <button className="w-12 h-12 flex items-center justify-center rounded border-2 border-[#d9232d] text-[#d9232d] text-xl transition hover:bg-[#d9232d] hover:text-white">
                <FaFacebookF />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded border-2 border-[#d9232d] text-[#d9232d] text-xl transition hover:bg-[#d9232d] hover:text-white">
                <FaGoogle />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded border-2 border-[#d9232d] text-[#d9232d] text-xl transition hover:bg-[#d9232d] hover:text-white">
                <FaXTwitter />
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mb-6">
              or use your account
            </p>

            {/* Login Form */}
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="bg-white p-1 rounded-lg border border-gray-300">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d9232d] bg-transparent placeholder-gray-500"
                  required
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="relative bg-white p-1 rounded-lg border border-gray-300">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d9232d] bg-transparent placeholder-gray-500"
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

              <div className="text-right mt-2 text-sm text-red-500 hover:text-red-600 font-medium underline underline-offset-2 transition-colors duration-200">
                <Link
                  to="/forgotpassword"
                  className="text-sm text-red-500 hover:text-red-600 font-medium underline underline-offset-2 transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 />
                </div>
              ) : (
                <>
                  {" "}
                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#d9232d] text-white font-semibold py-2 rounded border  hover:bg-[#b81e26] transition"
                    onClick={handleLogin}
                  >
                    LOGIN
                  </button>
                </>
              )}
            </form>
          </div>
          <ToastContainer />

          {/* Right Side: Welcome Box */}
          <div className="w-full md:w-1/2 bg-[#d9232d] text-white p-10 flex flex-col justify-center items-center text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="mb-6">
              To keep connected with us, please login with your personal info
            </p>
            <Link
              to="/signup"
              className="border border-white text-white px-6 py-2 rounded-full font-medium hover:bg-black hover:text-[#d9232d] transition"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
