import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import Navbar from "../../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader2 from "../../Components/Loaders/Loader2/Loader2";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaidng, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    const URI = import.meta.env.VITE_URI;
    setIsLoading(true);
    try {
      const response = await axios.post(`${URI}/admin/signup`, {
        name,
        email,
        mobile: phone,
        password,
      });

      if (response.data.result == false) {
        toast.error(`${response.data.msg}`);
        setIsLoading(false);
        return;
      }

      toast.success(`${response.data.msg}`);

      navigate("/login");
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };
  const diffToast = () => {
    toast.success("SignUp Successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 mt-14">
        <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden mt-1">
          {/* Left Side: Signup Form */}
          <div className="w-full md:w-1/2 bg-[#ecebf2] p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-6">
              Create Account
            </h2>

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
              or use your email for registration
            </p>

            {/* Signup Form */}
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="bg-white p-1 rounded-lg border border-gray-300">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d9232d] bg-transparent placeholder-gray-500"
                  name="name"
                  required
                  autoComplete="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="bg-white p-1 rounded-lg border border-gray-300">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d9232d] bg-transparent placeholder-gray-500"
                  autoComplete="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="bg-white p-1 rounded-lg border border-gray-300">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d9232d] bg-transparent placeholder-gray-500"
                  autoComplete="phone"
                  name="phone"
                  required
                  onChange={(e) => {
                    setPhone(e.target.value);
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
                    type="submit"
                    className="w-full mt-2 bg-[#d9232d] text-white font-semibold py-2 rounded border  hover:bg-[#b81e26] transition"
                  >
                    SIGN UP
                  </button>
                </>
              )}
              <p className="text-sm text-center mt-4 text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#d9232d] font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
          <ToastContainer />

          {/* Right Side: Welcome Prompt */}
          <div className="w-full md:w-1/2 bg-[#d9232d] text-white p-10 flex flex-col justify-center items-center text-center">
            <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
            <p className="mb-6">
              Enter your personal details and start your journey with us
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

export default Signup;
