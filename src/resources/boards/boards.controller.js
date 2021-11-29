const Board = require('./boards.memory.repository')
const { errorMessage } = require('../../common/errors')
const { getPostData } = require('../../common/utils')

async function getAllBoards(req, res) {
    try {
      const boards = await Board.getAll();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(boards));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "error" }));
    }
}

async function getBoard(req, res, id) {
    try {
        const board = await Board.findById(id);
        if (!board) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Board with this id not found' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(board));
        }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  
  async function createBoard(req, res) {
    try {
      const body = await getPostData(req);
        const board = JSON.parse(body);
          const newBoard = await Board.createBoard(board);
  
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newBoard));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  

  async function updateBoard(req, res, id) {
    try {
        const board = await Board.findById(id);
  
        if (!board) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: errorMessage.idNotFound }));
        } else {
          const body = await getPostData(req);
          const newBoard = JSON.parse(body);
          const updBoard = await Board.updateBoard(id, { ...board, ...newBoard });
  
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updBoard));
        }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  
  async function deleteBoard(req, res, id) {
    try {
        const board = await Board.findById(id);
        if (!board) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: errorMessage.idNotFound }));
        } else {
          await Board.deleteBoard(id);
          res.writeHead(204, { 'Content-Type': 'application/json' });
          res.end();
        }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  
  module.exports = {
    getAllBoards,
    getBoard,
    createBoard,
    updateBoard,
    deleteBoard,
  };