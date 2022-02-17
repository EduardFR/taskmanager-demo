import {getRandomTask} from '../mock/task.js';

export default class TasksModel {
  tasks = Array.from({length: 3}, getRandomTask);

  getTasks() {
    return this.tasks;
  }
}
