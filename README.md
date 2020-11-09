# Open-APM SDK for NodeJS.

Open-APM is an lightweight APM for NodeJS. Allows you to observe NodeJS application to perform workload tests for improve the app.

## Usage

```tsx
import agent from '../index';
agent.start();

agent.wrap(functionExample)();
console.log('done!')

function functionExample() {
  // ...
}
```

or Async

```tsx
import agent from '../index';
agent.start();

agent.wrap(functionExample)().then(() => console.log('done!'));

async function functionExample() {
  // ...
}
```

Check the [examples](./examples) folder for more information.
