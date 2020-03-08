import React from "react";
import { useSpring } from "@";

export default {
  title: "Demos"
};

function App() {
  const [open, setOpen] = React.useState(false);
  const [percentage, isMoving] = useSpring(open ? 0 : -100);
  const showMenu = open || isMoving;

  return (
    <div style={{ position: "relative" }}>
      <button style={{ width: 200 }} onClick={() => setOpen(s => !s)}>
        {open ? "Close" : "Open"}
      </button>
      {showMenu && (
        <div
          style={{
            position: "absolute",
            height: 400,
            width: 200,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              background: "salmon",
              height: "100%",
              willChange: "transform",
              transform: `translateY(${percentage}%)`
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export const menu = () => <App />;
