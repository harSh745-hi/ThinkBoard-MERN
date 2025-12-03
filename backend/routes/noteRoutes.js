import express from "express";
// import {getAllNotes,createNote,updateNote,deleteNote}  from  "../controllers/notesController.js"
import {getAllNotes,createNote,updateNote,deleteNote,getNote} from "../controllers/notesController.js"
const router = express.Router();

 
router.get("/",getAllNotes);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);
router.get("/:id",getNote);




export default router;