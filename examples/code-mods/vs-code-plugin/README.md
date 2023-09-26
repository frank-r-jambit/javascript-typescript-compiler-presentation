Schritt 6: Führen Sie das Build-Skript aus

Führen Sie das Build-Skript aus, um Ihre TypeScript-Dateien zu kompilieren:

bash

npm run compile

Schritt 7: Installieren Sie die Erweiterung in VS Code

Verpacken Sie Ihre Erweiterung in eine VSIX-Datei und installieren Sie sie in VS Code:

bash

vsce package
code --install-extension vscode-ts-plugin-1.0.0.vsix

Schritt 8: Verwenden Sie Ihre Erweiterung

Öffnen Sie eine TypeScript-Datei in VS Code, und verwenden Sie den Befehl "Show Types in TypeScript", um die Typen der Variablen in der Datei anzuzeigen.

---

    Navigieren Sie im Terminal oder in der Eingabeaufforderung in das Verzeichnis Ihres Projekts, in dem sich die Erweiterung befindet.

    Verpacken Sie Ihre Erweiterung in eine VSIX-Datei mit dem Befehl vsce package. Stellen Sie sicher, dass Sie das vsce-Tool installiert haben. Sie können es mit pnpm install --global @vscode/vsceinstallieren.

bash

vsce package

    Nachdem die VSIX-Datei generiert wurde, können Sie Ihre Erweiterung in Visual Studio Code installieren. Dazu öffnen Sie Visual Studio Code und gehen zu "Extensions" (Erweiterungen), indem Sie auf das quadratische Symbol in der Seitenleiste klicken oder Ctrl+Shift+X (Windows/Linux) oder Cmd+Shift+X (Mac) drücken.

    Klicken Sie auf das "Mehr"-Symbol (drei Punkte) in der Erweiterungsansicht und wählen Sie "Install from VSIX..." (Von VSIX installieren).

    Wählen Sie die zuvor erstellte VSIX-Datei aus (normalerweise im Verzeichnis Ihrer Erweiterung) und klicken Sie auf "Installieren".

    Ihre Erweiterung sollte nun installiert sein. Sie können sie aktivieren, indem Sie auf das Zahnradsymbol in der Statusleiste klicken und "TypeScript Language Features extension is now active." auswählen.

    Um die Erweiterung zu testen, öffnen Sie eine TypeScript-Datei in Visual Studio Code und verwenden Sie den Befehl "Show Types in TypeScript", den Sie zuvor in Ihrer Erweiterung definiert haben. Wenn Sie in einer TypeScript-Datei sind, sollte dieser Befehl verfügbar sein.

Jetzt können Sie Ihre Erweiterung in Visual Studio Code verwenden und testen. Beachten Sie, dass dies ein einfaches Beispiel ist, das die Typen von Variablen in TypeScript-Dateien anzeigt. Sie können Ihre Erweiterung weiter anpassen und erweitern, um weitere Funktionen hinzuzufügen.
