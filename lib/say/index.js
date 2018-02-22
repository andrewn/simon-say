const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

module.exports = async ({ utterance = "", voice = null, rate = 1 }) => {
  const voiceFlag = voice ? `--voice ${voice}` : "";
  return exec(`say ${utterance} ${voiceFlag}`);
};

module.exports.listVoices = async () => {
  const resultMatcher = /([\w]+) +(\w\w_\w\w) +# (.*)/;
  const { stdout } = await exec("say --voice ?");

  return stdout.split("\n").map(line => {
    try {
      const [_, name, langCode, example] = line.match(resultMatcher);
      return {
        name,
        langCode,
        example
      };
    } catch (e) {
      // ignore line
    }
  });
};
