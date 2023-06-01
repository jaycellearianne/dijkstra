// Place your JavaScript code here
// STORE THE TASKS
let tasks = [];

let selectedTask = null;
let selectedTaskElement = null;

// add task function
function addTask() {
  const taskName = document.getElementById("taskName").value;
  let taskDuration = document.getElementById("taskDuration").value;
  const durationUnit = document.getElementById("durationUnit").value;
  const taskDependency = document.getElementById("taskDependency").value;

  if (durationUnit === "hours") {
    taskDuration *= 60;
  }

  let task = {
    id: tasks.length + 1, // Add an ID property
    name: taskName,
    duration: taskDuration,
    durationUnit: durationUnit,
    dependency: taskDependency,
  };

  tasks.push(task);
  console.log(tasks);
  updateDependencyDropdown();
  renderTasks(tasks, "taskContainer");
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
  noDependencyOption.textContent = "Dependency";
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

// RENDER THE INPUT TASKS IN THE CONTAINER
function renderTasks(tasks, containerId) {
  let taskContainer = document.getElementById(containerId);
  taskContainer.innerHTML = "";

  tasks.forEach(function (task) {
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.id = "task_" + task.id;

    let taskNameElement = document.createElement("span");
    taskNameElement.textContent = "Task: " + task.name + " ";
    taskNameElement.style.marginRight = "5px";

    let taskDurationElement = document.createElement("span");
    taskDurationElement.textContent = "Duration: " + task.duration + " ";
    taskDurationElement.style.marginRight = "1px";

    let taskDurationUnit = document.createElement("span");
    taskDurationUnit.textContent = task.durationUnit + " ";
    taskDurationUnit.style.marginRight = "5px";

    let taskDependencyElement = document.createElement("span");
    taskDependencyElement.textContent = "Dependency: " + task.dependency;
    taskDependencyElement.style.marginRight = "5px";

    let spaceElement = document.createElement("span");
    spaceElement.textContent = " ";

    // edit
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      selectedTask = task;
      selectedTaskElement = taskElement;
      editTask();
    });

    // delete
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(taskDurationElement);
    taskElement.appendChild(taskDurationUnit); // Add duration unit element
    taskElement.appendChild(taskDependencyElement);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    taskContainer.appendChild(taskElement);
  });
}

// EDIT TASK
function editTask() {
  const taskContainer = document.getElementById("taskContainer");
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const taskNameInput = document.createElement("input");
  taskNameInput.type = "text";
  taskNameInput.id = "editTaskName";
  taskNameInput.placeholder = "Enter task name";
  taskNameInput.value = selectedTask.name;

  const taskDurationInput = document.createElement("input");
  taskDurationInput.type = "number";
  taskDurationInput.id = "editTaskDuration";
  taskDurationInput.placeholder = "Enter task duration";
  taskDurationInput.value = selectedTask.duration;

  const durationUnitSelect = document.createElement("select");
  durationUnitSelect.id = "editDurationUnit";
  const minutesOption = document.createElement("option");
  minutesOption.value = "minutes";
  minutesOption.textContent = "Minutes";
  const hoursOption = document.createElement("option");
  hoursOption.value = "hours";
  hoursOption.textContent = "Hours";
  durationUnitSelect.appendChild(minutesOption);
  durationUnitSelect.appendChild(hoursOption);
  if (selectedTask.durationUnit === "hours") {
    hoursOption.selected = true;
  } else {
    minutesOption.selected = true;
  }

  const taskDependencySelect = document.createElement("select");
  taskDependencySelect.id = "editTaskDependency";
  const noDependencyOption = document.createElement("option");
  noDependencyOption.value = "";
  noDependencyOption.textContent = "Dependency";
  taskDependencySelect.appendChild(noDependencyOption);
  tasks.forEach(function (task) {
    let option = document.createElement("option");
    option.value = task.name;
    option.textContent = task.name;
    if (task.name === selectedTask.dependency) {
      option.selected = true;
    }
    taskDependencySelect.appendChild(option);
  });

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", saveTaskChanges);

  taskElement.appendChild(taskNameInput);
  taskElement.appendChild(taskDurationInput);
  taskElement.appendChild(durationUnitSelect);
  taskElement.appendChild(taskDependencySelect);
  taskElement.appendChild(saveButton);

  taskContainer.replaceChild(taskElement, selectedTaskElement);
}

// SAVE CHANGES
function saveTaskChanges() {
  const taskName = document.getElementById("editTaskName").value;
  let taskDuration = document.getElementById("editTaskDuration").value;
  const durationUnit = document.getElementById("editDurationUnit").value;
  const taskDependency = document.getElementById("editTaskDependency").value;

  if (durationUnit === "hours") {
    taskDuration *= 60;
  }

  selectedTask.name = taskName;
  selectedTask.duration = taskDuration;
  selectedTask.durationUnit = durationUnit;
  selectedTask.dependency = taskDependency;

  updateDependencyDropdown();
  renderTasks(tasks, "taskContainer");
}

// DELETE TASK
function deleteTask(taskId) {
  tasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });

  renderTasks(tasks, "taskContainer");
}

// CONTEXT MENU FOR EDITING THE TASK
document.addEventListener("click", function (event) {
  const contextMenu = document.getElementById("contextMenu");
  if (!contextMenu.contains(event.target)) {
    contextMenu.style.display = "none";
  }
});

function showContextMenu(event) {
  event.preventDefault();
  const contextMenu = document.getElementById("contextMenu");
  contextMenu.style.left = event.pageX + "px";
  contextMenu.style.top = event.pageY + "px";
  contextMenu.style.display = "block";
}

// IMPLEMENTING DIJKSTRA
class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift().element;
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

class Graph {
  constructor() {
    this.vertices = {};
  }

  addVertex(vertex) {
    this.vertices[vertex] = {};
  }

  addEdge(source, destination, weight) {
    this.vertices[source][destination] = weight;
    this.vertices[destination][source] = weight;
  }

  dijkstra(startVertex) {
    const distances = {};
    const previous = {};
    const queue = new PriorityQueue();

    for (let vertex in this.vertices) {
      if (vertex === startVertex) {
        distances[vertex] = 0;
        queue.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        queue.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    while (!queue.isEmpty()) {
      const currentVertex = queue.dequeue();

      for (let neighbor in this.vertices[currentVertex]) {
        const distance =
          distances[currentVertex] + this.vertices[currentVertex][neighbor];

        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = currentVertex;
          queue.enqueue(neighbor, distance);
        }
      }
    }

    return { distances, previous };
  }

  getPath(previous, endVertex) {
    const path = [];
    let currentVertex = endVertex;

    while (currentVertex !== null) {
      path.unshift(currentVertex);
      currentVertex = previous[currentVertex];
    }

    return path;
  }
}

// SORT TASKS
function updateTotalDuration(duration) {
  const totalDurationElement = document.getElementById("totalDuration");
  totalDurationElement.textContent = duration;
}

function sortTasks() {
  const graph = new Graph();

  tasks.forEach((task) => {
    graph.addVertex(task.name);
  });

  tasks.forEach((task) => {
    if (task.dependency !== "") {
      const weight = getDuration(task.dependency);
      graph.addEdge(task.name, task.dependency, weight);
    }
  });

  function getDuration(taskName) {
    const foundTask = tasks.find((task) => task.name === taskName);
    if (foundTask) {
      let duration = parseInt(foundTask.duration);
      if (foundTask.durationUnit === "hours") {
        duration *= 60;
      }
      return duration;
    }
    return 0;
  }

  let startTask = document.getElementById("firstTask").value;
  let endTask = document.getElementById("endTask").value;

  const { distances, previous } = graph.dijkstra(startTask);
  const shortestPath = graph.getPath(previous, endTask);

  let totalDuration = 0;
  shortestPath.forEach((task) => {
    totalDuration += getDuration(task);
  });

  console.log("Distances:", distances);
  renderShortestPath(shortestPath, "sortedTasksContainer");
  updateTotalDuration(totalDuration);

  // Calculate the sum of edge values
  let totalEdgeValue = 0;
  shortestPath.forEach((task, index) => {
    if (index > 0) {
      const weight = graph.vertices[task][shortestPath[index - 1]];
      totalEdgeValue += weight;
    }
  });
  console.log("Total Edge Value:", totalEdgeValue);
}

// RENDER THE SHORTEST PATH TASKS IN THE CONTAINER
function renderShortestPath(shortestPath, containerId) {
  let sortedTasksContainer = document.getElementById(containerId);
  sortedTasksContainer.innerHTML = "";

  shortestPath.forEach(function (task) {
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");

    let taskNameElement = document.createElement("span");
    taskNameElement.textContent = task;

    taskElement.appendChild(taskNameElement);

    sortedTasksContainer.appendChild(taskElement);

    // Output the task in the console
    console.log(task);
  });
}
