---
title: Guia de Implantação de Servidores Web LAMP e LEMP
description: Aprenda a implantar e configurar rapidamente os ambientes clássicos de servidor web LAMP (Linux, Apache, MySQL, PHP) e LEMP (Linux, Nginx, MySQL, PHP) no Debian.
---

# Guia de Implantação LAMP e LEMP

Este guia detalha como instalar e configurar os servidores web LAMP e LEMP em um sistema Debian. Ambas as pilhas de tecnologia são soluções maduras e amplamente testadas para hospedagem de sites.

## O que são LAMP e LEMP?

- **LAMP** significa **L**inux / **A**pache / **M**ySQL / **P**HP.
- **LEMP** significa **L**inux / **E**ngine-X (Nginx) / **M**ySQL / **P**HP.

A única diferença está no software do servidor web utilizado: o Apache é abrangente e possui um ecossistema de configuração maduro; o Nginx é leve, de alto desempenho e especialmente bom em lidar com alta concorrência e arquivos estáticos.

## Pré-requisitos

- Um servidor com Debian 13 (Trixie) instalado.
- Um usuário não root com permissões `sudo`.

---

## Implantar LAMP (Apache)

### Passo 1: Atualizar a lista de pacotes

Primeiro, certifique-se de que a lista de pacotes do seu sistema está atualizada.

```bash
sudo apt update
sudo apt upgrade
```

### Passo 2: Instalar o Apache

Instale o servidor web Apache.

```bash
sudo apt install apache2
```

Após a instalação, você pode verificar se o Apache está em execução acessando o endereço IP do seu servidor no navegador (`http://seu_IP_do_servidor`). Se você vir a página de boas-vindas padrão do Apache, a instalação foi bem-sucedida.

### Passo 3: Instalar MariaDB (MySQL)

O MariaDB é um fork comunitário e totalmente compatível do MySQL, e é a implementação padrão no Debian.

```bash
sudo apt install mariadb-server
```

Após a instalação, é recomendável executar o script de segurança para remover configurações padrão inseguras.

```bash
sudo mysql_secure_installation
```
Siga os prompts para definir uma senha root e responder a uma série de perguntas de segurança.

### Passo 4: Instalar PHP

Instale o PHP e os módulos necessários para que ele se comunique com o Apache e o MySQL.

```bash
sudo apt install php libapache2-mod-php php-mysql
```

- `php`: Pacote principal do PHP.
- `libapache2-mod-php`: Permite que o Apache processe arquivos PHP.
- `php-mysql`: Permite que o PHP se conecte a bancos de dados MySQL/MariaDB.

### Passo 5: Testar o PHP

Para verificar se o Apache pode processar corretamente arquivos PHP, criaremos um arquivo PHP simples.

```bash
sudo nano /var/www/html/info.php
```

Cole o seguinte conteúdo no editor:

```php
<?php
phpinfo();
?>
```

Salve e feche o arquivo. Agora, acesse `http://seu_IP_do_servidor/info.php` no seu navegador. Se você vir uma página com informações detalhadas do PHP, a pilha LAMP foi implantada com sucesso!

**Importante**: Por motivos de segurança, certifique-se de excluir este arquivo após o teste.
```bash
sudo rm /var/www/html/info.php
```

---

## Implantar LEMP (Nginx)

Se você prefere usar o Nginx, siga estas etapas.

### Passo 1: Instalar o Nginx

```bash
sudo apt install nginx
```
Da mesma forma, acesse o IP do servidor (`http://seu_IP_do_servidor`). Se você vir a página de boas-vindas do Nginx, a instalação foi bem-sucedida.

### Passo 2: Instalar MariaDB

Esta etapa é exatamente igual à instalação do LAMP. Se já estiver instalado, não é necessário repetir.

```bash
sudo apt install mariadb-server
sudo mysql_secure_installation
```

### Passo 3: Instalar PHP-FPM

O Nginx não possui um módulo interno de processamento PHP como o Apache. Ele precisa de um programa externo para lidar com solicitações PHP, que é o `PHP-FPM` (FastCGI Process Manager).

```bash
sudo apt install php-fpm php-mysql
```

### Passo 4: Configurar o Nginx

Este é o passo mais crítico na implantação do LEMP. Você precisa editar o arquivo de configuração do bloco de servidor do Nginx para informá-lo como passar solicitações de arquivos `.php` para o PHP-FPM.

Abra o arquivo de configuração do bloco de servidor padrão:
```bash
sudo nano /etc/nginx/sites-available/default
```

Você precisa modificar o arquivo para que fique semelhante ao mostrado abaixo. Observe a adição de `index.php` e do bloco `location ~ \.php$`.

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.php; # Adicione index.php

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    # Esta é a parte crucial que precisa ser descomentada ou adicionada
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        # Nota: O caminho pode variar dependendo da versão do PHP
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }
}
```

Salve e feche o arquivo. Em seguida, teste se a configuração do Nginx possui erros de sintaxe.

```bash
sudo nginx -t
```
Se mostrar `syntax is ok` e `test is successful`, você pode reiniciar o Nginx com segurança para aplicar as alterações.

```bash
sudo systemctl restart nginx
```

### Passo 5: Testar o PHP

Esta etapa é semelhante ao teste do LAMP. Crie um arquivo `info.php`.

```bash
sudo nano /var/www/html/info.php
```

```php
<?php
phpinfo();
?>
```

Agora acesse `http://seu_IP_do_servidor/info.php`. Se você vir a página de informações do PHP, a pilha LEMP foi implantada com sucesso!

**Novamente, certifique-se de excluir este arquivo após o teste.**
```bash
sudo rm /var/www/html/info.php
```

## Próximos Passos

Agora você possui um ambiente de servidor web totalmente funcional. Como próximos passos, você pode considerar:
- Configurar hosts virtuais (Virtual Hosts) para o seu site.
- Habilitar HTTPS para o seu site usando o Let's Encrypt.
- Implantar sua própria aplicação ou instalar um CMS, como o WordPress.