import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Compass, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { movies } from "../data/MovieData";
import MovieGrid from "../components/MovieGrid";
import MovieModal from "../components/MovieModal";

function Favourites({ favourites, onToggleFavourite }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Favourited movies
  const favouriteMovies = movies.filter((movie) =>
    favourites.includes(movie.id)
  );

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <main className="netflix-favourites-page">
      {/* Header */}
      <motion.section
        className="favourites-hero-banner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="favourites-badge-pill">
          <Heart size={14} fill="#E50914" color="#E50914" />
          <span>YOUR STACKLY WATCHLIST</span>
        </div>

        <h1>
          My <span>List</span>
        </h1>

        <p>
          Curate your personal collection of cinematic masterpieces. Saved titles sync automatically and are ready to stream anytime.
        </p>

        <div className="favourites-count-pill">
          <CheckCircle2 size={16} />
          <span>{favouriteMovies.length} Titles Saved</span>
        </div>
      </motion.section>

      {/* Content */}
      <section className="favourites-grid-section">
        {favouriteMovies.length > 0 ? (
          <MovieGrid
            movies={favouriteMovies}
            favourites={favourites}
            onToggleFavourite={onToggleFavourite}
            onSelectMovie={handleOpenModal}
          />
        ) : (
          <motion.div
            className="netflix-empty-watchlist"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="empty-heart-ring">
              <Heart size={38} />
            </div>

            <h2>Your List is Empty</h2>

            <p>
              Explore our wide selection of movies and TV series, and click the heart icon on any title to add it to your personal watchlist.
            </p>

            <Link to="/explore" className="netflix-btn-play explore-cta">
              <Compass size={18} />
              Explore Catalog
            </Link>
          </motion.div>
        )}
      </section>

      {/* Detail Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFavourite={favourites.includes(selectedMovie?.id)}
        onToggleFavourite={onToggleFavourite}
        allMovies={movies}
        onSelectSimilar={handleOpenModal}
      />
    </main>
  );
}

export default Favourites;
