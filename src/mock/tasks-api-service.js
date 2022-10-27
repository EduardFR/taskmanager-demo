import {nanoid} from 'nanoid';
import {getRandomTask} from './task.js';

export default class TasksApiService {
  tasks = Array.from({length: 3}, getRandomTask);

  async getTasks() {
    return this.tasks;
  }

  async updateTask(update) {
    const index = this.tasks.findIndex((task) => task.id === update.id);
    this.tasks = [
      ...this.tasks.slice(0, index),
      update,
      ...this.tasks.slice(index + 1),
    ];

    return update;
  }

  async addTask(update) {
    const newTask = {
      id: nanoid(),
      ...update
    };

    this.tasks = [newTask, ...this.tasks];

    return newTask;
  }

  async deleteTask(update) {
    this.tasks = this.tasks.filter((task) => task.id !== update.id);
  }
}
