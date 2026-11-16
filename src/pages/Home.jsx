
import { motion } from "motion/react";
import { ArrowRight, Play, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { movies } from "../data/MovieData";
import heroBackground from "../assets/backgrounds/hero-bg.webp";
import MovieGrid from "../components/MovieGrid";

function Home({ favourites, onToggleFavourite }) {

  const trendingMovies = movies.filter(
    (movie) => movie.trending
  );

  const popularMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const featuredMovie = movies.find(
    (movie) => movie.title === "Inception"
  );

  return (
    <main className="home-page">

      {/* HERO SECTION */}

      <section
        className="hero-section"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(8,8,18,0.98) 0%,
              rgba(8,8,18,0.75) 50%,
              rgba(8,8,18,0.2) 100%
            ),
            linear-gradient(
              0deg,
              #0c0c16 0%,
              transparent 60%
            ),
            url(${heroBackground})
          `,
        }}
      >
        <div className="hero-content">

          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Sparkles size={15} />
            YOUR CINEMATIC UNIVERSE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover Stories.
            <br />
            Experience <span>Movies.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore extraordinary movies, discover hidden
            gems and create your own cinematic collection.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/explore" className="primary-btn">
              <Play size={17} fill="currentColor" />
              Explore Movies
            </Link>

            <Link to="/favourites" className="secondary-btn">
              My Favourites
            </Link>
          </motion.div>

          <motion.div
            className="hero-featured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Star size={17} fill="currentColor" />
            <span>Featured Pick</span>
            <span className="featured-title">
              {featuredMovie.title}
            </span>
            <span>{featuredMovie.rating}/10</span>
          </motion.div>

        </div>
      </section>

      {/* TRENDING MOVIES */}

      <section className="movie-section">

        <div className="section-heading">
          <div>
            <span className="section-eyebrow">WHAT'S POPULAR</span>
            <h2>Trending <span>Movies</span></h2>
          </div>

          <Link to="/explore" className="view-all-link">
            View All Movies <ArrowRight size={17} />
          </Link>
        </div>

        <MovieGrid
          movies={trendingMovies}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
        />

      </section>

      {/* POPULAR MOVIES */}

      <section className="movie-section">

        <div className="section-heading">
          <div>
            <span className="section-eyebrow">TOP RATED COLLECTION</span>
            <h2>Popular <span>Movies</span></h2>
          </div>

          <Link to="/explore" className="view-all-link">
            Explore More <ArrowRight size={17} />
          </Link>
        </div>

        <MovieGrid
          movies={popularMovies}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
        />

      </section>

    </main>
  );
}

export default Home;
