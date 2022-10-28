import {FilterType} from '../const.js';

export default class FilterModel {
  #filter = FilterType.ALL;

  getFilter() {
    return this.#filter;
  }

  setFilter(filter) {
    this.#filter = filter;
  }
}
