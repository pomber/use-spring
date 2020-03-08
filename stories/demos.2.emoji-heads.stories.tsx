import React from "react";
import { useSpring } from "@";

export default {
  title: "Demos"
};

function useCoordsSpring({ x, y }) {
  return { x: useSpring(x)[0], y: useSpring(y)[0] };
}

function App() {
  const coords0 = useMouseCoords();
  const coords1 = useCoordsSpring(coords0);
  const coords2 = useCoordsSpring(coords1);
  const coords3 = useCoordsSpring(coords2);
  const coords4 = useCoordsSpring(coords3);
  const coords5 = useCoordsSpring(coords4);
  return (
    <>
      <Head {...coords5} emoji="🥴" />
      <Head {...coords4} emoji="😎" />
      <Head {...coords3} emoji="🤡" />
      <Head {...coords2} emoji="🥳" />
      <Head {...coords1} emoji="🤩" />
      <Head {...coords0} emoji="😀" />
    </>
  );
}

function Head({ x, y, emoji }) {
  return (
    <span
      role="img"
      aria-label="emoji"
      style={{
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        position: "fixed",
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        textAlign: "center",
        lineHeight: "50px",
        fontSize: "40px",
        userSelect: "none",
        willChange: "transform"
      }}
    >
      {emoji}
    </span>
  );
}

function useMouseCoords() {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const onMove = ({ pageX, pageY }) => {
      setCoords({ x: pageX, y: pageY });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return coords;
}

export const emojiHeads = () => <App />;
