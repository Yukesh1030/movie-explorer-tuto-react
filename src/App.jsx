import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Favourites from "./pages/Favourites";

import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

function AnimatedRoutes({ favourites, toggleFavourite }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home
                favourites={favourites}
                onToggleFavourite={toggleFavourite}
              />
            </PageTransition>
          }
        />

        <Route
          path="/explore"
          element={
            <PageTransition>
              <Explore
                favourites={favourites}
                onToggleFavourite={toggleFavourite}
              />
            </PageTransition>
          }
        />

        <Route
          path="/favourites"
          element={
            <PageTransition>
              <Favourites
                favourites={favourites}
                onToggleFavourite={toggleFavourite}
              />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("movie-favourites")
      ) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [favourites]);

  const toggleFavourite = (movieId) => {
    setFavourites((previous) =>
      previous.includes(movieId)
        ? previous.filter((id) => id !== movieId)
        : [...previous, movieId]
    );
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="app">
        <Navbar favouriteCount={favourites.length} />

        <AnimatedRoutes
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
      </div>
    </HashRouter>
  );
}

export default App;
