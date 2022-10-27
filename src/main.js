import TasksApiService from './mock/tasks-api-service.js';
import TasksModel from './model/tasks-model.js';
import NewTaskButtonView from './view/new-task-button-view.js';
import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService()
});
const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement
});

render(new NewTaskButtonView(), siteHeaderElement);
render(new FilterView(), siteMainElement);

boardPresenter.init();
