import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Mess from "./Mess";
function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="mt-28">
        <Mess />
      </div>

      <Footer />
    </>
  );
}

export default ServicesPage;
