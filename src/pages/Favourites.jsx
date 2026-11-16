
import { motion } from "motion/react";
import { Heart, Film, Compass } from "lucide-react";
import { Link } from "react-router-dom";

import { movies } from "../data/MovieData";
import MovieGrid from "../components/MovieGrid";

function Favourites({ favourites, onToggleFavourite }) {

  // Get only favourited movies
  const favouriteMovies = movies.filter((movie) =>
    favourites.includes(movie.id)
  );

  return (
    <main className="favourites-page">

      {/* PAGE HEADER */}

      <motion.section
        className="favourites-header"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="favourites-icon">
          <Heart size={25} fill="currentColor" />
        </div>

        <span className="section-eyebrow">
          YOUR PERSONAL COLLECTION
        </span>

        <h1>
          My <span>Favourites</span>
        </h1>

        <p>
          Your handpicked collection of cinematic experiences.
          All your favourite movies in one place.
        </p>

        <div className="favourites-count">
          <Film size={17} />
          {favouriteMovies.length} Movies Saved
        </div>
      </motion.section>

      {/* FAVOURITE MOVIES */}

      <section className="favourites-content">

        {favouriteMovies.length > 0 ? (

          <MovieGrid
            movies={favouriteMovies}
            favourites={favourites}
            onToggleFavourite={onToggleFavourite}
            emptyMessage="Your collection is empty."
          />

        ) : (

          <motion.div
            className="favourites-empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="empty-heart">
              <Heart size={48} />
            </div>

            <h2>Your Watchlist is Empty</h2>

            <p>
              You haven't added any movies to your
              favourites yet. Discover amazing movies
              and save the ones you love!
            </p>

            <Link to="/explore" className="primary-btn">
              <Compass size={18} />
              Explore Movies
            </Link>

          </motion.div>

        )}

      </section>

    </main>
  );
}

export default Favourites;
