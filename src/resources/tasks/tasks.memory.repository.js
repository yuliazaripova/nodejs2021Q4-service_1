const { v4: uuidv4 } = require('uuid');
const tasks = require('./tasks.db')

function getAll(boardId) {
  return new Promise((resolve) => {
    const board = tasks.filter(i => i.boardId === boardId)
    resolve(board);
  });
}

function findById(boardId, taskId) {
    return new Promise((resolve) => {
    //  const board = tasks.filter(i => i.boardId === boardId)
      const task = tasks.find(i => i.id === taskId)

      resolve(task);
    });
}

function createTask(boardId, task) {
  return new Promise((resolve) => {
    const newTask = { ...task, id: uuidv4(), boardId };
    tasks.push(newTask);
    resolve(newTask);
  });
}

function updateTask(id, task) {
  return new Promise((resolve) => {
    const index = tasks.findIndex((_task) => _task.id === id);
    tasks[index] = { id, ...task };
    resolve({ id, ...task });
  });
}

function deleteTask(id) {
  return new Promise((resolve) => {
    const index = tasks.findIndex((i) => i.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
    }
    resolve();
  });
}

module.exports = { getAll, findById, createTask, updateTask, deleteTask };