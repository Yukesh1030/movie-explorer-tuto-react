
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, X, Film } from "lucide-react";

import { movies } from "../data/MovieData";
import MovieGrid from "../components/MovieGrid";

function Explore({ favourites, onToggleFavourite }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("default");
  const [year, setYear] = useState("All");

  // Get unique genres
  const genres = [
    "All",
    ...new Set(movies.map((movie) => movie.genre)),
  ];

  const years = [
    "All",
    ...new Set(movies.map((movie) => movie.year).sort((a, b) => b - a)),
  ];

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Search by title
    if (search.trim()) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    // Genre filtering
    if (genre !== "All") {
      result = result.filter((movie) => movie.genre === genre);
    }

    // Year filtering
    if (year !== "All") {
      result = result.filter((movie) => movie.year === Number(year));
    }

    // Sorting
    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "newest") {
      result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [search, genre, year, sort]);

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setGenre("All");
    setYear("All");
    setSort("default");
  };

  const hasFilters =
    search !== "" ||
    genre !== "All" ||
    year !== "All" ||
    sort !== "default";

  return (
    <main className="explore-page">

      {/* PAGE HEADER */}

      <section className="explore-header">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">
            YOUR NEXT FAVORITE MOVIE
          </span>

          <h1>
            Explore <span>Movies</span>
          </h1>

          <p>
            Discover incredible stories from every genre.
            Find your next cinematic experience.
          </p>
        </motion.div>
      </section>

      {/* SEARCH AND FILTERS */}

      <section className="explore-controls">

        <div className="search-wrapper">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search movies by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => setSearch("")}>
              <X size={17} />
            </button>
          )}
        </div>

        <div className="filter-controls">

          <div className="filter-group">
            <SlidersHorizontal size={17} />

            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {genres.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Genres" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Default Order</option>
              <option value="rating">Highest Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Years" : item}
                </option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button
              className="clear-filters-btn"
              onClick={clearFilters}
            >
              <X size={16} />
              Clear Filters
            </button>
          )}

        </div>
      </section>

      {/* MOVIE RESULTS */}

      <section className="explore-results">

        <div className="results-heading">
          <h2>All Movies</h2>

          <span>
            {filteredMovies.length} movies found
          </span>
        </div>

        {filteredMovies.length > 0 ? (
          <MovieGrid
            movies={filteredMovies}
            favourites={favourites}
            onToggleFavourite={onToggleFavourite}
          />
        ) : (
          <motion.div
            className="explore-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Film size={45} />
            <h3>No Movies Found</h3>
            <p>
              Try changing your search or filter selections.
            </p>

            <button
              className="primary-btn"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

      </section>

    </main>
  );
}

export default Explore;
