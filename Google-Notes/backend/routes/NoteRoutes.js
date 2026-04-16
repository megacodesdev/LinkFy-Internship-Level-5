const express = require("express");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controller/NoteController");

const router = express.Router();

// GET all notes
router.get("/", getNotes);

// CREATE note
router.post("/", createNote);

// UPDATE note
router.put("/:id", updateNote);

// DELETE note
router.delete("/:id", deleteNote);

module.exports = router;