import React from "react";
import MapSection from "./MapSection";

const Contact = () => {
  return (
    <section id="contact" className="contact section p-8 mb-5 mt-5">
      <div className="mt-5">
        <div className="section-title text-center mb-10" data-aos="fade-up">
          <p className="text-5xl font-bold font-[Amatic_SC]">
            <span className="text-black">Need Help?</span>{" "}
            <span className="text-red-600">Contact Us</span>
          </p>
        </div>

        <MapSection />
      </div>
      <div id="contact" className="container" data-aos="fade-up">
        {/* Section Title */}
        <div className="section-title text-center">
          <h2>
            <b>Contact</b>
          </h2>
          <p>
            <span>Need Help?</span>{" "}
            <span className="description-title">Contact Us</span>
          </p>
        </div>

        <div className="row gy-4 mt-4">
          {/* Contact Info Boxes */}
          <div className="col-lg-4">
            <div className="info-container d-flex flex-column align-items-start justify-content-center">
              <div className="info-item d-flex">
                <i
                  className="bi bi-geo-alt d-flex align-items-center justify-content-center bg-danger text-white rounded-circle me-3"
                  style={{ width: "44px", height: "44px", fontSize: "20px" }}
                ></i>

                <div>
                  <h4>Location:</h4>
                  <p>
                    Shiva's Kitchen Family Restaurant,
                    <br />
                    Nagpur, Maharashtra 440025
                  </p>
                </div>
              </div>

              <div className="info-item d-flex mt-4">
                <i
                  className="bi bi-geo-alt d-flex align-items-center justify-content-center bg-danger text-white rounded-circle me-3"
                  style={{ width: "44px", height: "44px", fontSize: "20px" }}
                ></i>

                <div>
                  <h4>Email:</h4>
                  <p>info@shivaskitchen.com</p>
                </div>
              </div>

              <div className="info-item d-flex mt-4">
                <i
                  className="bi bi-geo-alt d-flex align-items-center justify-content-center bg-danger text-white rounded-circle me-3"
                  style={{ width: "44px", height: "44px", fontSize: "20px" }}
                ></i>

                <div>
                  <h4>Call:</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <form className="php-email-form">
              <div className="row gy-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    name="message"
                    className="form-control"
                    rows="6"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-danger px-4 py-2 mt-3"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
