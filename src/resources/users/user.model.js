const uuid = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static checkUser(data) {
    let result;

    const { name, login, password, ...rest } = data;

    if (!name || !login || !password) {
      result = {
        status: false,
        message: 'Data incomplete error'
      };
      return result;
    }

    // if( Object.keys(rest).length > 0 ){
    //  result = {
    //    status: false,
    //    message: "Data error"
    //  };
    //  return result;
    // }

    result = {
      status: true,
      message: 'Check OK'
    };

    return result;
  }
}

module.exports = User;
