const User = require('./user.memory.repository')
const { errorMessage } = require('../../common/errors')
const { getPostData } = require('../../common/utils')

async function getAllUsers(req, res) {
    try {
      const users = await User.getAll();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "error" }));
    }
}

async function getUser(req, res, id) {
    try {
    //   if (!isUUID(id)) {
    //     res.writeHead(400, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
    //   } else {
        const user = await User.findById(id);
        if (!user) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'User with this id not found' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(user));
        }
     // }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  
  async function createUser(req, res) {
    try {
      const body = await getPostData(req);
    //   if (!body.length) {
    //     res.writeHead(400, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify({ message: errorMessage.requiredFields }));
    //   } else {
        const user = JSON.parse(body);
  
     //   const isValid = valideteObj(person);
  
        // if (!isValid) {
        //   res.writeHead(400, { 'Content-Type': 'application/json' });
        //   res.end(JSON.stringify({ message: errorMessage.requiredFields }));
        // } else {
          const newUser = await User.createUser(user);
  
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newUser));
      //  }
     // }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  
  // eslint-disable-next-line consistent-return
  async function updateUser(req, res, id) {
    try {
    //   if (!isUUID(id)) {
    //     res.writeHead(400, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
    //   } else {
        const user = await User.findById(id);
  
        if (!user) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: errorMessage.idNotFound }));
        } else {
          const body = await getPostData(req);
          const newUser = JSON.parse(body);
          const updUser = await User.updateUser(id, { ...user, ...newUser });
  
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify(updUser));
        }
   //   }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  
  async function deleteUser(req, res, id) {
    try {
    //   if (!isUUID(id)) {
    //     res.writeHead(400, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify({ message: errorMessage.idIsNotValid }));
    //   } else {
        const user = await User.findById(id);
        if (!user) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: errorMessage.idNotFound }));
        } else {
          await User.deleteUser(id);
          res.writeHead(204, { 'Content-Type': 'application/json' });
          res.end();
        }
    //  }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: errorMessage[500] }));
    }
  }
  
  module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
  