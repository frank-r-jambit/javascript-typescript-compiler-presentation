module.exports = {
  parser: "@babel/eslint-parser",
  plugins: ["eslint-plugin-local-rules"],
  rules: {
    "local-rules/no-console-logs": "warn",
  },
};
