import {getRandomTask} from '../mock/task.js';

export default class TasksModel {
  #tasks = Array.from({length: 22}, getRandomTask);

  get tasks() {
    return this.#tasks;
  }
}
