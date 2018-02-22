const net = require("net");
const { EventEmitter } = require("events");

const { SocketCreationError } = require("./errors");
const ClientConnection = require("./ClientConnection");

const connect = async ({ socketPath } = {}) => {
  const api = new EventEmitter();
  const clients = [];

  const server = net.createServer(client => {
    const connection = new ClientConnection(client);
    api.emit("connection", connection);
    clients.push(connection);
  });

  server.on("error", err => {
    if (err.code === "EADDRINUSE") {
      throw new SocketCreationError(socketPath);
    } else {
      throw err;
    }
  });

  server.listen({ path: socketPath }, () => {
    console.log(`Listening for connections on: ${socketPath}`);
  });

  api.close = () => {
    clients.forEach(client => client.close());
    server.close();
  };

  return api;
};

module.exports = connect;
