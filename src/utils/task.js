import dayjs from 'dayjs';

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format('D MMMM') : '';
}
function isTaskExpired(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isTaskRepeating(repeating) {
  return Object.values(repeating).some(Boolean);
}

function isTaskExpiringToday(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

export {humanizeTaskDueDate, isTaskExpired, isTaskRepeating, isTaskExpiringToday};
