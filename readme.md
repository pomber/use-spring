# use-spring

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
  const current = useSpring(target);
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

[Demo](https://codesandbox.io/s/use-spring-demo-fbbvn)

## API

```js
const x = useSpring(target, {
  stiffness: 170,
  damping: 26,
  mass: 1,
  decimals: 2,
  teleport: false
});
```

## MIT License

Copyright (c) 2019 Rodrigo Pombo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
