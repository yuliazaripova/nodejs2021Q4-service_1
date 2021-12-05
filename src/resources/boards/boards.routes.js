const Board = require('./boards.memory.repository')

async function boardsRoutes (fastify) {
    fastify.get('/boards', async (request, reply) => {
        const boards = await Board.getAll();
        reply.send(boards)
    })
    fastify.get('/boards/:board', async (request, reply) => {
        const board = await Board.findById(request.params.board);
        if (!board) {
            reply.callNotFound()
          } else {
            reply.send(board)
          }

    })
    fastify.post('/boards', async (request, reply) => {
        reply.code(201)
        const board = await Board.createBoard(request.body);
        reply.send(board); 
    })
    fastify.put('/boards/:board', async (request, reply) => {
        const board = await Board.updateBoard(request.params.board, request.body);
        if (!board) {
            reply.callNotFound()
          } else {
            reply.send(board)
          }
    })
    fastify.delete('/boards/:board', async (request, reply) => {
        reply.code(204)
        const board = await Board.deleteBoard(request.params.board);

            reply.send(board)

         
    })
}
  

  module.exports = boardsRoutes