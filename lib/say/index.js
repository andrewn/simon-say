const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const spawn = require("child_process").spawn;

module.exports = async ({ utterance = "", voice = null, rate = 1 }) => {
  const voiceFlag = voice ? ["--voice", voice] : [];
  const subprocess = spawn("say", [utterance, ...voiceFlag]);

  return new Promise((resolve, reject) => {
    subprocess.on("close", resolve);
    subprocess.on("error", reject);
  });
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
