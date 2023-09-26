# C24 Wireframe

- compiled javascript that has to be included into every c24 product on their own / keine möglichkeit den source code selbst zu verändern
- da sich der code jeden tag updaten könnte, haben wir einen compile step eingeführt
  - html divs markieren mit ids
  - react portals erzeugen die diese ids als container nutzen
  - react komponenten html/javascript/css generieren
- babel & cheerio als preprocessor zum parsen der HTML struktur nach "script" -Tags via "cheerio"

  - babel plugins kamen für folgendes zum einsatz
  - DomContentLoaded event listeners ersetzen mit eigenen listenern
  - ersetzen der login funktionalität
  - weitere plugins könnten weitere teilfunktionalität konfigurierbar machen
