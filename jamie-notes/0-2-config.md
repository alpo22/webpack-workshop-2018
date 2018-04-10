# The Webpack Config
Complete configuration documentation: http://webpack.js.org/configuration

In Webpack version 4, no configuration file is needed, but going that route just uses a bunch of defaults.  Create webpack.config.js

### `mode`
Webpack 4 has two modes: `development` and `production`.  `development` mode enables greater debugging, faster compilation and runtime error messages.  `production` mode creates smaller bundles, faster at runtime and drops dead code.

If `mode` is not in the config, Webpack will default to `production`.

### `entry`
This is the first JavaScript file that loads to "kick off" your app. Webpack uses this as the starting point for dependency tree traversal. Webpack scans this file looking for other dependencies, then goes into them and repeats.  This builds the dependency tree (an understanding of what code depends on other code).

If `entry` is not in the config, Webpack looks for `./src/index.js` as the entrypoint.

If your app has multiple entry points (e.g. not a SPA), the `entry` property is an object:
entry: {
  accounts: "./src/index.js",
  results: "./src/index2.js"
}

### `output`
Webpack generates the bundle(s) here.

If `output` is not in the config and there is a single entry point, Webpack generates the bundle in `./dist/main.js`.  If there are multiple entry points, the filename will remain the same.


### Loaders and `rules`
Loaders are middleware.  They are functions that take in a source file, and return it in a modified state _before_ it gets into the dependency graph. They run on each matching file and transform everything into JS (CSS, HTML, SVGs) [not fully true in v4].  The available props for loaders are:
  - test
  - use
  - [include]
  - [exclude]
  - [issuer]
  - [enforce]

### `plugins`
Plugins allow you to hook into the compilation lifecycle.  They are the foundation of Webpack - 80% of Webpack runs on its own plugins. They are just objects with an `apply` on the prototype chain.


### Pro Tips

- You can pipe in environment variables by passing in `--env.key value`, eg:
```
scripts: {
  "webpack-dev": "npm run webpack -- --env.name jamie",
}
```
Then in the config:
```
module.exports = (env) => {
  //can access `env.name`
}
```

- Using `webpack-dev-server` and `html-webpack-plugin` in combination doesn't write anything to `/dist`, it does it all from memory and the page reloads super quickly whenever a file changes.
- In package.json use `--hot` flag in development mode for hot module reloading (single component refresh)
- In package.json use `--watch` flag to rebuild when files change (full page refresh)
- In package.json use `--verbose` flag to see some details of bundling.
