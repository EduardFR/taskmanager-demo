import Observable from '../framework/observable.js';
import {FilterType} from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterType.ALL;

  getFilter() {
    return this.#filter;
  }

  setFilter(filter) {
    this.#filter = filter;
  }
}
