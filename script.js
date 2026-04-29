let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function login() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Masukkan username!");
    return;
  }

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  loadTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  const task = {
    id: Date.now(),
    text: input.value,
    done: false
  };

  tasks.push(task);
  saveTasks();
  input.value = "";
  loadTasks();
}

function loadTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${task.id})" class="${task.done ? 'done' : ''}">
        ${task.text}
      </span>
      <button onclick="deleteTask(${task.id})">❌</button>
    `;

    list.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  saveTasks();
  loadTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  loadTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
