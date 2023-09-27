# C24 Wireframe

- Kompiliertes JavaScript, das in jedes C24-Produkt integriert werden muss, ohne die Möglichkeit, den Quellcode selbst zu ändern.
- Aufgrund der täglichen Code-Updates wurde ein Kompilierungsschritt eingeführt, der folgende Schritte umfasst:
  - Wireframe HTML_Code enthält diverse Comment - Blöcke `<!--VARIABLENAME -->`.
  - Erzeugen von div Elementen die eine id mit dem Variablennamen erhalten, welche später als React-Portale dienen.
- Verwendung von Babel und Cheerio als Preprocessor zum Parsen der HTML-Struktur nach "script"-Tags mithilfe von "cheerio".
  - Einsatz von Babel-Plugins für die folgenden Aufgaben:
    - Ersetzen von "DOMContentLoaded" Event-Listenern durch eigene Listener.
    - Ersetzen der Login-Funktionalität.
    - Weitere Plugins können zusätzliche teilweise konfigurierbare Funktionen hinzufügen.
