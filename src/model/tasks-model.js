export default class TasksModel {
  tasks = [];

  constructor({tasksApiService}) {
    this.tasksApiService = tasksApiService;
  }

  getTasks() {
    // Получить список задач
  }

  updateTask() {
    // Обновить задачу
  }

  addTask() {
    // Добавить задачу
  }

  deleteTask() {
    // Удалить задачу
  }
}
