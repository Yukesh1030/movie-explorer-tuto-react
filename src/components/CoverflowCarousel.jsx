import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Heart, Info, Star } from "lucide-react";

function CoverflowCarousel({ movies, favourites, onToggleFavourite, onSelectMovie }) {
  const [activeIndex, setActiveIndex] = useState(2);
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Keep active index in bounds
  const total = movies.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const activeMovie = movies[activeIndex] || movies[0];
  const isFav = favourites.includes(activeMovie?.id);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % total);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Responsive calculations to strictly prevent overflow
  const isSmallMobile = windowWidth <= 480;
  const isMobile = windowWidth <= 768;

  const cardSpacing = isSmallMobile ? 75 : isMobile ? 115 : 190;
  const maxVisibleOffset = isSmallMobile ? 1 : isMobile ? 2 : 3;
  const rotationAngle = isSmallMobile ? 22 : isMobile ? 30 : 38;

  return (
    <section className="coverflow-section">
      <div className="coverflow-header">
        <div className="coverflow-tag">
          <span className="stackly-tag-badge">STACKLY</span>
          <span>MOTION 3D SHOWCASE</span>
        </div>
        <h2>Featured <span>3D Coverflow</span></h2>
        <p>Interactive 3D coverflow presentation with cinematic motion physics</p>
      </div>

      <div
        className="coverflow-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons (Desktop & Tablet) */}
        <button
          className="coverflow-nav-btn prev"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="coverflow-nav-btn next"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* 3D Stage */}
        <div className="coverflow-stage">
          {movies.map((movie, index) => {
            let offset = index - activeIndex;

            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCurrent = offset === 0;
            const isVisible = Math.abs(offset) <= maxVisibleOffset;

            if (!isVisible) return null;

            const rotateY = offset === 0 ? 0 : offset < 0 ? rotationAngle : -rotationAngle;
            const translateX = offset * cardSpacing;
            const translateZ = offset === 0
              ? (isMobile ? 50 : 120)
              : -Math.abs(offset) * (isMobile ? 40 : 80);

            const scale = offset === 0
              ? 1.05
              : Math.max(0.72, 1 - Math.abs(offset) * (isMobile ? 0.18 : 0.14));

            const opacity = offset === 0
              ? 1
              : Math.max(0.35, 1 - Math.abs(offset) * (isMobile ? 0.35 : 0.25));

            const zIndex = 20 - Math.abs(offset);

            return (
              <motion.div
                key={movie.id}
                className={`coverflow-card ${isCurrent ? "active-card" : ""}`}
                style={{
                  zIndex,
                }}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                  mass: 0.8,
                }}
                onClick={() => {
                  if (offset !== 0) {
                    setActiveIndex(index);
                  } else if (onSelectMovie) {
                    onSelectMovie(movie);
                  }
                }}
                whileHover={
                  isCurrent && !isMobile
                    ? {
                        scale: 1.1,
                        y: -6,
                        transition: { duration: 0.25 },
                      }
                    : {}
                }
              >
                <div className="coverflow-poster-wrapper">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="coverflow-poster"
                    loading="lazy"
                  />
                  <div className="coverflow-poster-gradient" />

                  {/* STACKLY Badge / Tag */}
                  {movie.isOriginal ? (
                    <div className="card-top-tag original-tag">
                      <span className="s-logo">STACKLY</span>
                    </div>
                  ) : movie.top10Rank ? (
                    <div className="card-top-tag top10-tag">
                      TOP 10
                    </div>
                  ) : null}

                  {/* Rating Tag */}
                  <div className="coverflow-rating-badge">
                    <Star size={12} fill="#E50914" color="#E50914" />
                    <span>{movie.rating}</span>
                  </div>

                  {/* Center Play Button on Hover */}
                  {isCurrent && (
                    <div className="coverflow-card-overlay">
                      <button
                        className="coverflow-play-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectMovie) onSelectMovie(movie);
                        }}
                        aria-label="Play"
                      >
                        <Play size={20} fill="currentColor" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="coverflow-card-caption">
                  <h4>{movie.title}</h4>
                  <div className="caption-meta">
                    <span className="caption-match">{movie.match || "98% Match"}</span>
                    <span className="caption-dot">•</span>
                    <span>{movie.year}</span>
                    <span className="caption-dot">•</span>
                    <span>{movie.genre}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots Pagination */}
        <div className="coverflow-dots">
          {movies.slice(0, Math.min(8, movies.length)).map((movie, idx) => (
            <button
              key={movie.id}
              className={`coverflow-dot ${idx === (activeIndex % 8) ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Detail Panel for Active Movie */}
      <AnimatePresence mode="wait">
        {activeMovie && (
          <motion.div
            key={activeMovie.id}
            className="coverflow-detail-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <div className="detail-meta-row">
              <span className="detail-match">{activeMovie.match || "98% Match"}</span>
              <span className="detail-maturity">{activeMovie.maturity || "16+"}</span>
              <span className="detail-duration">{activeMovie.duration}</span>
              <span className="detail-quality">Ultra HD 4K</span>
            </div>

            <h3 className="detail-title">{activeMovie.title}</h3>

            <p className="detail-desc">{activeMovie.description}</p>

            <div className="detail-tags">
              {activeMovie.tags?.map((tag, idx) => (
                <span key={idx} className="detail-tag-pill">
                  {tag}
                </span>
              ))}
            </div>

            <div className="detail-actions">
              <button
                className="netflix-btn-play"
                onClick={() => onSelectMovie && onSelectMovie(activeMovie)}
              >
                <Play size={18} fill="currentColor" />
                Play Now
              </button>

              <button
                className={`netflix-btn-secondary ${isFav ? "in-list" : ""}`}
                onClick={() => onToggleFavourite(activeMovie.id)}
              >
                <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                {isFav ? "In My List" : "Add to My List"}
              </button>

              <button
                className="netflix-btn-secondary info-btn"
                onClick={() => onSelectMovie && onSelectMovie(activeMovie)}
              >
                <Info size={18} />
                More Details
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CoverflowCarousel;
