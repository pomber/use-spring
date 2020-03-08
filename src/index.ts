import React from "react";
import {
  getConfigWithDefaults,
  useSpringInstance,
  Config,
  InstanceConfig
} from "./config";
import { spring } from "./spring";
import { queueAnimationFrame, unqueueAnimationFrame } from "./raf-queue";

export function useSpring(
  target: number,
  config: Config = {}
): [number, boolean] {
  const [, forceUpdate] = React.useState();
  const newConfig = getConfigWithDefaults(target, config);
  const { state, config: oldConfig } = useSpringInstance(target, config);

  // TODO all springs should use the same t in the same frame
  const t = performance.now();
  const { x0, v0, t0 } = state;
  const { k, c, m, X } = oldConfig;
  const { x, v } = newConfig.teleport
    ? { x: X, v: 0 }
    : spring({ x0, v0, t0, t, k, c, m, X });
  const moving = isMoving(x, v, t, newConfig);

  React.useLayoutEffect(() => {
    Object.assign(oldConfig, newConfig);
  }, [newConfig.X, newConfig.k, newConfig.c, newConfig.m, newConfig.teleport]);

  React.useLayoutEffect(() => {
    state.x0 = x;
    state.v0 = v;
    state.t0 = t;
  }, [x, v, t]);

  React.useLayoutEffect(() => {
    const loop = (now: number) => {
      const { x0, v0, t0 } = state;
      const { k, c, m, X, decimals } = oldConfig;
      const { x: nextX } = spring({ x0, v0, t0, t: now, k, c, m, X });
      if (roundTo(nextX, decimals) !== roundTo(x0, decimals)) {
        state.raf = null;
        forceUpdate(now);
      } else {
        state.raf = queueAnimationFrame(loop);
      }
    };
    if (moving && state.raf == null) {
      state.raf = queueAnimationFrame(loop);
    } else if (!moving && state.raf != null) {
      unqueueAnimationFrame(state.raf);
      state.raf = null;
    }
  });

  React.useLayoutEffect(() => {
    return () => {
      if (state.raf != null) {
        unqueueAnimationFrame(state.raf);
      }
    };
  }, []);

  return [roundTo(x, newConfig.decimals), moving];
}

function isMoving(
  x: number,
  v: number,
  t: number,
  { decimals, X, k, c, m }: InstanceConfig
) {
  if (roundTo(x, decimals) !== roundTo(X, decimals)) {
    return true;
  }

  const nextT = t + 0.016;
  const { x: nextX } = spring({ x0: x, v0: v, t0: t, t: nextT, k, c, m, X });
  return roundTo(nextX, decimals) !== roundTo(X, decimals);
}

function roundTo(x: number, decimals: number) {
  const p = Math.pow(10, decimals);
  return Math.round(x * p) / p;
}
