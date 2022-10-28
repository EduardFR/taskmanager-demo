import {render, replace} from '../framework/render.js';
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
    this.#taskComponent = new TaskView({
      task,
      onEditClick: this.#handleEditClick,
    });
    this.#taskEditComponent = new TaskEditView({
      task,
      onFormSubmit: this.#handleFormSubmit,
    });

    render(this.#taskComponent, this.#taskListContainer);
  }

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

  #replaceCardToForm = () => {
    replace(this.#taskEditComponent, this.#taskComponent);
  };

  #replaceFormToCard = () => {
    replace(this.#taskComponent, this.#taskEditComponent);
  };
}
