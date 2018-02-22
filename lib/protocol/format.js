const LINE_ENDING = "\r\n";

module.exports.formatReply = ({ result, lines = [] }) => {
  return (
    [
      ...lines.map(({ code, content }) => `${code}-${content}`),
      `${result.code} ${result.content}`
    ].join(LINE_ENDING) + LINE_ENDING
  );
};

module.exports.formatMessage = command => `${command}${LINE_ENDING}`;
