import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  // SAVE TO LOCAL STORAGE
  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // CREATE OR UPDATE NOTE
  const handleCreate = (e) => {
    e.preventDefault();

    if (!title || !content) {
      setMessage("All fields are required");
      return;
    }

    if (editingId) {
      // UPDATE
      const updatedNotes = notes.map((note) =>
        note.id === editingId
          ? { ...note, title, content }
          : note
      );

      saveNotes(updatedNotes);
      setMessage("Note updated successfully!");
      setEditingId(null);

    } else {
      // CREATE
      const newNote = {
        id: Date.now(),
        title,
        content,
      };

      const updatedNotes = [newNote, ...notes];
      saveNotes(updatedNotes);
      setMessage("Note created successfully!");
    }

    setTitle("");
    setContent("");
  };

  // DELETE NOTE
  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotes(updatedNotes);
    setMessage("Note deleted!");
  };

  // EDIT NOTE
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setMessage("Editing note...");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-4">Dashboard - Notes</h1>

      {/* FORM */}
      <form onSubmit={handleCreate} className="bg-white p-4 rounded shadow mb-6">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Note" : "Create Note"}
        </button>

        {message && (
          <p className="mt-2 text-green-600 font-semibold">{message}</p>
        )}
      </form>

      {/* NOTES LIST */}
      <div className="grid gap-4">
        {notes.length === 0 && (
          <p className="text-gray-500">No notes yet...</p>
        )}

        {notes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded shadow">

            <h2 className="font-bold text-lg">{note.title}</h2>
            <p className="text-gray-600 mb-3">{note.content}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(note)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(note.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}