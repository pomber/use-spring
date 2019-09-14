import { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
const { round, sqrt, exp, sin, cos, pow } = Math;

export function useSpring(target, config) {
  const {
    stiffness: k,
    damping: c,
    mass: m,
    teleport,
    decimals
  } = Object.assign(
    { stiffness: 170, damping: 26, mass: 1, decimals: 2 },
    config
  );
  const [state, setState] = useState({ spring: t => [target, 0], now: null });
  const [x, v] = teleport ? [target, 0] : state.spring(state.now);

  useEffect(
    function() {
      const now = performance.now();
      const [x0, v0] = state.spring(now);
      const spring = newSpring(target, x0, v0, now, k, c, m);

      const raf = queueAnimationFrame(now => setState({ now, spring }));
      return () => unqueueAnimationFrame(raf);
    },
    [target, k, c, m, roundTo(x, decimals + 1), roundTo(v, decimals + 1)]
  );

  return roundTo(x, decimals);
}

function newSpring(target, x0, v0, start, k, c, m) {
  const d = target - x0;
  const spring = getSpring({ k, c, m, x0: d, v0 });
  return now => {
    const t = (now - start) / 1000;
    const [x, v] = spring(t);
    return [target - x, v];
  };
}

function getSpring({ k, c, m, x0, v0 }) {
  const radicand = c * c - 4 * k * m;
  if (radicand > 0) {
    const rp = (-c + sqrt(radicand)) / (2 * m);
    const rn = (-c - sqrt(radicand)) / (2 * m);
    const a = (x0 * rp - v0) / (rp - rn);
    const b = (v0 - x0 * rn) / (rp - rn);
    return t => [
      a * exp(rn * t) + b * exp(rp * t),
      a * rn * exp(rn * t) + b * rp * exp(rp * t)
    ];
  } else if (radicand < 0) {
    const r = -c / (2 * m);
    const s = sqrt(-radicand) / (2 * m);
    const a = x0;
    const b = (v0 - r * x0) / s;
    return t => [
      exp(r * t) * (a * cos(s * t) + b * sin(s * t)),
      exp(r * t) * ((b * s + a * r) * cos(s * t) - (a * s - b * r) * sin(s * t))
    ];
  } else {
    const r = -c / (2 * m);
    const a = x0;
    const b = v0 - r * x0;
    return t => [
      (a + b * t) * exp(r * t),
      (b + a * r + b * r * t) * exp(r * t)
    ];
  }
}

function roundTo(x, decimals) {
  const p = pow(10, decimals);
  return round(x * p) / p;
}

let nextFrameQueue = [];
let nextFrameId = null;

function queueAnimationFrame(fn) {
  const length = nextFrameQueue.push(fn);
  if (length === 1) {
    nextFrameId = requestAnimationFrame(runQueue);
  }
  return [nextFrameId, length - 1];
}

function unqueueAnimationFrame([frameId, index]) {
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
