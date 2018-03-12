#!/usr/bin/env node
const log = require("../lib/logger")("simon-say:main");
const connect = require("../lib/connect");
const Protocol = require("../lib/protocol");
const { getConnectionConfig } = require("../lib/environment");

const main = async () => {
  const connections = await connect(getConnectionConfig());

  connections.on("connection", connection => {
    log("Client connected");

    connection.on("disconnection", () => log("Client disconnected"));

    const protocol = new Protocol(connection);
  });

  const gracefulExit = signal => err => {
    log(`Received ${signal}. Exiting...`);
    if (err) {
      log("Error:", err);
    }
    connections.close();
  };

  ["SIGINT", "SIGTERM"].forEach(signal => {
    process.on(signal, gracefulExit(signal));
  });

  process.on("uncaughtException", gracefulExit("uncaughtException"));
};

main();
