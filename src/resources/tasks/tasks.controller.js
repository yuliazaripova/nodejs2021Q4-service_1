const Task = require('./tasks.memory.repository')
const { errorMessage } = require('../../common/errors')
const { getPostData } = require('../../common/utils')

async function getAllTasks(req, res) {
    try {
      const tasks = await Task.getAll();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tasks));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "error" }));
    }
}

async function getTask(req, res, id) {
    try {
        const task = await Task.findById(id);
        if (!task) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Task with this id not found' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(task));
        }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  
  async function createTask(req, res) {
    try {
      const body = await getPostData(req);
        const task = JSON.parse(body);
          const newTask = await Task.createTask(task);
  
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newTask));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  

  async function updateTask(req, res, id) {
    try {
        const task = await Task.findById(id);
  
        if (!task) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: errorMessage.idNotFound }));
        } else {
          const body = await getPostData(req);
          const newTask = JSON.parse(body);
          const updTask = await Task.updateTask(id, { ...task, ...newTask });
  
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updTask));
        }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  
  async function deleteTask(req, res, id) {
    try {
        const task = await Task.findById(id);
        if (!task) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: errorMessage.idNotFound }));
        } else {
          await Task.deleteTask(id);
          res.writeHead(204, { 'Content-Type': 'application/json' });
          res.end();
        }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  
  module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
  };