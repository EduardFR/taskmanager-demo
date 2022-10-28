export default class TasksModel {
  #tasksApiService = null;
  #tasks = [];

  constructor({tasksApiService}) {
    this.#tasksApiService = tasksApiService;
  }

  async init() {
    try {
      this.#tasks = await this.#tasksApiService.getTasks();
    } catch(err) {
      this.#tasks = [];
    }
  }

  getTasks() {
    return this.#tasks;
  }

  async updateTask(update) {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const updatedTask = await this.#tasksApiService.updateTask(update);
      this.#tasks = [
        ...this.#tasks.slice(0, index),
        updatedTask,
        ...this.#tasks.slice(index + 1),
      ];
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  async addTask(update) {
    try {
      const newTask = await this.#tasksApiService.addTask(update);
      this.#tasks = [newTask, ...this.#tasks];
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  async deleteTask(update) {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    try {
      await this.#tasksApiService.deleteTask(update);
      this.#tasks = [
        ...this.#tasks.slice(0, index),
        ...this.#tasks.slice(index + 1),
      ];
    } catch(err) {
      throw new Error('Can\'t delete task');
    }
  }
}
