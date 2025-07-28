import React, { useState } from "react";
import axios from "axios";


const EmailForm = ({ initialEmail = "", initialSubject = "", initialMessage = "" }) => {
  const [email, setEmail] = useState(initialEmail);
  const [subject, setSubject] = useState(initialSubject);
  const [messageText, setMessageText] = useState(initialMessage);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    const name = email
      .split("@")[0]
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/\./g, " ");

    const htmlContent = `
      <html>
        <!-- Same HTML as before -->
        <body style="...">
          ...
          <h2 style="...">Hi <span style="font-weight: bold;">${name}</span>,</h2>
          <p style="...">This mail is For Monthly Reminder!</p>
          ...
          <h3>Second Title Here</h3>
          <p>${messageText}</p>
          ...
        </body>
      </html>
    `;

    const emailURI=import.meta.env.VITE_URI_EMAIL_SEND;
    try {
      const res = await axios.post(emailURI, {
        email,
        subject,
        html: htmlContent,
      });

      if (res.data.success) {
        setFeedback(`✅ ${res.data.message}`);
      } else {
        setFeedback(`❌ ${res.data.error}`);
      }
    } catch (err) {
      setFeedback(`❌ Error: ${err.response?.data?.error || err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📧 Send a Custom Email
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recipient's email"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email subject"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows="6"
              required
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message here..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16 8 8 0 01-8-8z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              "Send Email"
            )}
          </button>
        </form>

        {feedback && (
          <p
            className={`mt-4 text-center font-medium ${
              feedback.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailForm;
