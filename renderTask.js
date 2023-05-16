// render task
function renderTasks(tasks, containerId) {
  var taskContainer = document.getElementById(containerId);
  taskContainer.innerHTML = '';

  tasks.forEach(function(task, index) {
    var taskElement = document.createElement('div');
    taskElement.classList.add('task');

    var taskNameElement = document.createElement('span');
    taskNameElement.textContent = task.name;

    var taskDurationElement = document.createElement('span');
    taskDurationElement.textContent = task.duration;

    var taskDependencyElement = document.createElement('span');
    taskDependencyElement.textContent = task.dependency;

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      editTask(index);
    });

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteTask(index);
    });

    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(taskDurationElement);
    taskElement.appendChild(taskDependencyElement);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    taskContainer.appendChild(taskElement);
  });
}