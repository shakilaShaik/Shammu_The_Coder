import { parentPort, workerData} from 'worker_threads'

let count = 0;
for (let i = 0; i < 50000000000000/workerData.thread_count;i++) {
  count++;
}
parentPort.postMessage(count)


import express from 'express';
import { Worker } from 'worker_threads';

const app = express();
const threads_count = 8;

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: { thread_count: threads_count }
    });

    worker.on('message', (data) => {
      worker.terminate();
      resolve(data);
    });

    worker.on('error', reject);
  });
}

app.get('/', async (req, res) => {
  const workerPromises = [];

  for (let i = 0; i < threads_count; i++) {
    workerPromises.push(createWorker());
  }

  const results = await Promise.all(workerPromises);
  const total = results.reduce((a, b) => a + b, 0);

  res.json({ msg: `The count is ${total}` });
});

app.listen(3000, () => console.log('Server running on 3000'));
