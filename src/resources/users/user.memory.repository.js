const { v4: uuidv4 } = require('uuid');
const { omitPassword } = require('../../common/utils')
const users = require('./users.db')
const tasks = require('../tasks/tasks.db')

function getAll() {
  return new Promise((resolve) => {
    const _users = users.map(i => omitPassword(i));
    resolve(_users);
  });
}

const findById = (id) => {
  const user = users.find((_user) => _user.id === id);
  return omitPassword(user)
}

// const createUser = (id) => {
//   const user = users.find((_user) => _user.id === id);
//   return omitPassword(user)
// }

function createUser(user) {
  return new Promise((resolve) => {
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
    resolve(omitPassword(newUser));
  });
}

function updateUser(id, user) {
  return new Promise((resolve) => {
    const index = users.findIndex((_user) => _user.id === id);
    users[index] = { ...user, id };

    resolve(omitPassword(users[index]));
  });
}

function deleteUser(id) {
  return new Promise((resolve) => {
    const index = users.findIndex((i) => i.id === id);
  
    if (index > -1) {
      users.splice(index, 1);
    }
    tasks.map((task, key, array) => (
      array[key].userId === id 
      ? { ...array[key], userId: null }
      : array[key]
    ));
    resolve();
  });
}

module.exports = { getAll, findById, createUser, updateUser, deleteUser };
