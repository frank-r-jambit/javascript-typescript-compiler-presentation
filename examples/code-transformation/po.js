const putout = require("putout");

const exampleCode = `
function foo() {
    console.log("hello world");
  }
  
`;

const res = putout(exampleCode, {
  plugins: [["remove-unused-variables", require("./remove-logs")]],
});

console.log(res);
