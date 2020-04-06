const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'board title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }

  static checkBoard(data) {
    let result;

    const { title, columns } = data;

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

module.exports = Board;
