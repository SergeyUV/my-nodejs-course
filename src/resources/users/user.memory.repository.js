const User = require('./user.model');

const usersStore = [
  new User(),
  new User({ name: 'User1', login: 'Login1', password: 'Pass1' }),
  new User({ name: 'User2', login: 'Login2', password: 'Pass2' })
];

// let usersStore = [];

//= ===============================
// getAll
//= ===============================
const getAll = async () => {
  return usersStore;
};

//= ===============================
// getById
//= ===============================
const getById = async id => {
  const user = usersStore.find(item => item.id === id);
  return user;
};

//= ===============================
// deleteById
//= ===============================
const deleteById = async id => {
  const index = usersStore.findIndex(item => item.id === id);

  let result;

  if (index < 0) {
    result = {
      status: false,
      message: 'User not found !'
    };
  } else {
    usersStore.splice(index, 1);

    result = {
      status: true,
      message: 'Delete user successfuly !'
    };
  }

  return result;
};

//= ===============================
// create
//= ===============================
const createUser = async data => {
  let result;
  newUser = new User(data);
  usersStore.push(newUser);

  result = {
    status: true,
    user: newUser,
    message: 'Create user successfuly !'
  };

  return result;
};

//= ===============================
// update
//= ===============================
const updateUser = async (id, user) => {
  let result;

  const index = usersStore.findIndex(item => item.id === id);

  if (index < 0) {
    result = {
      status: false,
      message: 'User not found !'
    };
  } else {
    usersStore[index].name = user.name;
    usersStore[index].login = user.login;
    usersStore[index].password = user.password;

    result = {
      status: true,
      user: usersStore[index],
      message: 'Update user successfuly !'
    };
  }
  return result;
};

module.exports = { getAll, getById, deleteById, createUser, updateUser };
