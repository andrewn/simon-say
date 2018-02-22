const getSocketPath = () => process.env.SOCKET_PATH || `/tmp/speechd.sock`;

module.exports = {
  getSocketPath
};
