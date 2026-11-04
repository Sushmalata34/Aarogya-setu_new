
import React, { useState } from "react";
import "./EmergencySOS.css";

function EmergencySOS({
  isOpen = false,
  onClose = () => {},
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  // SHARE LOCATION DIRECTLY ON WHATSAPP
  const shareMyLocation = () => {
    setMessage("");
    setLoading(true);

    if (!navigator.geolocation) {
      setLoading(false);
      setMessage(
        "Your browser does not support location sharing."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const mapsLink =
          `https://www.google.com/maps?q=${latitude},${longitude}`;

        const whatsappMessage = encodeURIComponent(
          `🚨 EMERGENCY! I need your help.\n\n` +
          `My current location is:\n${mapsLink}\n\n` +
          `Please help me immediately.`
        );

        const whatsappURL =
          `https://wa.me/?text=${whatsappMessage}`;

        setLoading(false);
        setMessage("Location found! Opening WhatsApp...");

        // Direct WhatsApp opening - NO BLANK TAB
        window.location.href = whatsappURL;
      },

      (error) => {
        setLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setMessage(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === error.TIMEOUT) {
          setMessage(
            "Location request timed out. Please try again."
          );
        } else {
          setMessage(
            "Unable to get your location. Please try again."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // CALL EMERGENCY HELPLINE
  const callEmergency = () => {
    window.location.href = "tel:112";
  };

  return (
    <div
      className="sos-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="sos-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sos-title"
      >

        {/* HEADER */}
        <div className="sos-header">

          <h2 id="sos-title">
            Emergency SOS
          </h2>

          <button
            className="sos-close"
            onClick={onClose}
            aria-label="Close emergency popup"
          >
            ×
          </button>

        </div>

        {/* BODY */}
        <div className="sos-body">

          {/* ALERT ICON */}
          <div className="sos-alert-icon">
            !
          </div>

          <h3>
            Do you need emergency assistance?
          </h3>

          <p className="sos-description">
            If you are in immediate danger, contact
            emergency services directly. You can share
            your location with your family or caregiver.
          </p>

          {/* SHARE LOCATION */}
          <button
            type="button"
            className="sos-share-btn"
            onClick={shareMyLocation}
            disabled={loading}
          >
            {loading
              ? "Getting Your Location..."
              : "Share My Location"}
          </button>

          {/* EMERGENCY CALL */}
          <button
            type="button"
            className="sos-call-btn"
            onClick={callEmergency}
          >
            Call Emergency Helpline (112)
          </button>

          {/* STATUS MESSAGE */}
          {message && (
            <p
              className="sos-status"
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          {/* CLOSE BUTTON */}
          <button
            type="button"
            className="sos-cancel-btn"
            onClick={onClose}
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}

export default EmergencySOS;
