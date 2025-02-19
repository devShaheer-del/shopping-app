import React from 'react';
import FreeShipping from '../assets/images/free_shipping.png'
import Customer from '../assets/images/Customer_Care.png';
import CashBack from '../assets/images/chashback.png';
function ServicesComp() {
  return (
    <>
      <div className="container py-5">
        <div className="row text-center mb-5">
          <div className="col">
            <h1 className="display-4 fw-bold">Our Services</h1>
            <p className="lead">Explore the range of services we offer to enhance your shopping experience.</p>
          </div>
        </div>

        {/* Services Cards */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Service 1 */}
          <div className="col">
            <div className="card h-100 shadow-lg border-light rounded-3">
              <img src={FreeShipping} className="card-img-top" alt="Free Shipping" />
              <div className="card-body">
                <h5 className="card-title">Free Shipping</h5>
                <p className="card-text">
                  Enjoy free shipping on all orders over $50! Fast and reliable delivery right to your door.
                </p>
              </div>
              <div className="card-footer text-center">
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="col">
            <div className="card h-100 shadow-lg border-light rounded-3">
              <img src={Customer} className="card-img-top" alt="Customer Support" />
              <div className="card-body">
                <h5 className="card-title">24/7 Customer Support</h5>
                <p className="card-text">
                  Our friendly support team is available around the clock to help you with any questions or issues.
                </p>
              </div>
              <div className="card-footer text-center">
                <a href="#" className="btn btn-primary">Contact Us</a>
              </div>
            </div>
          </div>

          {/* Service 3 */}
          <div className="col">
            <div className="card h-100 shadow-lg border-light rounded-3">
              <img src={CashBack} className="card-img-top" alt="Easy Returns" />
              <div className="card-body">
                <h5 className="card-title">Easy Returns</h5>
                <p className="card-text">
                  Hassle-free returns within 30 days. If you’re not satisfied, we’ll make it right.
                </p>
              </div>
              <div className="card-footer text-center">
                <a href="#" className="btn btn-primary">Start a Return</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesComp;
