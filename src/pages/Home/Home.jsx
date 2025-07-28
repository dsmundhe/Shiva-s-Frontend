import React from "react";
import Navbar from "../../Components/Navbar";
import Hero from "./Hero";
import About from "../About/About";
import TestimonialsPage from "../Testimonials/TestimonialsPage";
import Footer from "../../Components/Footer";
import Contact from "../Contact/Contact";
import Mess from "../Mess/Mess";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TestimonialsPage />
        <Mess />
        <Contact />
      </main>
      <Footer />

     
    </>
  );
};

export default Home;
