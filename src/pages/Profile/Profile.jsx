
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import CustomCalendar from "../Profile/CustomCalendar";
import Loader1 from "../../Components/Loaders/Loader1/Loader1";

const Profile = () => {
  const [markedDates, setMarkedDates] = useState({});
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const admin = {
    name: user ? user.name : "xyz",
    email: user ? user.email : "xyz@gmail.com",
    phone: user ? user.mobile : "+91 0000000000",
    adminId: user ? user._id : "ABC123",
    username: user ? user.name.split(" ")[0] : "xyz",
    profilePic: "",
  };

  const [loggingOut, setLogout] = useState(false);

  const handleLogout = async () => {
    setLogout(true);
    setTimeout(() => {
      localStorage.clear("user");
      localStorage.clear("token");
      navigate("/login");
      setLogout(false);
    }, 500);
  };

  return (
    <div>
      <Navbar />

      {user ? (
        <>
          <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-8 mt-22">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Profile
              </h1>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-[#d32a32ff] hover:bg-[#bb2027] text-white px-4 py-2 rounded-md text-sm shadow"
              >
                ← Back to Dashboard
              </button>
            </div>

            {/* Profile Info + Calendar */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Profile Card with Edit Button */}
              <div className="bg-white rounded-lg shadow p-6 relative border-2 border-[#8B0000]">
                <div className="absolute top-4 right-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow"
                    onClick={() => {
                      navigate("/edit-profile");
                    }}
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="flex flex-col items-center text-center">
                  <img
                    src="assets/profile.png"
                    alt="Admin"
                    className="w-28 h-28 mb-4 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <h2 className="text-2xl font-semibold mb-4 text-[#8B0000]">
                    Personal Information
                  </h2>
                  <div className="w-full text-left text-gray-800 text-sm sm:text-base space-y-2 ml-20">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Full Name:</span>
                      <span>{admin.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Email:</span>
                      <span>{admin.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Mobile:</span>
                      <span>{admin.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Admin ID:</span>
                      <span>{admin.adminId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Username:</span>
                      <span>{admin.username}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    {!loggingOut ? (
                      <button
                        className="bg-[#d32a32ff] hover:bg-[#bb2027] text-white font-medium px-5 py-2 rounded-md shadow-sm transition duration-200"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    ) : (
                      <button className="bg-[#f98888] hover:bg-[#ea7a80] text-white font-medium px-5 py-2 rounded-md shadow-sm transition duration-200">
                        Logging out...
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-white rounded-lg shadow p-4">
                <CustomCalendar
                  markedDates={markedDates}
                  setMarkedDates={setMarkedDates}
                />
              </div>
            </div>

            {/* Stats */}
 
          </div>
        </>
      ) : (
        <>
          <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
              <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <div className="flex justify-center items-center m-5">
                  <Loader1 />{" "}
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Please Log In
                </h1>
                <p className="text-gray-600 mb-6">
                  You need to be logged in to view the admin profile.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-[#d32a32ff] hover:bg-[#bb2027] text-white px-6 py-2 rounded text-sm shadow "
                >
                  Go to Login / Signup
                </button>
              </div>
            </div>
          </>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Profile;