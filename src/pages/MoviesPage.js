import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api"; 
import "./MoviesPage.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    const getMovies = async () => {
      const movieData = await fetchMovies();
      setMovies(movieData);
    };
    getMovies();
  }, []);

  return (
    <div className="movies-container">
      <h2>🎬 Popular Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
