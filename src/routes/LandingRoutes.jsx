import React from "react";
import { Route } from "react-router-dom";

import HomePage from "../pages/Home/Home";
import AboutPage from "../pages/About/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";
import TestimonialsPage from "../pages/Testimonials/TestimonialsPage";
import ServicesPage from "../pages/Mess/ServicesPage";

const LandingRoutes = () => {
  return (
    <>
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </>
  );
};

export default LandingRoutes;
