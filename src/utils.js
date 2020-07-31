import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTaskDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format('D MMMM') : '';
}

export {getRandomArrayElement, humanizeTaskDueDate};
