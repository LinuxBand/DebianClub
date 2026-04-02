---
title: Kali Linux — Distribuição Derivada do Debian
description: A distribuição de testes de penetração e cibersegurança padrão da indústria, com mais de 600 ferramentas de segurança.
---

# Kali Linux

Kali Linux é a distribuição Linux focada em segurança mais reconhecida, lançada pela Offensive Security em 2013. Baseada no Debian testing com modelo de lançamento contínuo, vem com mais de 600 ferramentas pré-instaladas para testes de penetração, forense digital e engenharia reversa.

## Informações básicas

| Atributo | Detalhes |
|---|---|
| Baseado em | Debian testing (rolling) |
| Ciclo de lançamento | Lançamento contínuo |
| Desktop padrão | Xfce (desde 2019); GNOME, KDE disponíveis |
| Usuários-alvo | Profissionais de segurança, pentesters, jogadores de CTF |
| Site | [https://www.kali.org](https://www.kali.org) |

## Recursos principais

- **600+ ferramentas de segurança**: Nmap, Metasploit, Burp Suite, Wireshark, Aircrack-ng, John the Ripper e centenas mais.
- **Modelo de lançamento contínuo**: Rastreia o Debian testing, ferramentas são continuamente atualizadas.
- **Suporte multiplataforma**: x86_64, ARM, WSL, Docker e imagens dedicadas para Raspberry Pi.
- **Modo Live**: Inicialização direta de um drive USB sem instalação em disco.

## Primeiros passos

```bash
# Baixar de: https://www.kali.org/get-kali/

# Após a instalação, atualizar o sistema
sudo apt update && sudo apt full-upgrade -y

# Instalar o conjunto completo de ferramentas
sudo apt install kali-linux-everything -y

# Instalar apenas as 10 ferramentas mais usadas
sudo apt install kali-tools-top10 -y
```

::: warning Aviso Legal
As ferramentas incluídas no Kali Linux devem ser usadas apenas em sistemas que você possui ou tem permissão escrita explícita para testar.
:::

## Links úteis

- Site: [https://www.kali.org](https://www.kali.org)
- Download: [https://www.kali.org/get-kali/](https://www.kali.org/get-kali/)

---

## Próximos passos

Voltar à [visão geral das distribuições derivadas do Debian](/pt/variants/).
