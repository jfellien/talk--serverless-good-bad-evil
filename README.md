# talk--serverless-good-bad-evil

Dieses Repository enthält Beispiel Code für den Talk "Serverless good, bad and evil stuff". Aktzell ist es so eingerichtet, dass man in den jeweiligen Unterordnern die run.bat (aktuell nur für Windows verfügbar) startet.

## Voraussetzungen

* Node.Js 10.14.1
* Ein Azure ServiceBus mit einem Topic und Subscription. In den function.json Dateien kann man die Namen des Topics ud der Subscription entnehmen.
* azure-fuunctions-core-tools, muss per npm installiert werden
