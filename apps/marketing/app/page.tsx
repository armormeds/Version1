export default function Page() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Telehealth home">
          <span className="brand-mark" aria-hidden="true">
            +
          </span>
          <span>TELEHEALTH</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#process">How it works</a>
          <a href="#standards">Our standards</a>
          <a className="button button-small button-ghost" href="/sign-in">
            Sign in
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">PRIVATE · PROFESSIONAL · CONVENIENT</p>
            <h1>Care that meets you where you are.</h1>
            <p className="lede">
              Connect with an independent licensed provider through a secure,
              straightforward telehealth experience.
            </p>
            <div className="actions">
              <a className="button button-primary" href="#process">
                Explore the process
              </a>
              <a className="text-link" href="#standards">
                Learn about our standards <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="review-note">
              Services and eligibility vary by jurisdiction. A provider
              determines whether care is appropriate.
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <img src="/care-illustration.svg" alt="" width="680" height="720" />
            <div className="privacy-card">
              <span>✓</span>
              <strong>Designed for privacy</strong>
              <small>Secure portal communication</small>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Platform principles">
          <p>
            <strong>Licensed providers</strong>
            <span>Jurisdiction-aware care</span>
          </p>
          <p>
            <strong>Secure by design</strong>
            <span>Private portal communication</span>
          </p>
          <p>
            <strong>Clear next steps</strong>
            <span>Transparent care process</span>
          </p>
        </section>

        <section className="process" id="process">
          <div className="section-heading">
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>A thoughtful process, from start to finish.</h2>
          </div>
          <ol className="step-grid">
            <li>
              <span>01</span>
              <h3>Tell us what you need</h3>
              <p>
                Complete a secure intake so the care team has the information
                required for review.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Meet your provider</h3>
              <p>
                An eligible licensed provider reviews your information and
                discusses appropriate options.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Follow your care plan</h3>
              <p>
                Access next steps and secure messages in your private patient
                portal.
              </p>
            </li>
          </ol>
        </section>

        <section className="standards" id="standards">
          <p className="eyebrow">OUR STANDARD</p>
          <h2>Clinical decisions stay with licensed providers.</h2>
          <p>
            Payment does not determine treatment, eligibility, or prescribing.
            Care decisions are made independently based on a provider’s
            professional judgment.
          </p>
        </section>
      </main>

      <footer>
        <span>TELEHEALTH</span>
        <p>
          Informational scaffold only. Clinical and legal content requires human
          review before publication.
        </p>
      </footer>
    </>
  );
}
