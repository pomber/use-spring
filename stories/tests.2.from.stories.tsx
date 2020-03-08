import React, { useState } from "react";
import { useSpring } from "@";

export default {
  title: "Tests"
};

function Simple() {
  const [target, setTarget] = useState(50);
  const handleTargetChange = e => setTarget(+e.target.value);
  const [current] = useSpring(target, { from: 0, stiffness: 20 });
  return (
    <div>
      <input type="range" value={target} onChange={handleTargetChange} />
      <br />
      <input type="range" value={current} readOnly />
    </div>
  );
}

export const from = () => <Simple />;
