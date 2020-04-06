const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const deleteById = (id) => usersRepo.deleteById(id);
const createUser = (user) => usersRepo.createUser(user);
const updateUser = (id, user) => usersRepo.updateUser(id, user);

module.exports = { getAll, getById, deleteById, createUser, updateUser };
