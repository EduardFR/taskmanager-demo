import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format('D MMMM') : '';
}

function isTaskExpired(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isTaskRepeating(repeating) {
  return Object.values(repeating).some(Boolean);
}

export {getRandomArrayElement, humanizeTaskDueDate, isTaskExpired, isTaskRepeating};
