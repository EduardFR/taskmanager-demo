import Observable from '../framework/observable.js';
import {getRandomTask} from '../mock/task.js';

export default class TasksModel extends Observable {
  #tasks = Array.from({length: 22}, getRandomTask);

  get tasks() {
    return this.#tasks;
  }
}
