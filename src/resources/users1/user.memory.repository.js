const { v4: uuidv4 } = require('uuid');
const { omitPassword } = require('../../common/utils')

const users = []

function getAll() {
  return new Promise((resolve) => {
    const _user = users.map(i => omitPassword(i));
    resolve(_user);
  });
}

function findById(id) {
    return new Promise((resolve) => {
      const user = users.find((_user) => _user.id === id);
      resolve(omitPassword(user));
    });
}

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
    users[index] = { id, ...user };
    resolve(omitPassword(users[index]));
  });
}

function deleteUser(id) {
  return new Promise((resolve) => {
    const index = users.findIndex((i) => i.id === id);
    if (index > -1) {
      users.splice(index, 1);
    }
    resolve();
  });
}

module.exports = { getAll, findById, createUser, updateUser, deleteUser };
