
import { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notice, setNotice] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setNotice(
      `Thank you, ${formData.name}! Your message is ready. Backend connection is not enabled yet.`
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <span className="contact-tag">WE ARE HERE FOR YOU</span>
        <h1>Contact Us</h1>
        <p>
          Have a question or suggestion? Contact the Aarogya Setu team.
          We are here to help you.
        </p>
      </section>

      <section className="contact-layout">
        <div className="contact-info">
          <h2>Let's Connect</h2>
          <p>
            Your feedback helps us build a more accessible and caring
            community for everyone.
          </p>

          <div className="contact-info-card">
            <span className="contact-icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>aarogyasetu@example.com</p>
            </div>
          </div>

          <div className="contact-info-card">
            <span className="contact-icon">🤝</span>
            <div>
              <h3>Our Mission</h3>
              <p>Care, connection, accessibility and support.</p>
            </div>
          </div>

          <div className="contact-help-note">
            <h3>Need emergency help?</h3>
            <p>
              For an immediate emergency, contact your local emergency
              services directly. This demo website does not send SOS alerts.
            </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>
          <p>Fill in the details below.</p>

          <label htmlFor="contact-name">Full Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="What is your message about?"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact-message">Your Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button className="contact-submit" type="submit">
            Send Message →
          </button>

          {notice && (
            <p className="contact-notice" role="status">
              {notice}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
