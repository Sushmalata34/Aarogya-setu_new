import "../styles/HeroSlider.css";
import { useEffect, useState } from "react";

const slides = [
  {
    label: "CARE • CONNECTION • SUPPORT",
    title: "Care that connects.",
    highlight: "Support that matters.",
    description:
      "A supportive platform for elderly people, persons with disabilities and caregivers.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "HEALTHCARE FOR EVERYONE",
    title: "Your health,",
    highlight: "our priority.",
    description:
      "Explore healthcare support, medication assistance and helpful services in one place.",
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "INDEPENDENCE • OPPORTUNITY",
    title: "Every ability",
    highlight: "deserves opportunity.",
    description:
      "Discover accessible work opportunities and connect with a caring community.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
  },
];

function HeroSlider({ onExplore = () => {}, onRegister = () => {} }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section
      className="hero-slider"
      style={{ backgroundImage: `url("${slide.image}")` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <p className="hero-label">{slide.label}</p>

          <h1>
            {slide.title}
            <br />
            <span>{slide.highlight}</span>
          </h1>

          <p className="hero-description">{slide.description}</p>

          <div className="hero-buttons">
            <button className="hero-primary-btn" onClick={onExplore}>
              Explore Services
            </button>

            <button className="hero-secondary-btn" onClick={onRegister}>
              Join Our Community
            </button>
          </div>

          <div className="hero-dots" aria-label="Choose banner">
            {slides.map((item, index) => (
              <button
                key={item.label}
                className={`hero-dot ${
                  currentSlide === index ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={currentSlide === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;
