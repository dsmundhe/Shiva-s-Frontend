import React from "react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="hero d-flex align-items-center bg-light mt-30"
      style={{ padding: "60px 0" }}
    >
      <div className="container">
        <div className="row gy-4 justify-content-between align-items-center">
          {/* Left content */}
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h1
              className="display-4 fw-bold"
              style={{ fontFamily: "'Amatic SC', cursive" }}
            >
              Enjoy Your Healthy <br /> Delicious Food
            </h1>
            <p className="text-muted mt-3">
              Welcome to a place where taste meets tradition — enjoy freshly
              prepared dishes, warm hospitality, and the true essence of good
              food every single day.
            </p>
            <div className="d-flex align-items-center mt-4">
              <a
                href="#services"
                className="btn btn-danger btn-lg rounded-pill me-3 px-4 py-2"
              >
                Join Mess <i class="fa-solid fa-arrow-right"></i>
              </a>
              <a
                href="https://www.zomato.com/india"
                className="btn d-flex align-items-center text-dark"
              >
                <i className="fa-solid fa-bowl-rice fs-4 text-danger me-2"></i>

                <span className="fw-semibold">Order Now</span>
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="col-lg-5 text-center text-lg-end">
            <img
              src="/assets/hero-img.png"
              className="img-fluid"
              alt="Hero Food"
              style={{ maxHeight: "400px", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
