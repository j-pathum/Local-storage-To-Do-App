// Select DOM elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Load tasks from LocalStorage on startup
document.addEventListener('DOMContentLoaded', loadTasks);

// Event Listeners
addBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = input.value;
    if (taskText === '') return alert('Please enter a task!');

    createTaskElement(taskText);
    saveTaskToLocal(taskText);
    
    input.value = ''; // Clear input
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function() {
        list.removeChild(li);
        removeTaskFromLocal(text);
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
}

function saveTaskToLocal(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeTaskFromLocal(taskToRemove) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
