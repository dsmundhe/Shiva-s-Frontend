import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Contact from "../Contact/Contact";

function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="mt-28">
        <Contact />
      </div>

      <Footer />
    </>
  );
}

export default ContactPage;
