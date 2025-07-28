import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import Loader2 from "../../Components/Loaders/Loader2/Loader2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();

  const [isVarified, setIsVarified] = useState(false);

  const emailURI = import.meta.env.VITE_URI_EMAIL_SEND;

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email) {
      toast.error("Please enter your email.");
      setIsLoading(false);
      return;
    }

    const otp = generateOTP();
    setGeneratedOtp(otp);

    const subject = "OTP Verification!";
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification - Shiva's Mess</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <!-- Header -->
      <tr>
        <td style="background-color: #2563eb; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Shiva's Mess Management</h1>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding: 32px 24px;">
          <h2 style="text-align: center; color: #1f2937; margin-bottom: 20px;">Forgot Password</h2>

          <p style="font-size: 16px; color: #4b5563;">Hi <strong>${
            email.split("@")[0]
          }</strong>,</p>

          <p style="font-size: 16px; color: #4b5563; line-height: 1.5;">
            You requested to send your Data for your <strong>Shiva's Mess Management System</strong> account.
            Please use the following One-Time Password (OTP) to verify your identity:
          </p>

          <!-- OTP Display -->
          <table align="center" style="margin: 30px auto;">
            <tr>
              ${otp
                .split("")
                .map(
                  (digit) => `
                <td style="background-color: #e0f2fe; border-radius: 10px; padding: 14px 20px; font-size: 24px; font-weight: bold; color: #2563eb; border: 2px solid #2563eb; margin: 0 6px; text-align: center;">
                  ${digit}
                </td>`
                )
                .join("")}
            </tr>
          </table>

          <p style="font-size: 15px; color: #6b7280; text-align: center;">
            This OTP is valid for the next <strong>2 minutes</strong>. If it expires, please initiate another request.
          </p>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{verificationLink}}" style="display: inline-block; background-color: #ef4444; color: #ffffff; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: bold; text-decoration: none;">
              Verify Email
            </a>
          </div>

          <p style="font-size: 14px; color: #9ca3af; text-align: center;">If you didn't request a password reset, you can safely ignore this email.</p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color: #f9fafb; text-align: center; padding: 20px; font-size: 13px; color: #9ca3af;">
          &copy; 2025 Shiva's Mess Management System. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>
`;

    try {
      await axios.post(emailURI, {
        email,
        subject,
        html: htmlContent,
      });
      toast.success(`OTP sent to ${email}`);
      setIsLoading(false);
      setOtpSent(true);
    } catch (error) {
      toast.error(`Failed to send OTP: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleOtpVerify = () => {
    if (userOtp === generatedOtp) {
      toast.success("OTP verified successfully!");
      setOtpVerified(true);
      setIsVarified(true);
    } else {
      toast.error("Invalid OTP");
      setOtpVerified(false);
    }
  };

  const subject2 = "Your Data!";

  const sendMyData = async () => {
    const URI = import.meta.env.VITE_URI;
    setIsLoading(true);

    try {
      const response = await axios.get(`${URI}/admin/ispresent`, {
        params: { email },
      });

      if (!response.data.result) {
        toast.error(`${response.data.msg}`);
        setIsLoading(false);
        return;
      }

      const user = response.data.user;

      // Use directly instead of waiting for state update
      const subject2 = "Your Data!";
      await setName(user.name);
      await setEmail(user.setEmail);
      await setPassword(user.password);
      await setMobile(user.mobile);

      console.log(user);
      const htmlContent2 = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Account Recovery - Shiva's Mess Management System</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.06); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: #1e293b; padding: 28px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px;">Account Recovery</h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #cbd5e1;">Shiva's Mess Management System</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <p style="font-size: 16px; color: #111827; margin-bottom: 18px;">
                Hello <strong>${user.name}</strong>,
              </p>
              <p style="font-size: 15px; color: #374151; line-height: 1.6;">
                We received a request to recover your account. Below are your registered details for confirmation:
              </p>

              <!-- Details Table -->
              <table width="100%" cellpadding="10" cellspacing="0" style="margin-top: 24px; border-collapse: collapse; font-size: 15px; color: #1f2937;">
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="width: 30%; font-weight: 600;">Name</td>
                  <td>${user.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="font-weight: 600;">Email</td>
                  <td>${user.email}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="font-weight: 600;">Password</td>
                  <td>${user.password}</td>
                </tr>
                <tr>
                  <td style="font-weight: 600;">Mobile</td>
                  <td>${user.mobile}</td>
                </tr>
              </table>

              <!-- Warning Box -->
              <div style="margin-top: 30px; background-color: #fff7ed; padding: 18px 20px; border-left: 4px solid #f97316; border-radius: 6px;">
                <p style="margin: 0; font-size: 14px; color: #92400e;">
                  If you did not request this email, please disregard it or contact our support immediately.
                </p>
              </div>

              <!-- Contact Info -->
              <p style="font-size: 14px; color: #6b7280; margin-top: 32px;">
                Need help? Email us at 
                <a href="mailto:support@shivasmess.com" style="color: #2563eb; text-decoration: none;">support@shivasmess.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 13px; color: #6b7280;">
              &copy; ${new Date().getFullYear()} Shiva's Mess Management System. All rights reserved.<br/>
              <a href="https://www.shivasmess.com" style="color: #2563eb; text-decoration: none;">www.shivasmess.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

      await axios.post(emailURI, {
        email,
        subject: subject2,
        html: htmlContent2,
      });

      toast.success("Your data has been sent to your email!");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      {isVarified ? (
        <>
          <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-20">
            <div className="flex-col">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Send My ID and Password
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Your logic to send user data to email goes here
                }}
                className="space-y-4"
              >
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>

                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded shadow"
                  onClick={sendMyData}
                >
                  Send My Data
                </button>
              </form>
              {isLoading ? (
                <>
                  {" "}
                  <div className="flex items-center justify-center mt-5">
                    <Loader2 />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-20">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300">
              <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 tracking-wide">
                Forgot Password?
              </h2>

              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 mb-5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                  />

                  {isLoading ? (
                    <>
                      <div className="flex items-center justify-center">
                        <Loader2 />
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg shadow-md font-medium transition duration-200"
                      >
                        Send OTP
                      </button>
                    </>
                  )}
                </form>
              ) : (
                <>
                  <p className="text-gray-600 text-center mb-4 text-sm">
                    OTP sent to{" "}
                    <strong className="text-gray-800">{email}</strong>
                  </p>

                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter OTP"
                    value={userOtp}
                    onChange={(e) => setUserOtp(e.target.value)}
                    className={`w-full px-4 py-3 mb-4 rounded-lg text-sm placeholder-gray-400 border transition duration-200 focus:outline-none focus:ring-2 ${
                      otpVerified
                        ? "border-green-500 focus:ring-green-500"
                        : userOtp.length === 6
                        ? "border-red-400 focus:ring-red-500"
                        : "border-gray-300 focus:ring-red-500"
                    }`}
                  />

                  {!otpVerified && (
                    <button
                      onClick={handleOtpVerify}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg shadow-md font-medium transition duration-200"
                    >
                      Verify OTP
                    </button>
                  )}

                  {otpVerified && (
                    <button
                      className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg shadow-md font-semibold transition duration-200"
                      onClick={() => {
                        toast.success("Proceeding to reset password...");
                        // navigate or show reset form here
                      }}
                    >
                      Continue to Reset
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
