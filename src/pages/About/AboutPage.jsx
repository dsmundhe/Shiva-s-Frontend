import React from "react";
import Navbar from "../../Components/Navbar";
import About from "../About/About";
import Footer from "../../Components/Footer";
function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="mt-28">
        <About />
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
