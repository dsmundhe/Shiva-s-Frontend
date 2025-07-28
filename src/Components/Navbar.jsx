import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = localStorage.getItem("user");

  // Simulate login status (replace with real auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <style>
        {`
          a {
            text-decoration: none;
            color: inherit;
          }

          @keyframes toggleRedWhiteA {
            0%, 100% {
              background-color: #d9232d;
              color: white;
              border: 1px solid #d9232d;
            }
            50% {
              background-color: white;
              color: #d9232d;
              border: 1px solid #d9232d;
            }
          }

          @keyframes toggleRedWhiteB {
            0%, 100% {
              background-color: white;
              color: #d9232d;
              border: 1px solid #d9232d;
            }
            50% {
              background-color: #d9232d;
              color: white;
              border: 1px solid #d9232d;
            }
          }

          .animate-toggle-a {
            animation: toggleRedWhiteA 4s ease-in-out infinite;
          }

          .animate-toggle-b {
            animation: toggleRedWhiteB 4s ease-in-out infinite;
          }
        `}
      </style>

      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center text-[26px] font-extrabold text-gray-900">
            Shiva's Kitchen
            <span className="text-red-600 text-[32px] leading-none ml-1">
              .
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="font-medium text-[16px] text-[#6c757d] hover:text-[#212529]"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium text-[16px] text-[#6c757d] hover:text-[#212529]"
          >
            About
          </Link>
          <Link
            to="/testimonials"
            className="font-medium text-[16px] text-[#6c757d] hover:text-[#212529]"
          >
            Testimonials
          </Link>
          <Link
            to="/services"
            className="font-medium text-[16px] text-[#6c757d] hover:text-[#212529]"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="font-medium text-[16px] text-[#6c757d] hover:text-[#212529]"
          >
            Contact
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-0">
          {user != undefined ? (
            <>
              <Link
                to="/dashboard"
                className="animate-toggle-a text-[15px] font-medium px-6 py-2 rounded-l-full"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="animate-toggle-b text-[15px] font-medium px-6 py-2 rounded-r-full"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="animate-toggle-a text-[15px] font-medium px-6 py-2 rounded-l-full"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="animate-toggle-b text-[15px] font-medium px-6 py-2 rounded-r-full"
              >
                SignUp
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden" onClick={toggleMobileMenu}>
          <i className="bi bi-list text-3xl text-gray-800 cursor-pointer"></i>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-3 flex-col items-center text-center">
          <Link
            to="/"
            className="block font-medium text-[#6c757d] hover:text-[#212529]"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block font-medium text-[#6c757d] hover:text-[#212529]"
          >
            About
          </Link>
          <Link
            to="/testimonials"
            className="block font-medium text-[#6c757d] hover:text-[#212529]"
          >
            Testimonials
          </Link>
          <Link
            to="/services"
            className="block font-medium text-[#6c757d] hover:text-[#212529]"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="block font-medium text-[#6c757d] hover:text-[#212529]"
          >
            Contact
          </Link>

          <div className="flex justify-center gap-0">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="animate-toggle-a text-[15px] font-medium px-6 py-2 rounded-l-full"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="animate-toggle-b text-[15px] font-medium px-6 py-2 rounded-r-full"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="animate-toggle-a text-[15px] font-medium px-6 py-2 rounded-l-full"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="animate-toggle-b text-[15px] font-medium px-6 py-2 rounded-r-full"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
