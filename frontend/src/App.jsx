
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Community from "./pages/Community";
import WorkEarn from "./pages/WorkEarn";
import Contact from "./pages/Contact";

import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSOS, setShowSOS] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const [notice, setNotice] = useState("");

  function navigateTo(page) {
    setCurrentPage(page);
    setShowLogin(false);
    setShowRegister(false);
    setShowSOS(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  async function handleLogin(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      setNotice("Logging in...");

      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please check your details.");
      }

      setNotice(data.message || "Login successful!");
    } catch (error) {
      setNotice(error.message || "Backend se connection nahi ho pa raha hai.");
    }
  }

  
async function handleRegister(event) {
  event.preventDefault();

  const { name, email, password, role } = registerData;

  if (!name.trim() || !email.trim() || !password) {
    setNotice("Please enter your name, email and password.");
    return;
  }

  if (password.length < 6) {
    setNotice("Password must contain at least 6 characters.");
    return;
  }

  try {
    setNotice("Creating your account...");

    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: role === "User" ? "customer" : role,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed.");
    }

    setNotice(
      data.message || "Registration successful! Your account has been saved."
    );

    setRegisterData({
      name: "",
      email: "",
      password: "",
      role: "User",
    });
  } catch (error) {
    setNotice(error.message || "Backend connection failed.");
  }
}



  function renderPage() {
    switch (currentPage) {
      case "about":
        return <About onNavigate={navigateTo} />;

      case "services":
        return <Services onNavigate={navigateTo} />;

      case "community":
        return <Community onNavigate={navigateTo} />;

      case "work":
        return <WorkEarn />;

      case "contact":
        return <Contact />;

      case "home":
      default:
        return (
          <Home
            onNavigate={navigateTo}
            onRegister={() => {
              setNotice("");
              setShowRegister(true);
            }}
          />
        );
    }
  }

  return (
    <div className="app">
      <Navbar
        activePage={currentPage}
        onNavigate={navigateTo}
        onLogin={() => {
          setNotice("");
          setShowLogin(true);
        }}
        onRegister={() => {
          setNotice("");
          setShowRegister(true);
        }}
        onSOS={() => setShowSOS(true)}
      />

      <main>{renderPage()}</main>

      <Footer onNavigate={navigateTo} />

      <Modal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        title="Welcome Back"
      >
        <form className="account-form" onSubmit={handleLogin}>
          <p>Login to your Aarogya Setu account.</p>

          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={loginData.email}
            onChange={(event) =>
              setLoginData({
                ...loginData,
                email: event.target.value,
              })
            }
            placeholder="Enter your email"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={(event) =>
              setLoginData({
                ...loginData,
                password: event.target.value,
              })
            }
            placeholder="Enter your password"
            required
          />

          <button className="account-submit" type="submit">
            Login
          </button>

          {notice && <p className="account-notice">{notice}</p>}

          <p className="account-switch">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setNotice("");
                setShowLogin(false);
                setShowRegister(true);
              }}
            >
              Register
            </button>
          </p>
        </form>
      </Modal>

      <Modal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        title="Create Your Account"
      >
        <form className="account-form" onSubmit={handleRegister}>
          <p>Join our caring and supportive community.</p>

          <label htmlFor="register-name">Full Name</label>
          <input
            id="register-name"
            type="text"
            value={registerData.name}
            onChange={(event) =>
              setRegisterData({
                ...registerData,
                name: event.target.value,
              })
            }
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="register-email">Email Address</label>
          <input
            id="register-email"
            type="email"
            value={registerData.email}
            onChange={(event) =>
              setRegisterData({
                ...registerData,
                email: event.target.value,
              })
            }
            placeholder="Enter your email"
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            minLength={6}
            value={registerData.password}
            onChange={(event) =>
              setRegisterData({
                ...registerData,
                password: event.target.value,
              })
            }
            placeholder="Create a password"
            required
          />

          <label htmlFor="register-role">I want to join as</label>
          <select
            id="register-role"
            value={registerData.role}
            onChange={(event) =>
              setRegisterData({
                ...registerData,
                role: event.target.value,
              })
            }
          >
            <option value="User">User / Service Seeker</option>
            <option value="Caregiver">Caregiver</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Job Seeker">Job Seeker</option>
          </select>

          <button className="account-submit" type="submit">
            Create Account
          </button>

          {notice && <p className="account-notice">{notice}</p>}

          <p className="account-switch">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => {
                setNotice("");
                setShowRegister(false);
                setShowLogin(true);
              }}
            >
              Login
            </button>
          </p>
        </form>
      </Modal>

      <Modal
        isOpen={showSOS}
        onClose={() => setShowSOS(false)}
        title="Emergency SOS"
      >
        <div className="sos-content">
          <div className="sos-symbol">!</div>
          <h3>Do you need emergency assistance?</h3>
          <p>
            If you are in immediate danger, contact your local emergency
            services directly. This demo button does not send an SOS alert
            or share your location.
          </p>
          <button
            className="account-submit"
            type="button"
            onClick={() => setShowSOS(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
