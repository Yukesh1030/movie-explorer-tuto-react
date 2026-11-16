import { motion } from "motion/react";
import { Heart, Star, Play, Info } from "lucide-react";

function MovieCard({ movie, isFavourite, onToggleFavourite, onSelectMovie }) {
  return (
    <motion.article
      className="netflix-grid-card"
      whileHover={{
        y: -8,
        scale: 1.04,
      }}
      transition={{
        duration: 0.28,
        ease: "easeOut",
      }}
      onClick={() => onSelectMovie && onSelectMovie(movie)}
    >
      {/* Movie Poster */}
      <div className="netflix-poster-box">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="netflix-grid-poster"
          loading="lazy"
        />

        {/* STACKLY Badge or Rating Tag */}
        {movie.isOriginal ? (
          <div className="netflix-card-n-badge">
            <span className="stackly-card-logo">STACKLY</span>
          </div>
        ) : (
          <div className="netflix-card-rating">
            <Star size={13} fill="#E50914" color="#E50914" />
            <span>{movie.rating}</span>
          </div>
        )}

        {/* Favourite Button (Sleek Squircle / Rounded-MD) */}
        <motion.button
          className={`netflix-card-fav-btn ${isFavourite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(movie.id);
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          aria-label={
            isFavourite ? "Remove from My List" : "Add to My List"
          }
          title={isFavourite ? "In My List" : "Add to My List"}
        >
          <Heart
            size={18}
            fill={isFavourite ? "currentColor" : "none"}
          />
        </motion.button>

        {/* Hover Quick Action Overlay */}
        <div className="netflix-card-overlay">
          <div className="card-overlay-actions">
            <motion.button
              className="card-action-btn play-rect-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectMovie) onSelectMovie(movie);
              }}
              title="Play"
              aria-label="Play"
            >
              <Play size={16} fill="currentColor" />
            </motion.button>

            <motion.button
              className="card-action-btn info-rect-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectMovie) onSelectMovie(movie);
              }}
              title="Details"
              aria-label="Details"
            >
              <Info size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Movie Information */}
      <div className="netflix-card-meta">
        <div className="card-top-line">
          <span className="card-match-score">{movie.match || "98% Match"}</span>
          <span className="card-maturity-badge">{movie.maturity || "16+"}</span>
        </div>

        <h3 className="netflix-card-title">{movie.title}</h3>

        <div className="card-bottom-line">
          <span>{movie.year}</span>
          <span className="netflix-dot">•</span>
          <span>{movie.duration}</span>
          <span className="netflix-dot">•</span>
          <span className="card-genre-name">{movie.genre}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default MovieCard;
