const addTaskBtn = document.getElementById('add-task-btn');
const addTaskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('[data-filter]');
let currentFilter = 'all';
let tasks = [];

loadTasks();
renderTasks();

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active-filter'));
    btn.classList.add('active-filter');

    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

function renderTasks() {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'completed') return task.done;
    if (currentFilter === 'pending') return !task.done;
    return true;
  });

  filteredTasks.forEach((taskObj) => {
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
    const li = el.closest('li');
    if (!li) return;

    const taskId = Number(li.dataset.id);

    tasks = tasks.filter((task) => task.id !== taskId);

    saveTasks();
    renderTasks();
  } else {
    const li = el.closest('li');
    if (!li) return;

    const taskId = Number(li.dataset.id);

    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;

    task.done = !task.done;

    saveTasks();
    renderTasks();
  }
});

function addTaskToList(taskObj) {
  const li = addLi(taskObj.id);

  if (taskObj.done) {
    li.classList.add('completed');
  }

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
