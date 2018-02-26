const getHost = () => process.env.SOCKET_HOST || null;
const getPort = () => process.env.SOCKET_PORT || null;
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
