import './Process.css';

const steps = [
  'Research & Planning',
  'Design & Prototyping',
  'Development',
  'Testing & Launch'
];

const Process = () => {
  return (
    <section className="process-section">

      <div className="section-title">
        <span>PROCESS</span>
        <h2>How We Work</h2>
      </div>

      <div className="process-grid">

        {steps.map((step, index) => (
          <div className="process-card" key={index}>

            <div className="process-number">
              0{index + 1}
            </div>

            <h3>{step}</h3>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Process;