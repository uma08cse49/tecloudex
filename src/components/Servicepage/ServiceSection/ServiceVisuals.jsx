import React from "react";

export const AISVG = () => {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" stroke="blue" strokeWidth="4" fill="lightblue" />
      <text x="60" y="67" textAnchor="middle" fontSize="20" fill="black">
        AI
      </text>
    </svg>
  );
};

const ServiceVisuals = () => {
  return (
    <div className="service-visuals">
      <div className="visual-card">
        <h3>Creative Solutions</h3>
        <p>Modern digital marketing visuals and branding.</p>
      </div>
    </div>
  );
};

export default ServiceVisuals;