const express = require("express");
const {
  getStudent,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../Controllers/studentController");

const router = express.Router();

// GET all students
router.get("/", getStudents);

// GET student
router.get("/:id", getStudent);

// POST a new student
router.post("/", createStudent);

// // DELETE a student
router.delete("/:id", deleteStudent);

// // UPDATE a student
router.patch("/:id", updateStudent);

module.exports = router;
