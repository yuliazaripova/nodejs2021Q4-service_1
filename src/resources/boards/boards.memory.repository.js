const { v4: uuidv4 } = require('uuid');
const boards = require('./boards.db');
const tasks = require('../tasks/tasks.db')

function getAll() {
  return new Promise((resolve) => {
    resolve(boards);
  });
}

function findById(id) {
    return new Promise((resolve) => {
      const board = boards.find((_boards) => _boards.id === id);
      resolve(board);
    });
}

function createBoard(board) {
  return new Promise((resolve) => {
    const newBoard = { ...board, id: uuidv4() };
    boards.push(newBoard);
    resolve(newBoard);
  });
}

function updateBoard(id, board) {
  return new Promise((resolve) => {
    const index = boards.findIndex((_board) => _board.id === id);
    boards[index] = { id, ...board };
    resolve(boards[index]);
  });
}
function mutationFilter(arr, cb) {
  for (let l = arr.length - 1; l >= 0; l -= 1) {
    if (!cb(arr[l])) arr.splice(l, 1);
  }
}
function deleteBoard(id) {
  return new Promise((resolve) => {
    const index = boards.findIndex((i) => i.id === id);
    if (index > -1) {
        boards.splice(index, 1);
    }
    mutationFilter(tasks, (task) => task.boardId !== id)
    resolve();
  });
}

module.exports = { getAll, findById, createBoard, updateBoard, deleteBoard };
