import React from "react";

const Mess = () => {
  return (
    <section id="services" className="mess section p-5">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center">
          <h2>Our Mess Service</h2>
          <p>
            <span>Wholesome & Affordable</span>{" "}
            <span className="description-title">Daily Meals</span>
          </p>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-lg-5">
            <img
              src="/assets/thali.jpg"
              alt="Mess food"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-6 p-3">
            <h3>Why Choose Our Mess?</h3>
            <ul className="list-unstyled p-3">
              <li className="p-2">✅ Pure Veg & Non-Veg Options</li>
              <li className="p-2">✅ Hygienic, Freshly Cooked Meals</li>
              <li className="p-2">✅ Monthly & Weekly Plans Available</li>
              <li className="p-2">✅ Breakfast, Lunch & Dinner Timings</li>
              <li className="p-2">
                ✅ Perfect for Students, Hostels & Working Professionals
              </li>
            </ul>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card p-4 h-100">
              <h4>Monthly Veg Plan</h4>
              <p>₹2500/month</p>
              <p>Includes 3 meals per day</p>
              <a
                href="#contact"
                style={{ textDecoration: "none" }}
                className="inline-block mt-3 px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full"
              >
                Student's Choice
              </a>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4 h-100">
              <h4>Monthly Non-Veg Plan</h4>
              <p>₹3000/month</p>
              <p> non-veg dinner twice a week</p>
              <a
                href="#contact"
                style={{ textDecoration: "none" }}
                className="inline-block mt-3 px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full"
              >
                Most Popular
              </a>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4 h-100">
              <h4>Weekly Trial</h4>
              <p>₹750/week</p>
              <p>Try before you commit!</p>
              <a
                href="#contact"
                style={{ textDecoration: "none" }}
                className="inline-block mt-3 px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full"
              >
                Try Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mess;
