# C24 Wireframe

- Kompiliertes JavaScript, das in jedes C24-Produkt integriert werden muss, ohne die Möglichkeit, den Quellcode selbst zu ändern.
- Aufgrund der täglichen Code-Updates wurde ein Kompilierungsschritt eingeführt, der folgende Schritte umfasst:
  - Markieren von HTML-Divs mit IDs.
  - Erzeugen von React-Portalen, die diese IDs als Container verwenden.
  - Generieren von React-Komponenten für HTML, JavaScript und CSS.
- Verwendung von Babel und Cheerio als Preprocessor zum Parsen der HTML-Struktur nach "script"-Tags mithilfe von "cheerio".
  - Einsatz von Babel-Plugins für die folgenden Aufgaben:
    - Ersetzen von "DOMContentLoaded" Event-Listenern durch eigene Listener.
    - Ersetzen der Login-Funktionalität.
    - Weitere Plugins könnten zusätzliche teilweise konfigurierbare Funktionen hinzufügen.
