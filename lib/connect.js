const net = require("net");
const { EventEmitter } = require("events");
const log = require("debug")("simon-say:connect");

const { SocketCreationError } = require("./errors");
const ClientConnection = require("./ClientConnection");

// TODO: This probably shouldn't know about the protocol
const { LINE_ENDING } = require("./protocol/format");

const connect = async ({ socketPath, host, port } = {}) => {
  const api = new EventEmitter();
  const clients = [];

  const connectionOpts = socketPath ? { path: socketPath } : { host, port };
  const connectionString = socketPath ? socketPath : `${host || ""}:${port}`;

  const server = net.createServer(client => {
    const connection = new ClientConnection(client, LINE_ENDING);
    api.emit("connection", connection);
    clients.push(connection);
  });

  server.on("error", err => {
    if (err.code === "EADDRINUSE") {
      throw new SocketCreationError(connectionString);
    } else {
      throw err;
    }
  });

  server.listen(connectionOpts, () => {
    log(`Listening for connections on: ${connectionString}`);
  });

  api.close = () => {
    clients.forEach(client => client.close());
    server.close();
  };

  return api;
};

module.exports = connect;
