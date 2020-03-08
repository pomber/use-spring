import React from "react";
import { TaskId } from "./raf-queue";

export function useSpringInstance(target: number, config: Config): Instance {
  const ref = React.useRef<Instance | null>(null);
  if (ref.current == null) {
    ref.current = {
      config: getConfigWithDefaults(target, config),
      state: getInitialState(target, config)
    };
  }
  return ref.current!;
}

export function getConfigWithDefaults(
  target: number,
  { stiffness, damping, mass, decimals, teleport }: Config
): InstanceConfig {
  return {
    X: target,
    k: stiffness ?? 170,
    c: damping ?? 26,
    m: mass ?? 1,
    teleport: teleport ?? false,
    decimals: decimals ?? 2
  };
}

function getInitialState(target: number, { from, initialSpeed }: Config) {
  return {
    x0: from ?? target,
    v0: initialSpeed ?? 0,
    t0: performance.now(),
    raf: null
  };
}

export type Config = {
  stiffness?: number;
  damping?: number;
  mass?: number;
  decimals?: number;
  teleport?: boolean;
  initialSpeed?: number;
  from?: number;
};

type Instance = {
  config: InstanceConfig;
  state: InstanceState;
};

export type InstanceConfig = {
  X: number;
  k: number;
  c: number;
  m: number;
  teleport: boolean;
  decimals: number;
};

type InstanceState = {
  x0: number;
  v0: number;
  t0: number;
  raf: TaskId | null;
};
