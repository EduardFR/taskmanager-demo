import FilterView from '../view/filter-view.js';
import {render} from '../render.js';

export default class FilterPresenter {
  constructor({filterContainer, filterModel, tasksModel}) {
    this.filterContainer = filterContainer;
    this.filterModel = filterModel;
    this.tasksModel = tasksModel;
  }

  init() {
    render(new FilterView(), this.filterContainer);
  }
}
