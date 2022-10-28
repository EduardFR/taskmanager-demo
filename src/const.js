const COLORS = ['black', 'yellow', 'blue', 'green', 'pink'];

const FilterType = {
  ALL: 'all',
  OVERDUE: 'overdue',
  TODAY: 'today',
  FAVORITES: 'favorites',
  REPEATING: 'repeating',
  ARCHIVE: 'archive',
};

const UpdateType = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  DATE_UP: 'date-up',
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

export {COLORS, FilterType, UpdateType, SortType, UserAction};
