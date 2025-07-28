import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../../Components/Loaders/Loader2/Loader2";

const NotifyStudents = () => {
  const [recipientType, setRecipientType] = useState("all");
  const [selectedStudentEmail, setSelectedStudentEmail] = useState("");
  const [subject, setSubject] = useState();
  const [body, setBody] = useState();
  const [messageText, setMessageText] = useState("");
  const [email, setEmail] = useState();
  const [selectedStudentEmails, setSelectedStudentEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const studentEmails = [
    {
      name: "ABC",
      userEmail: "student1@example.com",
    },
  ];
  const [users, setUsers] = useState(studentEmails);

  const adminPresent = JSON.parse(localStorage.getItem("user"));
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

  useEffect(() => {
    getUsers();
  }, []);

  const navigate = useNavigate();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); overflow: hidden;">
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #2f80ed, #56ccf2); padding: 40px;">
              <img src="https://cdn-icons-png.flaticon.com/512/1046/1046866.png" width="64" height="64" alt="Mess Logo" style="display: block; margin-bottom: 20px;" />
              <h1 style="color: #ffffff; font-size: 26px; margin: 0;">Welcome to Shiva's Mess</h1>
              <p style="color: #e0f0ff; font-size: 14px; margin: 8px 0 0;">Your personalized mess management platform</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 17px; color: #333; margin: 0 0 20px;">
                Hello,
              </p>
              <p style="font-size: 15px; color: #555; line-height: 1.6;">
                You’ve received a new notification from <strong>Shiva’s Mess Management System</strong>.
              </p>

              <table style="width: 100%; margin: 30px 0; border-collapse: collapse;">
                <tr>
                  <td style="font-size: 14px; color: #888; padding-bottom: 8px;">Subject</td>
                  <td style="font-size: 15px; color: #333; font-weight: 600;">${subject}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #888; padding: 10px 0;">Message</td>
                  <td style="font-size: 15px; color: #333;">${body}</td>
                </tr>
              </table>

              <div style="text-align: center; margin: 35px 0;">
                <a href="#" style="background-color: #2f80ed; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 15px; font-weight: 500; border-radius: 8px; display: inline-block;">
                  Go to Dashboard
                </a>
              </div>

              <p style="font-size: 14px; color: #999; text-align: center; margin: 20px 0 0;">
                Need help? Email us at 
                <a href="mailto:support@shivasmess.com" style="color: #2f80ed;">support@shivasmess.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; background-color: #f9f9f9; padding: 18px; font-size: 12px; color: #999;">
              &copy; ${new Date().getFullYear()} Shiva's Mess Management System<br/>
              123 Mess Road, Cityville, India
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const emailURI = import.meta.env.VITE_URI_EMAIL_SEND;

    const recipients =
      recipientType === "all"
        ? users.map((user) => user.userEmail)
        : selectedStudentEmails;

    const emails = recipients.join(", ");
    setEmail(emails);

    if (!emails || !body || !subject) {
      toast.error("Provide Data!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(emailURI, {
        email: emails,
        subject,
        html: htmlContent,
      });

      toast.success("Mail delivered successful!");
      setIsLoading(false);

      navigate("/notifyStudents");
      setBody();
    } catch (error) {
      toast.error(`${error.message}`);
      setIsLoading(false);
    }

    // Continue sending email logic here...
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8 mt-25">
        <div className="flex justify-end mb-4">
          {/* <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#d32a32ff] hover:bg-[#bb2027] text-white px-4 py-2 rounded-md text-sm shadow"
          >
            ← Back to Dashboard
          </button> */}
        </div>

        <div className="max-w-2xl mx-auto bg-white shadow-lg border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
            Notify Students
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipient Type */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Send To
              </label>
              <select
                value={recipientType}
                onChange={(e) => setRecipientType(e.target.value)}
                className="w-full border border-red-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="all">All Students</option>
                <option value="specific">Specific Student</option>
              </select>
            </div>

            {/* Specific Student Email Input */}
            {recipientType === "specific" && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-red-700 mb-2">
                  Select Student(s)
                </label>

                {/* 🔍 Search Bar */}
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full mb-3 px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                />

                {/* Select All / Deselect All */}
                <div className="mb-2 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      const visibleUsers = users.filter(
                        (user) =>
                          user.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          user.userEmail
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      );
                      const visibleEmails = visibleUsers.map(
                        (user) => user.userEmail
                      );

                      if (
                        visibleEmails.every((email) =>
                          selectedStudentEmails.includes(email)
                        )
                      ) {
                        setSelectedStudentEmails((prev) =>
                          prev.filter((email) => !visibleEmails.includes(email))
                        );
                      } else {
                        setSelectedStudentEmails((prev) => [
                          ...new Set([...prev, ...visibleEmails]),
                        ]);
                      }
                    }}
                    className="text-sm text-red-600 font-medium hover:underline hover:text-red-700 transition"
                  >
                    Select/Deselect All Shown
                  </button>
                </div>

                {/* Student List */}
                <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto bg-white border border-red-200 rounded-lg p-3 shadow-inner">
                  {users
                    .filter(
                      (user) =>
                        user.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        user.userEmail
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .map((user) => (
                      <label
                        key={user._id}
                        className="flex justify-between items-center bg-red-50 hover:bg-red-100 border border-red-200 rounded-md px-4 py-1 cursor-pointer transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            value={user.userEmail}
                            checked={selectedStudentEmails.includes(
                              user.userEmail
                            )}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (e.target.checked) {
                                setSelectedStudentEmails((prev) => [
                                  ...prev,
                                  value,
                                ]);
                              } else {
                                setSelectedStudentEmails((prev) =>
                                  prev.filter((email) => email !== value)
                                );
                              }
                            }}
                            className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded transition-all duration-150 focus:ring-2 focus:ring-offset-1 focus:ring-red-400"
                          />
                          <div className="flex items-center justify-center  gap-2">
                            <p className="text-sm font-semibold text-gray-800 ">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.userEmail}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                </div>
              </div>
            )}

            {/* Subject Dropdown */}
            <div className="mb-2">
              <label className="block text-black mb-1 font-medium">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option className="hover:bg-red-600">
                  Notify About Holiday
                </option>
                <option className="hover:bg-red-600">
                  Fees Payment Reminder
                </option>
                <option className="hover:bg-red-600">Others</option>
              </select>
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="5"
                className="w-full border border-red-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              {isLoading ? (
                <div className="inline-block">
                  <Loader />
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                  Send Notification
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />

      <Footer />
    </div>
  );
};

export default NotifyStudents;
