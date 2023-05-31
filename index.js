// STORE THE TASKS
let tasks = [];


//sort the tasks


// get the input values
let firstTaskDropdown = document.getElementById("firstTask");
let endTaskDropdown = document.getElementById("endTask");

// add task function
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

        let taskNameElement = document.createElement("span");
        taskNameElement.textContent = task.name;

        let taskDurationElement = document.createElement("span");
        taskDurationElement.textContent = task.duration;

        let taskDependencyElement = document.createElement("span");
        taskDependencyElement.textContent = task.dependency;

        // edit
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {});

        // delete
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {});

        taskElement.appendChild(taskNameElement);
        taskElement.appendChild(taskDurationElement);
        taskElement.appendChild(taskDependencyElement);
        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);

        taskContainer.appendChild(taskElement);
    });
}





//

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

function sortTasks() {
    const graph = new Graph();

    tasks.forEach((task) => {
        graph.addVertex(task.name);
    });

    tasks.forEach((task) => {
        if (task.dependency !== "None") {
            const weight = getDuration(task.dependency);
            graph.addEdge(task.dependency, task.name, weight);
        }
    });

    function getDuration(taskName) {
        const foundTask = tasks.find((task) => task.name === taskName);
        return foundTask ? foundTask.duration : 0;
    }

    const startTask = firstTaskDropdown;
    const endTask = endTaskDropdown;

    const { distances, previous } = graph.dijkstra(startTask);
    const shortestPath = graph.getPath(previous, endTask);

    console.log("Shortest Path:");
    shortestPath.forEach((task) => {
        console.log(task);
    });

    // get the total duration
    let totalDuration = 0;
    shortestPath.forEach((task) => {
        totalDuration += getDuration(task);
    });
    console.log("Distances:", distances);
    console.log("Shortest Path Duration:", totalDuration);

    const sortedTasks = shortestPath.map((taskName) => {
        return tasks.find((task) => task.name === taskName);
    });
    renderTasks(sortedTasks, "sortedtaskContainer");
}

sortTasks();