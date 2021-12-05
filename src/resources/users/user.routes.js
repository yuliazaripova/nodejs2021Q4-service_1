
const User = require('./user.service')

async function userRoutes (fastify) {
    fastify.get('/users', async (request, reply) => {
        const users = await User.getAll();
        reply.send(users)
    })
    fastify.get('/users/:user', async (request, reply) => {
        const user = await User.findById(request.params.user);
        reply.send(user); 
    })
    fastify.post('/users', async (request, reply) => {
        reply.code(201)
        const user = await User.createUser(request.body);
        reply.send(user); 
    })
    fastify.put('/users/:user', async (request, reply) => {
        const user = await User.updateUser(request.params.user, request.body);
        reply.send(user); 
    })
    fastify.delete('/users/:user', async (request, reply) => {
        reply.code(204)
        const user = await User.deleteUser(request.params.user);
        reply.send(user)
    })
}
  

  module.exports = userRoutes