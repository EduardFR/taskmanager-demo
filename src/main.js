import TasksApiService from './mock/tasks-api-service.js';
import TasksModel from './model/tasks-model.js';

new TasksModel({
  tasksApiService: new TasksApiService()
});

