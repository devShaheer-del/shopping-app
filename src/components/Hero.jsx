import React from "react";
import background_image from "../assets/images/hero.png";
import { useAuth } from "../../context/auth";


function Hero() {

  const { auth } = useAuth();

  return (
    <>
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src={background_image}
            className="d-block mx-lg-auto img-fluid"
            alt="E-commerce Store"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Your One-Stop Shop for Everything!
          </h1>
          <p className="lead">
            Explore the best deals on fashion, electronics, home goods, and
            more. Our store offers a wide variety of top-quality products at
            unbeatable prices, all delivered right to your door. Shop with
            confidence and find what you love today!
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">
              Start Shopping
            </button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Debugging Auth */}
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>
  );
}

export default Hero;
