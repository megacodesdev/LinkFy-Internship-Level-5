 import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const API = "http://localhost:5000/api/notes";

  // ✅ FETCH NOTES FROM DATABASE
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ CREATE OR UPDATE NOTE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setMessage("All fields are required");
      return;
    }

    try {
      if (editingId) {
        // 🔁 UPDATE
        const res = await fetch(`${API}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });

        const updatedNote = await res.json();

        setNotes(notes.map((n) => (n._id === editingId ? updatedNote : n)));
        setEditingId(null);
        setMessage("Note updated ✅");
      } else {
        // ➕ CREATE
        const res = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });

        const newNote = await res.json();
        setNotes([newNote, ...notes]);
        setMessage("Note created ✅");
      }

      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong ❌");
    }
  };

  // ✅ DELETE NOTE
  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      setNotes(notes.filter((n) => n._id !== id));
      setMessage("Note deleted 🗑️");
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ SET EDIT MODE
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          📒 Notes Dashboard
        </h1>

        {/* MESSAGE */}
        {message && (
          <p className="text-center text-green-600 mb-4">{message}</p>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-xl shadow mb-6"
        >
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Content"
            className="w-full p-2 border rounded mb-3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingId ? "Update Note" : "Add Note"}
          </button>
        </form>

        {/* NOTES LIST */}
        <div className="grid md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <h2 className="font-bold text-lg">{note.title}</h2>
              <p className="text-gray-600 mb-3">{note.content}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}