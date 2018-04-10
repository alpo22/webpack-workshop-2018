# Code Splitting
Code splitting is the process of splitting pieces of your code into async chunks *at build time*.  It should not be an automatic process, it should be part of the UX consideration (should it be pre-downloaded, or on demand).

Documentation: https://webpack.js.org/guides/code-splitting/

Stats on page load speeds: https://storage.googleapis.com/doubleclick-prod/documents/The_Need_for_Mobile_Speed_-_FINAL.pdf

The top factors of web-page load-time:

1. JS initial download
2. CSS initial download
3. Number of network requests

Every 100kb of code translates to 1s of load time [on mobile?]. But we also need to consider the time spent processing what was downloaded.  CSS selector-matching requires the most of the browser's processing power when page rendering. To address this our goals should be:

1. Max 200kb uncompressed initial JavaScript (gzip only improves download speed, but not rendering speed)
2. Max 100kb uncompressed initial CSS
3. Max of 6 initial http network calls or max of 20 http/2 initial network calls
4. 90% of code is used (only 10% code un-used)

Pro Tip: Chrome has a "Coverage" tag, that shows you the network traffic and how much of it is un-used (open console, press 'esc', press '...' icon and then 'Coverage').  Click on the file, the "Sources" tab will show you which lines are used.

There are two types of code splitting: *static* and *dynamic*.

##### Static code splitting
Use it on:
- heavy JavaScript
- a library
- on anything temporal (anything not visible then becomes visible, e.g: modal, tooltip, a route, etc.).

Example:

```
  const getModal = () => import("./path/to/modal.js");
  ...
  <button
    onClick={() => {
      getModal().then(module => {
        module.initModal(document.getElementById("Modal"));
      })
    }}
  />
```

That `import` is built into JavaScript: https://developers.google.com/web/updates/2017/11/dynamic-import.  Webpack sees it when building its tree, bundles it and puts it in its own chunk. Webpack also wont create duplicate chunks (if import that modal twice).

Do not use "commons chunking", you're still downloading it upfront and it doesnt reduce the time needed to parse/evaluate/execute.


##### Dynamic code splitting
Use it on:
- A/B testing
- Theming
- Convenience

Webpack creates a chunk for each dynamic file.

Example:
```
  const getTheme = (themeName) => import (`.src/themes/${themeName}`);
```

### Pro Tips:

- CSS can be split up too, using `mini-css-extract-plugin`.
- Libraries should not be split; it should be left up to the consumer. Build it into the component to allow for it.  Eg in library component do:
```
if (typoef this.menu === Function) {
  //using code splitting
  this.menu().then((menuModule) => {
    menuModule.open();
  })
} else {
  //not using code splitting
  this.menu.open();
}
```

To switch between code-splitting and not, someone using the library would just have to change one line:
```
import menu from "./Menu";            //not code split
const menu = () => import("./Menu")   //code split
```

- Babel runs before code splitting and can break it, so if using Babel you also need to install `babel-plugin-syntax-dynamic-import` and in the `.babelrc` file, set `module` to `false`.
- Look at webpack.optimize.AggressiveSplittingPlugin()
- Webpack cannot tree-shake from a dynamic import


### Performance Hints
Webpack can notify you, or die, if the bundle gets too big (e.g. someone imports a giant library): webpack.js.org/configuration/performance
Add this to webpack config:
```
  performance: {
    hints: "error",
    maxAssetSize: 15000
  }
```

There's also a visualisation plugin to demonstrate the size of the chunks, and what each one consists of: `webpack-bundle-analyzer`
It helps you triage, and see what modules are large (by chunk), and maybe things you import multiple times.
