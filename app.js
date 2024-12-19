const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [
    {
        "id": 1,
        "title": "Set up environment",
        "description": "Install Node.js, npm, and git",
        "completed": true
      },
      {
        "id": 2,
        "title": "Create a new project",
        "description": "Create a new project using the Express application generator",
        "completed": true
      },
      {
        "id": 3,
        "title": "Install nodemon",
        "description": "Install nodemon as a development dependency",
        "completed": true
      },
      {
        "id": 4,
        "title": "Install Express",
        "description": "Install Express",
        "completed": false
      },
      {
        "id": 5,
        "title": "Install Mongoose",
        "description": "Install Mongoose",
        "completed": false
      },
      {
        "id": 6,
        "title": "Install Morgan",
        "description": "Install Morgan",
        "completed": false
      },
      {
        "id": 7,
        "title": "Install body-parser",
        "description": "Install body-parser",
        "completed": false
      },
      {
        "id": 8,
        "title": "Install cors",
        "description": "Install cors",
        "completed": false
      },
      {
        "id": 9,
        "title": "Install passport",
        "description": "Install passport",
        "completed": false
      },
      {
        "id": 10,
        "title": "Install passport-local",
        "description": "Install passport-local",
        "completed": false
      },
];

// Initial Route
app.get("/", (req, res) => {
  try {
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error has occurred", error: error.message });
  }
});

// To see all the tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// To get a task by ID
app.get("/tasks/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid Task ID!" });
    }
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// To create a task
app.post("/tasks", (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (!title || !description) {
      return res.status(400).send({ message: "Title and description required" });
    }
    const task = {
      id: tasks.length + 1,
      title,
      description,
      completed: completed || false,
    };
    tasks.push(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// To update a task
app.put("/tasks/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid Task ID!" });
    }
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    const { title, description, completed } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .send({ message: "Title and description are required" });
    };
    if (completed !== undefined && typeof completed !== "boolean") {
        return res.status(400).send({ message: "Completed must be a boolean" });
    };
    task.title = title;
    task.description = description;
    task.completed = completed !== undefined ? completed : task.completed;
    res.json(task);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// To delete a task
app.delete("/tasks/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ message: "Invalid Task ID!" });
    }
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    res.send({ message: "Task deleted successfully", task });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.error("Server failed to start:", err);
  }
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
