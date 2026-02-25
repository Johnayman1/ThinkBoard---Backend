import Note from "../models/Note.js";

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.log("Error in get notes!", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.status(200).json(note);
  } catch (err) {
    console.log("Error in get note!", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const crateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.log("Error in create note", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title: title, content: content },
      { new: true },
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found!" });
    res.status(200).json(updatedNote);
  } catch (err) {
    console.log("Error in update note", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found!" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (err) {
    console.log("Error in delete note", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
