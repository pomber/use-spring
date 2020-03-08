import React, { useState } from "react";
import { useSpring } from "@";

export default {
  title: "Demos"
};

function Simple() {
  const [target, setTarget] = useState(0);
  const handleTargetChange = e => setTarget(+e.target.value);
  const [current] = useSpring(target);
  return (
    <div>
      <input type="range" value={target} onChange={handleTargetChange} />
      <br />
      <input type="range" value={current} readOnly />
    </div>
  );
}

function Double() {
  const [target, setTarget] = useState(0);
  const handleTargetChange = e => setTarget(+e.target.value);
  const [current] = useSpring(target);
  const [current2] = useSpring(current);
  return (
    <div>
      <input type="range" value={target} onChange={handleTargetChange} />
      <br />
      <input type="range" value={current} readOnly />
      <br />
      <input type="range" value={current2} readOnly />
    </div>
  );
}

export const simple = () => <Simple />;
export const double = () => <Double />;
