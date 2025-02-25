import { useState } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa"; // Import icons

const StreamListPage = () => {
  const [streamList, setStreamList] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      setStreamList([...streamList, { title: input, completed: false }]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    setStreamList(streamList.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditText(streamList[index].title);
  };

  const handleSaveEdit = (index) => {
    const updatedList = [...streamList];
    updatedList[index].title = editText;
    setStreamList(updatedList);
    setEditingIndex(null);
  };

  const handleComplete = (index) => {
    const updatedList = [...streamList];
    updatedList[index].completed = !updatedList[index].completed;
    setStreamList(updatedList);
  };

  return (
    <div>
      <h2>StreamList Page</h2>
      <p>Manage your streaming list below:</p>
      <input
        type="text"
        placeholder="Enter movie title..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {streamList.map((movie, index) => (
          <li key={index} style={{ textDecoration: movie.completed ? "line-through" : "none" }}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                {movie.title}
                <FaCheck onClick={() => handleComplete(index)} title="Mark as watched" style={{ cursor: "pointer", marginLeft: "10px", color: "green" }} />
                <FaEdit onClick={() => handleEdit(index)} title="Edit" style={{ cursor: "pointer", marginLeft: "10px", color: "blue" }} />
                <FaTrash onClick={() => handleDelete(index)} title="Delete" style={{ cursor: "pointer", marginLeft: "10px", color: "red" }} />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamListPage;
