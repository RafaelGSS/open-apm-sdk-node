const agent = require('../')();
agent.start();

const fastify = require('fastify')({ logger: true })

fastify.get('/', function (request, reply) {
  console.log(agent._instrumentator.trace.getStore().name)
  agent._instrumentator.wrapOnTrace(shouldTraceFunction.bind(this, 'example'));
  console.log(agent._instrumentator.trace.getStore().name)
  agent._instrumentator.wrapOnTrace(anotherFunction);
  console.log(agent._instrumentator.trace.getStore().name)
  reply.send('works!')
})

function shouldTraceFunction(param) {
  agent._instrumentator.wrapOnTrace(shouldTrace2Function);
}

function shouldTrace2Function() {

}

function anotherFunction() {

}

fastify.listen(3000, '0.0.0.0', function (err) {
  if (err) throw err
})

