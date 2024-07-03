const Student = require("../models/studentModel");
const mongoose = require("mongoose");

// get all students
const getStudents = async (req, res) => {
  const students = await Student.find({}).sort({ createdAt: -1 });

  res.status(200).json(students);
};

// get a student
const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  res.status(200).json(student);
};

// create new student
const createStudent = async (req, res) => {
  const { name, email, phone } = req.body;

  // add doc to db
  try {
    const student = await Student.create({ name, email, phone });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Student" });
  }

  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    return res.status(404).json({ error: "No Such Student" });
  }

  res.status(200).json({ message: "Student Deleted Successfully" });
};

// update a student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Student" });
  }

  const student = await Student.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );

  if (!student) {
    return res.status(404).json({ error: "No Such Student" });
  }

  res.status(200).json(student);
};

module.exports = {
  getStudent,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
