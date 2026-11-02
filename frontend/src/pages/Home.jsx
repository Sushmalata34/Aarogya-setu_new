
import HeroSlider from "../components/HeroSlider";
import ServiceCard from "../components/ServiceCard";
import "../styles/Home.css";

const services = [
  {
    icon: "🏥",
    title: "Healthcare",
    description:
      "Explore healthcare support and find useful health resources.",
    page: "services",
  },
  {
    icon: "💊",
    title: "Medication",
    description:
      "Keep track of medicines and manage medication reminders.",
    page: "services",
  },
  {
    icon: "🤝",
    title: "Caregivers",
    description:
      "Discover caregiving support for everyday needs.",
    page: "services",
  },
  {
    icon: "💬",
    title: "Community",
    description:
      "Share experiences and connect with supportive people.",
    page: "community",
  },
  {
    icon: "💼",
    title: "Work & Earn",
    description:
      "Explore work opportunities and build your skills.",
    page: "work",
  },
  {
    icon: "🛍️",
    title: "Shopping & Essentials",
    description:
      "Find convenient support for daily essentials.",
    page: "services",
  },
];

function Home({ onNavigate = () => {}, onRegister = () => {} }) {
  return (
    <main className="home-page">
      <HeroSlider
        onExplore={() => onNavigate("services")}
        onRegister={onRegister}
      />

      <section className="home-welcome section-container">
        <p className="section-eyebrow">WELCOME TO AAROGYA SETU</p>

        <h2>
          Support for a healthier,
          <span> happier life.</span>
        </h2>

        <p className="welcome-description">
          Aarogya Setu aims to bring helpful services, community
          connections and accessible opportunities together in one place
          for elderly people, persons with disabilities and caregivers.
        </p>

        <div className="welcome-highlights">
          <div className="welcome-highlight">
            <span>💙</span>
            <h3>Care with Compassion</h3>
            <p>Support designed around people's everyday needs.</p>
          </div>

          <div className="welcome-highlight">
            <span>♿</span>
            <h3>Accessibility for All</h3>
            <p>A welcoming experience for people with different abilities.</p>
          </div>

          <div className="welcome-highlight">
            <span>🌐</span>
            <h3>Connected Community</h3>
            <p>Encouraging people to connect, share and support one another.</p>
          </div>
        </div>
      </section>

      <section className="home-services section-container">
        <div className="section-heading">
          <p className="section-eyebrow">WHAT WE OFFER</p>
          <h2>Explore Our Services</h2>
          <p>
            Discover support and opportunities for your everyday needs.
          </p>
        </div>

        <div className="home-services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              service={service}
              onClick={() => onNavigate(service.page)}
            />
          ))}
        </div>

        <div className="home-services-action">
          <button
            className="home-explore-button"
            onClick={() => onNavigate("services")}
          >
            View All Services →
          </button>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <p className="section-eyebrow">BE PART OF OUR COMMUNITY</p>
          <h2>Every person deserves care and opportunity.</h2>
          <p>
            Join Aarogya Setu to explore services and connect with others.
          </p>
        </div>

        <button onClick={onRegister}>Get Started</button>
      </section>
    </main>
  );
}

export default Home;
