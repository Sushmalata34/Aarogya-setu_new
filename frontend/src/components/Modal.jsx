import "../styles/Modal.css";
function Modal({
  isOpen = false,
  onClose = () => {},
  title = "Aarogya Setu",
  children,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-header">
          <h2>{title}</h2>

          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close popup"
          >
            ×
          </button>
        </div>

        <div className="modal-content">{children}</div>
      </section>
    </div>
  );
}

export default Modal;
