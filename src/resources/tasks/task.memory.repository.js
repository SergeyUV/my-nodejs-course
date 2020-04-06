const Board = require('./task.model');

const tasksStore = [
  new Task()
];


//= ===============================
// getAll
//= ===============================
const getAll = async () => {
  return tasksStore;
};

//= ===============================
// getById
//= ===============================
const getById = async id => {
  const task = taskssStore.find(item => item.id === id);
  return task;
};

//= ===============================
// deleteById
//= ===============================
const deleteById = async id => {
  const index = tasksStore.findIndex(item => item.id === id);

  let result;

  if (index < 0) {
    result = {
      status: false,
      message: 'Task not found !'
    };
  } else {
    tasksStore.splice(index, 1);

    result = {
      status: true,
      message: 'Delete task successfuly !'
    };
  }

  return result;
};

//= ===============================
// create
//= ===============================
const createBoard = async data => {
  let result;
  const newTask = new Task(data);
  boardsStore.push(newBoard);

  result = {
    status: true,
    board: newBoard,
    message: 'Create board successfuly !'
  };

  return result;
};

//= ===============================
// update
//= ===============================
const updateBoard = async (id, board) => {
  let result;

  const index = boardsStore.findIndex(item => item.id === id);

  if (index < 0) {
    result = {
      status: false,
      message: 'Board not found !'
    };
  } else {
    boardsStore[index].name = board.title;
    boardsStore[index].columns = board.columns;
    result = {
      status: true,
      board: boardsStore[index],
      message: 'Update board successfuly !'
    };
  }
  return result;
};

module.exports = { getAll, getById, deleteById, createBoard, updateBoard };
