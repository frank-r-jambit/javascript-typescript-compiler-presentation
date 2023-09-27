# Verbesserung der TypeScript-Entwicklungserfahrung mit der TypeScript Compiler API

## Einleitung / Agenda

- Ziel des Vortrags
- Begriffsdefinitionen / Grundlagen
- Abstract Syntax Trees
  - Babel
  - Typescript Compiler API
  - Weitere Beispiele
- Anwendungsszenarien
  - Babel
  - jscodeshift
  - eslint
- Q&A

## Ziel

- <b>Einblick und Überblick in Compiler und erstellen eigener Tools</b>

## Disclaimer

Ich habe mich schwer getan den Fokus des Vortrags zu setzen, da das Ökosystem sehr volatil ist. Daher bietet der erste Teil des Vortrags Grundlagen und einfache Beispiele welche auch über andere Tools, vielleicht sogar einfacher, umgesetzt werden könnten, zielt dabei auf Zugänglichkeit. Gegen Ende besprechen wir noch ein paar Beispiele die tiefer in die Materie eingehen.

## Begriffsdefinitionen / Grundlagen

<figure>

![typische Bausteine eines Compilers](https://it1.pages.fh-aachen.de/compiler/img/CompilerAblauf.svg)

  <figcaption>Häufige Bausteine eines Compilers die im folgenden erläutert werden.</figcaption>
</figure>

### Sprache:

> In unserem Fall bezieht sich die "Sprache" auf die Programmiersprache, in der unser Quellcode geschrieben ist. Es handelt sich um die formale oder strukturierte Methode, mit der Entwickler Anweisungen und Befehle formulieren, um Computerprogramme zu erstellen.
> Jede Programmiersprache hat ihre eigenen Regeln und Konventionen, die bestimmen, wie der Code geschrieben werden sollte. Diese Regeln sind Teil der Sprache, und ein Compiler oder Interpreter muss sie verstehen, um den Code korrekt zu verarbeiten.

### Grammatik (Syntax):

> Die "Grammatik" oder "Syntax" einer Programmiersprache bezieht sich auf die strukturellen Regeln, die festlegen, wie gültige Anweisungen und Ausdrücke in dieser Sprache aussehen sollten. Die Grammatik definiert, wie Token in bestimmten Reihenfolgen kombiniert werden können, um sinnvolle Codeabschnitte zu erstellen.
> Die Grammatik einer Sprache wird normalerweise durch eine formale BNF (Backus-Naur-Form) oder eine ähnliche Notation beschrieben. Diese Regeln sind entscheidend für den Parser, um den Code zu analysieren und einen abstrakten Syntaxbaum (AST) zu erstellen.

<figure>

![Einfache Grammatik in BNF](https://wikimedia.org/api/rest_v1/media/math/render/svg/bbb0b76c69a5acef99da619f0623e4114c5a5eb4)

  <figcaption>Beispiel einer einfachen Grammatik in BNF</figcaption>
</figure>

<figure>

```bnf
Sentence ::= Subject Predicate Object '.'
Subject ::= Article? Noun
Predicate ::= Verb
Object ::= Article? Noun
Article ::= 'der' | 'die' | 'das' | 'ein' | 'eine'
Noun ::= 'Mann' | 'Frau' | 'Hund' | 'Katze' | 'Auto' | ...
Verb ::= 'läuft' | 'isst' | 'trinkt' | 'fährt' | ...
```

  <figcaption>Ein Teil der deutschen Grammatik in BNF</figcaption>
</figure>

Valide Sätze der obigen Grammatik sind:

- "der Mann läuft ein Auto."
- "die Hund fährt."
- "die Katze isst."

aber nicht:

- "der Mann läuft" (Satzende-Zeichen fehlt)
- "die Katze." (Das Objekt ist in der Grammatik nicht optional)

### Lexer (auch Tokenizer genannt):

> Ein Lexer ist der erste Schritt im Kompilierungsprozess. Er analysiert den Quellcode und zerlegt ihn in Tokens, die die kleinsten syntaktischen Einheiten darstellen. Diese Tokens werden dann an den Parser weitergegeben.
> Der Lexer erzeugt Tokens gemäß den Syntaxregeln der Sprache. Zum Beispiel werden in JavaScript Variablennamen, Gleichheitszeichen (=) und Zahlen als separate Tokens erkannt.

<figure>

```typescript
function lexer(inputString) {
  const tokens = inputString.split(/\s+/); // Zerlegt den String in Tokens
  return tokens;
}

const code = "x = 10 + 5";
const tokens = lexer(code);
console.log(tokens); // Ausgabe: ["x", "=", "10", "+", "5"]
```

  <figcaption>Beispiel für einen Lexer der einfache arithmetische Ausdrücke in Token zerlegt</figcaption>
</figure>

### Parser

> Ein Parser ist der zweite Schritt im Kompilierungsprozess. Er nimmt die Tokens, die vom Lexer erstellt wurden, und analysiert die syntaktische Struktur des Codes, um einen abstrakten Syntaxbaum (AST) zu erstellen. Ein AST ( ist eine hierarchische Datenstruktur, die die syntaktische Struktur von Quellcode darstellt und von Compilern und Interpretern zur Verarbeitung und Analyse verwendet wird.
> Dieser Baum repräsentiert die hierarchische Struktur des Codes.
> Der Parser verwendet die Grammatik der Sprache, um die Tokens in eine hierarchische Struktur (AST) umzuwandeln. Die Grammatik legt fest, wie Anweisungen und Ausdrücke in der Sprache aufgebaut sein müssen, um gültig zu sein.

<figure>

```typescript
function parseAssignment(tokens) {
  if (tokens.length < 3 || tokens[1] !== "=") {
    throw new Error("Ungültige Zuweisung");
  }
  return {
    type: "Assignment",
    left: tokens[0],
    right: tokens[2],
  };
}

const tokens = ["x", "=", "10"];
const ast = parseAssignment(tokens);
console.log(ast); // Ausgabe: { type: "Assignment", left: "x", right: "10" }
```

  <figcaption>Einfacher Parser der eine Variablenzuweisung in einen AST überführt.  Der AST besteht hierbei nur aus einem Knoten.</figcaption>
</figure>

Verbreitete Parser:

- [recast](https://github.com/benjamn/recast)
- [jscodeshift](https://github.com/facebook/jscodeshift)
- [typescript](https://github.com/microsoft/TypeScript)

### Compiler:

> Ein Compiler ist ein Programm, das den Quellcode einer höheren Programmiersprache in eine maschinenlesbare Form übersetzt, oft in Maschinencode oder eine andere Zwischensprache. Der Compiler führt typische Aufgaben wie Codeanalyse, Optimierung und Codegenerierung durch.

#### Ein einfaches [React - Typescript Beispiel](https://www.typescriptlang.org/play?target=0&moduleResolution=99&module=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wCgB6cuAUWADtN0ALJAZ0WJgFoAVATzBIAymijAw8LnABCSYKzDAkAG1KkkAD0iw4pTAFc6GYBDpwA4kSQwAFHRQgkALjisYYugHMAlHADepHBwRDD6UGYAPAB8ABIoysoQADRwACR+9o4AvgCEEeRRpFlqBkYwJmaeVraZzq7u9D4uAG4QwAAm-oFwaKasEMpIAHSJnjYABnEJyWkZDki5494A3EVqQA):

```typescript
import React from "react";

export function Greet(name: string) {
  return <>Hallo, ${name}!</>;
}

function greet(name: string): void {
  console.log(`Hallo, ${name}!`);
}
```

- Der Quellcode enthält eine React - Functional Component, welche die [JSX Notation](https://legacy.reactjs.org/docs/jsx-in-depth.html) verwendet
- Sowie eine Methode die [Template literals](https://wiki.selfhtml.org/wiki/JavaScript/Objekte/String/template-literal) nutzt welche mit ECMAscript 6 eingeführt wurde.

#### Das selbe Beispiel kompiliert nach ES3 / CommonJS.

```javascript
"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
exports.Greet = void 0;
var react_1 = __importDefault(require("react"));
// Einfaches React-TypeScript - Beispiel
function Greet(name) {
  return react_1["default"].createElement(
    react_1["default"].Fragment,
    null,
    "Hallo, $",
    name,
    "!"
  );
}
exports.Greet = Greet;
function greet(name) {
  console.log("Hallo, ".concat(name, "!"));
}
```

- ECMAScript 3 kennt kein keyword `exports`. Die [Option "Modules"](https://www.typescriptlang.org/tsconfig#module) in einer tsconfig.json bewirkt daher, dass der Compiler den Code mit der [Module Resolution Strategie](https://www.typescriptlang.org/docs/handbook/module-resolution.html) Commonjs kompiliert.
- Ebenso kennt EcmaScript kein JSX. Daher muss in der tsconfig.json angegeben werden, [wie der Quellcode](https://www.typescriptlang.org/tsconfig#jsx) übersetzt werden soll.

#### Das selbe Beispiel kompiliert nach ES3 / AMD

```javascript
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
define(["require", "exports", "react"], function (require, exports, react_1) {
  "use strict";
  exports.__esModule = true;
  exports.Greet = void 0;
  react_1 = __importDefault(react_1);
  // Einfaches React-TypeScript - Beispiel
  function Greet(name) {
    return react_1["default"].createElement(
      react_1["default"].Fragment,
      null,
      "Hallo, $",
      name,
      "!"
    );
  }
  exports.Greet = Greet;
  function greet(name) {
    console.log("Hallo, ".concat(name, "!"));
  }
});
```

- Zum Vergleich: Hier kompilieren wir das `exports` Keyword, dass die Datei als [AMD Module](https://de.wikipedia.org/wiki/Asynchronous_module_definition) importiert werden kann. Diese Modul Spezifikation definiert eine `define` Methode, über welche sich das module registert.

### Zusammengefasst:

Grammatiken beschreiben den Aufbau von Programmiersprachen. Compiler verwenden Lexer um einen Strom von Zeichen in Token einer Sprach zu übersetzen und Parser um diese Token in eine Baumstruktur zu übberführen, um den Quellcode zu analysieren und in Maschinen- oder Zwischencode zu übersetzen.

## Abstract Syntax Tree

> Ein Abstract Syntax Tree (AST) ist eine baumartige Datenstruktur, die die syntaktische Struktur eines Programms repräsentiert. Es enthält abstrakte Informationen über die Anordnung von Codeelementen und dient als Grundlage für die Analyse und Transformation von Quellcode in Compilern und ähnlichen Anwendungen. Unterschiedliche Parser erzteugen unterschiedliche AST die häufig zueinander inkompatibel sind. Wir betrachten im Folgenden erzeugte ASTs und Beispiele dafür eine Transformation auf diesen auszuführen.

### Typescript Compilers - Babel

> Babel ist ein JavaScript-Compiler, der moderne JavaScript-Code in ältere Versionen übersetzt, um die Browserkompatibilität sicherzustellen. Babel verwendet Plugins für spezielle Transformationen, wie das Übersetzen von Arrow Functions, Klassen usw. Diese Plugins sind konfigurierbar und können in Build-Tools integriert werden.

[Beispiel eines einfachen Plugins](https://babeljs.io/docs/plugins#plugin-development)

[Beispiel im AST Explorer](https://astexplorer.net/#/gist/a8ec04ff57b47fca26bd3ac17c541501/7d34fa678aede151042b5556beff0e86e782de2c)

### Typescript - Compilers - Typescript Compiler API

> TypeScript ist eine statisch typisierte Superset-Sprache von JavaScript.
> Die TypeScript Compiler API ermöglicht die Anpassung und Erweiterung der Entwicklungserfahrung mit TypeScript.

[Beispiel im AST Explorer](https://astexplorer.net/#/gist/bb0f40895c0cdb2e756464beafbfa0e9/1c513e6bd21aeb14c1d36bf296ab11e13ab1bc9f)

### Weitere Beispiele

[Beispiel Svelte](https://astexplorer.net/#/gist/29c57d16d6d16bdd1c6a3849e02da4ad/b440969e83791e4edc8b1ce6e2e11af4d23389dd)

[Beispiel Recast](https://astexplorer.net/#/gist/1b437b4148e95c08ae43b5e1e0420af4/32c42f1a4887ada1a48ef1eb6f3f0bdb32e54b9a)

[CSS - PostCss](https://astexplorer.net/#/gist/dcc3e0cb745ab61fc4d27ebc9175e2a4/cc29359d8e49e71359462df80dd05b0cf0627525)

## Anwendungsszenarien

Im folgenden besprechen wir, wie man Plugins erzeugen kann die im eigenen Projekt ihre Arbeit verrichten und wie wir dabeiden Compiler als Werkzeug nutzen können. Viele der verwendeten Tools haben ähnliche Funktionalität und die Beispiele könnten auf die ein oder andere Weise ähnlich umgesetzt werden.

### Code-Transformationen mit Babel

> Transformationen von Code nutzen wir häufig ohne nes zu wissen schon seit einigen Jahren. Worte die in dem Zusammenhang sicher bekanmnnt sind: `browserlists`, `corejs`, `babel plugins`, `webpack`- Diese ermöglichen uns erst unseren Quellcode zu transformieren und Buidartefakte zu generieren damit diese in verschiendenen Browsern lauffähig sind.

Genutztes Tool: [babel](https://github.com/babel/babel)

Beispiele:

- [Logs im Quellcode entfernen.](./examples/code-transformations/README.md)
- [Check24 Wireframe](./examples//wireframe/README.md)

### Code Mods mit jscodeshift

> Code Mods erlauben automatisiertes Refactoring und Code-Änderungen.
> Hierdurch ist es möglich ein Projekt auf einen einheitlichen Qualitätsstandard einzuhalten, und auch große Codebases längerfristig aktuell zu halten.
> Ein Tool welches im Php - Umfeld heraussticht ist [rector](https://github.com/rectorphp/rector). Als Tools die ähnliches im Javascript-Ökosystem versuchen könnte man hier [putout](https://github.com/coderaiser/putout) nennen. Aber auch ohne ein umfängliches Framework können wir selektiv code mods auf unseren quellcode anwenden, und somit bestimmte Refactoring - Aufgaben automatisieren.

Genutztes Tool: [jscodeshift](https://github.com/facebook/jscodeshift)

Beispiel: [Logs im Quellcode entfernen.](./examples/code-mods/README.md)

### Statische Codeanalyse mit eslint

- Statische Codeanalyse ist ein wichtiger Bestandteil der Softwareentwicklung. Der sogenannte `Linter` ist wichtiger Bestandteil einer CI-CD Pipline, um früh mögliche Fehler zu finden.

Beispiel: [ Logs im Quellcode entfernen.](./examples/statical-code-analysis/README.md)

### Typüberprüfung und -manipulation

> TypeScript bietet starke Typisierung und Sicherheit.
> Die [Typescript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API) ermöglicht die Typüberprüfung und -manipulation. Im folgenden werden wir ein paar Beispiele betrachten, welche diese nutzen.

- [tdi](https://github.com/7frank/tdi) "Java Spring" - like auto wiring for dependency injection
  - Tool: [ttypescript](https://github.com/cevek/ttypescript)
- [gui-builder](https://github.com/7frank/gui-builder) geniereren von adapter

  - code zwischen grapesjs und svelte Komponenten
  - Tool: ts-patch

- [typescript-json-schema](https://github.com/YousefED/typescript-json-schema)
  - https://github.com/YousefED/typescript-json-schema/blob/master/typescript-json-schema.ts
  - Beispiel wie die compiler api genutzt wird um Typinformationen zu extrahieren

### IDE-Erweiterungen

> TypeScript-Compiler kommt auch in den von uns verwendeten Tools zum Einsatz, beispielsweise in Kombination mit einem VSCode-Plugin und ts2zod, das Zod-Schemas aus Typen generiert."

Beispielsweise verwendet das VSCode Plugin
[zodschema-generator](https://marketplace.visualstudio.com/items?itemName=psulek-solo.zodschema-generator)  
das Package [ts-to-zod](https://github.com/psulek/vscode-zodschema-generator/blob/main/src/generator.ts#L5C20-L5C26)
welches die [typescript compiler api ](https://github.com/fabien0102/ts-to-zod/blob/main/src/core/generate.ts#L87C12-L87C12) nutzt

## Zusammenfassung

> Die TypeScript Compiler API ist ein leistungsstarkes Werkzeug zur Anpassung und Erweiterung der TypeScript-Entwicklung.
> Sie ermöglicht statische Analyse, Code-Transformationen, Dokumentationserstellung, Typüberprüfung, Code Mods und Editor-Erweiterungen.
> Die Anwendungsmöglichkeiten sind vielfältig und können die Entwicklungserfahrung erheblich verbessern.

## Fragen und Diskussion

- Habt ihr selbst Erfahrung mit genannten oder ungenannten Tools?
- Gerade im Enterpriseumfeld liest man immer wieder von der Migration großer CodeBases. Habt ihr selbst schon Erfolgsgeschichten begleiten können?

## Quellen & Tools

[Awesome Babel](https://github.com/babel/awesome-babel)

[Awesome TypeScript Compilers, Transpilers and Runtimes](https://github.com/JohnDeved/awesome-typescript-compilers)

[Awesome TypeScript Ecosystem](https://github.com/itsdouges/awesome-typescript-ecosystem)

[github topics ast-transformations](https://github.com/topics/ast-transformations)

[svelte preprocessors](https://github.com/TheComputerM/awesome-svelte#preprocessing)

### Tools

[ts-migrate](https://github.com/airbnb/ts-migrate)

[List of ts-migrate plugins](https://github.com/airbnb/ts-migrate/tree/master/packages/ts-migrate-plugins)

[jscodeshift](https://github.com/facebook/jscodeshift)

[ts-patch](https://github.com/nonara/ts-patch)

[ttypescript](https://github.com/cevek/ttypescript)

[putout](https://github.com/coderaiser/putout)

[putout plugins](https://github.com/coderaiser/putout#-plugins)

### "Eigenwerbung"

[Spring-Boot - like dependency injection & autowiring](https://github.com/7frank/tdi)

[Svelte - GUI Builder](https://github.com/7frank/gui-builder)
