import sunflowerField from "../assets/sunflower-field.jpg";

export default function LandingPage({ onGetStarted, onSignIn }) {
  const crops = ["Sunflower", "Soybean", "Groundnut", "Sesame", "Canola"];
  const steps = [
    {
      number: "01",
      title: "Agree before planting",
      text: "Farmer and buyer set the crop, acreage, expected volume, quality, price terms, and delivery plan."
    },
    {
      number: "02",
      title: "Plan the season",
      text: "Record the agreement and clarify any seed, input, or agronomy support and how it will be handled."
    },
    {
      number: "03",
      title: "Grow with visibility",
      text: "Track field activities and crop progress so both sides can prepare for the expected harvest."
    },
    {
      number: "04",
      title: "Deliver on clear terms",
      text: "Harvested produce is checked and delivered at the agreed place, quality, and time; payment follows the contract."
    }
  ];

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-brand" aria-label="AGUNITY home">
          <span className="brand-mark">A</span>
          <span>AGUNITY</span>
        </div>

        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#oil-crops">Oil crops</a>
          <a href="#contract-terms">Contract terms</a>
        </nav>

        <div className="landing-actions">
          <button type="button" className="landing-signin" onClick={onSignIn}>Sign in</button>
          <button type="button" className="primary-btn" onClick={onGetStarted}>Join as a grower</button>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-hero" id="platform">
          <img className="hero-image" src={sunflowerField} alt="Sunflower crop field at harvest season" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <span className="hero-kicker">AGUNITY · OIL-CROP CONTRACTS</span>
            <h1>Grow sunflower with a buyer in mind.</h1>
            <p>
              Plan your season around clear crop, quality, price, and delivery terms. AGUNITY brings
              oil-crop producers and buyers together to build more dependable supply relationships.
            </p>
            <div className="cta-row">
              <button type="button" className="primary-btn hero-cta" onClick={onGetStarted}>Join as a grower</button>
              <a className="hero-secondary" href="#how-it-works">Understand contract farming <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="hero-caption">Sunflower field · Photo: Summer Stock / Pexels · CC0</div>
        </section>

        <section className="crop-strip" id="oil-crops" aria-labelledby="crop-strip-title">
          <p id="crop-strip-title">OIL CROPS IN FOCUS</p>
          <div className="crop-list">
            {crops.map((crop) => <span key={crop}>{crop}</span>)}
          </div>
        </section>

        <section className="landing-section contract-section" id="how-it-works">
          <div className="section-heading">
            <span className="eyebrow">A clearer path from seed to sale</span>
            <h2>What is contract farming?</h2>
            <p>
              It is an agreement made before a crop is grown. A farmer commits to produce and deliver
              an agreed crop; a buyer commits to purchase it under terms both sides have reviewed.
              Any input or advisory support should be written into the same agreement.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <article className="contract-step" key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contract-terms" id="contract-terms">
          <div className="terms-heading">
            <span className="eyebrow">Before you sign</span>
            <h2>Good contracts make the details plain.</h2>
            <p>Both growers and buyers should understand the full deal before the season begins.</p>
          </div>
          <ul className="terms-list">
            <li><span>01</span><div><strong>Crop and quantity</strong><p>Variety, acreage, expected volume, and what happens if weather changes the yield.</p></div></li>
            <li><span>02</span><div><strong>Quality and grading</strong><p>Moisture, cleanliness, grading method, and how rejected produce is handled.</p></div></li>
            <li><span>03</span><div><strong>Price and deductions</strong><p>Price or pricing formula, payment date, and any input-loan deductions stated clearly.</p></div></li>
            <li><span>04</span><div><strong>Delivery and support</strong><p>Collection point, transport responsibility, and any seed, input, or field support offered.</p></div></li>
          </ul>
        </section>

        <section className="landing-cta" id="market">
          <div>
            <span className="eyebrow">For growers and buyers</span>
            <h2>Build a season around a fair agreement.</h2>
            <p>Start a grower account to explore the platform, or sign in to your existing workspace.</p>
          </div>
          <div className="cta-row">
            <button type="button" className="primary-btn" onClick={onGetStarted}>Join as a grower</button>
            <button type="button" className="secondary-btn" onClick={onSignIn}>Sign in</button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <span>AGUNITY · Oil-crop grower and buyer network</span>
        <a href="#platform">Back to top ↑</a>
      </footer>
    </div>
  );
}
