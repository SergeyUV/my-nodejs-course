const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = id => tasksRepo.getById(id);
const deleteById = id => tasksRepo.deleteById(id);
const createTask = task => tasksRepo.createTask(task);
const updateTask = (id, task) => tasksRepo.updateTask(id, task);

module.exports = { getAll, getById, deleteById, createTask, updateTask };
