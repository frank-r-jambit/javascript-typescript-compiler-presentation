# Verbesserung der TypeScript-Entwicklungserfahrung mit der TypeScript Compiler API

## Einleitung / Agenda

- Ziel des Vortrags

- compilers / lexer / parser
- ASTs
- beispiel - ast-explorer

- typescript compilers

  - babel
  - typescript / others

- beispiele für verschiedene sektionen

- offene Fragen

- quellen

## Begriffsdefinition / Grundlagen

![typische Bausteine eines Compilers](https://faouellet.github.io/assets/img/Frontend3.png)

    Sprache:
        In diesem Zusammenhang bezieht sich die "Sprache" auf die Programmiersprache, in der der Quellcode geschrieben ist. Es handelt sich um die formale oder strukturierte Methode, mit der Entwickler Anweisungen und Befehle formulieren, um Computerprogramme zu erstellen.
        Jede Programmiersprache hat ihre eigenen Regeln und Konventionen, die bestimmen, wie der Code geschrieben werden sollte. Diese Regeln sind Teil der Sprache, und ein Compiler oder Interpreter muss sie verstehen, um den Code korrekt zu verarbeiten.

    Grammatik (Syntax):
        Die "Grammatik" oder "Syntax" einer Programmiersprache bezieht sich auf die strukturellen Regeln, die festlegen, wie gültige Anweisungen und Ausdrücke in dieser Sprache aussehen sollten. Die Grammatik definiert, wie Token in bestimmten Reihenfolgen kombiniert werden können, um sinnvolle Codeabschnitte zu erstellen.
        Die Grammatik einer Sprache wird normalerweise durch eine formale BNF (Backus-Naur-Form) oder eine ähnliche Notation beschrieben. Diese Regeln sind entscheidend für den Parser, um den Code zu analysieren und einen abstrakten Syntaxbaum (AST) zu erstellen.

Compiler:
Ein Compiler ist ein Programm, das den Quellcode einer höheren Programmiersprache in eine maschinenlesbare Form übersetzt, oft in Maschinencode oder eine andere Zwischensprache. Der Compiler führt typische Aufgaben wie Codeanalyse, Optimierung und Codegenerierung durch.

```typescript
// Einfaches TypeScript-Programm
function greet(name: string): void {
  console.log(`Hallo, ${name}!`);
}

// TypeScript-Compiler (JIT Compiler): Übersetzt den Code in JavaScript
// Der generierte JavaScript-Code wird ausgeführt
greet("John");
```

Lexer (auch Tokenizer genannt):
Ein Lexer ist der erste Schritt im Kompilierungsprozess. Er analysiert den Quellcode und zerlegt ihn in Tokens, die die kleinsten syntaktischen Einheiten darstellen. Diese Tokens werden dann an den Parser weitergegeben.
Der Lexer erzeugt Tokens gemäß den Syntaxregeln der Sprache. Zum Beispiel werden in JavaScript Variablennamen, Gleichheitszeichen (=) und Zahlen als separate Tokens erkannt.

```typescript
// Einfacher Lexer für einfache arithmetische Ausdrücke
function lexer(inputString) {
  const tokens = inputString.split(/\s+/); // Zerlegt den String in Tokens
  return tokens;
}

const code = "x = 10 + 5";
const tokens = lexer(code);
console.log(tokens); // Ausgabe: ["x", "=", "10", "+", "5"]
```

Parser:
Ein Parser ist der zweite Schritt im Kompilierungsprozess. Er nimmt die Tokens, die vom Lexer erstellt wurden, und analysiert die syntaktische Struktur des Codes, um einen abstrakten Syntaxbaum (AST) zu erstellen. Ein AST ( ist eine hierarchische Datenstruktur, die die syntaktische Struktur von Quellcode darstellt und von Compilern und Interpretern zur Verarbeitung und Analyse verwendet wird.
Dieser Baum repräsentiert die hierarchische Struktur des Codes.
Der Parser verwendet die Grammatik der Sprache, um die Tokens in eine hierarchische Struktur (AST) umzuwandeln. Die Grammatik legt fest, wie Anweisungen und Ausdrücke in der Sprache aufgebaut sein müssen, um gültig zu sein.

```typescript
// Einfacher Parser für eine Zuweisung
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

Zusammengefasst sind die Sprache und die Grammatik die grundlegenden Grundlagen, die es einem Compiler oder Interpreter ermöglichen, den Quellcode in eine ausführbare Form zu übersetzen.

## AST - Explorer

[Beispiel Svelte](https://astexplorer.net/#/gist/29c57d16d6d16bdd1c6a3849e02da4ad/b440969e83791e4edc8b1ce6e2e11af4d23389dd)
[Beispiel Javascript](https://astexplorer.net/#/gist/1b437b4148e95c08ae43b5e1e0420af4/32c42f1a4887ada1a48ef1eb6f3f0bdb32e54b9a)

- Beispiel enthält diverse Parser (typescript / babel / esprima) sowie diverse "Transformatoren" (recast / jscodeshift) zu denen wir später noch kommen werden

[CSS - PostCss](https://astexplorer.net/#/gist/dcc3e0cb745ab61fc4d27ebc9175e2a4/cc29359d8e49e71359462df80dd05b0cf0627525)

## Typescript Compilers - Babel

Babel ist ein JavaScript-Compiler, der moderne JavaScript-Code in ältere Versionen übersetzt, um die Browserkompatibilität sicherzustellen. Babel verwendet Plugins für spezielle Transformationen, wie das Übersetzen von Arrow Functions, Klassen usw. Diese Plugins sind konfigurierbar und können in Build-Tools integriert werden.

[Beispiel eines einfachen Plugins:](https://babeljs.io/docs/plugins#plugin-development)

## Typescript Compilers -Typescript Compiler API

- TypeScript ist eine statisch typisierte Superset-Sprache von JavaScript.
- Die TypeScript Compiler API ermöglicht die Anpassung und Erweiterung der Entwicklungserfahrung mit TypeScript.
- In dieser Präsentation werden verschiedene Anwendungsfälle für die TypeScript Compiler API erläutert.

## Anwendungsszenarien

### Statische Codeanalyse

- Statische Codeanalyse ist ein wichtiger Bestandteil der Softwareentwicklung.
- Die TypeScript Compiler API ermöglicht die statische Analyse von TypeScript-Code.
- Durchsuchen Sie den Abstract Syntax Tree (AST), um Code-Metriken, Abhängigkeiten und mehr zu analysieren.
- Beispiel: Identifizierung nicht verwendeter Importanweisungen.

---

### Code-Transformationen

- Die Compiler API ermöglicht Code-Transformationen und Refactoring.
- Manipulieren Sie den AST, um den Code automatisch anzupassen.
- Beispiel: Entfernen von unnötigem Code

---

### Dokumentationserzeugung

- Gute Dokumentation ist entscheidend für die Zusammenarbeit in Teams.
- Verwenden Sie die Compiler API, um Dokumentation aus Ihrem Code zu generieren.
- Extrahieren Sie JSDoc-Kommentare, um nützliche Dokumentation für Module, Klassen und Funktionen zu erstellen.
- Beispiel: Generierung von JSDoc-basierten Dokumentationskommentaren.

---

### Typüberprüfung und -manipulation

- TypeScript bietet starke Typisierung und Sicherheit.
- Die Compiler API ermöglicht die Typüberprüfung und -manipulation.
- Ändern Sie Typen, fügen Sie Typinformationen hinzu und passen Sie Typüberprüfungen an.
- Beispiel: Ändern des Typs einer Variable und Hinzufügen einer benutzerdefinierten Typüberprüfung.

---

### Code Mods

- Code Mods sind automatisierte Code-Änderungen und Refactoring.
- Die TypeScript Compiler API ist ein leistungsstarkes Werkzeug für Code Mods.
- Automatisieren Sie Aufgaben wie das Aktualisieren von API-Aufrufen oder das Anpassen an Codestandards.

Genutztes Tool:
https://github.com/facebook/jscodeshift
[Beispiel: Logs im Quellcode entfernen.](./examples/code-mods/README.md)

---

### Editor-Erweiterungen

- Verbessern Sie die Entwicklungserfahrung mit Editor-Erweiterungen.
- Die TypeScript Compiler API kann in Visual Studio Code-Erweiterungen verwendet werden.
- Fügen Sie benutzerdefinierte Code-Vervollständigung, Fehlermarkierungen und mehr hinzu.
- Beispiel: Hinzufügen einer benutzerdefinierten Code-Vervollständigung in Visual Studio Code.

---

## Zusammenfassung

- Die TypeScript Compiler API ist ein leistungsstarkes Werkzeug zur Anpassung und Erweiterung der TypeScript-Entwicklung.
- Sie ermöglicht statische Analyse, Code-Transformationen, Dokumentationserstellung, Typüberprüfung, Code Mods und Editor-Erweiterungen.
- Die Anwendungsmöglichkeiten sind vielfältig und können die Entwicklungserfahrung erheblich verbessern.

---

## Fragen und Diskussion

- Haben Sie Fragen oder möchten Sie weitere Informationen zu einem der vorgestellten Anwendungsfälle?
- Wir stehen zur Verfügung, um Ihre Fragen zu beantworten und weitere Diskussionen zu führen.

<!--

Genutztes Tool:
https://github.com/coderaiser/putout
[Beispiele verschiedener Plugin Variationen](https://github.com/coderaiser/putout/tree/master/packages/engine-runner) -->
