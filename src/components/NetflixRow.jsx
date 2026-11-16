import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Heart, Info, Star } from "lucide-react";
import { Link } from "react-router-dom";

function NetflixRow({
  title,
  movies,
  favourites,
  onToggleFavourite,
  onSelectMovie,
  isTop10 = false,
  viewAllLink = "/explore"
}) {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const slide = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.section
      className="netflix-row-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="netflix-row-header">
        <h3 className="netflix-row-title">
          {title}
          <Link to={viewAllLink} className="netflix-row-explore-link">
            Explore All <ChevronRight size={16} />
          </Link>
        </h3>
      </div>

      <div className="netflix-row-container">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            className="row-nav-arrow row-arrow-left"
            onClick={() => slide("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            className="row-nav-arrow row-arrow-right"
            onClick={() => slide("right")}
            aria-label="Scroll right"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Horizontal Slider Track */}
        <div
          className="netflix-row-slider"
          ref={rowRef}
          onScroll={handleScroll}
        >
          {movies.map((movie, index) => {
            const isFav = favourites.includes(movie.id);

            return (
              <motion.div
                key={movie.id}
                className={`netflix-row-item ${isTop10 ? "top10-item" : ""}`}
                whileHover={{
                  scale: 1.08,
                  y: -6,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                {/* STACKLY Top 10 Giant Rank Number */}
                {isTop10 && (
                  <div className="top10-rank-number">
                    {index + 1}
                  </div>
                )}

                <div
                  className="netflix-item-card"
                  onClick={() => onSelectMovie && onSelectMovie(movie)}
                >
                  <div className="netflix-item-poster-wrapper">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="netflix-item-poster"
                      loading="lazy"
                    />

                    {/* STACKLY Series Badge / Rating Tag */}
                    {movie.isOriginal ? (
                      <span className="n-series-badge">
                        <span className="s-char">STACKLY</span>
                      </span>
                    ) : (
                      <span className="netflix-rating-tag">
                        <Star size={11} fill="#E50914" color="#E50914" />
                        {movie.rating}
                      </span>
                    )}

                    {/* Hover Card Overlay with Controls */}
                    <div className="netflix-hover-overlay">
                      <div className="hover-overlay-content">
                        <div className="hover-action-buttons">
                          <button
                            className="hover-btn hover-play-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectMovie) onSelectMovie(movie);
                            }}
                            title="Play"
                            aria-label="Play"
                          >
                            <Play size={16} fill="currentColor" />
                          </button>

                          <button
                            className={`hover-btn hover-fav-btn ${isFav ? "active" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavourite(movie.id);
                            }}
                            title={isFav ? "Remove from My List" : "Add to My List"}
                            aria-label="Toggle Favourite"
                          >
                            <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                          </button>

                          <button
                            className="hover-btn hover-info-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectMovie) onSelectMovie(movie);
                            }}
                            title="More Info"
                            aria-label="More Info"
                          >
                            <Info size={16} />
                          </button>
                        </div>

                        <h4 className="hover-movie-title">{movie.title}</h4>

                        <div className="hover-meta-row">
                          <span className="hover-match">{movie.match || "98% Match"}</span>
                          <span className="hover-maturity">{movie.maturity || "16+"}</span>
                          <span className="hover-duration">{movie.duration}</span>
                        </div>

                        <div className="hover-genres">
                          <span>{movie.genre}</span>
                          {movie.tags?.[0] && (
                            <>
                              <span className="genre-dot">•</span>
                              <span>{movie.tags[0]}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export default NetflixRow;
