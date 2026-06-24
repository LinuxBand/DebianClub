---
title: LAMP- und LEMP-Webserver-Bereitstellung
description: Erfahren Sie, wie Sie die klassischen LAMP- (Linux, Apache, MySQL, PHP) und LEMP- (Linux, Nginx, MySQL, PHP) Webserver-Umgebungen schnell auf Debian bereitstellen und konfigurieren.
---

# Leitfaden zur LAMP- und LEMP-Bereitstellung

Dieser Leitfaden beschreibt detailliert, wie Sie LAMP- und LEMP-Webserver auf einem Debian-System installieren und konfigurieren. Beide Technologie-Stacks sind langjährig erprobte und ausgereifte Lösungen für das Webhosting.

## Was sind LAMP und LEMP?

- **LAMP** steht für **L**inux / **A**pache / **M**ySQL / **P**HP.
- **LEMP** steht für **L**inux / **E**ngine-X (Nginx) / **M**ySQL / **P**HP.

Der einzige Unterschied liegt in der verwendeten Webserver-Software: Apache ist funktionsreich und verfügt über eine ausgereifte Konfigurationslandschaft; Nginx ist leichtgewichtig, leistungsstark und besonders gut für hohe Parallelität und statische Dateien geeignet.

## Voraussetzungen

- Einen Server mit installiertem Debian 13 (Trixie).
- Einen Nicht-Root-Benutzer mit `sudo`-Berechtigungen.

---

## LAMP (Apache) bereitstellen

### Schritt 1: Paketlisten aktualisieren

Stellen Sie zunächst sicher, dass die Paketlisten Ihres Systems auf dem neuesten Stand sind.

```bash
sudo apt update
sudo apt upgrade
```

### Schritt 2: Apache installieren

Installieren Sie den Apache-Webserver.

```bash
sudo apt install apache2
```

Nach der Installation können Sie überprüfen, ob Apache läuft, indem Sie im Browser die IP-Adresse Ihres Servers aufrufen (`http://Ihre_Server_IP`). Wenn Sie die Standard-Willkommensseite von Apache sehen, war die Installation erfolgreich.

### Schritt 3: MariaDB (MySQL) installieren

MariaDB ist eine Community-gesteuerte, vollständig kompatible Abspaltung von MySQL und die Standardimplementierung in Debian.

```bash
sudo apt install mariadb-server
```

Nach der Installation wird empfohlen, das Sicherheitsskript auszuführen, um unsichere Standardeinstellungen zu entfernen.

```bash
sudo mysql_secure_installation
```
Folgen Sie den Anweisungen, um ein Root-Passwort festzulegen und eine Reihe von Sicherheitsfragen zu beantworten.

### Schritt 4: PHP installieren

Installieren Sie PHP sowie die Module, die für die Kommunikation mit Apache und MySQL erforderlich sind.

```bash
sudo apt install php libapache2-mod-php php-mysql
```

- `php`: Das PHP-Kernpaket.
- `libapache2-mod-php`: Ermöglicht Apache die Verarbeitung von PHP-Dateien.
- `php-mysql`: Ermöglicht PHP die Verbindung zu MySQL/MariaDB-Datenbanken.

### Schritt 5: PHP testen

Um zu überprüfen, ob Apache PHP-Dateien korrekt verarbeiten kann, erstellen wir eine einfache PHP-Datei.

```bash
sudo nano /var/www/html/info.php
```

Fügen Sie im Editor folgenden Inhalt ein:

```php
<?php
phpinfo();
?>
```

Speichern und schließen Sie die Datei. Rufen Sie nun im Browser `http://Ihre_Server_IP/info.php` auf. Wenn Sie eine Seite mit detaillierten PHP-Informationen sehen, wurde der LAMP-Stack erfolgreich bereitgestellt!

**Wichtig**: Löschen Sie diese Datei aus Sicherheitsgründen nach dem Test unbedingt.
```bash
sudo rm /var/www/html/info.php
```

---

## LEMP (Nginx) bereitstellen

Wenn Sie Nginx bevorzugen, können Sie die folgenden Schritte ausführen.

### Schritt 1: Nginx installieren

```bash
sudo apt install nginx
```
Rufen Sie ebenfalls die Server-IP auf (`http://Ihre_Server_IP`). Wenn Sie die Nginx-Willkommensseite sehen, war die Installation erfolgreich.

### Schritt 2: MariaDB installieren

Dieser Schritt ist identisch mit der LAMP-Installation. Falls bereits installiert, muss er nicht wiederholt werden.

```bash
sudo apt install mariadb-server
sudo mysql_secure_installation
```

### Schritt 3: PHP-FPM installieren

Nginx verfügt nicht wie Apache über ein eingebautes PHP-Verarbeitungsmodul. Es benötigt ein externes Programm zur Verarbeitung von PHP-Anfragen, nämlich `PHP-FPM` (FastCGI Process Manager).

```bash
sudo apt install php-fpm php-mysql
```

### Schritt 4: Nginx konfigurieren

Dies ist der kritischste Schritt bei der LEMP-Bereitstellung. Sie müssen die Server-Block-Konfigurationsdatei von Nginx bearbeiten, um ihm mitzuteilen, wie Anfragen für `.php`-Dateien an PHP-FPM weitergeleitet werden sollen.

Öffnen Sie die Standard-Server-Block-Konfigurationsdatei:
```bash
sudo nano /etc/nginx/sites-available/default
```

Sie müssen die Datei so ändern, dass sie in etwa wie folgt aussieht. Achten Sie darauf, `index.php` und den `location ~ \.php$`-Block hinzuzufügen.

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.php; # index.php hinzufügen

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    # Dies ist der wichtige Abschnitt, der auskommentiert oder hinzugefügt werden muss
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        # Hinweis: Der Pfad kann je nach PHP-Version variieren
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }
}
```

Speichern und schließen Sie die Datei. Testen Sie dann, ob die Nginx-Konfiguration Syntaxfehler enthält.

```bash
sudo nginx -t
```
Wenn `syntax is ok` und `test is successful` angezeigt wird, können Sie Nginx sicher neu starten, um die Änderungen zu übernehmen.

```bash
sudo systemctl restart nginx
```

### Schritt 5: PHP testen

Dieser Schritt ähnelt dem LAMP-Test. Erstellen Sie eine `info.php`-Datei.

```bash
sudo nano /var/www/html/info.php
```

```php
<?php
phpinfo();
?>
```

Rufen Sie nun `http://Ihre_Server_IP/info.php` auf. Wenn Sie die PHP-Info-Seite sehen, wurde der LEMP-Stack erfolgreich bereitgestellt!

**Auch hier: Löschen Sie diese Datei nach dem Test unbedingt.**
```bash
sudo rm /var/www/html/info.php
```

## Nächste Schritte

Sie verfügen nun über eine voll funktionsfähige Webserver-Umgebung. Als Nächstes können Sie in Betracht ziehen:
- Virtuelle Hosts (Virtual Hosts) für Ihre Website zu konfigurieren.
- HTTPS für Ihre Website mit Let's Encrypt zu aktivieren.
- Ihre eigene Anwendung bereitzustellen oder ein CMS wie WordPress zu installieren.