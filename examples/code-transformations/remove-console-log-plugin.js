module.exports = function ({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        const callee = path.node.callee;
        if (
          t.isMemberExpression(callee) &&
          t.isIdentifier(callee.object, { name: "console" }) &&
          t.isIdentifier(callee.property, { name: "log" })
        ) {
          // Wenn es sich um eine `console.log`-Anweisung handelt, entfernen
          path.remove();
        }
      },
    },
  };
};
