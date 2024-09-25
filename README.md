# Firefox Addon: Git-Repo Lesezeichen-Synchronisation

Dieses Firefox-Addon synchronisiert und erstellt Lesezeichen aus einem Git-Repository. Um das Addon zu verwenden, folge den untenstehenden Schritten.

## Installation

1. **Addon herunterladen**: Lade die `.xpi`-Datei des Addons herunter.
2. **Addon installieren**:
    - Öffne Firefox.
    - Ziehe die `.xpi`-Datei in das Firefox-Fenster oder gehe zu `Add-ons` > `Add-on aus Datei installieren`.
3. **Addon aktivieren**: Stelle sicher, dass das Addon aktiviert ist.

## Konfiguration

1. **Einstellungen öffnen**:
    - Gehe zu `Add-ons` > `Erweiterungen`.
    - Finde das installierte Addon und klicke auf `Einstellungen`.
2. **Repository-URL eingeben**: Gib die URL des Git-Repositories ein, aus dem die Lesezeichen synchronisiert werden sollen.
3. **Zielordner-Titel festlegen**: Gib den Titel des Ordners ein, in dem die Lesezeichen gespeichert werden sollen. Falls der eingegebene Ordner nicht existiert, werden die Bookmarks **nicht geladen!**

## ⚠ Achtung ⚠

- **Der Zielordner muss einen `eindeutigen` Namen haben, sonst kann es sein, dass die Bookmarks in dem falschen Ordner landen!**
- **Die Bookmarks werden über die Namen gefunden! Das bedeutet, das die namen nicht geändert werden sollten.**
- **Der Ort der Bookmarks sowie des Ordners ist allerdings egal 😊! Auch können innerhalb des Zielordners Unterordner erstellt werden!**

## Nutzung

1. **Synchronisation starten**: Nach der Konfiguration wird das Addon automatisch die Lesezeichen aus dem angegebenen Git-Repository synchronisieren.
2. **Lesezeichen anzeigen**: Die synchronisierten Lesezeichen werden im festgelegten Ordner in deinen Firefox-Lesezeichen angezeigt.

## Update

1. **Altes `Add-On` löschen**
2. **Neue `.xpi`-Datei des Addons herunterladen**
3. **Addon installieren**:
   - Öffne Firefox.
   - Ziehe die `.xpi`-Datei in das Firefox-Fenster oder gehe zu `Add-ons` > `Add-on aus Datei installieren`.
4. **Addon aktivieren**: Stelle sicher, dass das Addon aktiviert ist.
5. **Addon Konfigurationen eingeben**: Bei einer Neuinstallation löscht sich der zum Add-On gehörige lokale Speicher, daher müssen die Werte erneut eingegeben werden.

## Fehlerbehebung

- **Addon funktioniert nicht**: Stelle sicher, dass die eingegebene Repository-URL korrekt ist oder du die notwendigen Berechtigungen hast.
- **Lesezeichen werden nicht synchronisiert**: Überprüfe die Internetverbindung und stelle sicher, dass das Git-Repository erreichbar ist.

## Support

Für weitere Unterstützung oder um Fehler zu melden, erstelle bitte ein Issue im GitHub-Repository.

## Git-Repo

Das Git-Repo ist unter dieser URL zu erreichen: https://gitpro.hanse-merkur.de/WIEKH/bookmarks.
Es ist öffentlich und sollte somit für alle innerhalb der HanseMerkur verfügbar sein!

## Für Entwickler:

### Ändern oder Neuanlegen der Bookmarks:

1. Wechsel auf Main branch: ```git switch main```
2. Ziehen des neusten Standes aus Git: ```git pull```
3. Anpassung in der entsprechenden JSON-Datei durchführen
4. Anschließend ```git push``` ausfuehren

## Änderungen im Code

1. Wechsel auf Main branch: ```git switch main```
2. Ziehen des neusten Standes aus Git: ```git pull```
3. Erstellung eines **feature Branch**: ```git checkout -b <branch-name>```
4. Änderungen einpflegen
5. Änderungen in das Git Repo pushen: 
   - ```git add .```
   - ```git commit -m "Deine Commit-Nachricht"```
   - ```git push```
6. **Merge Request stellen!**
7. Nach dem Merge die `.xpi`-Datei ausliefern