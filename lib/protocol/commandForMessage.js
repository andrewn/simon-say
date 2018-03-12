const debug = require("debug");

const say = require("../say");
const { VoiceTypes } = require("./VoiceTypes");

const log = debug("simon-say:command");

const listVoices = async () => {
  const voices = await say.listVoices();
  log("LIST VOICES");

  const reply = {
    result: { code: 249, content: "OK VOICE LIST SENT" },
    lines: Object.keys(VoiceTypes).map(content => ({ code: 249, content }))
  };

  return { reply };
};

const setVoiceType = async (_, matches) => {
  if (matches && matches[2] && VoiceTypes[matches[2]] != null) {
    log("SET VOICE_TYPE " + matches[2]);
    const reply = {
      result: { code: "000", content: "OK" }
    };
    const state = {
      voiceType: matches[2]
    };

    return { reply, state };
  }
};

const getVoiceType = async ({ voiceType }) => {
  log("GET VOICE_TYPE");
  const reply = {
    result: { code: 251, content: "OK GET RETURNED" },
    lines: [{ code: 251, content: voiceType }]
  };

  return { reply };
};

const startSpeaking = async ({ speak }) => {
  log("SPEAK");

  const reply = {
    result: { code: 230, content: "OK RECEIVING DATA" }
  };
  const state = {
    speak: true
  };

  return { reply, state };
};

const addWords = async ({ reply, words, speak }, matches) => {
  log("addWords: ", matches[0]);
  if (speak) {
    const state = {
      words: [...words, matches[0]]
    };

    return { state };
  }
};

const stopSpeaking = async ({ reply, speak, words, voiceType }) => {
  if (speak) {
    const utterance = words.join(" ");
    log("speak: ", utterance);
    try {
      say({ utterance, voice: VoiceTypes[voiceType] });
    } catch (err) {
      console.error("Error saying:", utterance);
      console.error(err);
    }

    const reply = {
      result: { code: 251, content: "OK MESSAGE QUEUED" },
      lines: [{ code: 251, content: 0 }]
    };

    const state = {
      speak: false,
      words: []
    };

    return { reply, state };
  }
};

const Commands = [
  [/LIST VOICES/, listVoices],
  [/SET (all|self|id) VOICE_TYPE (\w*)/, setVoiceType],
  [/GET VOICE_TYPE/, getVoiceType],
  [/SPEAK/, startSpeaking],
  [/\./, stopSpeaking],
  [/.*/, addWords]
];

module.exports = async (state, message) => {
  const trimmed = message.trim();

  for (const [matcher, action] of Commands) {
    if (matcher.test(trimmed)) {
      return action(state, matcher.exec(trimmed));
    }
  }

  log("No action found:", message);
};
