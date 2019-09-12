import { useState, useEffect } from "react";

export function useSpring(target) {
  const [state, setState] = useState({});

  useEffect(function() {
    const now = performance.now();
    const [x0, v0] = state.spring ? state.spring(now) : [target, 0];
    const spring = newSpring(target, x0, v0, now);

    requestAnimationFrame(() => {
      const now = performance.now();
      setState({ now, spring });
    });
  });

  return state.spring ? round(state.spring(state.now)[0]) : target;
}

function newSpring(target, x0, v0, start) {
  const d = target - x0;
  const spring = getSpring({ k: 10, c: 5, m: 2, x0: d, v0 });
  return now => {
    const t = (now - start) / 1000;
    const [x, v] = spring(t);
    return [target - x, v];
  };
}

function getSpring({ k, c, m, x0, v0 }) {
  const radicand = c * c - 4 * k * m;
  let spring;
  if (radicand > 0) {
    const rp = (-c + Math.sqrt(radicand)) / (2 * m);
    const rn = (-c - Math.sqrt(radicand)) / (2 * m);
    const a = (x0 * rp - v0) / (rp - rn);
    const b = (v0 - x0 * rn) / (rp - rn);
    spring = t => [
      a * Math.exp(rn * t) + b * Math.exp(rp * t),
      a * rn * Math.exp(rn * t) + b * rp * Math.exp(rp * t)
    ];
  } else if (radicand < 0) {
    const r = -c / (2 * m);
    const s = Math.sqrt(-radicand) / (2 * m);
    const a = x0;
    const b = (v0 - r * x0) / s;
    spring = t => [
      Math.exp(r * t) * (a * Math.cos(s * t) + b * Math.sin(s * t)),
      Math.exp(r * t) *
        ((b * s + a * r) * Math.cos(s * t) - (a * s - b * r) * Math.sin(s * t))
    ];
  } else {
    const r = -c / (2 * m);
    const a = x0;
    const b = v0 - r * x0;
    spring = t => [
      (a + b * t) * Math.exp(r * t),
      (b + a * r + b * r * t) * Math.exp(r * t)
    ];
  }

  return spring;
}

function round(x) {
  return Math.round(x * 1000) / 1000;
}
