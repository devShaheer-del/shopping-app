import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function ContactComp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:8080/contact/contact";
      const response = await axios.post(url, { name, email, subject, message });

      if (response.data.message) {
        toast.success(response.data.message);
      }

      // Clear the form after successful submission
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      // Handle API errors
      if (error.response) {
        toast.error(error.response.data.error || "Something went wrong!");
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="container py-4">
        <div className="row text-center mb-4">
          <div className="col">
            <h1 className="display-4 fw-bold">Contact Us</h1>
            <p className="lead">We’d love to hear from you! Please fill out the form below, and our team will get in touch with you shortly.</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-light rounded-3">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {/* Name Input */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="name"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="email"
                      placeholder="Your email address"
                      required
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="form-control"
                      id="subject"
                      placeholder="Subject of your message"
                      required
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      id="message"
                      rows="4"
                      placeholder="Your message here"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary btn-lg w-100">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactComp;