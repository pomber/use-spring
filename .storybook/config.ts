import { configure, addParameters } from "@storybook/react";
import { themes } from "@storybook/theming";

// Option defaults.
addParameters({
  options: {
    theme: themes.dark,
    name: "use-spring",
    url: "https://github.com/pomber/use-spring"
  }
});
// automatically import all files ending in *.stories.js
configure(require.context("../stories", true, /\.stories\.(js|ts)x?$/), module);
