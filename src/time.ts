export function currentTime() {
  if (typeof window !== "undefined") {
    return performance.now();
  } else {
    return 0;
  }
}
