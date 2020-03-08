import { unstable_batchedUpdates } from "react-dom";

type FrameId = number;
type TaskIndex = number;
export type TaskId = [FrameId, TaskIndex];
type TaskFn = (now: number) => any;

let nextFrameQueue: TaskFn[] = [];
let nextFrameId: FrameId | null = null;

export function queueAnimationFrame(fn: TaskFn): TaskId {
  const length = nextFrameQueue.push(fn);
  if (length === 1) {
    nextFrameId = requestAnimationFrame(runQueue);
  }
  return [nextFrameId!, length - 1];
}

export function unqueueAnimationFrame([frameId, index]: TaskId) {
  if (frameId === nextFrameId) {
    delete nextFrameQueue[index];
  }
}

function runQueue() {
  const now = performance.now();
  const queue = nextFrameQueue;
  nextFrameQueue = [];
  unstable_batchedUpdates(() => queue.forEach(task => task && task(now)));
}
