import express from "express";
import {
  crateNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesControl.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", crateNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
