import dayjs from 'dayjs';

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format('D MMMM') : '';
}

export {humanizeTaskDueDate};
