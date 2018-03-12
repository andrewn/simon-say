const { EventEmitter } = require("events");
const debug = require("debug");

const log = debug("simon-say:connection");

class ClientConnection extends EventEmitter {
  constructor(socket, lineEnding) {
    super();

    this.lineEnding = lineEnding;

    this.buffer = "";

    this._socket = socket;

    this._socket.on("end", () => {
      this.emit("disconnection");
    });

    this._socket.on("data", data => {
      this.buffer += data.toString();

      const terminatedMessages = this.buffer.split(this.lineEnding);

      if (terminatedMessages.length > 1) {
        terminatedMessages
          .slice(0, -1)
          .forEach(message => this.emit("message", message));

        const possiblyUnterminatedMessage = terminatedMessages.slice(-1);
        this.buffer = possiblyUnterminatedMessage;
      }
    });
  }

  write(...params) {
    this._socket.write(...params);
  }

  close() {
    this._socket.end();
  }
}

module.exports = ClientConnection;
