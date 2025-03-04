import React, { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

const StreamListPage = () => {
  // Load movies from localStorage or initialize as an empty array
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Save movies to localStorage whenever the list updates
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // Add a new movie to the list
  const addMovie = () => {
    if (input.trim() === "") return;
    setMovies([...movies, { id: Date.now(), title: input, completed: false }]);
    setInput(""); // Clear input field
  };

  // Delete a movie from the list
  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // Mark a movie as completed
  const toggleComplete = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, completed: !movie.completed } : movie
      )
    );
  };

  // Start editing a movie
  const startEditing = (id, title) => {
    setEditId(id);
    setEditText(title);
  };

  // Save the edited movie title
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
    <div>
      <h1>StreamList Page</h1>
      <p>Manage your streaming list below:</p>

      {/* Input for adding new movies */}
      <input
        type="text"
        placeholder="Enter movie title..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addMovie}>Add</button>

      {/* List of movies */}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {editId === movie.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: movie.completed ? "line-through" : "none" }}>
                  {movie.title}
                </span>

                {/* Mark as completed */}
                <button onClick={() => toggleComplete(movie.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "green" }}>
                  <FaCheck size={20} />
                </button>

                {/* Edit movie */}
                <button onClick={() => startEditing(movie.id, movie.title)} style={{ background: "none", border: "none", cursor: "pointer", color: "blue" }}>
                  <FaEdit size={20} />
                </button>

                {/* Delete movie */}
                <button onClick={() => deleteMovie(movie.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}>
                  <FaTrash size={20} />
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
