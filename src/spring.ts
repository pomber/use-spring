const { sqrt, exp, sin, cos } = Math;

export function spring({ x0, v0, t0, t, k, c, m, X }: Input): Output {
  const dx = x0 - X;
  const dt = (t - t0) / 1000;
  const radicand = c * c - 4 * k * m;
  if (radicand > 0) {
    const rp = (-c + sqrt(radicand)) / (2 * m);
    const rn = (-c - sqrt(radicand)) / (2 * m);
    const a = (dx * rp - v0) / (rp - rn);
    const b = (v0 - dx * rn) / (rp - rn);
    return {
      x: X + a * exp(rn * dt) + b * exp(rp * dt),
      v: a * rn * exp(rn * dt) + b * rp * exp(rp * dt)
    };
  } else if (radicand < 0) {
    const r = -c / (2 * m);
    const s = sqrt(-radicand) / (2 * m);
    const a = dx;
    const b = (v0 - r * dx) / s;
    return {
      x: X + exp(r * dt) * (a * cos(s * dt) + b * sin(s * dt)),
      v:
        exp(r * dt) *
        ((b * s + a * r) * cos(s * dt) - (a * s - b * r) * sin(s * dt))
    };
  } else {
    const r = -c / (2 * m);
    const a = dx;
    const b = v0 - r * dx;
    return {
      x: X + (a + b * dt) * exp(r * dt),
      v: (b + a * r + b * r * dt) * exp(r * dt)
    };
  }
}

type Input = {
  x0: number;
  v0: number;
  t0: number;
  t: number;
  k: number;
  c: number;
  m: number;
  X: number;
};

type Output = {
  x: number;
  v: number;
};
