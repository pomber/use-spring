import React, { useState } from "react";
import { useSpring } from "@";

export default {
  title: "Tests"
};

function Simple() {
  const [target, setTarget] = useState(0);
  const [teleport, setTeleport] = useState(false);
  const handleTargetChange = e => setTarget(+e.target.value);
  const handleTeleportChange = e => setTeleport(e.target.checked);
  const [current, isMoving] = useSpring(target, { teleport, stiffness: 10 });
  return (
    <div style={{ color: "salmon" }}>
      <input type="range" value={target} onChange={handleTargetChange} />
      <br />
      <label>
        Teleport:
        <input
          name="teleport"
          type="checkbox"
          checked={teleport}
          onChange={handleTeleportChange}
        />
      </label>
      <br />
      <input type="range" value={current} readOnly />
      <br />
      {isMoving ? "Moving..." : "Stopped"}
    </div>
  );
}

export const teleport = () => <Simple />;
