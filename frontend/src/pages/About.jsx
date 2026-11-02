
import "../styles/About.css";

function About({ onNavigate = () => {} }) {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="section-eyebrow">ABOUT AAROGYA SETU</p>
        <h1>Care, Connection & Support for Everyone</h1>
        <p>
          Our aim is to make everyday support, accessible services
          and meaningful connections easier to discover.
        </p>
        <button onClick={() => onNavigate("services")}>
          Explore Our Services →
        </button>
      </section>

      <section className="about-intro">
        <div className="about-symbol" aria-hidden="true">💙</div>
        <div>
          <p className="section-eyebrow">WHO WE ARE</p>
          <h2>A platform built around care and inclusion</h2>
          <p>
            Aarogya Setu is a project designed to bring helpful
            services into one accessible place. It focuses on
            elderly people, persons with disabilities and caregivers.
          </p>
          <p>
            The platform brings together healthcare information,
            medication support, community connections and work
            opportunities to help people find relevant resources.
          </p>
        </div>
      </section>

      <section className="about-mission">
        <article>
          <span>🎯</span>
          <h3>Our Mission</h3>
          <p>
            To make support and useful information easier to access
            for people with different needs.
          </p>
        </article>

        <article>
          <span>🌟</span>
          <h3>Our Vision</h3>
          <p>
            To encourage a more inclusive community where everyone
            feels valued, supported and connected.
          </p>
        </article>

        <article>
          <span>🤝</span>
          <h3>Our Values</h3>
          <p>
            Compassion, accessibility, respect, independence and
            community participation.
          </p>
        </article>
      </section>

      <section className="about-commitment">
        <h2>Everyone deserves a helping hand.</h2>
        <p>
          Explore the platform and discover the services and
          opportunities designed to support everyday life.
        </p>
        <button onClick={() => onNavigate("community")}>
          Visit Community →
        </button>
      </section>
    </main>
  );
}

export default About;
