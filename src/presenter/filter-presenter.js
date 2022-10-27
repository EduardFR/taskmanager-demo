import FilterView from '../view/filter-view.js';
import {render} from '../render.js';
import {filter} from '../utils/filter.js';
import {FilterType} from '../const.js';

export default class FilterPresenter {
  constructor({filterContainer, filterModel, tasksModel}) {
    this.filterContainer = filterContainer;
    this.filterModel = filterModel;
    this.tasksModel = tasksModel;
  }

  getFilters() {
    const tasks = this.tasksModel.getTasks();

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
    render(new FilterView(), this.filterContainer);
  }
}
