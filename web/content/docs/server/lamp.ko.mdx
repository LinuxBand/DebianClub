---
title: LAMP 및 LEMP 웹 서버 배포
description: Debian에서 고전적인 LAMP (Linux, Apache, MySQL, PHP) 및 LEMP (Linux, Nginx, MySQL, PHP) 웹 서버 환경을 빠르게 배포하고 구성하는 방법을 배웁니다.
---

# LAMP 및 LEMP 배포 가이드

이 가이드는 Debian 시스템에서 LAMP 및 LEMP 웹 서버를 설치하고 구성하는 방법을 상세히 설명합니다. 이 두 기술 스택은 모두 오랜 시간 동안 검증된 매우 성숙한 웹 호스팅 솔루션입니다.

## LAMP와 LEMP란 무엇인가요?

- **LAMP**는 **L**inux / **A**pache / **M**ySQL / **P**HP를 의미합니다.
- **LEMP**는 **L**inux / **E**ngine-X (Nginx) / **M**ySQL / **P**HP를 의미합니다.

이 둘의 유일한 차이는 사용하는 웹 서버 소프트웨어입니다: Apache는 기능이 포괄적이고 구성 생태계가 성숙했습니다. Nginx는 가볍고 고성능이며, 특히 높은 동시 접속 처리와 정적 파일 제공에 뛰어납니다.

## 사전 요구사항

- Debian 13 (Trixie)이 설치된 서버.
- `sudo` 권한을 가진 non-root 사용자.

---

## LAMP (Apache) 배포

### 단계 1: 패키지 목록 업데이트

먼저, 시스템의 패키지 목록이 최신 상태인지 확인합니다.

```bash
sudo apt update
sudo apt upgrade
```

### 단계 2: Apache 설치

Apache 웹 서버를 설치합니다.

```bash
sudo apt install apache2
```

설치가 완료되면, 브라우저에서 서버의 IP 주소(`http://서버IP주소`)를 방문하여 Apache가 실행 중인지 확인할 수 있습니다. Apache의 기본 환영 페이지가 보이면 설치가 성공한 것입니다.

### 단계 3: MariaDB (MySQL) 설치

MariaDB는 MySQL의 커뮤니티 주도, 완전 호환되는 포크(fork)이며, Debian의 기본 구현체입니다.

```bash
sudo apt install mariadb-server
```

설치 후, 보안 스크립트를 실행하여 안전하지 않은 기본 설정을 제거하는 것이 좋습니다.

```bash
sudo mysql_secure_installation
```
메시지에 따라 root 비밀번호를 설정하고 일련의 보안 질문에 답합니다.

### 단계 4: PHP 설치

PHP와 Apache 및 MySQL과 통신하는 데 필요한 모듈을 설치합니다.

```bash
sudo apt install php libapache2-mod-php php-mysql
```

- `php`: PHP 코어 패키지.
- `libapache2-mod-php`: Apache가 PHP 파일을 처리할 수 있게 합니다.
- `php-mysql`: PHP가 MySQL/MariaDB 데이터베이스에 연결할 수 있게 합니다.

### 단계 5: PHP 테스트

Apache가 PHP 파일을 올바르게 처리하는지 확인하기 위해 간단한 PHP 파일을 생성합니다.

```bash
sudo nano /var/www/html/info.php
```

편집기에 다음 내용을 붙여넣습니다:

```php
<?php
phpinfo();
?>
```

파일을 저장하고 닫습니다. 이제 브라우저에서 `http://서버IP주소/info.php`를 방문합니다. 상세한 PHP 정보가 포함된 페이지가 보이면 LAMP 스택이 성공적으로 배포된 것입니다!

**중요**: 보안상의 이유로, 테스트가 완료되면 이 파일을 반드시 삭제하세요.
```bash
sudo rm /var/www/html/info.php
```

---

## LEMP (Nginx) 배포

Nginx를 선호한다면 다음 단계를 따르세요.

### 단계 1: Nginx 설치

```bash
sudo apt install nginx
```
마찬가지로, 서버 IP(`http://서버IP주소`)를 방문하여 Nginx 환영 페이지가 보이면 설치가 성공한 것입니다.

### 단계 2: MariaDB 설치

이 단계는 LAMP 설치와 완전히 동일합니다. 이미 설치되어 있다면 반복할 필요가 없습니다.

```bash
sudo apt install mariadb-server
sudo mysql_secure_installation
```

### 단계 3: PHP-FPM 설치

Nginx는 Apache처럼 내장된 PHP 처리 모듈이 없습니다. PHP 요청을 처리하기 위해 외부 프로그램이 필요하며, 이것이 `PHP-FPM` (FastCGI Process Manager)입니다.

```bash
sudo apt install php-fpm php-mysql
```

### 단계 4: Nginx 구성

이것이 LEMP 배포에서 가장 중요한 단계입니다. Nginx의 서버 블록 구성 파일을 편집하여 `.php` 파일 요청을 PHP-FPM에 전달하는 방법을 알려줘야 합니다.

기본 서버 블록 구성 파일을 엽니다:
```bash
sudo nano /etc/nginx/sites-available/default
```

파일을 아래와 같이 수정해야 합니다. `index.php`와 `location ~ \.php$` 블록을 추가하는 것에 주의하세요.

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.php; # index.php 추가

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    # 주석을 해제하거나 추가해야 하는 핵심 부분
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        # 참고: 경로는 PHP 버전에 따라 다를 수 있습니다.
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }
}
```

파일을 저장하고 닫습니다. 그런 다음, Nginx 구성에 구문 오류가 없는지 테스트합니다.

```bash
sudo nginx -t
```
`syntax is ok`와 `test is successful`이 표시되면 변경 사항을 적용하기 위해 Nginx를 안전하게 재시작할 수 있습니다.

```bash
sudo systemctl restart nginx
```

### 단계 5: PHP 테스트

이 단계는 LAMP 테스트와 유사합니다. `info.php` 파일을 생성합니다.

```bash
sudo nano /var/www/html/info.php
```

```php
<?php
phpinfo();
?>
```

이제 `http://서버IP주소/info.php`를 방문합니다. PHP 정보 페이지가 보이면 LEMP 스택이 성공적으로 배포된 것입니다!

**마찬가지로, 테스트 후 이 파일을 반드시 삭제하세요.**
```bash
sudo rm /var/www/html/info.php
```

## 다음 단계

이제 기능이 완비된 웹 서버 환경을 갖추었습니다. 다음으로 고려할 수 있는 사항은 다음과 같습니다:
- 웹사이트에 대한 가상 호스트(Virtual Hosts) 구성.
- Let's Encrypt를 사용하여 웹사이트에 HTTPS 활성화.
- 사용자 애플리케이션 배포 또는 WordPress와 같은 CMS 설치.