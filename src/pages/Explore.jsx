import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, X, Sparkles } from "lucide-react";
import { movies } from "../data/MovieData";
import MovieGrid from "../components/MovieGrid";
import MovieModal from "../components/MovieModal";

function Explore({ favourites, onToggleFavourite }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "All";

  const [search, setSearch] = useState(queryParam);
  const [category, setCategory] = useState(categoryParam);
  const [sort, setSort] = useState("default");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Available categories
  const categories = [
    "All",
    "Action",
    "Sci-Fi",
    "Drama",
    "Adventure",
    "Originals",
    "Trending",
  ];

  // Category selection handler (clicking active toggles back to All)
  const handleCategoryClick = (cat) => {
    const nextCat = category === cat ? "All" : cat;
    setCategory(nextCat);
    if (nextCat === "All") {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("category");
      setSearchParams(newParams);
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("category", nextCat);
      setSearchParams(newParams);
    }
  };

  // Filter & sort logic
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // 1. Category / Genre filtering
    if (category !== "All") {
      const selected = category.toLowerCase();

      if (selected === "trending") {
        result = result.filter((m) => m.trending);
      } else if (selected === "originals") {
        result = result.filter((m) => m.isOriginal || m.category === "originals");
      } else {
        result = result.filter(
          (m) =>
            m.genre?.toLowerCase() === selected ||
            m.category?.toLowerCase() === selected ||
            m.tags?.some((t) => t.toLowerCase().includes(selected))
        );
      }
    }

    // 2. Search keyword filtering
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.genre?.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q) ||
          m.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 3. Sorting
    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "newest") {
      result.sort((a, b) => b.year - a.year);
    } else if (sort === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
    setSearchParams({});
  };

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <main className="netflix-explore-page">
      {/* Page Header */}
      <section className="explore-hero-banner">
        <motion.div
          className="explore-header-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="netflix-badge-pill">
            <Sparkles size={14} />
            <span>STACKLY CINEMA</span>
          </div>

          <h1>
            Explore <span>Catalog</span>
          </h1>

          <p>
            Browse award-winning STACKLY originals, blockbuster hits, and critically acclaimed cinematic masterpieces.
          </p>
        </motion.div>
      </section>

      {/* Search & Filter Controls */}
      <section className="explore-controls-wrapper">
        <div className="explore-controls-bar">
          {/* Search Box */}
          <div className="netflix-search-input-box">
            <Search size={20} className="search-icon-svg" />
            <input
              type="text"
              placeholder="Search by title, director, or tags..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                const newParams = new URLSearchParams(searchParams);
                if (e.target.value.trim()) {
                  newParams.set("q", e.target.value);
                } else {
                  newParams.delete("q");
                }
                setSearchParams(newParams);
              }}
            />
            {search && (
              <button
                className="clear-search-btn"
                onClick={() => {
                  setSearch("");
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete("q");
                  setSearchParams(newParams);
                }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="netflix-sort-box">
            <SlidersHorizontal size={18} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort movies"
            >
              <option value="default">Sort by: Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Release Year</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="genre-pills-row" role="tablist" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`genre-pill-btn ${category === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
              role="tab"
              aria-selected={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter & Reset */}
        <div className="explore-results-summary">
          <span>
            Showing <strong>{filteredMovies.length}</strong> {filteredMovies.length === 1 ? "title" : "titles"}
            {category !== "All" && <span> in <strong>{category}</strong></span>}
          </span>

          {(search || category !== "All" || sort !== "default") && (
            <button className="reset-filter-btn" onClick={clearFilters}>
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* Movie Grid */}
      <section className="explore-grid-section">
        <MovieGrid
          movies={filteredMovies}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
          onSelectMovie={handleOpenModal}
          emptyMessage="No movies found matching your selected category and search."
        />
      </section>

      {/* Modal */}
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

export default Explore;
