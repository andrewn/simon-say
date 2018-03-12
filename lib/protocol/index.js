const say = require("../say");
const { defaultVoice } = require("./VoiceTypes");
const { formatReply } = require("./format");
const commandForMessage = require("./commandForMessage");
const debug = require("debug");
const queue = require("async/queue");

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

    this.processMessage = this.processMessage.bind(this);

    this.messageQueue = queue(this.processMessage);

    this._connection.on("message", m => {
      this.messageQueue.push(m);
    });
  }

  async processMessage(message, done) {
    const { state = {}, reply } = await commandForMessage(this.state, message);

    if (reply != null) {
      this.reply(reply);
    } else {
      log.reply("No reply for action", message);
    }

    this.state = {
      ...this.state,
      ...state
    };

    done();
  }

  reply(message) {
    log.reply(formatReply(message));
    this._connection.write(formatReply(message));
  }
}

module.exports = Protocol;
