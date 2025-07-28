import React from "react";
import Navbar from "../../Components/Navbar";
import Hero from "../Home/Hero";
import About from "../About/About";
import Testimonials from "../Testimonials/Testimonials";
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
        <Testimonials />
        <Mess />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
