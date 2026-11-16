import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Play, Info, Heart, Check, Volume2, VolumeX } from "lucide-react";
import { movies } from "../data/MovieData";
import heroBackground from "../assets/backgrounds/hero-bg.webp";
import CoverflowCarousel from "../components/CoverflowCarousel";
import NetflixRow from "../components/NetflixRow";
import MovieModal from "../components/MovieModal";

function Home({ favourites, onToggleFavourite }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Top scroll progress animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Billboard featured movie
  const billboardMovie = movies.find((m) => m.title === "Stranger Things") || movies[0];
  const isBillboardFav = favourites.includes(billboardMovie.id);

  // Categorized content
  const trendingMovies = movies.filter((m) => m.trending);
  const top10Movies = [...movies]
    .filter((m) => m.top10Rank !== null)
    .sort((a, b) => (a.top10Rank || 99) - (b.top10Rank || 99));

  const originals = movies.filter((m) => m.isOriginal);
  const scifiActionMovies = movies.filter((m) => m.genre === "Sci-Fi" || m.genre === "Action");
  const dramas = movies.filter((m) => m.genre === "Drama" || m.genre === "Adventure");

  // Coverflow movies (top picks)
  const coverflowMovies = [
    movies.find((m) => m.title === "Inception"),
    movies.find((m) => m.title === "The Dark Knight"),
    movies.find((m) => m.title === "Stranger Things"),
    movies.find((m) => m.title === "Interstellar"),
    movies.find((m) => m.title === "Squid Game"),
    movies.find((m) => m.title === "Money Heist"),
    movies.find((m) => m.title === "The Matrix"),
    movies.find((m) => m.title === "Gladiator"),
  ].filter(Boolean);

  return (
    <main className="netflix-home">
      {/* Top Scroll Progress Bar */}
      <motion.div className="netflix-scroll-progress" style={{ scaleX }} />

      {/* STACKLY BILLBOARD / HERO SECTION (SLIGHTLY BIGGER) */}
      <section
        className="netflix-billboard"
        style={{
          backgroundImage: `
            linear-gradient(78deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.7) 48%, rgba(0,0,0,0.15) 85%),
            linear-gradient(180deg, rgba(20,20,20,0) 60%, #141414 100%),
            url(${heroBackground})
          `,
        }}
      >
        <div className="billboard-vignette" />

        <div className="billboard-content">
          {/* STACKLY Series Tag */}
          <motion.div
            className="billboard-series-tag"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="stackly-badge">STACKLY</span>
            <span>ORIGINAL SERIES</span>
            <span className="bullet-sep">•</span>
            <span className="award-text">TOP #1 TODAY</span>
          </motion.div>

          {/* Billboard Title */}
          <motion.h1
            className="billboard-title"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {billboardMovie.title}
          </motion.h1>

          {/* Billboard Meta */}
          <motion.div
            className="billboard-meta-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span className="billboard-match">{billboardMovie.match}</span>
            <span className="billboard-maturity">{billboardMovie.maturity}</span>
            <span className="billboard-duration">{billboardMovie.duration}</span>
            <span className="billboard-quality">4K Ultra HD</span>
            <span className="billboard-quality">Dolby Atmos</span>
          </motion.div>

          {/* Billboard Description */}
          <motion.p
            className="billboard-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {billboardMovie.description}
          </motion.p>

          {/* Billboard Action Buttons */}
          <motion.div
            className="billboard-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <button
              className="netflix-btn-play"
              onClick={() => handleOpenModal(billboardMovie)}
            >
              <Play size={22} fill="currentColor" />
              <span>Play Now</span>
            </button>

            <button
              className="netflix-btn-secondary"
              onClick={() => handleOpenModal(billboardMovie)}
            >
              <Info size={22} />
              <span>More Info</span>
            </button>

            <button
              className={`netflix-btn-secondary ${isBillboardFav ? "in-list" : ""}`}
              onClick={() => onToggleFavourite(billboardMovie.id)}
              title={isBillboardFav ? "In My List" : "Add to My List"}
            >
              {isBillboardFav ? <Check size={22} /> : <Heart size={22} />}
              <span>{isBillboardFav ? "In My List" : "Add to List"}</span>
            </button>
          </motion.div>
        </div>

        {/* Billboard Right Side Controls */}
        <div className="billboard-right-meta">
          <button
            className="billboard-audio-btn"
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="billboard-age-badge">16+</div>
        </div>
      </section>

      {/* MOTION UI 3D COVERFLOW SECTION */}
      <CoverflowCarousel
        movies={coverflowMovies}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
        onSelectMovie={handleOpenModal}
      />

      {/* STACKLY CONTENT ROWS */}
      <div className="netflix-rows-wrapper">
        {/* ROW 1: Trending Now */}
        <NetflixRow
          title="Trending on STACKLY"
          movies={trendingMovies}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
          onSelectMovie={handleOpenModal}
        />

        {/* ROW 2: Top 10 in Movies Today */}
        <NetflixRow
          title="Top 10 on STACKLY Today"
          movies={top10Movies}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
          onSelectMovie={handleOpenModal}
          isTop10={true}
        />

        {/* ROW 3: STACKLY Originals & Exclusive Series */}
        <NetflixRow
          title="Only on STACKLY • Originals"
          movies={originals}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
          onSelectMovie={handleOpenModal}
        />

        {/* ROW 4: Action & Sci-Fi Blockbusters */}
        <NetflixRow
          title="Sci-Fi & Action Blockbusters"
          movies={scifiActionMovies}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
          onSelectMovie={handleOpenModal}
        />

        {/* ROW 5: Critically Acclaimed Dramas */}
        <NetflixRow
          title="Critically Acclaimed Dramas"
          movies={dramas}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
          onSelectMovie={handleOpenModal}
        />
      </div>

      {/* Detail Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isFavourite={favourites.includes(selectedMovie?.id)}
        onToggleFavourite={onToggleFavourite}
        allMovies={movies}
        onSelectSimilar={handleOpenModal}
      />
    </main>
  );
}

export default Home;
