import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ show }) => {
  return (
    <aside
      style={{ backgroundColor: "#d32a32ff" }}
      className={`
        fixed top-0 left-0 h-full w-64 z-50 text-white
        rounded-tr-3xl rounded-br-3xl shadow-lg
        transition-transform duration-300
        ${show ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <div className="text-2xl font-bold p-6 flex items-center space-x-2">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          {" "}
          <div className="w-4 h-4 bg-white rounded-full"></div>
          <span>
            <i className="fa-solid fa-utensils"></i> Shiva's Kitchen
          </span>
        </Link>
      </div>

      <nav className="mt-6">
        <ul className="space-y-4 p-4 text-white">
          <li>
            <Link
              to="/dashboard"
              className="hover:text-purple-400"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-clipboard-list"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/AddUser"
              className="hover:text-purple-400"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-user-plus"></i> Add Students
            </Link>
          </li>
          <li>
            <Link
              to="/Home"
              className="hover:text-purple-400"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-house"></i> Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="hover:text-purple-400"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-user"></i> Profile
            </Link>
          </li>
          <li>
            <Link
              to="/notifyStudents"
              className="hover:text-purple-400"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-envelope"></i> Send Email
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="hover:text-purple-400"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-gear"></i> Settings
            </Link>
          </li>
          <li
            className="mt-10"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Link
              to="/profile"
              className="hover:text-purple-400"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default function SidebarTestWrapper() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-50 text-2xl text-black lg:hidden"
      >
        {showSidebar ? (
          <i className="fa-solid fa-arrow-left" />
        ) : (
          <i className="fa-solid fa-bars" />
        )}
      </button>

      <Sidebar show={showSidebar} />
    </div>
  );
}
