---
title: Guía de implementación de servidores web LAMP y LEMP
description: Aprende a implementar y configurar rápidamente los entornos clásicos de servidor web LAMP (Linux, Apache, MySQL, PHP) y LEMP (Linux, Nginx, MySQL, PHP) en Debian.
---

# Guía de implementación de LAMP y LEMP

Esta guía detalla cómo instalar y configurar los servidores web LAMP y LEMP en un sistema Debian. Ambas pilas tecnológicas son soluciones de alojamiento web muy maduras y probadas a lo largo del tiempo.

## ¿Qué son LAMP y LEMP?

- **LAMP** significa **L**inux / **A**pache / **M**ySQL / **P**HP.
- **LEMP** significa **L**inux / **E**ngine-X (Nginx) / **M**ySQL / **P**HP.

Su única diferencia radica en el software de servidor web utilizado: Apache es completo, con un ecosistema de configuración maduro; Nginx es ligero, de alto rendimiento y especialmente bueno manejando alta concurrencia y archivos estáticos.

## Prerrequisitos

- Un servidor con Debian 13 (Trixie) instalado.
- Un usuario no root con permisos `sudo`.

---

## Implementar LAMP (Apache)

### Paso 1: Actualizar la lista de paquetes

Primero, asegúrate de que la lista de paquetes de tu sistema esté actualizada.

```bash
sudo apt update
sudo apt upgrade
```

### Paso 2: Instalar Apache

Instala el servidor web Apache.

```bash
sudo apt install apache2
```

Una vez instalado, puedes verificar si Apache se está ejecutando accediendo a la dirección IP de tu servidor en un navegador (`http://tu_IP_del_servidor`). Si ves la página de bienvenida predeterminada de Apache, la instalación fue exitosa.

### Paso 3: Instalar MariaDB (MySQL)

MariaDB es una bifurcación impulsada por la comunidad y completamente compatible de MySQL, y es la implementación predeterminada en Debian.

```bash
sudo apt install mariadb-server
```

Después de la instalación, se recomienda ejecutar el script de seguridad para eliminar configuraciones predeterminadas inseguras.

```bash
sudo mysql_secure_installation
```
Sigue las indicaciones para establecer la contraseña de root y responder una serie de preguntas de seguridad.

### Paso 4: Instalar PHP

Instala PHP y los módulos necesarios para que se comunique con Apache y MySQL.

```bash
sudo apt install php libapache2-mod-php php-mysql
```

- `php`: Paquete principal de PHP.
- `libapache2-mod-php`: Permite a Apache procesar archivos PHP.
- `php-mysql`: Permite a PHP conectarse a bases de datos MySQL/MariaDB.

### Paso 5: Probar PHP

Para verificar que Apache pueda procesar correctamente archivos PHP, creamos un archivo PHP simple.

```bash
sudo nano /var/www/html/info.php
```

Pega el siguiente contenido en el editor:

```php
<?php
phpinfo();
?>
```

Guarda y cierra el archivo. Ahora, accede a `http://tu_IP_del_servidor/info.php` en tu navegador. Si ves una página con información detallada de PHP, ¡entonces la pila LAMP se ha implementado con éxito!

**Importante**: Por razones de seguridad, asegúrate de eliminar este archivo después de la prueba.
```bash
sudo rm /var/www/html/info.php
```

---

## Implementar LEMP (Nginx)

Si prefieres usar Nginx, puedes seguir estos pasos.

### Paso 1: Instalar Nginx

```bash
sudo apt install nginx
```
De nuevo, accede a la IP del servidor (`http://tu_IP_del_servidor`). Si ves la página de bienvenida de Nginx, la instalación fue exitosa.

### Paso 2: Instalar MariaDB

Este paso es idéntico a la instalación de LAMP. Si ya está instalado, no es necesario repetirlo.

```bash
sudo apt install mariadb-server
sudo mysql_secure_installation
```

### Paso 3: Instalar PHP-FPM

Nginx no tiene un módulo incorporado para procesar PHP como Apache. Necesita un programa externo para manejar solicitudes PHP, que es `PHP-FPM` (FastCGI Process Manager).

```bash
sudo apt install php-fpm php-mysql
```

### Paso 4: Configurar Nginx

Este es el paso más crítico en la implementación de LEMP. Necesitas editar el archivo de configuración del bloque de servidor de Nginx para indicarle cómo pasar las solicitudes de archivos `.php` a PHP-FPM.

Abre el archivo de configuración predeterminado del bloque de servidor:
```bash
sudo nano /etc/nginx/sites-available/default
```

Necesitas modificar el archivo para que se vea como se muestra a continuación. Presta atención a agregar `index.php` y el bloque `location ~ \.php$`.

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.php; # Agrega index.php

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    # Esta es la parte clave que necesita ser descomentada o agregada
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        # Nota: La ruta puede variar según la versión de PHP
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }
}
```

Guarda y cierra el archivo. Luego, prueba si la configuración de Nginx tiene errores de sintaxis.

```bash
sudo nginx -t
```
Si muestra `syntax is ok` y `test is successful`, puedes reiniciar Nginx de forma segura para aplicar los cambios.

```bash
sudo systemctl restart nginx
```

### Paso 5: Probar PHP

Este paso es similar a la prueba de LAMP. Crea un archivo `info.php`.

```bash
sudo nano /var/www/html/info.php
```

```php
<?php
phpinfo();
?>
```

Ahora accede a `http://tu_IP_del_servidor/info.php`. Si ves la página de información de PHP, ¡significa que la pila LEMP se ha implementado con éxito!

**De nuevo, asegúrate de eliminar este archivo después de la prueba.**
```bash
sudo rm /var/www/html/info.php
```

## Próximos pasos

Ahora tienes un entorno de servidor web completamente funcional. Como próximos pasos, puedes considerar:
- Configurar hosts virtuales (Virtual Hosts) para tu sitio web.
- Habilitar HTTPS para tu sitio web usando Let's Encrypt.
- Implementar tu propia aplicación o instalar un CMS como WordPress.