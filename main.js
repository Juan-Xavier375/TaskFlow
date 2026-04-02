const addTaskBtn = document.getElementById('add-task-btn');
const addTaskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = [];
loadTasks();
renderTasks();
function renderTasks() {
  taskList.innerHTML = '';
  for (let taskValue of tasks) {
    addTaskToList(taskValue);
  }
}

function saveTasks() {
  localStorage.setItem('tasksJson', JSON.stringify(tasks));
}

function loadTasks() {
  const tasksString = localStorage.getItem('tasksJson');
  if (tasksString === null) {
    return (tasks = []);
  } else {
    const loadedTasks = JSON.parse(tasksString);
    tasks = loadedTasks;
  }
}

function addLi() {
  return document.createElement('li');
}

function addDelBtn(li) {
  const delBtn = document.createElement('button');
  delBtn.innerText = 'Delete';
  delBtn.classList.add('delete');
  li.appendChild(delBtn);
}

taskList.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('delete')) {
    el.parentElement.remove();
  }
});

function addTaskToList(inputText) {
  const li = addLi();

  const span = document.createElement('span');
  span.innerText = inputText;

  li.appendChild(span);
  addDelBtn(li);

  taskList.appendChild(li);
}

addTaskBtn.addEventListener('click', function () {
  const taskText = addTaskInput.value.trim();
  if (taskText === '') return;

  tasks.push(taskText);
  saveTasks();
  renderTasks();

  addTaskInput.value = '';
});
