
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Film, Heart, Compass, House, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function Navbar({ favouriteCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/", icon: House },   
    { name: "Explore Movies", path: "/explore", icon: Compass },
    { name: "Favourites", path: "/favourites", icon: Heart },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">

        <NavLink to="/" className="brand">
          <Film size={27} />
          <span>CINE<span className="brand-highlight">VERSE</span></span>
        </NavLink>

        <nav className="desktop-nav">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.name}
              {link.path === "/favourites" && (
                <span className="nav-count">{favouriteCount}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {links.map((link) => (
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
                {link.name}
                {link.path === "/favourites" && ` (${favouriteCount})`}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
