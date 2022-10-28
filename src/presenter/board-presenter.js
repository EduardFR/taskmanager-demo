import {render} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list-view.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  #boardComponent = new BoardView();
  #taskListComponent = new TaskListView();

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  get tasks() {
    return this.#tasksModel.getTasks();
  }

  init() {
    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#taskListComponent, this.#boardComponent.element);
    render(new TaskEditView({task: this.tasks[0]}), this.#taskListComponent.element);

    for (let i = 1; i < this.tasks.length; i++) {
      render(new TaskView({task: this.tasks[i]}), this.#taskListComponent.element);
    }

    render(new LoadMoreButtonView(), this.#boardComponent.element);
  }
}
