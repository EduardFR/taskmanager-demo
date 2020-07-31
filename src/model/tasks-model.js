import {getRandomTask} from '../mock/task.js';

export default class TasksModel {
  tasks = Array.from({length: 4}, getRandomTask);

  getTasks() {
    return this.tasks;
  }
}
