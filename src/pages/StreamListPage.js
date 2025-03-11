import React, { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import "./StreamListPage.css"; // Make sure the CSS file is correctly linked

const StreamListPage = () => {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const addMovie = () => {
    if (input.trim() === "") return;
    setMovies([...movies, { id: Date.now(), title: input, completed: false }]);
    setInput("");
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const toggleComplete = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, completed: !movie.completed } : movie
      )
    );
  };

  const startEditing = (id, title) => {
    setEditId(id);
    setEditText(title);
  };

  const saveEdit = () => {
    setMovies(
      movies.map((movie) =>
        movie.id === editId ? { ...movie, title: editText } : movie
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="streamlist-container">
      <h1>🎬 My StreamList</h1>
      <p>Keep track of your must-watch movies!</p>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter movie title..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addMovie} className="add-button">➕ Add</button>
      </div>

      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className={`movie-item ${movie.completed ? "completed" : ""}`}>
            {editId === movie.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>💾 Save</button>
              </>
            ) : (
              <>
                <span>{movie.title}</span>
                <button onClick={() => toggleComplete(movie.id)} className="check-button">
                  <FaCheck />
                </button>
                <button onClick={() => startEditing(movie.id, movie.title)} className="edit-button">
                  <FaEdit />
                </button>
                <button onClick={() => deleteMovie(movie.id)} className="delete-button">
                  <FaTrash />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamListPage;
