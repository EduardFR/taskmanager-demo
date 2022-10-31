import {render, remove, RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import LoadingView from '../view/loading-view.js';
import NoTaskView from '../view/no-task-view.js';
import TaskPresenter from './task-presenter.js';
import TaskNewPresenter from './task-new-presenter.js';
import {SortType, UserAction, UpdateType, FilterType} from '../const.js';
import {sortTaskUp, sortTaskDown} from '../utils/task.js';
import {filter} from '../utils/filter.js';

const TASK_COUNT_PER_STEP = 8;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #filterModel = null;

  #boardComponent = new BoardView();
  #taskListComponent = new TaskListView();
  #loadingComponent = new LoadingView();
  #noTaskComponent = null;
  #loadMoreButtonComponent = null;
  #sortComponent = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #isLoading = true;
  #filterType = null;
  #renderedTaskCount = TASK_COUNT_PER_STEP;
  #taskPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #taskNewPresenter = null;

  constructor({boardContainer, tasksModel, filterModel, onNewTaskDestroy}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#filterModel = filterModel;

    this.#taskNewPresenter = new TaskNewPresenter({
      taskListContainer: this.#taskListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTaskDestroy
    });

    this.#tasksModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tasks() {
    this.#filterType = this.#filterModel.getFilter();
    const tasks = structuredClone(this.#tasksModel.getTasks());
    const filteredTasks = filter[this.#filterType](tasks);

    switch (this.#currentSortType) {
      case SortType.DATE_UP:
        return filteredTasks.sort(sortTaskUp);
      case SortType.DATE_DOWN:
        return filteredTasks.sort(sortTaskDown);
    }

    return filteredTasks;
  }

  init() {
    this.#renderBoard();
  }

  createTask() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#taskNewPresenter.init();
  }

  #clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    this.#taskNewPresenter.destroy();
    this.#taskPresenter.forEach((presenter) => presenter.destroy());
    this.#taskPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#loadMoreButtonComponent);

    if (this.#noTaskComponent) {
      remove(this.#noTaskComponent);
    }

    if (resetRenderedTaskCount) {
      this.#renderedTaskCount = TASK_COUNT_PER_STEP;
    } else {
      this.#renderedTaskCount = Math.min(this.tasks.length, this.#renderedTaskCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.init();
        break;
      case UpdateType.PATCH:
        this.#taskPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }

  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#taskPresenter.get(update.id).setSaving();
        try {
          await this.#tasksModel.updateTask(updateType, update);
        } catch(err) {
          this.#taskPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TASK:
        this.#taskNewPresenter.setSaving();
        try {
          await this.#tasksModel.addTask(updateType, update);
        } catch(err) {
          this.#taskNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TASK:
        this.#taskPresenter.get(update.id).setDeleting();
        try {
          await this.#tasksModel.deleteTask(updateType, update);
        } catch(err) {
          this.#taskPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleLoadMoreButtonClick = () => {
    const taskCount = this.tasks.length;
    const newRenderedTaskCount = Math.min(taskCount, this.#renderedTaskCount + TASK_COUNT_PER_STEP);
    const tasks = this.tasks.slice(this.#renderedTaskCount, newRenderedTaskCount);

    this.#renderTasks(tasks);
    this.#renderedTaskCount = newRenderedTaskCount;

    if (this.#renderedTaskCount >= taskCount) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #handleModeChange = () => {
    this.#taskNewPresenter.destroy();
    this.#taskPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderLoadMoreButton() {
    this.#loadMoreButtonComponent = new LoadMoreButtonView({
      onClick: this.#handleLoadMoreButtonClick,
    });
    render(this.#loadMoreButtonComponent, this.#boardComponent.element);
  }

  #renderNoTasks() {
    this.#noTaskComponent = new NoTaskView(this.#filterType);
    render(this.#noTaskComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderTask(task) {
    const taskPresenter = new TaskPresenter({
      taskListContainer: this.#taskListComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction
    });
    taskPresenter.init(task);
    this.#taskPresenter.set(task.id, taskPresenter);
  }

  #renderTasks(tasks) {
    tasks.forEach((task) => this.#renderTask(task));
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const tasks = this.tasks;
    const taskCount = tasks.length;

    if (taskCount === 0) {
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    render(this.#taskListComponent, this.#boardComponent.element);
    this.#renderTasks(tasks.slice(0, Math.min(taskCount, this.#renderedTaskCount)));

    if (taskCount > this.#renderedTaskCount) {
      this.#renderLoadMoreButton();
    }
  }
}
