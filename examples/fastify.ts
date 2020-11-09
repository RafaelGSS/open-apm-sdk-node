import agent from '../index';
import Fastify, { FastifyRequest, FastifyReply } from 'fastify';

agent.start();

const fastify = Fastify({ logger: true });

fastify.get('/', function (_request: FastifyRequest, reply: FastifyReply) {
  agent.wrap(shouldTraceFunction.bind(this, 'example'))();
  agent.wrap(anotherFunction)();
  reply.send('works!')
})

function shouldTraceFunction(_param: string) {
  agent.wrap(shouldTrace2Function)();
}
function shouldTrace2Function() { }

function anotherFunction() { }

fastify.get('/async', async function (_request: FastifyRequest, reply: FastifyReply) {
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

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

fastify.listen(3000, '0.0.0.0', function (err: Error) {
  if (err) throw err
})

