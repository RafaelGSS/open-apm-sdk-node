const agent = require('../').init();
agent.start();

const fastify = require('fastify')({ logger: true })

fastify.get('/', function (request, reply) {
  agent.wrap(shouldTraceFunction.bind(this, 'example'))();
  agent.wrap(anotherFunction)();
  reply.send('works!')
})

function shouldTraceFunction(param) {
  agent.wrap(shouldTrace2Function)();
}
function shouldTrace2Function() { }

function anotherFunction() { }

fastify.get('/async', async function (request, reply) {
  await Promise.all([
    agent.wrap(asyncFunc1, asyncFunc1.name, true)(),
    agent.wrap(asyncFunc3, asyncFunc3.name, true)(),
  ]);
  reply.send('works!');
});

async function asyncFunc1() {
  await sleep(5000);
  await agent.wrap(asyncFunc2, asyncFunc2.name, true)();
}
async function asyncFunc2() { }

async function asyncFunc3() {
  await sleep(5000);
  await agent.wrap(asyncFunc4, asyncFunc4.name, true)();
}
async function asyncFunc4() { }

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

fastify.listen(3000, '0.0.0.0', function (err) {
  if (err) throw err
})

