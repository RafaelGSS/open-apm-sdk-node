const agent = require('../')();
agent.start();

const app = require('express')()

app.get('/', function (request, reply) {
  const store = agent._instrumentator.trace.getStore();
  console.log(store)
  reply.send('works!')
})

app.listen(3000, '0.0.0.0', function (err) {
  if (err) throw err
  console.log('Listening on port 3000')
})

