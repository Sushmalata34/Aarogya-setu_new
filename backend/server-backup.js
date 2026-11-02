// require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// require("dotenv").config();

// const User = require("./models/User");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Home API
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Aarogya Setu Backend is running!"
//   });
// });

// // Health check API
// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     server: "running",
//     database:
//       mongoose.connection.readyState === 1
//         ? "connected"
//         : "not connected"
//   });
// });

// // REGISTER API
// app.post("/api/register", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email and password are required"
//       });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must contain at least 6 characters"
//       });
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     const existingUser = await User.findOne({
//       email: normalizedEmail
//     });

//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already registered. Please login."
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const user = await User.create({
//       name: name.trim(),
//       email: normalizedEmail,
//       password: hashedPassword,
//       role: role || "customer"
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Registration successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error("Register error:", error.message);

//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already registered"
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Registration failed"
//     });
//   }
// });

// // LOGIN API
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required"
//       });
//     }

//     const user = await User.findOne({
//       email: email.trim().toLowerCase()
//     }).select("+password");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password"
//       });
//     }

//     const passwordMatches = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!passwordMatches) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error("Login error:", error.message);

//     return res.status(500).json({
//       success: false,
//       message: "Login failed"
//     });
//   }
// });

// // Start server after MongoDB connects
// async function startServer() {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error("MONGO_URI is missing from .env");
//     }

//     console.log("Connecting to MongoDB...");

//     await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 10000
//     });

//     console.log("MongoDB connected successfully!");

//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Server startup failed:", error.message);
//     process.exit(1);
//   }
// }

// startServer();
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB स्वतः 'aarogya_setu' बना देगा
mongoose.connect('mongodb://127.0.0.1:27017/aarogya_setu')
  .then(() => console.log('✅ Local MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ Connection Error:', err));

app.get('/', (req, res) => {
  res.send('Aarogya Setu API Connected');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});