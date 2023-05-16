let tasks = [];
let sortedTasks = [];
let firstTaskDropdown = document.getElementById("firstTask");
let endTaskDropdown = document.getElementById("endTask");

// add task
function addTask() {
  const taskName = document.getElementById("taskName").value;
  const taskDuration = document.getElementById("taskDuration").value;
  const durationUnit = document.getElementById("durationUnit").value;
  const taskDependency = document.getElementById("taskDependency").value;

  let task = {
    name: taskName,
    duration: taskDuration + " " + durationUnit,
    dependency: taskDependency,
  };

  tasks.push(task);
  updateDependencyDropdown();
  renderTasks(tasks, "taskContainer");
  clearInputs();
}

function updateDependencyDropdown() {
  const taskDependencyDropdown = document.getElementById("taskDependency");

  const firstTaskDropdown = document.getElementById("firstTask");
  const endTaskDropdown = document.getElementById("endTask");

  // Clear existing options
  taskDependencyDropdown.innerHTML = "";
  firstTaskDropdown.innerHTML = "";
  endTaskDropdown.innerHTML = "";

  // Add new options
  const noDependencyOption = document.createElement("option");
  noDependencyOption.value = "";
  noDependencyOption.textContent = "Depedency";
  taskDependencyDropdown.appendChild(noDependencyOption);

  tasks.forEach(function (task) {
    let option = document.createElement("option");
    option.value = task.name;
    option.textContent = task.name;

    taskDependencyDropdown.appendChild(option);

    let firstTaskOption = document.createElement("option");
    firstTaskOption.value = task.name;
    firstTaskOption.textContent = task.name;

    firstTaskDropdown.appendChild(firstTaskOption);

    let endTaskOption = document.createElement("option");
    endTaskOption.value = task.name;
    endTaskOption.textContent = task.name;

    endTaskDropdown.appendChild(endTaskOption);
  });
}

function clearInputs() {
  document.getElementById("taskName").value = "";
  document.getElementById("taskDuration").value = "";
  document.getElementById("durationUnit").value = "minutes";
  document.getElementById("taskDependency").value = "";
}

// render the input task
function renderTasks(tasks, containerId) {
  let taskContainer = document.getElementById(containerId);
  taskContainer.innerHTML = "";

  tasks.forEach(function (task, index) {
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");

    let taskNameElement = document.createElement("span");
    taskNameElement.textContent = task.name;

    let taskDurationElement = document.createElement("span");
    taskDurationElement.textContent = task.duration;

    let taskDependencyElement = document.createElement("span");
    taskDependencyElement.textContent = task.dependency;

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editTask(index);
    });

    let deleteButton = document.createElement("button");
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

function sortTasks() {
  let firstTask = firstTaskDropdown.value;
  let endTask = endTaskDropdown.value;

  if (firstTask && endTask) {
    let sortedTasks = Dijkstra(firstTask, endTask);
    renderTasks(sortedTasks, "sortedTaskContainer");
  }
}

function Dijkstra(first, last) {
  // Create a graph representation of the tasks and their dependencies
  let graph = {};
  tasks.forEach(function (task) {
    graph[task.name] = {};
  });

  tasks.forEach(function (task) {
    if (task.dependency) {
      graph[task.dependency][task.name] = task.duration;
    }
  });

  let distances = {};
  let previous = {};
  let queue = [];

  tasks.forEach(function (task) {
    distances[task.name] = Infinity;
    previous[task.name] = null;
    queue.push(task.name);
  });

  distances[first] = 0;

  while (queue.length > 0) {
    let current = findNodeWithShortestDistance(queue, distances);
    let neighbors = graph[current];

    Object.keys(neighbors).forEach(function (neighbor) {
      var distance = distances[current] + neighbors[neighbor];

      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = current;
      }
    });

    queue.splice(queue.indexOf(current), 1);
  }
  let path = [last];
  let node = last;

  while (previous[node]) {
    path.unshift(previous[node]);
    node = previous[node];
  }

  let sortedTasks = path.map(function (taskName) {
    return tasks.find(function (task) {
      return task.name === taskName;
    });
  });

  return sortedTasks;
}

function findNodeWithShortestDistance(nodes, distances) {
  let shortestDistance = Infinity;
  let shortestNode = null;

  nodes.forEach(function (node) {
    if (distances[node] < shortestDistance) {
      shortestDistance = distances[node];
      shortestNode = node;
    }
  });

  return shortestNode;
}
