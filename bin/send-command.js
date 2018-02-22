#!/usr/bin/env node

const net = require("net");
const readline = require("readline");

const { getSocketPath } = require("../lib/environment");
const { formatMessage } = require("../lib/protocol/format");

const main = async () => {
  const socket = net.createConnection(getSocketPath());
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
