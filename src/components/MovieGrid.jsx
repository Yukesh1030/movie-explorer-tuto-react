
import { motion } from "motion/react";
import MovieCard from "./MovieCard";

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function MovieGrid({
  movies,
  favourites,
  onToggleFavourite,
  emptyMessage = "No movies found.",
}) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Movies Found</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="movie-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {movies.map((movie) => (
        <motion.div
          key={movie.id}
          variants={itemVariants}
        >
          <MovieCard
            movie={movie}
            isFavourite={favourites.includes(movie.id)}
            onToggleFavourite={onToggleFavourite}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default MovieGrid;
