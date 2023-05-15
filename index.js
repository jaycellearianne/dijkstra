
let tasks = [];

let firstTaskDropdown = document.getElementById("firstTask");
let endTaskDropdown = document.getElementById("endTask");

// add task
function addTask() {
  let taskName = document.getElementById("taskName").value;
  let taskDuration = document.getElementById("taskDuration").value;
  let durationUnit = document.getElementById("durationUnit").value;
  let taskDependency = document.getElementById("taskDependency").value;

  let task = {
    name: taskName,
    duration: taskDuration + " " + durationUnit,
    dependency: taskDependency,
  };

  tasks.push(task);

  updateDependencyDropdown();
  renderTasks();
  clearInputs();
}

firstTaskDropdown.addEventListener('change', function() {
  const selectedFirstTask = firstTaskDropdown.value;
  console.log('Selected First Task:', selectedFirstTask);
});

// Event listener for "End Task" dropdown
endTaskDropdown.addEventListener('change', function() {
  const selectedEndTask = endTaskDropdown.value;
  console.log('Selected End Task:', selectedEndTask);
});



function sortTasks() {
  const sortedTasks = applyDijkstraAlgorithm();
  if (sortedTasks) {
    tasks = sortedTasks;
    renderTasks();
  }
}
