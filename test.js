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

// sort the tasks
const tasks = [
    {
        "name": "Task 1",
        "duration": 5,
        "dependency": "None",
    },
    {
        "name": "Task 2",
        "duration": 48,
        "dependency": "Task 1",
    },
    {
        "name": "Task 3",
        "duration": 3,
        "dependency": "None",
    },
    {
        "name": "Task 4",
        "duration": 24,
        "dependency": "Task 2",
    },
    {
        "name": "Task 5",
        "duration": 4,
        "dependency": "None",
    },
    {
        "name": "Task 6",
        "duration": 48,
        "dependency": "Task 3",
    },
    {
        "name": "Task 7",
        "duration": 12,
        "dependency": "Task 4",
    },
    {
        "name": "Task 8",
        "duration": 6,
        "dependency": "Task 6",
    },
    {
        "name": "Task 9",
        "duration": 8,
        "dependency": "Task 6",
    }
];

const graph = new Graph();

tasks.forEach((task) => {
    graph.addVertex(task.name);
});

tasks.forEach((task) => {
    if (task.dependency !== "None") {
        const weight = getDuration(task.dependency);
        graph.addEdge(task.name, task.dependency, weight);
    }
});

function getDuration(taskName) {
    const foundTask = tasks.find((task) => task.name === taskName);
    return foundTask ? foundTask.duration : 0;
}

const startTask = "Task 1";
const endTask = "Task 4";

const { distances, previous } = graph.dijkstra(startTask);
const shortestPath = graph.getPath(previous, endTask);

console.log(shortestPath)
console.log("Shortest Path:");
shortestPath.forEach((task) => {
    return(task);
});


console.log("Distances:", distances);
// get the total duration
let totalDuration = 0;
shortestPath.forEach((task) => {
    totalDuration += getDuration(task);
});
console.log("Shortest Path Duration:", totalDuration);
