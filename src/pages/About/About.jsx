import React from "react";

const About = () => {
  return (
    <div id="about" className="container  p-5">
      <div className="row align-items-center">
        <h1 className="text-center mb-4">About Us</h1>
        <div className="col-5">
          <img
            src="/assets/about-2.jpg"
            alt="Delicious food"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-1"></div>
        <div className="col-6">
          <h3>Welcome to Shiva's Kitchen</h3>
          <p>
            At Shiva's Kitchen, we believe food is not just a meal — it's an
            experience. With recipes rooted in tradition and ingredients sourced
            locally, we aim to serve dishes that warm your soul and excite your
            taste buds.
          </p>
          <p>
            Whether you're in the mood for a quick bite or a cozy dinner with
            loved ones, our chefs are here to make every plate memorable. Come
            for the flavors, stay for the love.
          </p>
          {/* <a
            href="#book-a-table"
            className="btn btn-danger btn-lg rounded-pill me-3 px-4 py-2"
          >
            Mess Facility Available
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default About;
