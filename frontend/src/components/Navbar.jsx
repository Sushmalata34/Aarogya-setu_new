
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar({
  currentPage,
  onNavigate,
  onLogin,
  onRegister,
  onSOS,
  isLoggedIn,
  user,
  onLogout
}) {
  const [showProfile, setShowProfile] = useState(false);

  const pages = [
    { label: "Home", value: "home" },
    { label: "About", value: "about" },
    { label: "Services", value: "services" },
    { label: "Community", value: "community" },
    { label: "Work & Earn", value: "work" },
    { label: "Contact", value: "contact" }
  ];

  return (
    <header className="as-navbar">

      <div className="as-navbar-top">

        {/* BRAND LOGO */}
        <div
          className="as-brand"
          onClick={() => onNavigate("Home")}
        >
          <div className="as-logo">💙</div>

          <div>
            <h2>Aarogya Setu</h2>
            <p>Care • Connection • Support</p>
          </div>
        </div>

        {/* LOGIN / REGISTER / PROFILE */}
        <div className="as-auth">

          {!isLoggedIn ? (
            <>
              <button
                className="as-login"
                onClick={onLogin}
              >
                Login
              </button>

              <button
                className="as-register"
                onClick={onRegister}
              >
                Register
              </button>
            </>
          ) : (
            <div className="as-profile-wrapper">

              <button
                className="as-profile-button"
                onClick={() => setShowProfile(!showProfile)}
              >
                <span className="as-user-icon">♙</span>
                My Profile
                <span>⌄</span>
              </button>

              {showProfile && (
                <div className="as-profile-panel">

                  <div className="as-profile-heading">
                    <div className="as-profile-avatar">♙</div>
                    <h3>My Profile</h3>
                  </div>

                  <div className="as-profile-content">

                    <h3>Welcome to Aarogya Setu</h3>

                    <div className="as-profile-field">
                      <label>Full Name</label>
                      <strong>
                        {user?.name || "User Name"}
                      </strong>
                    </div>

                    <div className="as-profile-field">
                      <label>Email Address</label>
                      <strong>
                        {user?.email || "Not available"}
                      </strong>
                    </div>

                    <div className="as-profile-field">
                      <label>Account Type</label>
                      <strong>
                        {user?.role || "User"}
                      </strong>
                    </div>

                  </div>

                  {/* LOGOUT */}
                  <button
                    className="as-profile-logout"
                    onClick={() => {
                      setShowProfile(false);
                      onLogout();
                    }}
                  >
                    <span>↪</span> Logout
                  </button>

                </div>
              )}
            </div>
          )}

          {/* SOS BUTTON */}
          <button
            className="as-sos"
            onClick={onSOS}
          >
            SOS
          </button>

        </div>
      </div>

      {/* NAVIGATION MENU */}
      <nav className="as-navigation">

        {pages.map((page) => (
          <button
            key={page.value}
            className={
              currentPage === page.value
                ? "as-menu-link active"
                : "as-menu-link"
            }
            onClick={() => {
              setShowProfile(false);
              onNavigate(page.label);
            }}
          >
            {page.label}
          </button>
        ))}

      </nav>

    </header>
  );
}

export default Navbar;
