class Node {
    constructor(name, duration) {
      this.name = name;
      this.duration = duration;
      this.dependencies = [];
    }
  
    addDependency(dependency, duration) {
      this.dependencies.push({ node: dependency, duration });
    }
  }
  
  
  
  class Graph {
    constructor() {
      this.nodes = new Map();
    }
  
    addNode(name, duration) {
      const node = new Node(name, duration);
      this.nodes.set(name, node);
    }
  
    addDependency(taskName, dependencyName, duration) {
      const task = this.nodes.get(taskName);
      const dependency = this.nodes.get(dependencyName);
  
      if (task && dependency) {
        task.addDependency(dependency, duration);
      }
    }
  
    dijkstra(startTask, endTask) {
      const distances = new Map();
      const previous = new Map();
      const queue = new PriorityQueue();
  
      this.nodes.forEach((node) => {
        distances.set(node, Infinity);
        previous.set(node, null);
      });
  
      distances.set(startTask, 0);
      queue.enqueue({ node: startTask, distance: 0 });
  
      while (!queue.isEmpty()) {
        const { node } = queue.dequeue();
  
        if (node === endTask) {
          break;
        }
  
        const neighbors = this.nodes.get(node).dependencies;
  
        for (const neighbor of neighbors) {
          const totalDistance = distances.get(node) + neighbor.duration;
  
          if (totalDistance < distances.get(neighbor.node)) {
            distances.set(neighbor.node, totalDistance);
            previous.set(neighbor.node, node);
            queue.enqueue({ node: neighbor.node, distance: totalDistance });
          }
        }
      }
  
      const shortestPath = [];
      let currentNode = endTask;
  
      while (currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = previous.get(currentNode);
      }
  
      return shortestPath.map((task) => this.nodes.get(task));
    }
  }
  
  class PriorityQueue {
    constructor() {
      this.heap = [];
    }
  
    enqueue(element) {
      this.heap.push(element);
      this.heapifyUp();
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
  
      const first = this.heap[0];
      const last = this.heap.pop();
  
      if (!this.isEmpty()) {
        this.heap[0] = last;
        this.heapifyDown();
      }
  
      return first;
    }
  
    isEmpty() {
      return this.heap.length === 0;
    }
  
    heapifyUp() {
      let index = this.heap.length - 1;
  
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
  
        if (this.heap[parentIndex].distance <= this.heap[index].distance) {
          break;
        }
  
        [this.heap[parentIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[parentIndex],
        ];
        index = parentIndex;
      }
    }
  
    heapifyDown() {
      let index = 0;
      const length = this.heap.length;
  
      while (true) {
        let smallest = index;
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
  
        if (
          leftChildIndex < length &&
          this.heap[leftChildIndex].distance < this.heap[smallest].distance
        ) {
          smallest = leftChildIndex;
        }
  
        if (
          rightChildIndex < length &&
          this.heap[rightChildIndex].distance < this.heap[smallest].distance
        ) {
          smallest = rightChildIndex;
        }
  
        if (smallest === index) {
          break;
        }
  
        [this.heap[index], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[index],
        ];
        index = smallest;
      }
    }
  }
  
  const tasks = [
    { name: "A", duration: 30, dependency: "" },
    { name: "B", duration: 20, dependency: "" },
    { name: "C", duration: 10, dependency: "A" },
    { name: "D", duration: 40, dependency: "B" },
    { name: "E", duration: 25, dependency: "C" },
    { name: "F", duration: 15, dependency: "D" },
    { name: "G", duration: 35, dependency: "D" },
    { name: "H", duration: 10, dependency: "F" },
    { name: "I", duration: 10, dependency: "G" },
  ];
  
  const graph = new Graph();
  
  tasks.forEach(task => {
    graph.addNode(task.name, task.duration);
  });
  
  
  
  // Add task dependencies with weights to the graph
  tasks.forEach(task => {
    if (task.dependency) {
      graph.addDependency(task.name, task.dependency, task.duration);
    }
  });
  
  tasks.forEach(task => {
    if (task.dependency) {
      graph.addDependency(task.name, task.dependency, task.duration);
    }
  });
  
  const startTask = "A";
  const endTask = "E";
  const shortestPath = graph.dijkstra(startTask, endTask);
  
  console.log("Shortest Path:");
  shortestPath.forEach((task) => {
    console.log(`Task: ${task.name}, Duration: ${task.duration}`);
  });