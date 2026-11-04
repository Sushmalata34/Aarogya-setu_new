
import HeroSlider from "../components/HeroSlider";
import "../styles/Home.css";

function Home({
  onNavigate = () => {},
  onRegister = () => {}
}) {
  return (
    <main className="home-page">

      {/* HERO SECTION */}
      <HeroSlider
        onExplore={() => onNavigate("services")}
        onRegister={onRegister}
      />

      {/* WELCOME SECTION */}
      <section className="home-welcome section-container">

        <p className="section-eyebrow">
          WELCOME TO AAROGYA SETU
        </p>

        <h2>
          Support for a healthier,
          <span> happier life.</span>
        </h2>

        <p className="welcome-description">
          Aarogya Setu aims to bring helpful services,
          community connections and accessible opportunities
          together in one place for elderly people, persons
          with disabilities and caregivers.
        </p>

        <div className="welcome-highlights">

          <div className="welcome-highlight">
            <span>💙</span>
            <h3>Care with Compassion</h3>
            <p>
              Support designed around people's everyday needs.
            </p>
          </div>

          <div className="welcome-highlight">
            <span>♿</span>
            <h3>Accessibility for All</h3>
            <p>
              A welcoming experience for people with different abilities.
            </p>
          </div>

          <div className="welcome-highlight">
            <span>🌐</span>
            <h3>Connected Community</h3>
            <p>
              Encouraging people to connect, share and support one another.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="home-cta">

        <div>
          <p className="section-eyebrow">
            BE PART OF OUR COMMUNITY
          </p>

          <h2>
            Every person deserves care and opportunity.
          </h2>

          <p>
            Join Aarogya Setu to explore services and connect with others.
          </p>
        </div>

        <button onClick={onRegister}>
          Get Started
        </button>

      </section>

    </main>
  );
}

export default Home;
