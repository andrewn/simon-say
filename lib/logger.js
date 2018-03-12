const debug = require("debug");

module.exports = () => {
  const log = debug(`simon-say*`);
  log.log = console.log.bind(console);

  return log;
};
