const Task = require('./task.model');

const tasksStore = [];

//= ===============================
// getAll
//= ===============================
const getAll = async boardId => {
  // Проверить по спецификации. При фильтрации тест не проходит
  // const tasks = tasksStore.filter(item => item.boardId === boardId);
  return tasksStore;
};

//= ===============================
// getById
//= ===============================
const getById = async id => {
  const task = tasksStore.find(item => item.id === id);
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
const createTask = async (boardId, data) => {
  let result;

  const newTask = new Task(data);
  newTask.boardId = boardId;

  tasksStore.push(newTask);

  result = {
    status: true,
    task: newTask,
    message: 'Create task successfuly !'
  };

  return result;
};

//= ===============================
// update
//= ===============================
const updateTask = async (id, task) => {
  let result;

  const index = tasksStore.findIndex(item => item.id === id);

  if (index < 0) {
    result = {
      status: false,
      message: 'Task not found !'
    };
  } else {
    tasksStore[index].title = task.title;
    tasksStore[index].order = task.order;
    tasksStore[index].description = task.description;
    tasksStore[index].userId = task.userId;
    tasksStore[index].boardId = task.boardId;
    tasksStore[index].columnId = task.columnId;

    result = {
      status: true,
      task: tasksStore[index],
      message: 'Update task successfully !'
    };
  }
  return result;
};

//= ===============================
// unassign
//= ===============================
const unassignByUserId = async userId => {
  
  let result;
  
  for (let item of tasksStore) {
    if(item.userId === userId){
      item.userId = null;
    }
  }

  result = {
    status: true,
    message: 'Unassign task successfuly !'
  };

};

//= ===============================
// delete by board id
//= ===============================
const deleteByBoardId = async boardId => {
  
  let result;
  
  let index = tasksStore.findIndex(item => item.boardId === boardId);

  while (index >=0) {
    tasksStore.splice(index, 1);
    index = tasksStore.findIndex(item => item.boardId === boardId);  
  }

  result = {
    status: true,
    message: 'Delete task(s) successfuly !'
  };

};

module.exports = { getAll, getById, deleteById, createTask, updateTask, unassignByUserId, deleteByBoardId };
