require('../')().start()
const fastify = require('fastify')({ logger: true })

fastify.get('/', function (request, reply) {
  reply.send('works!')
})

fastify.listen(3000, '0.0.0.0', function (err) {
  if (err) throw err
})

