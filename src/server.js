const http = require('http');
const { PORT } = require('./common/config');
const { METHOD } = require('./common/constants')
const UserController = require('./resources/users/user.controller')
const BoardController = require('./resources/boards/boards.controller')


const server = http.createServer((req, res) => {
  try {
    if (req.url === '/users' && req.method === METHOD.GET) {
      UserController.getAllUsers(req, res);
    } else if (req.url.match(/\/users\//) && req.method === METHOD.GET) {
      const id = req.url.split('/')[2];
      UserController.getUser(req, res, id);
    } else if (req.url === '/users' && req.method === METHOD.POST) {
      UserController.createUser(req, res);
    } else if (req.url.match(/\/users\//) && req.method === METHOD.PUT) {
      const id = req.url.split('/')[2];
      UserController.updateUser(req, res, id);
    } else if (req.url.match(/\/users\//) && req.method === METHOD.DELETE) {
      const id = req.url.split('/')[2];
      UserController.deleteUser(req, res, id);
    } else if (req.url === '/boards' && req.method === METHOD.GET) {
      BoardController.getAllBoards(req, res);
    } else if (req.url.match(/\/boards\//) && req.method === METHOD.GET) {
      const id = req.url.split('/')[2];
      BoardController.getBoard(req, res, id);
    } else if (req.url === '/boards' && req.method === METHOD.POST) {
      BoardController.createBoard(req, res);
    } else if (req.url.match(/\/boards\//) && req.method === METHOD.PUT) {
      const id = req.url.split('/')[2];
      BoardController.updateBoard(req, res, id);
    } else if (req.url.match(/\/boards\//) && req.method === METHOD.DELETE) {
      const id = req.url.split('/')[2];
      BoardController.deleteBoard(req, res, id);
    } 
  
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "error" }));
  }
});

server.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
