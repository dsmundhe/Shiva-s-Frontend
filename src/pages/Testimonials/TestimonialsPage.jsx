import React from "react";
import Navbar from "../../Components/Navbar";
import Testimonials from "../Testimonials/Testimonials";
import Footer from "../../Components/Footer";

function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <div className="mt-22">
        <Testimonials />
      </div>
      <Footer />
    </>
  );
}

export default TestimonialsPage;
