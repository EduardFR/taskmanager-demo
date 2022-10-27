import {getRandomTask} from './task.js';

export default class TasksApiService {
  tasks = Array.from({length: 3}, getRandomTask);

  async getTasks() {
    return this.tasks;
  }
}
