const fs = require("fs-extra");
const readlineSync = require("readline-sync");
const tasksFile = "tasks.json";

// Cargar tareas desde el archivo JSON
function loadTasks() {
  if (!fs.existsSync(tasksFile)) {
    return [];
  }
  const data = fs.readFileSync(tasksFile);
  return JSON.parse(data);
}

// Guardar tareas en el archivo JSON
function saveTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// Agregar tarea
function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: Date.now(),
    description,
    status: "pending", // 'pending', 'in-progress', 'completed'
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log("Tarea agregada:", newTask);
}

// Listar todas las tareas
function listTasks() {
  const tasks = loadTasks();
  console.log("Lista de Tareas:");
  tasks.forEach((task) => {
    console.log(`[${task.status}] ${task.description} (ID: ${task.id})`);
  });
}

// Completar tarea
function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id == id);
  if (task) {
    task.status = "completed";
    saveTasks(tasks);
    console.log("Tarea completada:", task.description);
  } else {
    console.log("Tarea no encontrada.");
  }
}

// Interfaz CLI
function main() {
  try {
    while (true) {
      const action = readlineSync.question(
        "¿Qué deseas hacer? (add/list/complete/exit): "
      );

      if (action === "add") {
        const description = readlineSync.question("Descripción de la tarea: ");
        addTask(description);
      } else if (action === "list") {
        listTasks();
      } else if (action === "complete") {
        const id = readlineSync.question("ID de la tarea a completar: ");
        completeTask(id);
      } else if (action === "exit") {
        break;
      } else {
        console.log("Acción no reconocida.");
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
