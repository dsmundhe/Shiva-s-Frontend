import React from "react";

const MapSection = () => {
  return (
    <section id="map" className="map-section p-10">
      <div className="container-fluid px-0">
        <iframe
          title="Shiva's Kitchen Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d373.3376!2d78.97726!3d21.09729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd495f7e8d84cd3%3A0x95fee19822031ea5!2sShiva's%20kitchen%20family%20restaurant!5e0!3m2!1sen!2sin!4v1719746645440!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
