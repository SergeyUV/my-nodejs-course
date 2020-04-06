const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'task title',
    order = 0,
    description = "task description",
    userId = "", 
    boardId = "",
    columnId = ""
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }

  static checkTask(data) {
    let result;

    const { title, order, description, userId, boardId, columnId } = data;

    if (!title) {
      result = {
        status: false,
        message: 'Data incomplete error'
      };
      return result;
    }

    result = {
      status: true,
      message: 'Check OK'
    };

    return result;
  }
}

module.exports = Task;
