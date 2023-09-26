module.exports = {
  "no-console-logs": {
    meta: {
      fixable: "code",
      docs: {
        description: "Disallow console.log statements",
        category: "Possible Errors",
        recommended: false,
      },
      schema: [],
    },
    create(context) {
      return {
        CallExpression(node) {
          const callee = node.callee;
          if (
            callee.type === "MemberExpression" &&
            callee.object.name === "console" &&
            callee.property.name === "log"
          ) {
            context.report({
              node,
              message: "Avoid using console.log statements.",
              fix: (fixer) => fixer.remove(node),
            });
          }
        },
      };
    },
  },
};
