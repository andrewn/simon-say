#!/usr/bin/env node

const net = require("net");
const readline = require("readline");

const { getConnectionConfig } = require("../lib/environment");
const { formatMessage } = require("../lib/protocol/format");

const main = async () => {
  const socket = net.createConnection(getConnectionConfig());
  socket.on("data", data => {
    console.log(data.toString());
  });

  socket.on("close", () => process.exit());

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("line", input => {
    socket.write(formatMessage(input.trim()));
  });
};

main();
