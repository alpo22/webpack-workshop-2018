class MyFirstPlugin {
  apply(compiler) {
    //...
    compiler.hooks.done.tapAsync("MyFirstPlugin", (stats, cb) => {
      console.log("****************in the plugin");
      console.log(stats);
      // console.log(compiler.hooks);
      cb();
      debugger;
    });
  }
}

module.exports = MyFirstPlugin;
