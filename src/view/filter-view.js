import {createElement} from '../render.js';

function createFilterItemTemplate(filter, currentFilterType) {
  const {type, name, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${type === currentFilterType ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}
      value="${type}"
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
}

function createFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<section class="main__filter filter container">
      ${filterItemsTemplate}
    </section>`
  );
}

export default class FilterView {
  constructor({filters, currentFilterType}) {
    this.filters = filters;
    this.currentFilter = currentFilterType;
  }

  getTemplate() {
    return createFilterTemplate(this.filters, this.currentFilter);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
