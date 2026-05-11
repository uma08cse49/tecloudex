import "./Hero.css";

const ServicesHero = () => {
  return (
    <section className="page-hero">

      <div className="ph-grid"></div>

      <div className="ph-glow"></div>

      <div className="ph-left">

        <div className="ph-badge">
          <div className="ph-bd">✦</div>

          <span>
            6 Core Services · Full-Stack Digital
          </span>
        </div>

        <h1 className="ph-h">
          Every Service.
          <br />

          <span>One Agency.</span>
        </h1>

        <p className="ph-sub">
          Six interconnected disciplines engineered to work
          together — so your brand grows faster, smarter,
          and without gaps.
        </p>

        <div className="ph-btns">

          <a href="#services" className="btn-p">
            Start Exploring
          </a>

          <a href="/" className="btn-o">
            Back to Home
          </a>

        </div>

      </div>

      <div className="ph-right">

        <div className="hero-circle">

          <div className="circle center">
            NEXVORA
          </div>

          <div className="circle top">📈</div>
          <div className="circle right">🔍</div>
          <div className="circle bottom">🎨</div>
          <div className="circle left">🤖</div>

        </div>

      </div>

    </section>
  );
};

export default ServicesHero;