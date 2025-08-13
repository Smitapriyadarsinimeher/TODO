const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="deleteTask(${index})">✖</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName === '') return;
    tasks.push({ name: taskName, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});

renderTasks();
