// extension.ts
import * as vscode from "vscode";
import * as ts from "typescript";
export function activate(context) {
    console.log("TypeScript Language Features extension is now active.");
    // Registrieren Sie den Befehl, um die Typen in einer TypeScript-Datei anzuzeigen
    const disposable = vscode.commands.registerCommand("extension.showTypes", () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            if (document.languageId === "typescript") {
                const text = document.getText();
                const sourceFile = ts.createSourceFile(document.fileName, text, ts.ScriptTarget.Latest, true);
                // Erstellen Sie ein Programm und holen Sie sich den Typenprüfer
                const program = ts.createProgram([document.fileName], {});
                const typeChecker = program.getTypeChecker();
                // Iterieren Sie durch den AST und zeigen Sie die Informationen an
                ts.forEachChild(sourceFile, (node) => {
                    if (ts.isVariableStatement(node)) {
                        node.declarationList.declarations.forEach((declaration) => {
                            if (declaration.name && ts.isIdentifier(declaration.name)) {
                                const symbol = typeChecker.getSymbolAtLocation(declaration.name);
                                if (symbol && symbol.valueDeclaration) {
                                    const typeName = typeChecker.typeToString(typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration));
                                    vscode.window.showInformationMessage(`Variable: ${declaration.name.text} - Type: ${typeName}`);
                                }
                            }
                        });
                    }
                });
            }
        }
    });
    context.subscriptions.push(disposable);
}
