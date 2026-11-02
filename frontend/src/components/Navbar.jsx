import "../styles/Navbar.css";
function Navbar({
  activePage = "home",
  onNavigate = () => {},
  onLogin = () => {},
  onRegister = () => {},
  onSOS = () => {},
}) {
  const navItems = [
    { label: "Home", value: "home" },
    { label: "About", value: "about" },
    { label: "Services", value: "services" },
    { label: "Community", value: "community" },
    { label: "Work & Earn", value: "work" },
    { label: "Contact", value: "contact" },
  ];

  return (
    <header className="navbar">
      <button
        className="navbar-brand"
        onClick={() => onNavigate("home")}
        aria-label="Go to Home"
      >
        <span className="brand-icon">✚</span>
        <span>
          <strong>Aarogya Setu</strong>
          <small>Care • Connection • Support</small>
        </span>
      </button>

      <nav className="navbar-links" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.value}
            className={`nav-link ${
              activePage === item.value ? "active" : ""
            }`}
            onClick={() => onNavigate(item.value)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="navbar-actions">
        <button className="login-btn" onClick={onLogin}>
          Login
        </button>

        <button className="register-btn" onClick={onRegister}>
          Register
        </button>

        <button className="sos-btn" onClick={onSOS}>
          SOS
        </button>
      </div>
    </header>
  );
}

export default Navbar;
