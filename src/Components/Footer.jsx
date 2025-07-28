import React from "react";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="bg-[#1e1e22] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start space-x-4">
            <span className="text-red-600 text-2xl mt-1">
              <i className="bi bi-geo-alt"></i>
            </span>
            <div>
              <h4 className="text-lg font-bold">Address</h4>
              <p className="text-sm">
                4, Hingna Rd, Amar Nagar, Wanadongri
                <br /> Maharashtra 440010
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="text-red-600 text-2xl mt-1">
              <i className="bi bi-telephone"></i>
            </span>
            <div>
              <h4 className="text-lg font-bold">Contact</h4>
              <p className="text-sm">
                <strong>Phone:</strong> (+91)07709611178
                <br />
                <strong>Email:</strong> shivaskitchen@example.com
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="text-red-600 text-2xl mt-1">
              <i className="bi bi-clock"></i>
            </span>
            <div>
              <h4 className="text-lg font-bold">Opening Hours</h4>
              <p className="text-sm">
                <strong>Mon-Sat:</strong> 11AM - 11PM
                <br />
                <strong>Sunday:</strong> Open
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 border rounded-full flex items-center justify-center text-white hover:bg-gray-700"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 border rounded-full flex items-center justify-center text-white hover:bg-gray-700"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 border rounded-full flex items-center justify-center text-white hover:bg-gray-700"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 border rounded-full flex items-center justify-center text-white hover:bg-gray-700"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm">
          <p>
            © <span>Copyright</span> <strong className="px-1">Shiva's kitchen</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
          <div>
            Designed by{" MAD "}
            
            Distributed by{" "}
            <a className="text-red-500" >
              MAD
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
