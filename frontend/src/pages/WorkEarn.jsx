

import { useState } from "react";
import "../styles/WorkEarn.css";

const jobs = [
  {
    id: 1,
    title: "Data Entry Assistant",
    company: "Aarogya Community",
    type: "Remote",
    category: "Data Entry",
    salary: "₹8,000–₹12,000 / month",
    icon: "💻",
    description:
      "Help organize digital records and enter information accurately.",
    skills: "Basic computer skills, typing and attention to detail",
  },
  {
    id: 2,
    title: "Content Writing Assistant",
    company: "Community Projects",
    type: "Remote",
    category: "Writing",
    salary: "₹6,000–₹10,000 / month",
    icon: "✍️",
    description:
      "Help prepare simple articles, descriptions and helpful content.",
    skills: "Writing, grammar and basic research",
  },
  {
    id: 3,
    title: "Customer Support Assistant",
    company: "Support Services",
    type: "Flexible",
    category: "Customer Support",
    salary: "₹10,000–₹15,000 / month",
    icon: "🎧",
    description:
      "Assist customers by responding to questions through digital channels.",
    skills: "Communication, patience and basic computer knowledge",
  },
];

function WorkEarn() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [application, setApplication] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    message: "",
  });
  const [notice, setNotice] = useState("");
// Wallet States
const [walletEmail, setWalletEmail] = useState("");
const [wallet, setWallet] = useState({
  availableBalance: 0,
  pendingEarnings: 0,
  transactions: [],
});

const [walletLoading, setWalletLoading] = useState(false);
const [walletNotice, setWalletNotice] = useState("");
const [demoAmount, setDemoAmount] = useState("");
  function handleChange(event) {
    const { name, value } = event.target;

    setApplication((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

 async function loadWallet() {
  if (!walletEmail.trim()) {
    setWalletNotice("Please enter your email address.");
    return;
  }

  try {
    setWalletLoading(true);
    setWalletNotice("");

    const response = await fetch(
      `http://localhost:5000/api/wallet?email=${encodeURIComponent(walletEmail.trim())}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to load wallet.");
    }

    setWallet({
      availableBalance: data.availableBalance,
      pendingEarnings: data.pendingEarnings,
      transactions: data.transactions,
    });

    setWalletNotice("Wallet loaded successfully.");
  } catch (error) {
    setWalletNotice(error.message);
  } finally {
    setWalletLoading(false);
  }
} 
async function addDemoEarning(event) {
  event.preventDefault();

  const amount = Number(demoAmount);

  if (!walletEmail.trim() || !Number.isFinite(amount) || amount < 1) {
    setWalletNotice("Please enter a valid email and amount.");
    return;
  }

  try {
    setWalletLoading(true);
    setWalletNotice("");

    const response = await fetch(
      "http://localhost:5000/api/wallet/demo-earning",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: walletEmail.trim(),
          amount,
          description: "Demo Work Earning",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to add earning.");
    }

    setDemoAmount("");
    setWalletNotice("Demo earning added to Pending Earnings.");

    await loadWallet();
  } catch (error) {
    setWalletNotice(error.message);
  } finally {
    setWalletLoading(false);
  }
}
async function processDemoPayment(transactionId, outcome) {
  try {
    setWalletLoading(true);
    setWalletNotice("");

    const response = await fetch(
      "http://localhost:5000/api/wallet/demo-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId,
          email: walletEmail.trim(),
          outcome,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment could not be processed.");
    }

    setWalletNotice(data.message);
    await loadWallet();
  } catch (error) {
    setWalletNotice(error.message);
  } finally {
    setWalletLoading(false);
  }
}
async function handleApply(event) {
  event.preventDefault();

  if (!selectedJob) return;

  try {
    setNotice("Submitting your application...");

    const response = await fetch("http://localhost:5000/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId: selectedJob._id || selectedJob.id,
        applicantName: application.name.trim(),
        email: application.email.trim().toLowerCase(),
        phone: application.phone.trim(),
        skills: application.skills.trim(),
        message: application.message.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Application could not be submitted.");
    }

    setNotice("Your application has been submitted successfully!");

    setSelectedJob(null);

    setApplication({
      name: "",
      email: "",
      phone: "",
      skills: "",
      message: "",
    });
  } catch (error) {
    console.error("Application error:", error);
    setNotice(error.message || "Backend connection failed.");
  }
}
  return (
    <main className="work-page">
      <section className="work-hero">
        <p className="section-eyebrow">OPPORTUNITY • INDEPENDENCE • GROWTH</p>
        <h1>Work & Earn</h1>
        <p>
          Discover flexible work opportunities, develop useful skills
          and take the next step towards greater independence.
        </p>

        <div className="work-hero-stats">
          <div>
            <strong>Flexible</strong>
            <span>Work options</span>
          </div>
          <div>
            <strong>Skill-based</strong>
            <span>Opportunities</span>
          </div>
          <div>
            <strong>Inclusive</strong>
            <span>Career focus</span>
          </div>
        </div>
      </section>

{/* MY WALLET SECTION */}
<section className="work-wallet">

  <div className="wallet-heading">
    <h2>My Wallet</h2>
    <p>Manage your earnings and demo payments.</p>
  </div>

  {/* EMAIL SECTION */}
  <div className="wallet-email-box">
    <label>Enter Your Email</label>

    <input
      type="email"
      value={walletEmail}
      onChange={(event) => setWalletEmail(event.target.value)}
      placeholder="Enter your registered email"
      required
    />

    <button type="button" onClick={loadWallet}>
      Submit
    </button>

    {walletNotice && (
      <p className="wallet-notice">{walletNotice}</p>
    )}
  </div>

  {/* BALANCE SECTION */}
  <div className="wallet-balance-grid">

    <div className="wallet-balance-card">
      <h3>Available Balance</h3>
      <h2>₹{wallet.availableBalance}</h2>
      <p>Successful demo earnings</p>
    </div>

    <div className="wallet-balance-card pending-card">
      <h3>Pending Earnings</h3>
      <h2>₹{wallet.pendingEarnings}</h2>
      <p>Pending demo earnings</p>
    </div>

  </div>

  {/* DEMO EARNING SECTION */}
  <div className="wallet-demo-box">
    <h3>Demo Earning Simulator</h3>
    <p>Add a sample earning to test your wallet.</p>

    <form onSubmit={addDemoEarning}>

      <label>Enter Amount (₹)</label>

      <input
        type="number"
        min="1"
        value={demoAmount}
        onChange={(event) => setDemoAmount(event.target.value)}
        placeholder="Enter amount e.g. 500"
        required
      />

      <button type="submit">
        Add Demo Earning
      </button>

    </form>
  </div>

  {/* TRANSACTION HISTORY */}
  <div className="wallet-history">
    <h3>Transaction History</h3>

    {wallet.transactions.length === 0 ? (
      <p>No transactions found.</p>
    ) : (

      wallet.transactions.map((transaction) => (

        <div
          className="wallet-transaction"
          key={transaction._id}
        >

          <div>
            <strong>{transaction.description}</strong>

            <p>Amount: ₹{transaction.amount}</p>

            <p>
              Status: {transaction.status}
            </p>
          </div>

          {transaction.status === "pending" && (

            <div className="wallet-payment-buttons">

              <button
                type="button"
                onClick={() =>
                  processDemoPayment(transaction._id, "success")
                }
              >
                Demo Success
              </button>

              <button
                type="button"
                onClick={() =>
                  processDemoPayment(transaction._id, "failed")
                }
              >
                Demo Failed
              </button>

            </div>

          )}

        </div>

      ))

    )}
  </div>

  <p className="wallet-warning">
    This is a demo payment system. No real money is transferred.
    Applying for a job is always free.
  </p>

</section>



<section className="work-wallet">
  <h2>My Wallet</h2>
  <p>Manage your earnings and demo payments.</p>

  <label>Enter Your Email</label>
  <input
    type="email"
    value={walletEmail}
    onChange={(event) => setWalletEmail(event.target.value)}
    placeholder="Enter your registered email"
  />

  <button type="button" onClick={loadWallet}>
    Submit
  </button>

  {walletNotice && <p>{walletNotice}</p>}

  <div className="wallet-balance-grid">
    <div className="wallet-balance-card">
      <h3>Available Balance</h3>
      <h2>₹{wallet.availableBalance}</h2>
    </div>

    <div className="wallet-balance-card">
      <h3>Pending Earnings</h3>
      <h2>₹{wallet.pendingEarnings}</h2>
    </div>
  </div>

  <div className="wallet-demo-box">
    <h3>Demo Earning Simulator</h3>
    <p>Enter amount to add demo earning.</p>

    <form onSubmit={addDemoEarning}>
      <input
        type="number"
        min="1"
        value={demoAmount}
        onChange={(event) => setDemoAmount(event.target.value)}
        placeholder="Enter amount (e.g. 500)"
        required
      />

      <button type="submit">Add Demo Earning</button>
    </form>
  </div>

  <h3>Transaction History</h3>

  {wallet.transactions.length === 0 ? (
    <p>No transactions found.</p>
  ) : (
    wallet.transactions.map((transaction) => (
      <div className="wallet-transaction" key={transaction._id}>
        <div>
          <strong>{transaction.description}</strong>
          <p>Amount: ₹{transaction.amount}</p>
          <p>Status: {transaction.status}</p>
        </div>

        {transaction.status === "pending" && (
          <div className="wallet-payment-buttons">
            <button
              type="button"
              onClick={() =>
                processDemoPayment(transaction._id, "success")
              }
            >
              Demo Success
            </button>

            <button
              type="button"
              onClick={() =>
                processDemoPayment(transaction._id, "failed")
              }
            >
              Demo Failed
            </button>
          </div>
        )}
      </div>
    ))
  )}

  <p className="wallet-warning">
    This is a demo payment system. No real money is transferred.
  </p>
</section>


      {notice && (
        <div className="work-notice" role="status">
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss message">
            ×
          </button>
        </div>
      )}

      <section className="work-jobs">
        {jobs.map((job) => (
          <article className="work-job-card" key={job.id}>
            <div className="work-job-top">
              <div className="work-job-icon">{job.icon}</div>
              <span className="work-job-type">{job.type}</span>
            </div>

            <h3>{job.title}</h3>
            <p className="work-company">{job.company}</p>
            <p className="work-job-description">{job.description}</p>

            <div className="work-job-details">
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Skills:</strong> {job.skills}</p>
              <p><strong>Sample pay:</strong> {job.salary}</p>
            </div>

            <button
              className="work-apply-button"
              onClick={() => {
                setSelectedJob(job);
                setNotice("");
              }}
            >
              Apply Now →
            </button>
          </article>
        ))}
      </section>

      <section className="work-tips">
        <h2>Tips Before Applying</h2>
        <ul>
          <li>Read the job responsibilities carefully.</li>
          <li>Check that the employer and opportunity are genuine.</li>
          <li>Never pay a registration fee to an unverified recruiter.</li>
          <li>Share personal information only when it is necessary and safe.</li>
        </ul>
      </section>

      {selectedJob && (
        <div
          className="work-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedJob(null);
            }
          }}
        >
          <section className="work-application-modal" role="dialog" aria-modal="true" aria-labelledby="application-heading">
            <div className="work-application-header">
              <div>
                <p className="section-eyebrow">JOB APPLICATION</p>
                <h2 id="application-heading">{selectedJob.title}</h2>
              </div>
              <button
                type="button"
                className="work-close-button"
                onClick={() => setSelectedJob(null)}
                aria-label="Close application form"
              >
                ×
              </button>
            </div>

            <form className="work-application-form" onSubmit={handleApply}>
              <label htmlFor="applicant-name">Full Name *</label>
              <input
                id="applicant-name"
                name="name"
                value={application.name}
                onChange={handleChange}
                required
                maxLength={100}
                placeholder="Enter your full name"
              />

              <label htmlFor="applicant-email">Email Address *</label>
              <input
                id="applicant-email"
                name="email"
                type="email"
                value={application.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />

              <label htmlFor="applicant-phone">Phone Number</label>
              <input
                id="applicant-phone"
                name="phone"
                type="tel"
                value={application.phone}
                onChange={handleChange}
                maxLength={20}
                placeholder="Enter phone number"
              />

              <label htmlFor="applicant-skills">Your Skills *</label>
              <input
                id="applicant-skills"
                name="skills"
                value={application.skills}
                onChange={handleChange}
                required
                maxLength={300}
                placeholder="e.g. typing, Excel, communication"
              />

              <label htmlFor="applicant-message">Why are you interested?</label>
              <textarea
                id="applicant-message"
                name="message"
                value={application.message}
                onChange={handleChange}
                rows={3}
                maxLength={1000}
                placeholder="Tell us briefly about yourself"
              />

              <button className="work-apply-button" type="submit">
                Submit Demo Application
              </button>

              <p className="work-form-note">
                Demo only: this form does not send or store your application.
              </p>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default WorkEarn;
