var tasks = [];

// Load tasks from local storage on page load
window.onload = function() {
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        tasks = storedTasks;
        renderTasks();
    }
};

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    if (taskText === "") {
        return;
    }

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index, newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];

        var li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" onchange="toggleTask(${i})" ${task.completed ? "checked" : ""}>
            <span contenteditable="true" oninput="editTask(${i}, this.innerText)">${task.text}</span>
            <button onclick="deleteTask(${i})">Delete</button>
        `;

        taskList.appendChild(li);
        if (task.completed) {
            li.querySelector("span").classList.add("completed");
        }
    }
}
