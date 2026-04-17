const addTaskBtn = document.getElementById('add-task-btn');
const addTaskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('[data-filter]');
const taskCount = document.getElementById('task-counter');
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

  if (!filteredTasks.length) {
    emptyList();
    return;
  }
  renderCounter();
}

function emptyList() {
  const emptyEl = document.createElement('p');
  let emptyMessage;

  if (currentFilter === 'completed') emptyMessage = 'No completed tasks yet!';
  if (currentFilter === 'pending') emptyMessage = 'No pending tasks!';
  if (currentFilter === 'all') emptyMessage = 'No tasks yet. Add one above!';
  emptyEl.innerText = emptyMessage;
  taskList.appendChild(emptyEl);
}

function renderCounter() {
  const pendingCount = tasks.filter((task) => !task.done).length;

  taskCount.innerText = `${pendingCount} pending tasks`;
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

function addDelBtn(container) {
  const delBtn = document.createElement('button');
  delBtn.innerText = 'Delete';
  delBtn.classList.add('task-btn', 'delete');
  container.appendChild(delBtn);
}

function addEditBtn(container) {
  const editBtn = document.createElement('button');
  editBtn.innerText = '✎';
  editBtn.classList.add('task-btn', 'edit-btn');
  container.appendChild(editBtn);
}

function getTaskById(taskId) {
  return tasks.find((task) => task.id === taskId);
}

function deleteTaskById(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
}

function toggleTaskById(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;

  task.done = !task.done;
}

taskList.addEventListener('click', function (e) {
  const el = e.target;

  if (el.tagName === 'INPUT') return;

  const li = el.closest('li');
  if (!li) return;

  const taskId = Number(li.dataset.id);

  if (el.classList.contains('delete')) {
    deleteTaskById(taskId);
  } else if (el.classList.contains('edit-btn')) {
    const span = li.querySelector('span');
    const input = li.querySelector('input');

    if (input) {
      saveEdit(taskId, input);
    } else {
      li.classList.remove('completed');

      const inputContent = span.textContent;

      const newInput = document.createElement('input');
      newInput.value = inputContent;
      newInput.classList.add('task-input');
      span.replaceWith(newInput);
      newInput.focus();
      newInput.addEventListener('blur', () => {
        saveEdit(taskId, newInput);
      });

      newInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          saveEdit(taskId, newInput);
        }
      });
    }

    return;
  } else {
    toggleTaskById(taskId);
  }

  saveTasks();
  renderTasks();
});

function saveEdit(taskId, input) {
  const task = getTaskById(taskId);
  const newValue = input.value.trim();
  if (newValue === '') return;

  task.text = newValue;

  const newSpan = document.createElement('span');
  newSpan.innerText = task.text;

  input.replaceWith(newSpan);
  saveTasks();
  renderTasks();
}

function addTaskToList(taskObj) {
  const li = addLi(taskObj.id);

  if (taskObj.done) {
    li.classList.add('completed');
  }

  const span = document.createElement('span');
  span.innerText = taskObj.text;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('task-buttons');

  li.appendChild(span);
  addDelBtn(buttonsDiv);
  addEditBtn(buttonsDiv);
  li.appendChild(buttonsDiv);

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

addTaskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTaskBtn.click();
  }
});
