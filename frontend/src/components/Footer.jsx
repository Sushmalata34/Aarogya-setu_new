import "../styles/Footer.css";
function Footer({ onNavigate = () => {} }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <h2>✚ Aarogya Setu</h2>
          <p>
            Care, connection and support for elderly people,
            persons with disabilities and their caregivers.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <button onClick={() => onNavigate("home")}>Home</button>
          <button onClick={() => onNavigate("about")}>About Us</button>
          <button onClick={() => onNavigate("services")}>Services</button>
          <button onClick={() => onNavigate("community")}>
            Community
          </button>
          <button onClick={() => onNavigate("work")}>Work & Earn</button>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: aarogyasetu@example.com</p>
          <p>We are here to support you.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Aarogya Setu. All rights reserved.</p>
        <p>Made with care for everyone 💙</p>
      </div>
    </footer>
  );
}

export default Footer;
