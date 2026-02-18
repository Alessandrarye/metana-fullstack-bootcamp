const openDialogBtn = document.getElementById("openDialogBtn");
const dialog = document.getElementById("dialog");
const cancelBtn = document.getElementById("cancelBtn");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskNameInput = document.getElementById("taskName");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");

let tasks = [];

// Open dialog
openDialogBtn.addEventListener("click", () => {
  dialog.classList.remove("hidden");
});

// Cancel dialog
cancelBtn.addEventListener("click", () => {
  dialog.classList.add("hidden");
});

// Add task
addTaskBtn.addEventListener("click", () => {
  const name = taskNameInput.value.trim();
  const description = taskDescriptionInput.value.trim();

  if (!name) return;

  const task = { name, description };
  tasks.push(task);

  renderTasks();
  saveTasks();

  taskNameInput.value = "";
  taskDescriptionInput.value = "";
  dialog.classList.add("hidden");
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${task.name}</strong><br>${task.description}`;
    taskList.appendChild(li);
  });
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
    renderTasks();
  }
}

window.addEventListener("DOMContentLoaded", loadTasks);
