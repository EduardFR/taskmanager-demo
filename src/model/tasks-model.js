export default class TasksModel {
  constructor({tasksApiService}) {
    this.tasksApiService = tasksApiService;
  }

  async init() {
    try {
      this.tasks = await this.tasksApiService.getTasks();
    } catch(err) {
      this.tasks = [];
    }
  }

  getTasks() {
    return this.tasks;
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
