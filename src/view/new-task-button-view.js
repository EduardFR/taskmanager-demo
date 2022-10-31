import AbstractView from '../framework/view/abstract-view.js';

function createNewTaskButtonTemplate() {
  return '<button class="control__button">+ ADD NEW TASK</button>';
}

export default class NewTaskButtonView extends AbstractView {
  constructor({onClick}) {
    super();
    this._callback.click = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewTaskButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
