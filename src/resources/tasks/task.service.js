const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = id => tasksRepo.getById(id);
const deleteById = id => tasksRepo.deleteById(id);
const createTask = (boardId, task) => tasksRepo.createTask(boardId, task);
const updateTask = (id, task) => tasksRepo.updateTask(id, task);
const unassignByUserId = userId => tasksRepo.unassignByUserId(userId);
const deleteByBoardId = boardId => tasksRepo.deleteByBoardId(boardId);

module.exports = {
  getAll,
  getById,
  deleteById,
  createTask,
  updateTask,
  unassignByUserId,
  deleteByBoardId
};
