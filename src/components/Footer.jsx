import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Tv, Sparkles, ShieldCheck } from "lucide-react";
import brandLogo from "../assets/icons/Brand-logo.webp";

function Footer() {
  const [serviceCodeCopied, setServiceCodeCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.("STACKLY-CINEMA-8921");
    setServiceCodeCopied(true);
    setTimeout(() => setServiceCodeCopied(false), 2000);
  };

  return (
    <footer className="stackly-footer">
      <div className="footer-top-accent" />

      <div className="footer-container">
        {/* Top Section: Brand & Intro */}
        <div className="footer-brand-section">
          <div className="footer-brand-header">
            <Link to="/" className="footer-brand" aria-label="STACKLY Home">
              <img
                src={brandLogo}
                alt="STACKLY"
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-brand-tagline">
              Your premier cinematic universe for blockbuster movies, exclusive original series, and cutting-edge 3D Coverflow experiences in 4K Ultra HD.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="footer-feature-badges">
            <div className="footer-badge-item">
              <Sparkles size={14} />
              <span>4K Ultra HD</span>
            </div>
            <div className="footer-badge-item">
              <Tv size={14} />
              <span>Dolby Atmos</span>
            </div>
            <div className="footer-badge-item">
              <ShieldCheck size={14} />
              <span>Ad-Free Streaming</span>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-grid">
          {/* Column 1: Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/explore">Explore Catalog</Link>
              </li>
              <li>
                <Link to="/favourites">My Watchlist</Link>
              </li>
              <li>
                <Link to="/explore?category=Trending">Trending on STACKLY</Link>
              </li>
              <li>
                <Link to="/explore?category=Originals">STACKLY Originals</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Genres */}
          <div className="footer-col">
            <h4 className="footer-col-title">Top Genres</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/explore?category=Action">Action Blockbusters</Link>
              </li>
              <li>
                <Link to="/explore?category=Sci-Fi">Sci-Fi & Cyberpunk</Link>
              </li>
              <li>
                <Link to="/explore?category=Drama">Award-Winning Drama</Link>
              </li>
              <li>
                <Link to="/explore?category=Adventure">Adventure & Fantasy</Link>
              </li>
              <li>
                <Link to="/explore?category=Trending">Top 10 Today</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="footer-col">
            <h4 className="footer-col-title">Support & Tech</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#help" onClick={(e) => e.preventDefault()}>Help Centre</a>
              </li>
              <li>
                <a href="#devices" onClick={(e) => e.preventDefault()}>Supported Devices</a>
              </li>
              <li>
                <a href="#audio" onClick={(e) => e.preventDefault()}>Audio & Subtitles</a>
              </li>
              <li>
                <a href="#speed" onClick={(e) => e.preventDefault()}>Speed Test</a>
              </li>
              <li>
                <a href="#account" onClick={(e) => e.preventDefault()}>Account Settings</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Policy */}
          <div className="footer-col">
            <h4 className="footer-col-title">Legal & Privacy</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Use</a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              </li>
              <li>
                <a href="#cookies" onClick={(e) => e.preventDefault()}>Cookie Preferences</a>
              </li>
              <li>
                <a href="#corporate" onClick={(e) => e.preventDefault()}>Corporate Information</a>
              </li>
              <li>
                <a href="#legal" onClick={(e) => e.preventDefault()}>Legal Notices</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Bar: Controls & Social Links */}
        <div className="footer-middle-bar">
          <div className="footer-actions-left">
            {/* Language Selector */}
            <div className="footer-lang-pill">
              <Globe size={15} />
              <span>English (US)</span>
            </div>

            {/* Service Code Button (Netflix-style) */}
            <button
              className="footer-service-code-btn"
              onClick={handleCopyCode}
              title="Click to copy diagnostic code"
            >
              {serviceCodeCopied ? "CODE COPIED ✓" : "SERVICE CODE"}
            </button>
          </div>

          {/* Social Links (Non-rounded modern squircles) */}
          <div className="footer-social-links" aria-label="Social media links">
            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="X (Twitter)"
              title="X"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="YouTube"
              title="YouTube"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} STACKLY Cinema, Inc. All cinematic trademarks and movie assets are properties of their respective rights holders.
          </p>

          <p className="footer-subtext">
            Engineered with React, Vite & Framer Motion. Built for cinematic immersion.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
