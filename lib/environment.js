const getHost = () => process.env.HOST || null;
const getPort = () => process.env.PORT || null;
const getSocketPath = () => process.env.SOCKET_PATH || `/tmp/speechd.sock`;

const getConnectionConfig = () =>
  getPort()
    ? { host: getHost(), port: getPort() }
    : { socketPath: getSocketPath() };

module.exports = {
  getConnectionConfig,
  getHost,
  getPort,
  getSocketPath
};
