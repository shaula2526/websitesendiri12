const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_FILE = "./db.json";

// READ DB
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

// WRITE DB
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// LOGIN
app.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: "Username kosong" });

  res.json({ username });
});

// GET TASKS
app.get("/tasks", (req, res) => {
  const db = readDB();
  res.json(db.tasks);
});

// ADD TASK
app.post("/tasks", (req, res) => {
  const db = readDB();
  const newTask = {
    id: Date.now(),
    text: req.body.text,
    done: false
  };
  db.tasks.push(newTask);
  writeDB(db);
  res.json(newTask);
});

// TOGGLE TASK
app.put("/tasks/:id", (req, res) => {
  const db = readDB();
  db.tasks = db.tasks.map(t =>
    t.id == req.params.id ? { ...t, done: !t.done } : t
  );
  writeDB(db);
  res.json({ message: "updated" });
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
  const db = readDB();
  db.tasks = db.tasks.filter(t => t.id != req.params.id);
  writeDB(db);
  res.json({ message: "deleted" });
});

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));
