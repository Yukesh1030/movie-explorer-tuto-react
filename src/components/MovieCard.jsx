
import { motion } from "motion/react";
import { Heart, Star, Play } from "lucide-react";

function MovieCard({ movie, isFavourite, onToggleFavourite }) {
  return (
    <motion.article
      className="movie-card"
      whileHover={{
        y: -8,
        scale: 1.025,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {/* Movie Poster */}
      <div className="movie-poster-wrapper">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="movie-poster"
          loading="lazy"
        />

        {/* Rating */}
        <div className="movie-rating">
          <Star size={14} fill="currentColor" />
          <span>{movie.rating}</span>
        </div>

        {/* Favourite Button */}

        <motion.button
        className={`favourite-btn ${isFavourite ? "active" : ""}`}
        onClick={() => onToggleFavourite(movie.id)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.75, rotate: -15 }}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
        aria-label={
            isFavourite
            ? "Remove from favourites"
            : "Add to favourites"
        }
        >
        <motion.div
            animate={{
            scale: isFavourite ? [1, 1.35, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
        >
            <Heart
            size={19}
            fill={isFavourite ? "currentColor" : "none"}
            />
        </motion.div>
        </motion.button>


        {/* Hover Overlay */}
        <div className="movie-overlay">
          <motion.button
            className="quick-view-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={16} fill="currentColor" />
            Quick View
          </motion.button>
        </div>
      </div>

      {/* Movie Information */}
      <div className="movie-info">
        <h3>{movie.title}</h3>

        <div className="movie-meta">
          <span>{movie.year}</span>
          <span className="meta-dot">•</span>
          <span>{movie.genre}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default MovieCard;
