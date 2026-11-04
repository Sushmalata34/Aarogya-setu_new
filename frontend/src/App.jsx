
import { useState, useRef, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EmergencySOS from "./components/EmergencySOS";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Community from "./pages/Community";
import WorkEarn from "./pages/WorkEarn";
import Contact from "./pages/Contact";

import "./App.css";
import "./styles/Modal.css";

function App() {

  // PAGE STATE
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || "home"
  );

  // MODAL STATE
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSOS, setShowSOS] = useState(false);

  // USER STATE
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(
      localStorage.getItem("token") &&
      localStorage.getItem("user")
    );
  });

  // FORM DATA
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  // NOTIFICATION TIMER
  const noticeTimer = useRef(null);

  // SHOW SUCCESS MESSAGE AND AUTO HIDE AFTER 1 SECOND
  const showSuccessNotice = (message) => {

    if (noticeTimer.current) {
      clearTimeout(noticeTimer.current);
    }

    setNotice(message);

    noticeTimer.current = setTimeout(() => {
      setNotice("");
      noticeTimer.current = null;
    }, 1000);

  };

  // CLEAR TIMER ON UNMOUNT
  useEffect(() => {
    return () => {
      if (noticeTimer.current) {
        clearTimeout(noticeTimer.current);
      }
    };
  }, []);

  // NAVIGATION
  const navigateTo = (page) => {

    const pageMap = {
      home: "home",
      about: "about",
      services: "services",
      community: "community",
      work: "work",
      "work & earn": "work",
      contact: "contact"
    };

    const selectedPage = pageMap[String(page).trim().toLowerCase()];

    if (!selectedPage) return;

    setCurrentPage(selectedPage);
    localStorage.setItem("currentPage", selectedPage);

    setShowLogin(false);
    setShowRegister(false);
    setShowSOS(false);

    setNotice("");

    if (noticeTimer.current) {
      clearTimeout(noticeTimer.current);
      noticeTimer.current = null;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // OPEN LOGIN
  const openLogin = () => {
    setNotice("");
    setShowRegister(false);
    setShowLogin(true);
  };

  // OPEN REGISTER
  const openRegister = () => {
    setNotice("");
    setShowLogin(false);
    setShowRegister(true);
  };

  // LOGIN FUNCTION
  const handleLogin = async (e) => {

    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setNotice("");

    try {

      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: loginData.email.trim(),
            password: loginData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setNotice(data.message || "Login failed.");
        return;
      }

      const userData = data.user || data;

      const loggedInUser = {
        name:
          userData.name ||
          userData.fullName ||
          userData.username ||
          loginData.email.split("@")[0],

        email: userData.email || loginData.email.trim(),

        role: userData.role || userData.accountType || "User"
      };

      // SAVE USER AND TOKEN
      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setUser(loggedInUser);
      setIsLoggedIn(true);

      setLoginData({
        email: "",
        password: ""
      });

      setShowLogin(false);
      setShowRegister(false);

      setCurrentPage("home");
      localStorage.setItem("currentPage", "home");

      showSuccessNotice("Login successful!");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    } catch (error) {

      console.error("Login error:", error);
      setNotice("Server connection failed. Check backend.");

    } finally {
      setLoading(false);
    }
  };

  // REGISTER FUNCTION
  const handleRegister = async (e) => {

    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setNotice("");

    try {

      const response = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: registerData.name.trim(),
            email: registerData.email.trim(),
            password: registerData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setNotice(data.message || "Registration failed.");
        return;
      }

      setRegisterData({
        name: "",
        email: "",
        password: ""
      });

      setShowRegister(false);
      setShowLogin(true);

      showSuccessNotice("Registration successful! Please login.");

    } catch (error) {

      console.error("Register error:", error);
      setNotice("Server connection failed. Check backend.");

    } finally {
      setLoading(false);
    }
  };

  // LOGOUT FUNCTION
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsLoggedIn(false);

    setShowLogin(false);
    setShowRegister(false);
    setShowSOS(false);

    setCurrentPage("home");
    localStorage.setItem("currentPage", "home");

    showSuccessNotice("You have been logged out successfully.");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // PAGE RENDERING
  const renderPage = () => {

    switch (currentPage) {

      case "home":
        return (
          <Home
            onNavigate={navigateTo}
            onRegister={openRegister}
          />
        );

      case "about":
        return <About onNavigate={navigateTo} />;

      case "services":
        return <Services onNavigate={navigateTo} />;

      case "community":
        return <Community onNavigate={navigateTo} />;

      case "work":
        return <WorkEarn onNavigate={navigateTo} />;

      case "contact":
        return <Contact onNavigate={navigateTo} />;

      default:
        return (
          <Home
            onNavigate={navigateTo}
            onRegister={openRegister}
          />
        );
    }
  };

  // MAIN APP
  return (
    <div className="app">

      {/* NAVBAR */}
      <Navbar
        currentPage={
          currentPage === "work"
            ? "Work & Earn"
            : currentPage.charAt(0).toUpperCase() +
              currentPage.slice(1)
        }
        onNavigate={navigateTo}
        onLogin={openLogin}
        onRegister={openRegister}
        onSOS={() => setShowSOS(true)}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />

      {/* PROFESSIONAL NOTIFICATION */}
      {notice && !showLogin && !showRegister && (
        <div className="success-toast">

          <div className="toast-icon">
            ✓
          </div>

          <span className="toast-message">
            {notice}
          </span>

          <button
            type="button"
            className="toast-close"
            onClick={() => {

              setNotice("");

              if (noticeTimer.current) {
                clearTimeout(noticeTimer.current);
                noticeTimer.current = null;
              }

            }}
          >
            ×
          </button>

        </div>
      )}

      {/* PAGE CONTENT */}
      <main>
        {renderPage()}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={navigateTo} />

      {/* LOGIN MODAL */}
      {showLogin && (
        <div
          className="modal-overlay"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="modal-close"
              onClick={() => setShowLogin(false)}
            >
              ×
            </button>

            <h2>Welcome Back</h2>

            <form onSubmit={handleLogin}>

              <input
                type="email"
                placeholder="Enter Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value
                  })
                }
                required
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value
                  })
                }
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Login"}
              </button>

            </form>

            {notice && <p>{notice}</p>}

            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={openRegister}
              >
                Register
              </button>
            </p>

          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegister && (
        <div
          className="modal-overlay"
          onClick={() => setShowRegister(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="modal-close"
              onClick={() => setShowRegister(false)}
            >
              ×
            </button>

            <h2>Create Account</h2>

            <form onSubmit={handleRegister}>

              <input
                type="text"
                placeholder="Enter Full Name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    name: e.target.value
                  })
                }
                required
              />

              <input
                type="email"
                placeholder="Enter Email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value
                  })
                }
                required
              />

              <input
                type="password"
                placeholder="Create Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value
                  })
                }
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Register"}
              </button>

            </form>

            {notice && <p>{notice}</p>}

            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={openLogin}
              >
                Login
              </button>
            </p>

          </div>
        </div>
      )}

      {/* EMERGENCY SOS */}
      <EmergencySOS
        isOpen={showSOS}
        onClose={() => setShowSOS(false)}
      />

    </div>
  );
}

export default App;
