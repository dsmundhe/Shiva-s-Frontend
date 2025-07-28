import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendMailForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!email) {
      toast.warn("Please enter at least one email address.");
      return;
    }

    const emailList = email
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e);

    if (emailList.length === 0) {
      toast.error("Please enter valid email(s).");
      return;
    }

    const emailData = {
      email: emailList,
      subject,
      html: `<p>${message}</p>`,
    };

    try {
      setIsSending(true);
      const response = await fetch(
        "https://emailsender-mq6m.onrender.com/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(`✅ ${result.message}`);
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        toast.error(`❌ Failed: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error sending email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <div
        id="email"
        className="bg-white p-5 rounded shadow mt-18 max-w-2xl mx-auto mb-10"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Send Email</h2>

        <input
          type="text"
          placeholder="Enter email(s), separated by commas"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-1 rounded"
        />
        <small className="text-gray-500 block mb-4">
          Example: user1@example.com, user2@example.com
        </small>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full mb-4 rounded h-32"
        />

        <button
          onClick={handleSend}
          disabled={isSending}
          className={`px-4 py-2 rounded text-white transition-colors ${
            isSending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#862627] hover:bg-[#6e1f21]"
          }`}
        >
          {isSending ? "Sending..." : "Send Email"}
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SendMailForm;
