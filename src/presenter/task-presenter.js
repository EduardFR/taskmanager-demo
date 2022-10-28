import {render} from '../framework/render.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';

export default class TaskPresenter {
  #taskListContainer = null;

  #taskComponent = null;
  #taskEditComponent = null;

  constructor({taskListContainer}) {
    this.#taskListContainer = taskListContainer;
  }

  init(task) {
    this.#taskComponent = new TaskView({task});
    this.#taskEditComponent = new TaskEditView({task});

    render(this.#taskComponent, this.#taskListContainer);
  }
}
