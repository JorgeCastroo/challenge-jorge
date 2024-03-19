"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const logger = (0, debug_1.default)('core');
const delays = [...Array(50)].map(() => Math.floor(Math.random() * 900) +
    100);
const load = delays.map((delay) => () => new Promise((resolve) => {
    setTimeout(() => resolve(Math.floor(delay / 100)), delay);
}));
const throttle = (workers, tasks) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    const queue = [...tasks];
    const executing = [];
    const executeNext = () => __awaiter(void 0, void 0, void 0, function* () {
        if (queue.length === 0)
            return;
        const task = queue.shift();
        if (task) {
            const promise = task();
            results.push(yield promise);
            executing.splice(executing.indexOf(promise), 1);
        }
        yield executeNext();
    });
    while (executing.length < workers && queue.length > 0) {
        const task = queue.shift();
        if (task) {
            const promise = task();
            executing.push(promise);
            promise.then(() => executeNext());
            yield executeNext(); // Add this line
        }
    }
    yield Promise.all(executing);
    return results;
});
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting...');
    const start = Date.now();
    const answers = yield throttle(5, load);
    console.log('Done in %dms', Date.now() - start);
    console.log('Answers: %O', answers);
});
bootstrap().catch((err) => {
    console.log('General fail: %O', err);
});
