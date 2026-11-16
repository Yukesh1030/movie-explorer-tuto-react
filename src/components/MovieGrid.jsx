import { motion } from "motion/react";
import MovieCard from "./MovieCard";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: "easeOut",
    },
  },
};

function MovieGrid({
  movies,
  favourites,
  onToggleFavourite,
  onSelectMovie,
  emptyMessage = "No movies found matching your criteria.",
}) {
  if (movies.length === 0) {
    return (
      <div className="netflix-empty-state">
        <div className="empty-icon-box">🍿</div>
        <h3>No Titles Found</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  // Use a composite key derived from the movie IDs so the animation resets reliably
  const gridKey = movies.map((m) => m.id).join("-");

  return (
    <motion.div
      key={gridKey}
      className="netflix-movie-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {movies.map((movie) => (
        <motion.div key={movie.id} variants={itemVariants}>
          <MovieCard
            movie={movie}
            isFavourite={favourites.includes(movie.id)}
            onToggleFavourite={onToggleFavourite}
            onSelectMovie={onSelectMovie}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default MovieGrid;
