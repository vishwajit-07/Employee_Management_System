import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, createEmployee); // Create employee
router.get("/get", authMiddleware, getAllEmployees); // Get all employees
router.get("/view/:id", authMiddleware, getEmployeeById); // Get employee by ID
router.put("/update/:id", authMiddleware, updateEmployee); // Update employee
router.delete("/delete/:id", authMiddleware, deleteEmployee); // Delete employee

export default router;
