function sortTasks() {
    const graph = {};
    tasks.forEach(function(task) {
      graph[task.name] = {};
      if (task.dependency) {
        graph[task.dependency][task.name] = task.duration;
      }
    });
  
    const firstTask = document.getElementById('firstTask').value;
    const endTask = document.getElementById('endTask').value;
  
    const sortedTasks = dijkstra(firstTask, endTask, graph);
  
    const sortedTaskObjects = sortedTasks.map(function(taskName) {
      return tasks.find(function(task) {
        return task.name === taskName;
      });
    });
  
    tasks = sortedTaskObjects;
  
    renderTasks();
  }
  