import debug from 'debug';


const logger = debug('core');
const delays = [...Array(50)].map(() => Math.floor(Math.random() * 900) +
100);
const load = delays.map(
(delay) => (): Promise<number> =>
new Promise((resolve) => {
setTimeout(() => resolve(Math.floor(delay / 100)), delay);
})
);
type Task = () => Promise<number>;
const throttle = async (workers: number, tasks: Task[]) => {
    const results: number[] = [];
    const queue: Task[] = [...tasks];
    const executing: Promise<number>[] = []; 
  
    const executeNext = async () => {
      if (queue.length === 0) return;
    
      const task = queue.shift();
      if (task) {
        const promise = task();
        results.push(await promise);
        executing.splice(executing.indexOf(promise), 1);
      }
      await executeNext();
    };
  
    while (executing.length < workers && queue.length > 0) {
      const task = queue.shift();
      if (task) {
        const promise = task();
        executing.push(promise);
        promise.then(() => executeNext());
        await executeNext(); 
      }
    }
  
    await Promise.all(executing);
    return results;
};

const bootstrap = async () => {
logger('Starting...');
const start = Date.now();
const answers = await throttle(5, load);
logger('Done in %dms', Date.now() - start);
logger('Answers: %O', answers);
};
bootstrap().catch((err) => {
logger('General fail: %O', err);
});


