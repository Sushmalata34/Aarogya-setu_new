import "../styles/ServiceCard.css";
function ServiceCard({ service, onClick = () => {} }) {
  if (!service) return null;

  return (
    <article className="service-card">
      <div className="service-card-icon" aria-hidden="true">
        {service.icon || "💙"}
      </div>

      <h3>{service.title || service.name || "Our Service"}</h3>

      <p>
        {service.description ||
          "Explore support and helpful resources through Aarogya Setu."}
      </p>

      <button
        className="service-card-button"
        onClick={() => onClick(service)}
      >
        Explore Service <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}

export default ServiceCard;
