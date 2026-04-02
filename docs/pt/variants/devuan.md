---
title: Devuan — Distribuição Derivada do Debian
description: Um fork do Debian que substitui o systemd por sysvinit, runit ou OpenRC, preservando a liberdade do sistema init.
---

# Devuan

Devuan (pronunciado "dev-one") é um fork do Debian iniciado pelo coletivo Veteran Unix Admins em 2015, em resposta ao Debian 8 Jessie adotar o systemd como sistema init padrão. A missão central do Devuan é simples: fornecer uma distribuição baseada em Debian que não depende do systemd.

## Informações básicas

| Atributo | Detalhes |
|---|---|
| Baseado em | Debian (dependências do systemd removidas/substituídas) |
| Ciclo de lançamento | Alinha-se com os lançamentos estáveis do Debian |
| Desktop padrão | Xfce (padrão), GNOME, KDE, LXQt disponíveis |
| Usuários-alvo | Usuários que preferem init tradicional, sysadmins |
| Site | [https://www.devuan.org](https://www.devuan.org) |

## Recursos principais

- **Liberdade de sistema init**: Escolha sysvinit (tradicional), runit (rápido, leve) ou OpenRC no momento da instalação.
- **Compatibilidade quase completa com o Debian**: Apenas pacotes com dependências rígidas do systemd são corrigidos ou substituídos.
- **Paridade de versão com o Debian**: Devuan 5 Daedalus = Debian 12 Bookworm.
- **Amigável para contêineres e embarcados**: Ambiente sem systemd usa menos recursos no Docker/LXC.

## Primeiros passos

```bash
# Baixar de: https://www.devuan.org/get-devuan

# Após a instalação, atualizar o sistema
sudo apt update && sudo apt full-upgrade -y

# Verificar qual sistema init está em execução
cat /proc/1/comm
# Deve retornar: init (sysvinit), runit ou openrc-init

# Gerenciamento de serviços com sysvinit
sudo service nginx start
sudo update-rc.d nginx enable
```

## Links úteis

- Site: [https://www.devuan.org](https://www.devuan.org)
- Download: [https://www.devuan.org/get-devuan](https://www.devuan.org/get-devuan)

---

## Próximos passos

Voltar à [visão geral das distribuições derivadas do Debian](/pt/variants/).
