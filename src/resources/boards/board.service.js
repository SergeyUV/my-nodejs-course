const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const deleteById = id => boardsRepo.deleteById(id);
const createBoard = board => boardsRepo.createBoard(board);
const updateBoard = (id, board) => boardsRepo.updateUser(id, board);

module.exports = { getAll, getById, deleteById, createBoard, updateBoard };
