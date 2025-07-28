import React, { use, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import Loader2 from "../../Components/Loaders/Loader2/Loader2";
import { useNavigate } from "react-router";

const AddUser = () => {
  const [name, setName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [payment, setPayment] = useState();
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState();
  const [phone, setPhone] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [monthDate, setMonthDate] = useState();
  const [messType, setMessType] = useState("Veg");

  const navigate = useNavigate();

  const adminPresent = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  // const monthDate = new Date(Date.now());
  // const formattedDate = monthDate.toISOString().split("T")[0];

  const adminEmail = adminPresent ? adminPresent.email : "abc@gmail.com";

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Registration Successful</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #f3f4f6;">
  <table style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <tr>
      <td style="background-color: #2e7d32; padding: 30px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 26px;">🎉 Registration Successful</h1>
        <p style="margin: 8px 0 0; font-size: 14px;">Welcome to Shiva's Mess Management System</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #2e7d32;">Hello <strong>${name}</strong>,</h2>
        <p style="font-size: 15px; color: #444; margin: 15px 0;">
          We're thrilled to inform you that your registration is complete.
        </p>

        <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0;"><strong>Email:</strong></td>
            <td style="padding: 8px 0;">${userEmail}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px 0;"><strong>Phone:</strong></td>
            <td style="padding: 8px 0;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Mess Type</strong></td>
            <td style="padding: 8px 0;">${messType}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px 0;"><strong>Active:</strong></td>
            <td style="padding: 8px 0;">${isActive ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Start Date:</strong></td>
            <td style="padding: 8px 0;">${startDate}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px 0;"><strong>Registered On:</strong></td>
            <td style="padding: 8px 0;">${monthDate}</td>
          </tr>
        </table>

        <p style="font-size: 15px; color: #444;">We’re excited to have you with us. If you have any questions or need assistance, feel free to reach out.</p>

        <div style="text-align: center; margin-top: 30px;">
          <a href="#" style="display: inline-block; padding: 12px 24px; background-color: #2e7d32; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">
            Visit Dashboard
          </a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f0f0f0; text-align: center; padding: 20px; font-size: 12px; color: #888;">
        &copy; ${new Date().getFullYear()} Shiva's Mess Management System<br />
        All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;

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
        toast.error("Provide data!");
        setIsLoading(false);
        return;
      }

 

      const response = await axios.post(
        `${URI}/admin/adduser`,
        {
          name,
          userEmail,
          adminEmail,
          isActive,
          startDate,
          mobile: phone,
          monthDate: startDate, // ✅ FIXED: Directly use startDate instead of state
          messType: messType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.result == false) {
        toast.error(response.data.msg);
        setIsLoading(false);
        return;
      }

      if (!response.data.result) {
        toast.error(`${response.data.msg}`);
        setIsLoading(false);
        return;
      }

      const emailURI = import.meta.env.VITE_URI_EMAIL_SEND;

      const responseEmail = await axios.post(emailURI, {
        email: userEmail,
        subject: "Registration Successful",
        html: htmlContent,
      });
      toast.success(`${response.data.msg}`);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const diffToast = () => {
    toast.success("User added successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 mt-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white">
          {/* Left Side: Form */}
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

          {/* Right Side: Illustration */}
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
