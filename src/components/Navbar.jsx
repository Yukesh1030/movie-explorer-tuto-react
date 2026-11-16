import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, X, Menu, House, Compass, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import brandLogo from "../assets/icons/Brand-logo.webp";

function Navbar({ favouriteCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: House },
    { name: "Explore Movies", path: "/explore", icon: Compass },
    { name: "My List", path: "/favourites", icon: Heart },
  ];

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Left Side: STACKLY Brand Logo */}
        <div className="nav-left">
          <NavLink to="/" className="brand" aria-label="STACKLY Home">
            <img
              src={brandLogo}
              alt="STACKLY"
              className="brand-logo-img"
            />
          </NavLink>
        </div>

        {/* Center: The 3 Navigation Links */}
        <nav className="desktop-nav-centered">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span>{link.name}</span>
              {link.path === "/favourites" && favouriteCount > 0 && (
                <span className="nav-count">{favouriteCount}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Side: Sleek Search Control */}
        <div className="nav-right">
          <div className={`nav-search-box ${searchOpen ? "open" : ""}`}>
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="nav-search-form">
                <Search size={18} className="search-icon-inside" />
                <input
                  type="text"
                  placeholder="Titles, people, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  onBlur={() => {
                    if (!searchQuery) setSearchOpen(false);
                  }}
                />
                <button
                  type="button"
                  className="search-close-btn"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                className="nav-search-trigger-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                title="Search"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "mobile-nav-link active" : "mobile-nav-link"
                }
              >
                <link.icon size={18} />
                <span>{link.name}</span>
                {link.path === "/favourites" && (
                  <span className="mobile-count">{favouriteCount}</span>
                )}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
