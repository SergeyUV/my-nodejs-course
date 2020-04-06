const Board = require('./board.model');

const boardsStore = [
  new Board()
];


//= ===============================
// getAll
//= ===============================
const getAll = async () => {
  return boardsStore;
};

//= ===============================
// getById
//= ===============================
const getById = async id => {
  const board = boardsStore.find(item => item.id === id);
  return board;
};

//= ===============================
// deleteById
//= ===============================
const deleteById = async id => {
  const index = boardsStore.findIndex(item => item.id === id);

  let result;

  if (index < 0) {
    result = {
      status: false,
      message: 'Board not found !'
    };
  } else {
    boardsStore.splice(index, 1);

    result = {
      status: true,
      message: 'Delete board successfuly !'
    };
  }

  return result;
};

//= ===============================
// create
//= ===============================
const createBoard = async data => {
  let result;
  const newBoard = new Board(data);
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
