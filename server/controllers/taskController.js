const Task = require("../models/tasks");

//Create Task
exports.createTask = async (req, res) => {

    const { 
        title, 
        description, 
        priority, 
        dueDate, 
        tags 
    } = req.body;

    try {
      const newTask = new Task({
        userId: req.user.userId,
        title,
        description,
        priority,
        dueDate,
        tags,
      });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: "Failed to create task", error: error.message });
    }
};


//Get All Tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId }).sort({ dueDate: 1, priority: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
    }
};


//Update Task
exports.updateTask = async (req, res) => {

    const { 
        title, 
        description, 
        completed, 
        priority, 
        dueDate, 
        tags 
    } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
            title,
            description,
            completed,
            priority,
            dueDate,
            tags,
        },
        { new: true }
        );
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Failed to update task", error: error.message });
    }
};

//Delete Task

exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);

      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json({ message: "Task deleted successfully" });
      
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
};