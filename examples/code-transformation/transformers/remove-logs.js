export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Find all console.log statements
  // jscodeshift uses jquery-like syntax
  root
    .find(j.CallExpression, {
      callee: {
        type: "MemberExpression",
        object: { type: "Identifier", name: "console" },
        property: { type: "Identifier", name: "log" },
      },
    })
    .remove();

  return root.toSource();
}
