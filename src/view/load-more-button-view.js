import AbstractView from '../framework/view/abstract-view.js';

function createLoadMoreButtonTemplate() {
  return '<button class="load-more" type="button">load more</button>';
}

export default class LoadMoreButtonView extends AbstractView {
  constructor({onClick}) {
    super();
    this._callback.click = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createLoadMoreButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
