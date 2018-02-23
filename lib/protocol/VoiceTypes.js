// Some voices aren't availble before 10.13
// so for now we just assign ones we know
// are available previously
// TODO: Read the availble list for the current
//       macOS version and generate this list
const betterQualityVoices = {
  FEMALE1: "Kate",
  FEMALE2: "Serena",
  FEMALE3: "Moira",
  MALE1: "Daniel",
  MALE2: "Oliver",
  MALE3: "Alex",
  CHILD_MALE: "Fred",
  CHILD_FEMALE: "Karen"
};

const legacyVoices = {
  FEMALE1: "Moira",
  FEMALE2: "Veena",
  FEMALE3: "Karen",
  MALE1: "Daniel",
  MALE2: "Alex",
  MALE3: "Fred",
  CHILD_MALE: "Fred",
  CHILD_FEMALE: "Tessa"
};

module.exports.VoiceTypes = legacyVoices;
module.exports.defaultVoice = "MALE1";
