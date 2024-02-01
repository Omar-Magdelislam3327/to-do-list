document.addEventListener("DOMContentLoaded", () => {
    loadTasks();});

function addTask() {
    const inputElement = document.getElementById("new-task");
    const taskText = inputElement.value.trim();

    if (taskText !== "") {
    const tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);
    inputElement.value = "";
    displayTasks();
    }
}

function editTask(index) {
    const tasks = getTasks();
    const newText = prompt("Edit task:", tasks[index].text);

    if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks(tasks);
    displayTasks();
    }
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks();
}

function toggleCompleted(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    displayTasks();
}

function getTasks() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    displayTasks();
}

function displayTasks() {
    const todoList = document.getElementById("todo-list");
    const tasks = getTasks();

    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleCompleted(index));

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = task.text;
    textInput.readOnly = true;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTask(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(index));

    listItem.appendChild(checkbox);
    listItem.appendChild(textInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
    });
}