const addTaskBtn = document.getElementById('add-task-btn');
const addTaskInput = document.getElementById('task-input');

addTaskBtn.addEventListener('click', function () {
  const taskText = addTaskInput.value;

  if (taskText === '') return;

  console.log(taskText);

  addTaskInput.value = '';
});
