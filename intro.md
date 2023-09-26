# typescript compiler api

- list of typescript compilers

- https://github.com/JohnDeved/awesome-typescript-compilers

Die TypeScript Compiler API ermöglicht es Entwicklern, TypeScript-Code statisch zu analysieren, zu verändern und zu generieren. Mit dieser API können Sie eine Vielzahl von Aufgaben rund um TypeScript-Code automatisieren und erweiterte Code-Analyse- und Refactoring-Funktionen implementieren. Hier sind einige der Hauptanwendungen der TypeScript Compiler API:

    Statische Codeanalyse: Sie können den TypeScript-Compiler verwenden, um den Code auf syntaktische und semantische Fehler zu überprüfen. Dies ist besonders nützlich in Entwicklungs- und Build-Prozessen, um sicherzustellen, dass der Code korrekt ist.

    Code-Transformation: Sie können TypeScript-Code programmatisch verändern, indem Sie abstrakte Syntaxbäume (ASTs) verwenden. Dies ermöglicht das automatische Refactoring, das Hinzufügen oder Entfernen von Code und das Umbenennen von Variablen oder Funktionen.

    Tooling-Erweiterungen: Mit der Compiler API können Sie eigene Entwicklungstools erstellen, die speziell auf Ihre Anforderungen zugeschnitten sind. Dies kann die automatische Generierung von Dokumentation, die Code-Formatierung, die Code-Analyse oder die Erstellung von benutzerdefinierten Metriken umfassen.

    Typüberprüfung und -manipulation: Sie können die TypeScript-Typüberprüfung verwenden, um sicherzustellen, dass Ihr Code typsicher ist. Darüber hinaus können Sie Typinformationen in Ihrem Code ändern oder hinzufügen.

    Build-Prozess-Anpassung: Sie können die TypeScript-Compiler-API in Ihren Build-Prozess integrieren, um TypeScript-Code in JavaScript zu kompilieren und dabei benutzerdefinierte Transformationen oder Erweiterungen hinzuzufügen.

    Editor-Erweiterungen: Entwickeln Sie Erweiterungen für Texteditoren oder integrierte Entwicklungsumgebungen (IDEs), um die Entwicklungserfahrung für TypeScript-Entwickler zu verbessern. Dies kann die Implementierung von Code-Vervollständigungen, Fehlermarkierungen und Schnellnavigationsoptionen umfassen.

    Statische Analysewerkzeuge: Sie können statische Analysewerkzeuge entwickeln, die bestimmte Code-Muster oder -Qualitätsmetriken überprüfen und Warnungen oder Empfehlungen generieren.

    Codegenerierung: Generieren Sie TypeScript-Code programmatisch, um wiederkehrende Aufgaben zu automatisieren, wie das Erstellen von Boilerplate-Code, das Generieren von Testfällen oder das Erzeugen von Code aus speziellen Datenquellen.

Die TypeScript Compiler API ermöglicht eine tiefgehende Integration in den TypeScript-Compiler und bietet eine leistungsstarke Grundlage für die Erstellung von Entwicklungs- und Analysetools. Es ist wichtig zu beachten, dass die Verwendung der Compiler API fortgeschrittene Kenntnisse in TypeScript und Compilerbau erfordert. Sie können die API über das in TypeScript eingebaute Modul "ts" verwenden und auf die Dokumentation von TypeScript für weitere Informationen und Beispiele zugreifen.

## statische codeanalyse

Wenn Sie spezielle Compiler-Optionen verwenden möchten, um den Code zu analysieren (z.B. bestimmte TypeScript-Version, Ziel-ECMAScript-Version, Modulsystem usw.), können Sie eine ts.CompilerOptions-Konfiguration erstellen und verwenden:

typescript

const compilerOptions: ts.CompilerOptions = {
target: ts.ScriptTarget.ES2018,
module: ts.ModuleKind.CommonJS,
// Weitere Optionen hier
};

Compiler erstellen und Programm starten:
Erstellen Sie einen TypeScript-Compiler und starten Sie das Programm, um die statische Codeanalyse durchzuführen:

typescript

const program = ts.createProgram({
rootNames: ['analyze.ts'], // Geben Sie hier Ihre Dateinamen an
options: compilerOptions, // Verwenden Sie diese Optionen, wenn Sie welche festgelegt haben
});

const sourceFile = program.getSourceFile('analyze.ts'); // Dateinamen anpassen

if (sourceFile) {
// Führen Sie hier Ihre Codeanalyse durch
// Beispiel: Überprüfen auf syntaktische und semantische Fehler
const diagnostics = ts.getPreEmitDiagnostics(program, sourceFile);

diagnostics.forEach(diagnostic => {
console.error(diagnostic.messageText);
});
}

Analyse durchführen:
Führen Sie Ihre spezifische Codeanalyse innerhalb des if (sourceFile)-Blocks durch. Sie können die Compiler API verwenden, um auf den AST (Abstract Syntax Tree) zuzugreifen und Informationen über den Code zu extrahieren. Zum Beispiel:

    Verwendung von ts.visitNode und ts.visitEachChild, um den AST zu traversieren.
    Überprüfen auf bestimmte Code-Muster oder Strukturen.
    Extrahieren von Typinformationen und Symbolen.

Ausgabe:
Je nachdem, was Sie in Ihrem Code analysieren und überprüfen, können Sie Ergebnisse ausgeben, Fehlerberichte generieren oder Aktionen entsprechend Ihren Analyseergebnissen durchführen.

Skript ausführen:
Führen Sie Ihr TypeScript-Programm aus, um die statische Codeanalyse durchzuführen:

ts-node analyze.ts

## code transformation

```typescript
import * as ts from "typescript";

function addCustomFunction(sourceFile: ts.SourceFile) {
  const printer = ts.createPrinter();
  const customFunction = `
function customFunction() {
  console.log('This is a custom function.');
}
  `;

  const newNode = ts.createSourceFile(
    sourceFile.fileName,
    customFunction + sourceFile.getFullText(),
    ts.ScriptTarget.Latest
  );

  return printer.printFile(newNode);
}

const fileName = "example.ts"; // Dateiname anpassen
const sourceCode = `
function hello() {
  console.log('Hello, world!');
}
`;

const sourceFile = ts.createSourceFile(
  fileName,
  sourceCode,
  ts.ScriptTarget.Latest
);

const transformedCode = addCustomFunction(sourceFile);

console.log(transformedCode);
```

## tools erstellen

```typescript
import * as ts from "typescript";

function calculateCyclomaticComplexity(node: ts.Node): number {
  let complexity = 1;

  function visit(node: ts.Node) {
    if (ts.isIfStatement(node) || ts.isIterationStatement(node, false)) {
      complexity++;
    }

    ts.forEachChild(node, visit);
  }

  visit(node);

  return complexity;
}

function analyzeFile(fileName: string) {
  const sourceCode = ts.sys.readFile(fileName);
  if (!sourceCode) {
    console.error(`Could not read file: ${fileName}`);
    return;
  }

  const sourceFile = ts.createSourceFile(
    fileName,
    sourceCode,
    ts.ScriptTarget.Latest
  );

  const complexityByFunction: { [key: string]: number } = {};

  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
      const functionName = node.name?.getText() || "Anonymous Function";
      const complexity = calculateCyclomaticComplexity(node);
      complexityByFunction[functionName] = complexity;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  console.log(`Cyclomatic Complexity by Function:`);
  for (const functionName in complexityByFunction) {
    console.log(`${functionName}: ${complexityByFunction[functionName]}`);
  }
}

const fileName = "example.ts"; // Dateiname anpassen
analyzeFile(fileName);
```

```typescript
import * as ts from "typescript";

function generateDocumentation(sourceFile: ts.SourceFile) {
  const printer = ts.createPrinter();
  const documentation: string[] = [];

  function visit(node: ts.Node) {
    if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name)) {
      // Generiere eine Dokumentationskommentar für Module
      const moduleName = node.name.text;
      documentation.push(`Module: ${moduleName}`);
    } else if (ts.isClassDeclaration(node) || ts.isFunctionDeclaration(node)) {
      // Generiere eine Dokumentationskommentar für Klassen und Funktionen
      const declarationName = node.name?.getText() || "Anonymous";
      const jsDoc = ts.displayPartsToString(
        node.symbol?.getDocumentationComment(undefined)
      );
      documentation.push(`\n${declarationName}: ${jsDoc}`);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  // Ausgabe der generierten Dokumentation
  console.log(documentation.join("\n"));
}

const fileName = "example.ts"; // Dateiname anpassen
const sourceCode = `
/**
 * Das ist ein Beispielmodul.
 */
module ExampleModule {
  /**
   * Diese Klasse repräsentiert ein Beispiel.
   */
  export class ExampleClass {
    /**
     * Das ist eine Beispielmethode.
     * @param {string} message - Die Nachricht.
     */
    public sayHello(message: string) {
      console.log('Hello, ' + message);
    }
  }
}
`;

const sourceFile = ts.createSourceFile(
  fileName,
  sourceCode,
  ts.ScriptTarget.Latest
);

generateDocumentation(sourceFile);
```

## code mods

Genau, "Code Mods" (kurz für "Code Modifications") sind eine gängige Anwendung der TypeScript Compiler API und anderer Compiler-Technologien. Mit Code Mods können Sie automatisierte Code-Änderungen in Ihrem Codebase durchführen. Dies kann nützlich sein, um Code zu refaktorieren, bestehende Muster zu aktualisieren oder Coding-Standards anzuwenden.

Hier sind einige weitere Anwendungsbeispiele für Code Mods mit der TypeScript Compiler API:

    Refactoring: Sie können Code-Mods verwenden, um Refactoring-Aufgaben durchzuführen, wie das Umbenennen von Variablen, Funktionen oder Klassen in Ihrem Code.

    Aktualisierung von API-Aufrufen: Wenn Sie von einer älteren Version einer Bibliothek auf eine neuere Version migrieren, können Code-Mods verwendet werden, um veraltete API-Aufrufe automatisch zu aktualisieren.

    Codestandard-Einhaltung: Sie können Code-Mods erstellen, um sicherzustellen, dass Ihr Code den vereinbarten Codestandards und Konventionen in Ihrem Team entspricht, indem Sie Einrückungen, Zeilenumbrüche oder Namenskonventionen automatisch anpassen.

    Entfernen von nicht verwendeten Imports: Identifizieren und entfernen Sie nicht verwendete Importanweisungen in Ihren TypeScript-Dateien, um den Code sauber zu halten.

    Codegenerierung: Generieren Sie automatisch wiederkehrende Codefragmente, wie zum Beispiel die Erstellung von Getter- und Setter-Methoden für Klassenattribute.

    Migration von Typen und Schnittstellen: Aktualisieren Sie Typen und Schnittstellen in Ihrem Code, um Änderungen in Ihren Datenstrukturen oder API-Verträgen widerzuspiegeln.

Die TypeScript Compiler API bietet die notwendigen Funktionen, um diese und viele weitere Code-Modifikationen durchzuführen. Sie können Skripte entwickeln, die den AST Ihres Codes analysieren, Änderungen vornehmen und den modifizierten Code speichern. Beachten Sie jedoch, dass bei Code-Modifikationen Vorsicht geboten ist, da sie dazu führen können, dass der Code unerwartetes Verhalten zeigt. Es ist wichtig, umfassende Tests durchzuführen, um sicherzustellen, dass die Modifikationen korrekt und sicher sind.

```typescript
import * as ts from "typescript";

function manipulateTypes(sourceCode: string) {
  const sourceFile = ts.createSourceFile(
    "example.ts", // Dateiname anpassen
    sourceCode,
    ts.ScriptTarget.Latest
  );

  // Durchlaufen Sie den AST und ändern Sie den Typ einer Variable
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText() === "myVar") {
      // Ändern Sie den Typ der Variable von "string" zu "number"
      node.type = ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);

      // Fügen Sie eine neue Typüberprüfung hinzu
      const typeCheck = ts.createBinary(
        node.name,
        ts.SyntaxKind.InstanceOfKeyword,
        ts.createIdentifier("SomeClass")
      );

      node.initializer = ts.createParen(typeCheck);
    }
  });

  // Drucken Sie den modifizierten Code
  const printer = ts.createPrinter();
  const modifiedCode = printer.printFile(sourceFile);

  console.log(modifiedCode);
}

const sourceCode = `
let myVar: string = 'Hello';
`;

manipulateTypes(sourceCode);
```

### tools für code mods

jscodeshift: jscodeshift ist ein beliebtes Tool für das Codemodding in JavaScript und TypeScript. Es bietet eine einfache API für die Code-Transformation und wird häufig in der JavaScript-Community eingesetzt.

ts-migrate: Wie bereits zuvor erwähnt, ist ts-migrate ein spezialisiertes Tool für die Migration von JavaScript zu TypeScript. Es automatisiert viele Aufgaben im Zusammenhang mit dieser Umstellung.

eslint: ESLint ist ein weit verbreitetes Linting-Tool für JavaScript und TypeScript. Es ermöglicht benutzerdefinierte Regelsets und bietet die Möglichkeit, eigene ESLint-Regeln zu erstellen, um Code-Mods durchzuführen.

TSLint: TSLint ist ein statisches Analysewerkzeug für TypeScript, das in der Vergangenheit häufig für die Codeüberprüfung und -modifikation verwendet wurde. Beachten Sie jedoch, dass TSLint nicht mehr aktiv weiterentwickelt wird, und ESLint wird für TypeScript-Projekte empfohlen.

Babel: Babel ist ein beliebtes Transpiler-Tool für JavaScript, das verwendet werden kann, um Code-Transformationen durchzuführen. Es kann auch für TypeScript-Projekte in Verbindung mit dem "@babel/preset-typescript"-Preset verwendet werden.

Prettier: Prettier ist ein Codeformatierer, der verwendet werden kann, um den Code entsprechend einem einheitlichen Stil zu formatieren. Es kann in Kombination mit anderen Tools zur Code-Modifikation verwendet werden.

AST-Explorer: AST-Explorer ist eine Online-Plattform, die es ermöglicht, den AST von Code in verschiedenen Programmiersprachen, einschließlich JavaScript und TypeScript, zu analysieren und Code-Transformationen zu experimentieren.

## eigene vs code plugins schreiben

Das Schreiben von Editor-Erweiterungen für eine integrierte Entwicklungsumgebung (IDE) erfordert normalerweise die Verwendung von Erweiterungs-Frameworks oder -Plattformen, die für die spezifische IDE verfügbar sind. Da verschiedene IDEs unterschiedliche Erweiterungsmöglichkeiten bieten, werde ich Ihnen ein Beispiel für eine einfache Visual Studio Code (VS Code) Erweiterung zeigen, die die Entwicklungserfahrung für TypeScript-Entwickler verbessert, indem sie eine benutzerdefinierte Code-Vervollständigung hinzufügt.

Hier ist ein Beispiel für das Schreiben einer einfachen VS Code-Erweiterung in TypeScript, die Code-Vervollständigungen für benutzerdefinierte Funktionen in TypeScript-Dateien bereitstellt:

1. Voraussetzungen:
   Stellen Sie sicher, dass Sie Node.js und Visual Studio Code auf Ihrem System installiert haben.

2. Erstellen Sie ein neues VS Code-Erweiterungsprojekt:
   Erstellen Sie ein neues VS Code-Erweiterungsprojekt mit dem yo code Yeoman-Generator und der TypeScript-Option:

bash

npm install -g yo generator-code
yo code

3. Implementieren Sie die Erweiterung:
   Öffnen Sie das erstellte Erweiterungsprojekt in Ihrem bevorzugten Code-Editor und navigieren Sie zum src/extension.ts-Datei. Hier ist ein Beispielcode, der eine einfache Code-Vervollständigung für benutzerdefinierte Funktionen in TypeScript-Dateien hinzufügt:

typescript

import \* as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
console.log('Code Completion Extension is active.');

// Befehl registrieren, um die Code-Vervollständigung auszulösen
let disposable = vscode.commands.registerCommand('extension.triggerCompletion', () => {
// Holen Sie den aktuellen Texteditor
const editor = vscode.window.activeTextEditor;
if (!editor) {
return;
}

    // Holen Sie den Text aus dem Editor
    const text = editor.document.getText(editor.selection);

    // Simples Beispiel für benutzerdefinierte Code-Vervollständigung
    const completions: vscode.CompletionItem[] = [
      {
        label: 'customFunction',
        kind: vscode.CompletionItemKind.Function,
        detail: 'Benutzerdefinierte Funktion',
        insertText: 'customFunction()',
      },
      {
        label: 'anotherFunction',
        kind: vscode.CompletionItemKind.Function,
        detail: 'Eine andere benutzerdefinierte Funktion',
        insertText: 'anotherFunction()',
      },
    ];

    // Code-Vervollständigungsliste anzeigen
    vscode.window.showCompletionItemPicker(completions).then(selection => {
      if (selection) {
        editor.edit(editBuilder => {
          editBuilder.replace(editor.selection, selection.insertText || '');
        });
      }
    });

});

context.subscriptions.push(disposable);
}

4. Konfigurieren Sie das package.json:
   Bearbeiten Sie die package.json-Datei in Ihrem Projekt und stellen Sie sicher, dass die activationEvents und contributes Abschnitte korrekt konfiguriert sind. Hier ist ein Beispiel:

json

{
"name": "typescript-code-completion",
"displayName": "TypeScript Code Completion",
"description": "A simple TypeScript code completion extension.",
"version": "0.0.1",
"engines": {
"vscode": "^1.60.0"
},
"activationEvents": [
"onCommand:extension.triggerCompletion"
],
"main": "./out/extension.js",
"contributes": {
"commands": [
{
"command": "extension.triggerCompletion",
"title": "Trigger Code Completion"
}
]
},
"scripts": {
"vscode:prepublish": "tsc -p ."
},
"devDependencies": {
"typescript": "^4.0.0"
}
}

5. Testen Sie die Erweiterung:
   Starten Sie VS Code im Entwicklungsmodus, indem Sie F5 drücken. In VS Code können Sie Ihre Erweiterung aktivieren, indem Sie Ctrl+Shift+P öffnen, "TypeScript Code Completion" eingeben und "Trigger Code Completion" auswählen. Die benutzerdefinierte Code-Vervollständigung sollte in Ihrem TypeScript-Editor erscheinen.

Dies ist ein einfaches Beispiel für eine VS Code-Erweiterung, die Code-Vervollständigung für benutzerdefinierte Funktionen in TypeScript-Dateien bietet. Sie können dieses Konzept erweitern, um fortschrittlichere Funktionen wie Fehlermarkierungen, Schnellnavigation und vieles mehr hinzuzufügen, um die Entwicklungserfahrung für TypeScript-Entwickler weiter zu verbessern. Beachten Sie, dass die Erstellung von VS Code-Erweiterungen umfangreiche Möglichkeiten zur Anpassung und Erweiterung bietet.
