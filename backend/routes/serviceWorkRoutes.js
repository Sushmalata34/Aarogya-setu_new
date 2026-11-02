
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// 1. Service Booking Model
const ServiceBooking =
  mongoose.models.ServiceBooking ||
  mongoose.model(
    "ServiceBooking",
    new mongoose.Schema(
      {
        customerName: { type: String, required: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true },
        serviceName: { type: String, required: true },
        bookingDate: { type: String, default: "" },
        address: { type: String, required: true },
        message: { type: String, default: "" },
        status: { type: String, default: "Pending" },
      },
      { timestamps: true }
    )
  );

// 2. Job Model
const Job =
  mongoose.models.Job ||
  mongoose.model(
    "Job",
    new mongoose.Schema(
      {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        location: { type: String, default: "Remote" },
        salary: { type: String, default: "As per work" },
        jobType: { type: String, default: "Part-time" },
        skills: { type: [String], default: [] },
        active: { type: Boolean, default: true },
      },
      { timestamps: true }
    )
  );

// 3. Job Application Model
const JobApplication =
  mongoose.models.JobApplication ||
  mongoose.model(
    "JobApplication",
    new mongoose.Schema(
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
          required: true,
        },
        applicantName: { type: String, required: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true },
        skills: { type: String, default: "" },
        message: { type: String, default: "" },
        status: { type: String, default: "Received" },
      },
      { timestamps: true }
    )
  );

// 4. Get Jobs
router.get("/jobs", async (req, res) => {
  try {
    let jobs = await Job.find({ active: true }).sort({ createdAt: -1 });

    // Add sample jobs only when the jobs collection is empty
    if (jobs.length === 0) {
      await Job.insertMany([
        {
          title: "Data Entry Assistant",
          description: "Enter and organize basic data.",
          location: "Remote",
          salary: "₹5,000 - ₹8,000 / month",
          jobType: "Part-time",
          skills: ["Typing", "Basic Computer"],
        },
        {
          title: "Customer Support Assistant",
          description: "Help customers with basic questions.",
          location: "Remote",
          salary: "₹8,000 - ₹12,000 / month",
          jobType: "Part-time",
          skills: ["Communication", "Computer"],
        },
      ]);

      jobs = await Job.find({ active: true }).sort({ createdAt: -1 });
    }

    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load jobs.",
    });
  }
});

// 5. Save Service Booking
router.post("/bookings", async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      serviceName,
      bookingDate,
      address,
      message,
    } = req.body;
const jobId = req.body.jobId || req.body.job;
    if (
      !customerName ||
      !email ||
      !phone ||
      !serviceName ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required booking details.",
      });
    }

    const booking = await ServiceBooking.create({
      customerName,
      email,
      phone,
      serviceName,
      bookingDate,
      address,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Service booking saved successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to save service booking.",
    });
  }
});

// 6. Get Service Bookings by email
router.get("/bookings", async (req, res) => {
  try {
    const email = String(req.query.email || "").trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const bookings = await ServiceBooking.find({ email }).sort({
      createdAt: -1,
    });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load bookings.",
    });
  }
});

// 7. Save Work & Earn Application
router.post("/applications", async (req, res) => {
  try {
    const {
      jobId,
      applicantName,
      email,
      phone,
      skills,
      message,
    } = req.body;

    if (!jobId || !mongoose.isValidObjectId(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid job.",
      });
    }

    if (!applicantName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required.",
      });
    }

    const job = await Job.findById(jobId);

    if (!job || !job.active) {
      return res.status(404).json({
        success: false,
        message: "This job is not available.",
      });
    }

    const application = await JobApplication.create({
      jobId,
      applicantName,
      email,
      phone,
      skills,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your job application has been saved.",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to submit application.",
    });
  }
});
// ===============================
// WALLET & DEMO PAYMENT SYSTEM
// ===============================

// 1. Wallet Transaction Model
const WalletTransaction =
  mongoose.models.WalletTransaction ||
  mongoose.model(
    "WalletTransaction",
    new mongoose.Schema(
      {
        email: {
          type: String,
          required: true,
          lowercase: true,
          trim: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 1,
        },
        type: {
          type: String,
          default: "earning",
        },
        description: {
          type: String,
          default: "Work completed",
        },
        status: {
          type: String,
          enum: ["pending", "success", "failed"],
          default: "pending",
        },
      },
      { timestamps: true }
    )
  );


// 2. Get Wallet Balance and Transaction History
router.get("/wallet", async (req, res) => {
  try {
    const email = String(req.query.email || "")
      .trim()
      .toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const transactions = await WalletTransaction.find({ email })
      .sort({ createdAt: -1 });

    const availableBalance = transactions
      .filter((item) => item.status === "success")
      .reduce((total, item) => total + item.amount, 0);

    const pendingEarnings = transactions
      .filter((item) => item.status === "pending")
      .reduce((total, item) => total + item.amount, 0);

    res.json({
      success: true,
      availableBalance,
      pendingEarnings,
      transactions,
    });
  } catch (error) {
    console.error("Wallet error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load wallet.",
    });
  }
});


// 3. Add Demo Earning to Pending Balance
router.post("/wallet/demo-earning", async (req, res) => {
  try {
    const { email, amount, description } = req.body;

    const normalizedEmail =
      typeof email === "string"
        ? email.trim().toLowerCase()
        : "";

    const earningAmount = Number(amount);

    if (
      !normalizedEmail ||
      !Number.isFinite(earningAmount) ||
      earningAmount < 1 ||
      earningAmount > 100000
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email and amount.",
      });
    }

    const transaction = await WalletTransaction.create({
      email: normalizedEmail,
      amount: earningAmount,
      description: description || "Demo work earning",
      type: "earning",
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Demo earning added to pending balance.",
      transaction,
    });
  } catch (error) {
    console.error("Demo earning error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to add demo earning.",
    });
  }
});


// 4. Demo Payment Gateway
router.post("/wallet/demo-payment", async (req, res) => {
  try {
    const { transactionId, email, outcome } = req.body;

    const normalizedEmail =
      typeof email === "string"
        ? email.trim().toLowerCase()
        : "";

    if (
      !transactionId ||
      !mongoose.isValidObjectId(transactionId) ||
      !normalizedEmail ||
      !["success", "failed"].includes(outcome)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid demo payment details.",
      });
    }

    const transaction = await WalletTransaction.findOne({
      _id: transactionId,
      email: normalizedEmail,
      status: "pending",
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Pending transaction not found.",
      });
    }

    transaction.status = outcome;
    await transaction.save();

    res.json({
      success: true,
      message:
        outcome === "success"
          ? "Demo payment successful. Earning added to available balance."
          : "Demo payment failed. Earning was not added to available balance.",
      transaction,
    });
  } catch (error) {
    console.error("Demo payment error:", error);

    res.status(500).json({
      success: false,
      message: "Demo payment could not be processed.",
    });
  }
});
module.exports = router;
