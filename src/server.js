const fastify = require('fastify')({
  logger: true
})

const { PORT } = require('./common/config');

fastify.register(require('./resources/users/user.routes'))
fastify.register(require('./resources/boards/boards.routes'))
fastify.register(require('./resources/tasks/tasks.routes'))

const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
