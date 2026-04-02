const addTaskBtn = document.getElementById('add-task-btn');
const addTaskInput = document.getElementById('task-input');
const tasks = document.getElementById('task-list');

function addLi() {
  return document.createElement('li');
}

function addTaskToList(inputText) {
  const li = addLi();
  li.innerText = inputText;
  tasks.appendChild(li);
}

addTaskBtn.addEventListener('click', function () {
  const taskText = addTaskInput.value.trim();
  if (taskText === '') return;

  addTaskToList(taskText);

  addTaskInput.value = '';
});
