const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = env => {
  const envConfig = require(`./webpack.${env.mode}`);
  return webpackMerge({ mode: env.mode }, commonConfig, envConfig);
};
