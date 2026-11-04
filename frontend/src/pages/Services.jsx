
import { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import "../styles/Services.css";


const services = [
  { id: "healthcare", icon: "🏥", title: "Healthcare", description: "Healthcare assistance and appointment requests." },
  { id: "medication", icon: "💊", title: "Medication Support", description: "Manage medicines and reminder schedules." },
  { id: "caregivers", icon: "🤝", title: "Caregivers", description: "Request daily caregiving assistance." },
  { id: "maps", icon: "🗺️", title: "Maps & Location", description: "Find nearby hospitals and essential places." },
  { id: "shopping", icon: "🛒", title: "Shopping & Essentials", description: "Create and manage shopping lists." },
  { id: "transport", icon: "🚗", title: "Pickup & Drop", description: "Request transport assistance." },
  { id: "nursing", icon: "🧑‍⚕️", title: "Home Nursing", description: "Request home nursing assistance." },
  { id: "accessibility", icon: "🧏", title: "Accessibility Support", description: "Explore accessibility tools." },
  { id: "entertainment", icon: "🎟️", title: "Entertainment", description: "Enjoy music, movies and activities." },
];

const entertainmentItems = [
  ["🙏", "Bhajans & Devotional Music", "Listen to peaceful devotional music.", "https://www.youtube.com/results?search_query=bhajans"],
  ["🎬", "Movies & Old Classics", "Enjoy classic Indian movies.", "https://www.youtube.com/results?search_query=old+classic+indian+movies"],
  ["😂", "Comedy & Laughter", "Watch family-friendly comedy.", "https://www.youtube.com/results?search_query=clean+family+comedy"],
  ["🧘", "Yoga & Meditation", "Relax with easy yoga exercises.", "https://www.youtube.com/results?search_query=yoga+for+seniors"],
  ["🎵", "Old Hindi Songs", "Listen to evergreen Hindi songs.", "https://www.youtube.com/results?search_query=old+hindi+songs"],
  ["🌳", "Nature & Travel", "Explore relaxing nature videos.", "https://www.youtube.com/results?search_query=nature+travel"],
];

function Services({ onNavigate = () => {} }) {
  const [selectedService, setSelectedService] = useState(null);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const [request, setRequest] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    date: "",
    time: "",
    details: "",
    category: "Doctor Appointment",
    pickup: "",
    destination: "",
  });

  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [medicineTime, setMedicineTime] = useState("");

  const [shoppingItems, setShoppingItems] = useState([]);
  const [shoppingName, setShoppingName] = useState("");

  const [locationMessage, setLocationMessage] = useState("");
  const [fontLarge, setFontLarge] = useState(false);

  const [outing, setOuting] = useState({
    activity: "Movie",
    date: "",
    notes: "",
  });

  function openService(service) {
    setSelectedService(service);
    setNotice("");
    setLocationMessage("");
  }

  function goBack() {
    setSelectedService(null);
    setNotice("");
  }

  function updateRequest(event) {
    const { name, value } = event.target;
    setRequest((previous) => ({ ...previous, [name]: value }));
  }

  function resetRequest() {
    setRequest({
      name: "",
      contact: "",
      email: "",
      address: "",
      date: "",
      time: "",
      details: "",
      category: "Doctor Appointment",
      pickup: "",
      destination: "",
    });
  }

  async function submitRequest(event) {
    event.preventDefault();

    if (!selectedService || loading) return;

    const transport = selectedService.id === "transport";

    const address = transport
      ? `${request.pickup.trim()} to ${request.destination.trim()}`
      : request.address.trim();

    if (!request.contact.trim() || !request.email.trim() || !address) {
      setNotice("Please complete all required contact and address details.");
      return;
    }

    const bookingData = {
      customerName: request.name.trim(),
      email: request.email.trim().toLowerCase(),
      phone: request.contact.trim(),
      serviceName: selectedService.title,
      bookingDate: request.date,
      address,
      message: [
        `Category: ${request.category}`,
        `Preferred time: ${request.time || "Not specified"}`,
        request.details.trim(),
      ].filter(Boolean).join(" | "),
    };

    try {
      setLoading(true);
      setNotice("Submitting your request...");

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit your request.");
      }

      setNotice(
        `Request submitted successfully! Reference ID: ${data.booking?._id || "Submitted"}`
      );

      resetRequest();
    } catch (error) {
      console.error(error);
      setNotice(error.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  function addMedicine(event) {
    event.preventDefault();
    if (!medicineName.trim() || !medicineTime) return;

    setMedicines((items) => [
      ...items,
      {
        id: Date.now(),
        name: medicineName.trim(),
        time: medicineTime,
        completed: false,
      },
    ]);

    setMedicineName("");
    setMedicineTime("");
    setNotice("Medicine added successfully.");
  }

  function addShoppingItem(event) {
    event.preventDefault();
    if (!shoppingName.trim()) return;

    setShoppingItems((items) => [
      ...items,
      { id: Date.now(), name: shoppingName.trim(), bought: false },
    ]);

    setShoppingName("");
    setNotice("Shopping item added.");
  }

  function getMyLocation() {
    if (!navigator.geolocation) {
      setLocationMessage("Location is not supported by your browser.");
      return;
    }

    setLocationMessage("Requesting location permission...");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocationMessage(
          `Location: ${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`
        );
      },
      () => setLocationMessage("Unable to access location. Please allow browser permission."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function renderRequestForm({ transport = false, healthcare = false } = {}) {
    return (
      <form className="service-action-form" onSubmit={submitRequest}>
        {healthcare && (
          <>
            <label htmlFor="request-category">Healthcare Service</label>
            <select
              id="request-category"
              name="category"
              value={request.category}
              onChange={updateRequest}
            >
              <option>Doctor Appointment</option>
              <option>General Health Assistance</option>
              <option>Medical Consultation Request</option>
              <option>Diagnostic Test Assistance</option>
              <option>Other Medical Support</option>
            </select>
          </>
        )}

        <label htmlFor="request-name">Patient / Customer Name</label>
        <input
          id="request-name"
          name="name"
          value={request.name}
          onChange={updateRequest}
          placeholder="Enter your full name"
          required
        />

        <label htmlFor="request-contact">Phone Number</label>
        <input
          id="request-contact"
          name="contact"
          type="tel"
          value={request.contact}
          onChange={updateRequest}
          placeholder="Enter phone number"
          required
        />

        <label htmlFor="request-email">Email Address</label>
        <input
          id="request-email"
          name="email"
          type="email"
          value={request.email}
          onChange={updateRequest}
          placeholder="Enter email address"
          required
        />

        {transport ? (
          <>
            <label htmlFor="request-pickup">Pickup Location</label>
            <input
              id="request-pickup"
              name="pickup"
              value={request.pickup}
              onChange={updateRequest}
              placeholder="Enter pickup location"
              required
            />

            <label htmlFor="request-destination">Destination</label>
            <input
              id="request-destination"
              name="destination"
              value={request.destination}
              onChange={updateRequest}
              placeholder="Enter destination"
              required
            />
          </>
        ) : (
          <>
            <label htmlFor="request-address">Full Address</label>
            <textarea
              id="request-address"
              name="address"
              value={request.address}
              onChange={updateRequest}
              placeholder="Enter complete address"
              rows="2"
              required
            />
          </>
        )}

        <label htmlFor="request-date">Preferred Date</label>
        <input
          id="request-date"
          name="date"
          type="date"
          min={new Date().toLocaleDateString("en-CA")}
          value={request.date}
          onChange={updateRequest}
        />

        {healthcare && (
          <>
            <label htmlFor="request-time">Preferred Appointment Time</label>
            <input
              id="request-time"
              name="time"
              type="time"
              value={request.time}
              onChange={updateRequest}
            />
          </>
        )}

        <label htmlFor="request-details">Additional Details</label>
        <textarea
          id="request-details"
          name="details"
          rows="4"
          value={request.details}
          onChange={updateRequest}
          placeholder="Describe the assistance you need"
          required
        />

        <button
          className="service-primary-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>

        {notice && (
          <p className="service-feedback" role="status">{notice}</p>
        )}
      </form>
    );
  }

  function renderServiceContent() {
    switch (selectedService.id) {
      case "healthcare":
        return (
          <>
            <h2>Healthcare Assistance</h2>
            <p>Request medical assistance or prepare a doctor appointment request.</p>

            <div className="healthcare-feature-grid">
              <div>🩺 <strong>Doctor Appointment</strong><span>Request an appointment</span></div>
              <div>❤️ <strong>Health Assistance</strong><span>Describe your medical support needs</span></div>
              <div>📋 <strong>Patient Details</strong><span>Share your contact information</span></div>
            </div>

            <h2>Book Healthcare Assistance</h2>
            {renderRequestForm({ healthcare: true })}

            <p className="service-safety-note">
              Submitting this form sends a request; it does not confirm a doctor appointment or provide a diagnosis. For emergencies in India, call 112.
            </p>
          </>
        );

      case "medication":
        return (
          <>
            <h2>My Medicine Checklist</h2>
            <p>Add medicines and mark them when taken. This checklist does not generate automatic alarms.</p>

            <form className="service-action-form" onSubmit={addMedicine}>
              <label>Medicine Name</label>
              <input value={medicineName} onChange={(e) => setMedicineName(e.target.value)} placeholder="Medicine name" required />
              <label>Medicine Time</label>
              <input type="time" value={medicineTime} onChange={(e) => setMedicineTime(e.target.value)} required />
              <button className="service-primary-button">+ Add Medicine</button>
            </form>

            <div className="service-item-list">
              {medicines.map((item) => (
                <div className="service-list-item" key={item.id}>
                  <label className={item.completed ? "item-completed" : ""}>
                    <input type="checkbox" checked={item.completed} onChange={() => setMedicines((items) => items.map((x) => x.id === item.id ? { ...x, completed: !x.completed } : x))} />
                    <span>{item.name} — {item.time}</span>
                  </label>
                  <button type="button" onClick={() => setMedicines((items) => items.filter((x) => x.id !== item.id))}>Remove</button>
                </div>
              ))}
              {medicines.length === 0 && <p>No medicines added yet.</p>}
            </div>
          </>
        );

      case "caregivers":
      case "nursing":
        return (
          <>
            <h2>{selectedService.title} Request</h2>
            <p>Provide your details and describe the assistance you need.</p>
            {renderRequestForm()}
            <p className="service-safety-note">Submitting a request does not confirm that a caregiver or nurse has been booked or verified.</p>
          </>
        );

      case "transport":
        return (
          <>
            <h2>Pickup & Drop Assistance</h2>
            <p>Provide your journey and contact details.</p>
            {renderRequestForm({ transport: true })}
          </>
        );

      case "maps":
        return (
          <>
            <h2>Maps & Nearby Places</h2>
            <p>Find your location and explore nearby essential services.</p>
            <button className="service-primary-button" onClick={getMyLocation}>Find My Location</button>
            {locationMessage && <p className="service-feedback" role="status">{locationMessage}</p>}

            <div className="service-map-links">
              <a href="https://www.google.com/maps/search/hospitals+near+me" target="_blank" rel="noreferrer">🏥 Nearby Hospitals ↗</a>
              <a href="https://www.google.com/maps/search/pharmacies+near+me" target="_blank" rel="noreferrer">💊 Nearby Pharmacies ↗</a>
              <a href="https://www.google.com/maps/search/grocery+stores+near+me" target="_blank" rel="noreferrer">🛒 Nearby Grocery Stores ↗</a>
            </div>
          </>
        );

      case "shopping":
        return (
          <>
            <h2>My Shopping List</h2>
            <form className="service-action-form" onSubmit={addShoppingItem}>
              <label>Item Name</label>
              <input value={shoppingName} onChange={(e) => setShoppingName(e.target.value)} placeholder="Enter item name" required />
              <button className="service-primary-button">+ Add Item</button>
            </form>
            <div className="service-item-list">
              {shoppingItems.map((item) => (
                <div className="service-list-item" key={item.id}>
                  <label className={item.bought ? "item-completed" : ""}>
                    <input type="checkbox" checked={item.bought} onChange={() => setShoppingItems((items) => items.map((x) => x.id === item.id ? { ...x, bought: !x.bought } : x))} />
                    <span>{item.name}</span>
                  </label>
                  <button type="button" onClick={() => setShoppingItems((items) => items.filter((x) => x.id !== item.id))}>Remove</button>
                </div>
              ))}
              {shoppingItems.length === 0 && <p>Your shopping list is empty.</p>}
            </div>
          </>
        );

      case "accessibility":
        return (
          <>
            <h2>Accessibility Tools</h2>
            <p>Adjust the text size to make this page easier to read.</p>
            <button className="service-primary-button" onClick={() => setFontLarge((v) => !v)}>
              {fontLarge ? "Standard Text" : "Increase Text Size"}
            </button>
            <div className={`accessibility-resource ${fontLarge ? "accessibility-large-text" : ""}`}>
              <h3>Helpful Resources</h3>
              <ul>
                <li>Use Tab and Enter to navigate the page.</li>
                <li>Enable video captions.</li>
                <li>Use a trusted person for assistance when needed.</li>
              </ul>
              <a href="https://www.nad.org/" target="_blank" rel="noreferrer">Accessibility Resources ↗</a>
            </div>
          </>
        );

      case "entertainment":
        return (
          <>
            <div className="entertainment-banner">
              <span>🎭</span>
              <h2>Entertainment & Leisure</h2>
              <p>Enjoy music, movies, yoga and activities.</p>
            </div>
            <div className="entertainment-grid">
              {entertainmentItems.map(([icon, title, description, link]) => (
                <div className="entertainment-card" key={title}>
                  <span className="entertainment-icon">{icon}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a href={link} target="_blank" rel="noreferrer">Explore ↗</a>
                </div>
              ))}
            </div>
            <div className="entertainment-outing">
              <h2>Plan an Outing</h2>
              <form className="service-action-form" onSubmit={(e) => { e.preventDefault(); setNotice("Your outing plan has been created for this session."); }}>
                <label>Activity</label>
                <select value={outing.activity} onChange={(e) => setOuting({ ...outing, activity: e.target.value })}>
                  <option>Movie</option>
                  <option>Park visit</option>
                  <option>Family outing</option>
                  <option>Community event</option>
                  <option>Other activity</option>
                </select>
                <label>Date</label>
                <input type="date" min={new Date().toLocaleDateString("en-CA")} value={outing.date} onChange={(e) => setOuting({ ...outing, date: e.target.value })} required />
                <label>Additional Needs</label>
                <textarea rows="3" value={outing.notes} onChange={(e) => setOuting({ ...outing, notes: e.target.value })} />
                <button className="service-primary-button">Create Outing Plan</button>
              </form>
              {notice && <p className="service-feedback">{notice}</p>}
            </div>
          </>
        );

      default:
        return <p>Please select a service.</p>;
    }
  }

  if (selectedService) {
    return (
      <main className="services-page">
        <section className={`service-detail ${selectedService.id === "entertainment" ? "entertainment-detail" : ""}`}>
          <button className="service-back-button" onClick={goBack}>← Back to All Services</button>
          <div className="service-detail-icon">{selectedService.icon}</div>
          <p className="services-eyebrow">AAROGYA SETU SUPPORT</p>
          <h1>{selectedService.title}</h1>
          <p className="service-detail-description">{selectedService.description}</p>
          {renderServiceContent()}
          <button className="service-back-button" onClick={goBack}>← Explore Another Service</button>
        </section>
      </main>
    );
  }

  return (
    <main className="services-page">
      <section className="services-hero">
        <p className="section-eyebrow">OUR SERVICES</p>
        <h1>Support for Your Everyday Needs</h1>
        <p>Explore healthcare, caregiving, accessibility and daily living support through Aarogya Setu.</p>
      </section>

      <section className="services-list">
        <div className="services-heading">
          <h2>Discover Our Services</h2>
          <p>Select any card to explore its features.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onClick={() => openService(service)} />
          ))}
        </div>
      </section>

      <section className="services-help">
        <h2>Need More Support?</h2>
        <p>Visit our community or contact us for assistance.</p>
        <div className="services-help-buttons">
          <button onClick={() => onNavigate("community")}>Visit Community</button>
          <button className="services-contact-button" onClick={() => onNavigate("contact")}>Contact Us</button>
        </div>
      </section>
    </main>
  );
}

export default Services;
