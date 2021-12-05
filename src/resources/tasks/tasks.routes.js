const Task = require('./tasks.service')

async function boardsRoutes (fastify) {
    fastify.get('/boards/:board/tasks', async (request, reply) => {
        const tasks = await Task.getAll(request.params.board);
        reply.send(tasks)
    })
    fastify.get('/boards/:board/tasks/:task', async (request, reply) => {
        const task = await Task.findById(request.params.board, request.params.task);
        if (!task) {
            reply.callNotFound()
          } else {
            reply.send(task); 
          }
        
    })
    fastify.post('/boards/:board/tasks', async (request, reply) => {
        reply.code(201)
        const task = await Task.createTask(request.params.board, request.body);
        reply.send(task); 
    })
    fastify.put('/boards/:board/tasks/:task', async (request, reply) => {
        const task = await Task.updateTask(request.params.task, request.body);
        
        if (!task) {
            reply.callNotFound()
          } else {
            reply.send(task);
          }
         
    })
    fastify.delete('/boards/:board/tasks/:task', async (request, reply) => {
        reply.code(204)
        const task = await Task.deleteTask(request.params.task);
            reply.send(task)

        
    })
}
  

  module.exports = boardsRoutes