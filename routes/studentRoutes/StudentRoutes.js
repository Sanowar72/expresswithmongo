import express from "express";
import {
  AddStudentData,
  ReadStudentData,
  searchByName,
  filterStudents,
  GetStudentById,
  UpdateById,
  DeleteById,
} from "../../controller/StudentController.js";

const router = express.Router();

// Route for reading and adding student data
router.route("/").get(ReadStudentData).post(AddStudentData);

// Routes for searching and filtering students
router.get("/search", searchByName);
router.get("/filter", filterStudents);

// Routes for operations on specific student by ID
router.route("/:id").get(GetStudentById).put(UpdateById).delete(DeleteById);

export default router;
