import {render} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {filter} from '../utils/filter.js';
import {FilterType} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tasksModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterModel, tasksModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const tasks = this.#tasksModel.getTasks();

    return [
      {
        type: FilterType.ALL,
        name: 'All',
        count: filter[FilterType.ALL](tasks).length,
      },
      {
        type: FilterType.OVERDUE,
        name: 'Overdue',
        count: filter[FilterType.OVERDUE](tasks).length,
      },
      {
        type: FilterType.TODAY,
        name: 'Today',
        count: filter[FilterType.TODAY](tasks).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](tasks).length,
      },
      {
        type: FilterType.REPEATING,
        name: 'Repeating',
        count: filter[FilterType.REPEATING](tasks).length,
      },
      {
        type: FilterType.ARCHIVE,
        name: 'Archive',
        count: filter[FilterType.ARCHIVE](tasks).length,
      },
    ];
  }

  init() {
    this.#filterComponent = new FilterView({
      filters: this.filters,
      currentFilterType: this.#filterModel.getFilter(),
    });
    render(this.#filterComponent, this.#filterContainer);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
