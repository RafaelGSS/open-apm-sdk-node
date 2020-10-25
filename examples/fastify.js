const agent = require('../')();
agent.start();

const fastify = require('fastify')({ logger: true })

fastify.get('/', function (request, reply) {
  const store = agent._instrumentator.trace.getStore();
  console.log(store)
  reply.send('works!')
})

fastify.listen(3000, '0.0.0.0', function (err) {
  if (err) throw err
})

