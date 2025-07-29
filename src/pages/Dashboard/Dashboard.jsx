import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import StudentProfileModal from "../../Components/StudentProfileModal";
import axios from "axios";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  let paymentDone = 0;
  let paymentPending = 0;

  const navigate = useNavigate();
  const adminPresent = JSON.parse(localStorage.getItem("user")) || {};
  const token = JSON.parse(localStorage.getItem("token"));

  const handleClick = () => {
    navigate("/AddUser");
  };

  const URI = import.meta.env.VITE_URI;
  const getUsers = async () => {
    try {
      if (!adminPresent.email || !token) {
        console.error("Admin email and token are required");
        return;
      }
      const adminEmail = adminPresent.email;

      const response = await axios.get(`${URI}/admin/getusers`, {
        params: { adminEmail },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.users) {
        setUsers(response.data.users);
      } else {
        console.warn("Message:", response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const getInitials = (name) => {
    if (!name) return "X"; // Fallback initials
    const names = name.trim().split(" ").filter(Boolean); // Remove extra spaces

    if (names.length === 1) {
      return names[0][0].toUpperCase(); // First letter of the single name
    }

    return (names[0][0] + names[1][0]).toUpperCase(); // First letter of first and second word
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function getDaysFromStartOfMonth(dateStr) {
    // Expects dateStr in "dd/mm/yyyy" format
    const [day, month, year] = dateStr.split("/");

    // Create target date object
    const targetDate = new Date(`${year}-${month}-${day}`);
    const firstOfMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      1
    );

    // Calculate time difference in milliseconds
    const diffTime = targetDate - firstOfMonth;

    // Convert to days and add 1 to include the first day
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
  }

  const handleNotifyClick = () => {
    navigate("/notifyStudents");
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

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Initial check
    handleResize();

    // Fetch users when component mounts
    getUsers();

    // Set up resize listener
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  users.forEach((user) => {
    const userDate = new Date(user.monthDate);
    userDate.setHours(0, 0, 0, 0);

    if (userDate <= today) {
      paymentDone += 1;
    } else {
      paymentPending += 1;
    }
  });

  return (
    <div className="relative min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-40 transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } bg-[#d9232d] text-white rounded-tr-lg rounded-br-lg`}
      >
        <Sidebar />
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-50 text-2xl text-gray-800 lg:hidden"
      >
        {showSidebar ? (
          <i className="fa-solid fa-arrow-left"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </button>

      {/* Main content */}
      <main
        className={`transition-all duration-300 p-6 ${
          isDesktop && showSidebar ? "ml-64" : ""
        }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {isDesktop && (
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-2xl font-bold text-gray-700 focus:outline-none z-50"
            >
              {showSidebar ? (
                <i className="fa-solid fa-arrow-left"></i>
              ) : (
                <i className="fa-solid fa-bars"></i>
              )}
            </button>
          )}

          {/* Search */}
          <div className="flex-1 bg-white rounded-full shadow px-4 py-2 flex items-center min-w-0">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0"
            />
            <button
              onClick={() => console.log("Searching:", searchQuery)}
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center ml-2"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                padding: 0,
              }}
            >
              <i className="fas fa-search text-sm"></i>
            </button>
          </div>

          {adminPresent ? (
            <>
              {" "}
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                onClick={handleNotifyClick}
              >
                <i className="fa-solid fa-bell"></i> Notify Students        
              </button>
            </>
          ) : (
            <></>
          )}

          {/* Admin Name and Initials */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">
              {adminPresent ? adminPresent.name : "abc xyz"}
            </span>
            <div
              onClick={() => navigate("/profile")}
              style={{ backgroundColor: "#d9232d", cursor: "pointer" }}
              className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold"
            >
              {getInitials(adminPresent ? adminPresent.name : "abc xyz")}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 text-purple-600 w-10 h-10 flex items-center justify-center rounded-full">
                <i className="fa-solid fa-users"></i>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {adminPresent ? users.length : "00"}
                </p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full">
                <i className="fa-solid fa-user-group"></i>
              </div>
              <div>
                <p className="text-lg font-semibold">{users.length || 0}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-pink-100 text-pink-600 w-10 h-10 flex items-center justify-center rounded-full">
                <i className="fa-solid fa-arrow-down"></i>
              </div>
              <div>
                <p className="text-lg font-semibold">{paymentDone}</p>
                <p className="text-sm text-gray-600">Completed Payments!</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-cyan-100 text-cyan-600 w-10 h-10 flex items-center justify-center rounded-full">
                <i className="fa-solid fa-hourglass-half"></i>
              </div>
              <div>
                <p className="text-lg font-semibold">{paymentPending}</p>
                <p className="text-sm text-gray-600">Payments Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Table Section */}
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              List of Students
            </h2>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
              onClick={getUsers}
            >
              Get Students
            </button>
            <button
              onClick={handleClick}
              style={{ backgroundColor: "#EB0139" }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
            >
              <i className="fa-solid fa-user-plus"></i> Add Student
            </button>
          </div>

          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Info</th>
                <th className="p-2">Status</th>
                <th className="p-2">No OF Days</th>
                <th className="p-2">Mess Type</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {adminPresent ? (
                <>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center font-bold">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="font-semibold mt-1 mb-0">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="p-2">
                        {user.startDate}
                        <br />
                        {user.mobile}
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            user.isActive
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td
                        className={
                          getDaysSinceMonthDate(user.monthDate) >= 25
                            ? "p-2 text-red-500 font-bold"
                            : "p-2"
                        }
                      >
                        30/{getDaysSinceMonthDate(user.monthDate)}
                      </td>

                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.messType === "Veg"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.messType}
                        </span>
                      </td>

                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenModal(true);
                          }}
                          style={{ backgroundColor: "#EB0139" }}
                          className="text-white px-3 py-1 rounded text-sm m-1"
                        >
                          View
                        </button>
                        {/* <i className="fa-solid fa-eye"></i> */}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <></>
              )}
            </tbody>
          </table>
          {!adminPresent ? (
            <div className="flex flex-col items-center justify-center px-4 py-10 sm:py-16 md:py-20">
              <h1 className="text-2xl sm:text-3xl font-bold text-red-600 text-center">
                No Users Found
              </h1>
              <p className="text-sm sm:text-base text-gray-500 text-center mt-2 max-w-md">
                Please make sure valid data exists for the provided admin email
                or try again later.
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </main>

      {/* Modal */}
      {openModal && selectedUser && (
        <StudentProfileModal
          user={selectedUser}
          onClose={() => {
            setOpenModal(false);
            setSelectedUser(null);
            getUsers();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
