// Its pretty obvious what this loader does

module.exports = function whatever(src) {
  return src.replace("console.log", "console.warn");
};
