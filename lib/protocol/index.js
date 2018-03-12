const say = require("../say");
const { defaultVoice } = require("./VoiceTypes");
const { formatReply } = require("./format");
const commandForMessage = require("./commandForMessage");
const debug = require("debug");

const log = {
  receive: debug("simon-say:protocol:receive"),
  reply: debug("simon-say:protocol:reply")
};

class Protocol {
  constructor(connection) {
    this._connection = connection;

    this.state = {
      speak: false,
      words: [],
      voiceType: defaultVoice
    };

    this.receiveMessage = this.receiveMessage.bind(this);
    this._connection.on("message", this.receiveMessage);
  }

  async receiveMessage(message) {
    log.receive(message);
    const { state = {}, reply } = await commandForMessage(this.state, message);

    if (reply != null) {
      this.reply(reply);
    } else {
      console.warn("Command for message has no reply", message);
    }

    this.state = {
      ...this.state,
      ...state
    };
  }

  reply(message) {
    log.reply(formatReply(message));
    this._connection.write(formatReply(message));
  }
}

module.exports = Protocol;
