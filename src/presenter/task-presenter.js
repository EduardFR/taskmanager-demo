import {render, replace, remove} from '../framework/render.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TaskPresenter {
  #taskListContainer = null;
  #onModeChange = null;

  #taskComponent = null;
  #taskEditComponent = null;

  #mode = Mode.DEFAULT;

  constructor({taskListContainer, onModeChange}) {
    this.#taskListContainer = taskListContainer;
    this.#onModeChange = onModeChange;
  }

  init(task) {
    const prevTaskComponent = this.#taskComponent;
    const prevTaskEditComponent = this.#taskEditComponent;

    this.#taskComponent = new TaskView({
      task,
      onEditClick: this.#handleEditClick,
    });
    this.#taskEditComponent = new TaskEditView({
      task,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#taskComponent, this.#taskListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#taskComponent, prevTaskComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#taskComponent, prevTaskEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

  #replaceCardToForm = () => {
    replace(this.#taskEditComponent, this.#taskComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#taskComponent, this.#taskEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };
}
