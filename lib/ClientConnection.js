const { EventEmitter } = require("events");

class ClientConnection extends EventEmitter {
  constructor(socket) {
    super();

    this._socket = socket;

    this._socket.on("end", () => {
      this.emit("disconnection");
    });

    this._socket.on("data", data => {
      this.emit("message", data.toString());
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
