const addTaskBtn = document.getElementById('add-task-btn');
const addTaskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = [];
loadTasks();
renderTasks();
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((taskObj) => {
    addTaskToList(taskObj);
  });
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

function addLi(id) {
  const newLi = document.createElement('li');
  newLi.dataset.id = id;
  return newLi;
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
    const taskId = Number(el.parentElement.dataset.id);
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderTasks();
  }
});

function addTaskToList(taskObj) {
  const li = addLi(taskObj.id);

  const span = document.createElement('span');
  span.innerText = taskObj.text;

  li.appendChild(span);
  addDelBtn(li);

  taskList.appendChild(li);
}

addTaskBtn.addEventListener('click', function () {
  const taskText = addTaskInput.value.trim();
  if (taskText === '') return;

  tasks.push({
    id: Date.now(),
    text: taskText,
    done: false
  });
  saveTasks();
  renderTasks();

  addTaskInput.value = '';
});
