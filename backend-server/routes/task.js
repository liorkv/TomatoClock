const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.patch("/increment/:id", taskController.increamentCompletedPomodorosTask);
router.patch("/disable/:id", taskController.disableEnableTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
