module.exports.report = () => "console.log should be avoided";

module.exports.fix = (path) => {
  const { node } = path;
  const { callee } = node;

  if (callee.name !== "console" || node.property.name !== "log") return;

  path.remove();
};

module.exports.traverse = ({ push }) => ({
  debugger(path) {
    push(path);
  },
});
