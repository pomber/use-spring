# use-spring

[![](https://badgen.net/bundlephobia/minzip/use-spring)](https://bundlephobia.com/result?p=use-spring) ![](https://badgen.net/david/dep/pomber/use-spring) ![](https://badgen.net/npm/types/use-spring)

Install

```bash
npm install use-spring
```

Use

```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSpring } from "use-spring";

function App() {
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## Demos

- [Basic Demo](https://codesandbox.io/s/use-spring-demo-fbbvn)
- [Emoji Heads](https://codesandbox.io/s/use-spring-demo-irfq5?hidenavigation=1)

## API

```js
// default values:
const [x, isMoving] = useSpring(target, {
  stiffness: 170,
  damping: 26,
  mass: 1,
  decimals: 2,
  teleport: false,
  from: target,
  initialSpeed: 0
});
```

You can try different values of `stiffness`, `damping` or `mass` on the [Spring Editor](https://springs.pomb.us/).

## Related

- [react-spring](https://github.com/react-spring/react-spring)
- [react-motion](https://github.com/chenglou/react-motion)
- [framer-motion](https://www.framer.com/api/motion/)

## MIT License

Copyright (c) 2019 Rodrigo Pombo
