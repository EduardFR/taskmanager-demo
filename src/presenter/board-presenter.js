import {render, remove, RenderPosition} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list-view.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import LoadingView from '../view/loading-view.js';
import NoTaskView from '../view/no-task-view.js';

const TASK_COUNT_PER_STEP = 8;

export default class BoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #filterModel = null;

  #boardComponent = new BoardView();
  #taskListComponent = new TaskListView();
  #loadingComponent = new LoadingView();
  #noTaskComponent = null;
  #loadMoreButtonComponent = null;

  #isLoading = true;
  #filterType = null;

  constructor({boardContainer, tasksModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#filterModel = filterModel;

    this.#filterType = this.#filterModel.getFilter();

    this.#tasksModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tasks() {
    return this.#tasksModel.getTasks();
  }

  init() {
    this.#renderBoard();
  }

  #handleModelEvent = () => {
    this.#isLoading = false;
    remove(this.#loadingComponent);
    this.init();
  };

  #handleLoadMoreButtonClick = () => {
    alert('Works!');
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
    render(new SortView(), this.#boardComponent.element);
  }

  #renderTask(task) {
    const taskComponent = new TaskView({task});
    render(taskComponent, this.#taskListComponent.element);
  }

  #renderTasks() {
    for (let i = 0; i < this.tasks.length; i++) {
      this.#renderTask(this.tasks[i]);
    }
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const taskCount = this.tasks.length;

    if (taskCount === 0) {
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    render(this.#taskListComponent, this.#boardComponent.element);
    this.#renderTasks();

    if (taskCount > TASK_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }
}
