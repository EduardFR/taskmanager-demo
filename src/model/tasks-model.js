import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
export default class TasksModel extends Observable {
  #tasksApiService = null;
  #tasks = [];

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  async init() {
    try {
      this.#tasks = await this.#tasksApiService.getTasks();
    } catch(err) {
      this.#tasks = [];
    }

    this._notify(UpdateType.INIT);
  }

  getTasks() {
    return this.#tasks;
  }

  async updateTask(updateType, update) {
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
      this._notify(updateType, updatedTask);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  async addTask(updateType, update) {
    try {
      const newTask = await this.#tasksApiService.addTask(update);
      this.#tasks = [newTask, ...this.#tasks];
      this._notify(updateType, newTask);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  async deleteTask(updateType, update) {
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
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete task');
    }
  }
}
