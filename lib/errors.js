class SocketCreationError extends Error {
  constructor(socketPath) {
    super(`Cannot create socket at path "${socketPath}"`);
    this.message = `Cannot create socket at path "${socketPath}"
Either something else has claimed that path, or the file needs to be deleted.
`;
  }
}

module.exports = {
  SocketCreationError
};
