import React from 'react';
import './Marquee.css';

const CLIENTS = [
  'Stripe', 'Notion', 'Figma', 'Shopify', 'HubSpot',
  'Salesforce', 'Adobe', 'Atlassian', 'Twilio', 'Zendesk',
  'Intercom', 'Webflow', 'Vercel', 'Linear', 'Loom'
];

const MarqueeSection = () => {
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="marquee-section">
      <p className="marquee-label">Trusted by category-defining companies</p>
      <div className="marquee-track">
        {doubled.map((name, i) => (
          <div className="marquee-item" key={i}>
            <span>{name}</span>
            <span className="marquee-dot" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;
