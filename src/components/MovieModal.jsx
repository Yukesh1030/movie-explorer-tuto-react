import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Heart, Star, Check, Sparkles } from "lucide-react";

function MovieModal({ movie, isOpen, onClose, isFavourite, onToggleFavourite, allMovies = [], onSelectSimilar }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  // Find similar movies
  const similarMovies = allMovies
    .filter((m) => m.id !== movie.id && (m.genre === movie.genre || m.category === movie.category))
    .slice(0, 3);

  return (
    <AnimatePresence>
      <div className="netflix-modal-backdrop" onClick={onClose}>
        <motion.div
          className="netflix-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Close Button (Modern Rectangular) */}
          <button
            className="netflix-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Modal Header with Hero Image */}
          <div className="netflix-modal-hero">
            <img
              src={movie.poster}
              alt={movie.title}
              className="netflix-modal-bg-img"
            />
            <div className="netflix-modal-gradient" />

            <div className="netflix-modal-hero-content">
              {movie.isOriginal && (
                <div className="modal-netflix-badge">
                  <span className="stackly-badge-sm">STACKLY</span>
                  <span>ORIGINAL SERIES</span>
                </div>
              )}

              <h2 className="modal-movie-title">{movie.title}</h2>

              <div className="modal-hero-buttons">
                <button className="netflix-btn-play modal-play-btn">
                  <Play size={20} fill="currentColor" />
                  Play
                </button>

                <button
                  className={`modal-action-btn ${isFavourite ? "active" : ""}`}
                  onClick={() => onToggleFavourite(movie.id)}
                  title={isFavourite ? "Remove from My List" : "Add to My List"}
                  aria-label="Toggle favourite"
                >
                  {isFavourite ? <Check size={20} /> : <Heart size={20} />}
                </button>

                <div className="modal-rating-pill">
                  <Star size={16} fill="#E50914" color="#E50914" />
                  <span>{movie.rating} / 10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="netflix-modal-body">
            <div className="modal-body-grid">
              <div className="modal-left-info">
                <div className="modal-meta-row">
                  <span className="modal-match">{movie.match || "98% Match"}</span>
                  <span className="modal-year">{movie.year}</span>
                  <span className="modal-maturity">{movie.maturity || "16+"}</span>
                  <span className="modal-duration">{movie.duration}</span>
                  <span className="modal-badge-hd">HD</span>
                </div>

                <p className="modal-overview">{movie.description}</p>
              </div>

              <div className="modal-right-info">
                <div className="modal-info-item">
                  <span className="info-label">Director:</span>
                  <span className="info-value">{movie.director}</span>
                </div>

                <div className="modal-info-item">
                  <span className="info-label">Genre:</span>
                  <span className="info-value">{movie.genre}</span>
                </div>

                <div className="modal-info-item">
                  <span className="info-label">Tags:</span>
                  <div className="modal-tag-cloud">
                    {movie.tags?.map((tag, idx) => (
                      <span key={idx} className="modal-tag-item">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* More Like This Section */}
            {similarMovies.length > 0 && (
              <div className="modal-recommendations">
                <h3>
                  <Sparkles size={18} />
                  More Like This
                </h3>
                <div className="modal-recommendations-grid">
                  {similarMovies.map((sim) => (
                    <div
                      key={sim.id}
                      className="rec-card"
                      onClick={() => onSelectSimilar && onSelectSimilar(sim)}
                    >
                      <div className="rec-poster-wrapper">
                        <img
                          src={sim.poster}
                          alt={sim.title}
                          className="rec-poster"
                          loading="lazy"
                        />
                        <div className="rec-rating">
                          <Star size={12} fill="#E50914" color="#E50914" />
                          <span>{sim.rating}</span>
                        </div>
                      </div>
                      <div className="rec-info">
                        <span className="rec-match">{sim.match}</span>
                        <h4>{sim.title}</h4>
                        <p>{sim.description.slice(0, 80)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default MovieModal;
