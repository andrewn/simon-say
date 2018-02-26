#!/usr/bin/env node

const connect = require("../lib/connect");
const Protocol = require("../lib/protocol");
const { getConnectionConfig } = require("../lib/environment");

const main = async () => {
  const connections = await connect(getConnectionConfig());

  connections.on("connection", connection => {
    console.log("Client connected");

    connection.on("disconnection", () => console.log("Client disconnected"));

    const protocol = new Protocol(connection);
  });

  const gracefulExit = signal => () => {
    console.log(`Received ${signal}. Exiting...`);
    connections.close();
  };

  ["SIGINT", "SIGTERM"].forEach(signal => {
    process.on(signal, gracefulExit(signal));
  });

  process.on("uncaughtException", gracefulExit("uncaughtException"));
};

main();