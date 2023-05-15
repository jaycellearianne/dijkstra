// render task
function renderTasks() {
  const taskContainer = document.getElementById("taskContainer");
  taskContainer.innerHTML = "";

  tasks.forEach(function (task, index) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const taskNameElement = document.createElement("span");
    taskNameElement.textContent = task.name;

    const taskDurationElement = document.createElement("span");
    taskDurationElement.textContent = task.duration;

    const taskDependencyElement = document.createElement("span");
    taskDependencyElement.textContent = task.dependency;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editTask(index);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
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