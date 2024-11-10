const express = require("express");
const { body, param } = require("express-validator");
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validateMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional().isString(),
    body("priority").optional().isIn(["low", "medium", "high"]),
    body("dueDate").optional().isISO8601().toDate(),
    body("tags").optional().isArray(),
  ],
  validationMiddleware,
  createTask
);

router.get("/", authMiddleware, getAllTasks);

router.put(
  "/:id",
  authMiddleware,
  [
    param("id").isMongoId(),
    body("title").optional().isString(),
    body("description").optional().isString(),
    body("completed").optional().isBoolean(),
    body("priority").optional().isIn(["low", "medium", "high"]),
    body("dueDate").optional().isISO8601().toDate(),
    body("tags").optional().isArray(),
  ],
  validationMiddleware,
  updateTask
);

router.delete("/:id", authMiddleware, [param("id").isMongoId()], validationMiddleware, deleteTask);

module.exports = router;