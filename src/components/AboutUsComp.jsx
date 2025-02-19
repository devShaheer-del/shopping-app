import React from 'react'
import Team from '../assets/images/team.png';
import Logo from '../assets/images/logo.png';
function AboutUsComp() {
  return (
    <>
    
    <div className="container py-5">
        <div className="row text-center mb-5">
          <div className="col">
            <h1 className="display-4 fw-bold">About Us</h1>
            <p className="lead">Learn more about our mission, values, and the team behind our store.</p>
          </div>
        </div>

        {/* Section for Company Overview */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <img src={Logo} className="img-fluid rounded-3" alt="Our Company" />
          </div>
          <div className="col-lg-6">
            <h2 className="fw-bold">Our Company</h2>
            <p>
              At [Your Company Name], we are passionate about providing our customers with the best online shopping experience. 
              We offer a wide range of products, from fashion to electronics, and we strive to make every purchase convenient, safe, and hassle-free.
            </p>
          </div>
        </div>

        {/* Section for Team Introduction */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 order-lg-2">
            <img src={Team} className="img-fluid rounded-3" alt="Our Team" />
          </div>
          <div className="col-lg-6 order-lg-1">
            <h2 className="fw-bold">Meet Our Team</h2>
            <p>
              Our team consists of dedicated professionals who are committed to delivering exceptional products and customer service. 
              From product selection to shipping, we work tirelessly to make your shopping experience unforgettable.
            </p>
          </div>
        </div>

        {/* Section for Mission Statement */}
        <div className="row text-center">
          <div className="col">
            <h3 className="fw-bold">Our Mission</h3>
            <p>
              Our mission is to be the leading online retailer, providing high-quality products, unbeatable prices, and top-notch customer service. 
              We aim to inspire trust and make shopping enjoyable for everyone.
            </p>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default AboutUsComp
