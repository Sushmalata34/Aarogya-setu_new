
import { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import "../styles/Services.css";


const services = [
  {
    id: "healthcare",
    icon: "🏥",
    title: "Healthcare",
    description: "Prepare a healthcare support or appointment request.",
  },
  {
    id: "medication",
    icon: "💊",
    title: "Medication Support",
    description: "Create a medicine checklist and organize reminder times.",
  },
  {
    id: "caregivers",
    icon: "🤝",
    title: "Caregivers",
    description: "Describe the caregiving support you need.",
  },
  {
    id: "maps",
    icon: "🗺️",
    title: "Maps & Location",
    description: "Get your location or search for nearby places on a map.",
  },
  {
    id: "shopping",
    icon: "🛒",
    title: "Shopping & Essentials",
    description: "Build and manage your own shopping checklist.",
  },
  {
    id: "transport",
    icon: "🚗",
    title: "Pickup & Drop",
    description: "Prepare a transport assistance request.",
  },
  {
    id: "nursing",
    icon: "🧑‍⚕️",
    title: "Home Nursing",
    description: "Describe the nursing assistance you are looking for.",
  },
  {
    id: "accessibility",
    icon: "🧏",
    title: "Accessibility Support",
    description: "Use accessibility controls and explore helpful resources.",
  },
  {
    id: "entertainment",
    icon: "🎟️",
    title: "Entertainment",
    description: "Create a plan for a movie, outing or leisure activity.",
  },
];

function Services({ onNavigate = () => {} }) {
  const [selectedService, setSelectedService] = useState(null);
  const [notice, setNotice] = useState("");

  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [medicineTime, setMedicineTime] = useState("");

  const [shoppingItems, setShoppingItems] = useState([]);
  const [shoppingName, setShoppingName] = useState("");

  const [locationMessage, setLocationMessage] = useState("");
  const [fontLarge, setFontLarge] = useState(false);

  
const [request, setRequest] = useState({
  name: "",
  contact: "",
  email: "",
  address: "",
  date: "",
  details: "",
  pickup: "",
  destination: "",
});


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

  async function submitRequest(event) {
  event.preventDefault();

  if (!selectedService) return;

  const phone = request.contact.trim();
  const email = request.email.trim().toLowerCase();

  const address =
    selectedService.id === "transport"
      ? `${request.pickup.trim()} to ${request.destination.trim()}`
      : request.address.trim();

  if (!email || !phone || !address) {
    setNotice("Please enter your email, phone number and address.");
    return;
  }

  const bookingData = {
    customerName: request.name.trim(),
    email,
    phone,
    serviceName: selectedService.title,
    bookingDate: request.date,
    address,
    message: request.details.trim(),
  };

  try {
    setNotice("Submitting your booking...");

    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Booking could not be saved.");
    }

    setNotice(
      "Booking submitted successfully! Your booking ID is: " +
      data.booking._id
    );

    setRequest({
      name: "",
      contact: "",
      email: "",
      address: "",
      date: "",
      details: "",
      pickup: "",
      destination: "",
    });
  } catch (error) {
    console.error("Booking error:", error);
    setNotice(error.message || "Backend connection failed.");
  }
}
  function addMedicine(event) {
    event.preventDefault();
    setMedicines((previous) => [
      ...previous,
      {
        id: Date.now() + Math.random(),
        name: medicineName.trim(),
        time: medicineTime,
        completed: false,
      },
    ]);
    setMedicineName("");
    setMedicineTime("");
    setNotice("Medicine added to your current checklist.");
  }

  function addShoppingItem(event) {
    event.preventDefault();
    if (!shoppingName.trim()) return;

    setShoppingItems((previous) => [
      ...previous,
      {
        id: Date.now() + Math.random(),
        name: shoppingName.trim(),
        bought: false,
      },
    ]);
    setShoppingName("");
  }

  function getMyLocation() {
    if (!navigator.geolocation) {
      setLocationMessage("Your browser does not support location access.");
      return;
    }

    setLocationMessage("Requesting location permission...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationMessage(
          `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`
        );
      },
      () => {
        setLocationMessage(
          "Location unavailable. Please allow location permission in your browser and try again."
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function renderRequestForm({ dateLabel = "Preferred Date", transport = false } = {}) {
    return (
      <form className="service-action-form" onSubmit={submitRequest}>
        <label htmlFor="request-name">Your Name</label>
        <input
          id="request-name"
          name="name"
          value={request.name}
          onChange={updateRequest}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="request-contact">Phone Number</label>
<input
  id="request-contact"
  name="contact"
  type="tel"
  value={request.contact}
  onChange={updateRequest}
  placeholder="Enter your phone number"
  required
/>

<label htmlFor="request-email">Email Address</label>
<input
  id="request-email"
  name="email"
  type="email"
  value={request.email}
  onChange={updateRequest}
  placeholder="Enter your email"
  required
/>

{!transport && (
  <>
    <label htmlFor="request-address">Full Address</label>
    <textarea
      id="request-address"
      name="address"
      rows="2"
      value={request.address}
      onChange={updateRequest}
      placeholder="Enter your complete address"
      required
    />
  </>
)}

        {transport && (
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
        )}

        <label htmlFor="request-date">{dateLabel}</label>
        <input
          id="request-date"
          name="date"
          type="date"
          min={new Date().toLocaleDateString("en-CA")}
          value={request.date}
          onChange={updateRequest}
        />

        <label htmlFor="request-details">Details / Assistance Needed</label>
        <textarea
          id="request-details"
          name="details"
          rows="4"
          value={request.details}
          onChange={updateRequest}
          placeholder="Describe the help you need"
          required
        />

        <button className="service-primary-button" type="submit">
          Prepare Request
        </button>

        {notice && <p className="service-feedback" role="status">{notice}</p>}
      </form>
    );
  }

  function renderServiceContent() {
    switch (selectedService.id) {
      case "healthcare":
        return (
          <>
            <h2>Healthcare Support Request</h2>
            <p>Use this form to prepare a request for healthcare assistance.</p>
            {renderRequestForm({ dateLabel: "Preferred Appointment Date" })}
            <p className="service-safety-note">
              This form does not provide a diagnosis or book a doctor. For an
              emergency, contact local emergency services directly.
            </p>
          </>
        );

      case "medication":
        return (
          <>
            <h2>My Medicine Checklist</h2>
            <p>Add medicine details and mark each item when completed. This is a checklist, not an automatic alarm.</p>

            <form className="service-action-form" onSubmit={addMedicine}>
              <label htmlFor="medicine-name">Medicine Name</label>
              <input
                id="medicine-name"
                value={medicineName}
                onChange={(event) => setMedicineName(event.target.value)}
                placeholder="Enter medicine name"
                required
              />

              <label htmlFor="medicine-time">Reminder Time</label>
              <input
                id="medicine-time"
                type="time"
                value={medicineTime}
                onChange={(event) => setMedicineTime(event.target.value)}
                required
              />

              <button className="service-primary-button" type="submit">
                + Add Medicine
              </button>
            </form>

            <div className="service-item-list">
              {medicines.length === 0 && <p>No medicines added yet.</p>}
              {medicines.map((medicine) => (
                <div className="service-list-item" key={medicine.id}>
                  <label className={medicine.completed ? "item-completed" : ""}>
                    <input
                      type="checkbox"
                      checked={medicine.completed}
                      onChange={() => setMedicines((items) =>
                        items.map((item) => item.id === medicine.id
                          ? { ...item, completed: !item.completed }
                          : item
                        )
                      )}
                    />
                    <span>{medicine.name} — {medicine.time}</span>
                  </label>
                  <button type="button" onClick={() => setMedicines((items) => items.filter((item) => item.id !== medicine.id))}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {notice && <p className="service-feedback">{notice}</p>}
          </>
        );

      case "caregivers":
        return (
          <>
            <h2>Caregiver Assistance</h2>
            <p>Tell us what kind of daily assistance you are looking for.</p>
            {renderRequestForm()}
            <p className="service-safety-note">
              No caregiver is booked or verified by submitting this demo form.
            </p>
          </>
        );

      case "maps":
        return (
          <>
            <h2>Maps & Nearby Places</h2>
            <p>Your browser will ask permission before accessing your location.</p>
            <button className="service-primary-button" type="button" onClick={getMyLocation}>
              Find My Location
            </button>
            {locationMessage && <p className="service-feedback" role="status">{locationMessage}</p>}

            <div className="service-map-links">
              <a href="https://www.google.com/maps/search/hospitals+near+me" target="_blank" rel="noreferrer">
                Find Nearby Hospitals ↗
              </a>
              <a href="https://www.google.com/maps/search/pharmacies+near+me" target="_blank" rel="noreferrer">
                Find Nearby Pharmacies ↗
              </a>
              <a href="https://www.google.com/maps/search/grocery+stores+near+me" target="_blank" rel="noreferrer">
                Find Nearby Grocery Stores ↗
              </a>
            </div>
            <p className="service-safety-note">
              Map searches open Google Maps in a new tab. Location is not saved or shared by this page.
            </p>
          </>
        );

      case "shopping":
        return (
          <>
            <h2>My Shopping List</h2>
            <p>Add essentials, tick purchased items or remove them.</p>
            <form className="service-action-form" onSubmit={addShoppingItem}>
              <label htmlFor="shopping-name">Item Name</label>
              <input
                id="shopping-name"
                value={shoppingName}
                onChange={(event) => setShoppingName(event.target.value)}
                placeholder="e.g. Rice, milk or vegetables"
                required
              />
              <button className="service-primary-button" type="submit">
                + Add Item
              </button>
            </form>

            <div className="service-item-list">
              {shoppingItems.length === 0 && <p>Your shopping list is empty.</p>}
              {shoppingItems.map((item) => (
                <div className="service-list-item" key={item.id}>
                  <label className={item.bought ? "item-completed" : ""}>
                    <input
                      type="checkbox"
                      checked={item.bought}
                      onChange={() => setShoppingItems((items) =>
                        items.map((current) => current.id === item.id
                          ? { ...current, bought: !current.bought }
                          : current
                        )
                      )}
                    />
                    <span>{item.name}</span>
                  </label>
                  <button type="button" onClick={() => setShoppingItems((items) => items.filter((current) => current.id !== item.id))}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        );

      case "transport":
        return (
          <>
            <h2>Pickup & Drop Request</h2>
            <p>Prepare your trip details before contacting a transport provider.</p>
            {renderRequestForm({ dateLabel: "Travel Date", transport: true })}
            <p className="service-safety-note">
              This prepares a request only; it does not book a vehicle or driver.
            </p>
          </>
        );

      case "nursing":
        return (
          <>
            <h2>Home Nursing Request</h2>
            <p>Describe the nursing assistance and preferred date.</p>
            {renderRequestForm({ dateLabel: "Preferred Service Date" })}
            <p className="service-safety-note">
              A qualified provider has not been contacted or booked through this demo.
            </p>
          </>
        );

      case "accessibility":
        return (
          <>
            <h2>Accessibility Tools</h2>
            <p>Try larger text to make this service page easier to read.</p>
            <button className="service-primary-button" type="button" onClick={() => setFontLarge((value) => !value)}>
              {fontLarge ? "Use Standard Text" : "Increase Text Size"}
            </button>

            <div className={`accessibility-resource ${fontLarge ? "accessibility-large-text" : ""}`}>
              <h3>Helpful Resources</h3>
              <ul>
                <li>Use keyboard Tab and Enter to navigate interactive controls.</li>
                <li>Enable captions when watching videos.</li>
                <li>Ask a trusted person or qualified organization for communication support.</li>
              </ul>
              <a href="https://www.nad.org/" target="_blank" rel="noreferrer">
                Explore Deaf accessibility resources ↗
              </a>
              <p className="service-safety-note">
                This page provides resources; it does not translate sign language in real time.
              </p>
            </div>
          </>
        );

      case "entertainment":
        return (
          <>
            <h2>Plan an Outing</h2>
            <p>Create a simple plan for a movie or another activity.</p>
            <form
              className="service-action-form"
              onSubmit={(event) => {
                event.preventDefault();
                setNotice("Your outing plan has been created for this session.");
              }}
            >
              <label htmlFor="outing-activity">Activity</label>
              <select
                id="outing-activity"
                value={outing.activity}
                onChange={(event) => setOuting({ ...outing, activity: event.target.value })}
              >
                <option>Movie</option>
                <option>Park visit</option>
                <option>Family outing</option>
                <option>Community event</option>
                <option>Other activity</option>
              </select>

              <label htmlFor="outing-date">Date</label>
              <input
                id="outing-date"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={outing.date}
                onChange={(event) => setOuting({ ...outing, date: event.target.value })}
                required
              />

              <label htmlFor="outing-notes">Accessibility or other needs</label>
              <textarea
                id="outing-notes"
                rows="3"
                value={outing.notes}
                onChange={(event) => setOuting({ ...outing, notes: event.target.value })}
                placeholder="e.g. wheelchair access or captions"
              />

              <button className="service-primary-button" type="submit">Create Outing Plan</button>
            </form>
            {notice && <p className="service-feedback" role="status">{notice}</p>}
          </>
        );

      default:
        return <p>Please select a service.</p>;
    }
  }

  if (selectedService) {
    return (
      <main className="services-page">
        <section className="service-detail">
          <button type="button" className="service-back-button" onClick={goBack}>
            ← Back to All Services
          </button>
          <div className="service-detail-icon">{selectedService.icon}</div>
          <p className="services-eyebrow">AAROGYA SETU SUPPORT</p>
          <h1>{selectedService.title}</h1>
          <p className="service-detail-description">{selectedService.description}</p>
          {renderServiceContent()}
          <button type="button" className="service-back-button" onClick={goBack}>
            ← Explore Another Service
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="services-page">
      <section className="services-hero">
        <p className="section-eyebrow">OUR SERVICES</p>
        <h1>Support for Your Everyday Needs</h1>
        <p>
          Explore healthcare, caregiving, accessibility and daily living
          support through Aarogya Setu.
        </p>
      </section>

      <section className="services-list">
        <div className="services-heading">
          <h2>Discover Our Services</h2>
          <p>Select any card to open its interactive features.</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => openService(service)}
            />
          ))}
        </div>
      </section>

      <section className="services-help">
        <h2>Need more support?</h2>
        <p>Visit our community or contact us for more information.</p>
        <div className="services-help-buttons">
          <button type="button" onClick={() => onNavigate("community")}>
            Visit Community
          </button>
          <button
            type="button"
            className="services-contact-button"
            onClick={() => onNavigate("contact")}
          >
            Contact Us
          </button>
        </div>
      </section>
    </main>
  );
}

export default Services;
