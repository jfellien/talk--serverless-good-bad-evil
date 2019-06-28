# talk--serverless-good-bad-evil

Dieses Repository enthält Beispiel Code für den Talk "Serverless good, bad and evil stuff". Aktuell ist es so eingerichtet, dass man in den jeweiligen Unterordnern die run.bat (nur für Windows verfügbar) startet. Dann startet die jeweilige Function, die dann über einen ServiiceBus Nachrichten austauscht.

## Voraussetzungen

* Node.Js 10.14.1
* Ein Azure ServiceBus mit einem Topic und Subscription. In den function.json Dateien kann man die Namen des Topics ud der Subscription entnehmen.
* azure-fuunctions-core-tools, muss per npm installiert werden
