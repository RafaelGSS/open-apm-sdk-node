const agent = require('../')();
agent.start();

const fastify = require('fastify')({ logger: true })

fastify.get('/', function (request, reply) {
  agent._instrumentator.wrapOnTrace(shouldTraceFunction.bind(this, 'example'));
  agent._instrumentator.wrapOnTrace(anotherFunction);
  reply.send('works!')
})

function shouldTraceFunction(param) {
  agent._instrumentator.wrapOnTrace(shouldTrace2Function);
}
function shouldTrace2Function() { }

function anotherFunction() { }

fastify.get('/async', async function (request, reply) {
  await Promise.all([
    agent._instrumentator.wrapOnTraceAsync(asyncFunc1),
    agent._instrumentator.wrapOnTraceAsync(asyncFunc3)
  ]);
  reply.send('works!');
});

async function asyncFunc1() {
  await sleep(5000);
  await agent._instrumentator.wrapOnTraceAsync(asyncFunc2);
}
async function asyncFunc2() { }

async function asyncFunc3() {
  await sleep(5000);
  await agent._instrumentator.wrapOnTraceAsync(asyncFunc4);
}
async function asyncFunc4() { }

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

fastify.listen(3000, '0.0.0.0', function (err) {
  if (err) throw err
})

