---
title: "Gerenciamento de Contêineres Podman"
description: "Instalação e uso do Podman no Debian 13, sem daemon, execução rootless de contêineres e compatibilidade com comandos Docker"
---

# Gerenciamento de Contêineres Podman

**Podman** é um mecanismo de contêineres de código aberto, altamente compatível com o Docker, mas com duas vantagens principais:

- **Sem daemon (daemonless)**: Ao contrário do Docker, que depende de um daemon root residente, o Podman executa contêineres como processos comuns, reduzindo a superfície de ataque.
- **Execução Rootless**: Usuários comuns podem executar contêineres sem privilégios root, aumentando a segurança.

O repositório oficial do Debian 13 já inclui o Podman, e a instalação é muito simples, sem necessidade de adicionar fontes de terceiros.

## Instalação

```bash
sudo apt update
sudo apt install podman

# Verificar
podman --version
```

Caso precise de orquestração no estilo `docker-compose`, instale também:

```bash
sudo apt install podman-compose
```

## Uso básico

A linha de comando do Podman corresponde quase exatamente à do Docker:

```bash
# Executar um contêiner
podman run -d --name web -p 8080:80 docker.io/library/nginx

# Listar contêineres em execução
podman ps

# Listar todos os contêineres (incluindo parados)
podman ps -a

# Listar imagens locais
podman images

# Ver logs / acessar o contêiner
podman logs web
podman exec -it web bash

# Parar e remover
podman stop web
podman rm web
```

> Nota: O Podman, por padrão, escreve explicitamente o prefixo do repositório de imagens (por exemplo, `docker.io/library/nginx`). Você também pode configurar os repositórios de busca padrão em `/etc/containers/registries.conf`.

## Compatibilidade com comandos Docker

Se você está acostumado com o comando `docker`, pode instalar um pacote de compatibilidade que faz `docker` ser um alias para `podman`:

```bash
sudo apt install podman-docker
```

Depois disso, comandos como `docker run ...`, `docker ps`, etc., serão redirecionados diretamente para o Podman.

## Contêineres Rootless

Um usuário comum executar `podman` diretamente já é o modo rootless, sem qualquer configuração adicional — esta é a maior vantagem do Podman em relação ao Docker. Verifique:

```bash
# Executar como usuário comum (sem sudo)
podman run --rm docker.io/library/alpine echo "Olá do Podman rootless"
```

O modo rootless depende de namespaces de usuário (user namespaces). O Debian 13 já os habilita por padrão; se houver erros relacionados a `subuid/subgid`, confirme se `/etc/subuid` e `/etc/subgid` contêm entradas para o usuário atual:

```bash
grep "$USER" /etc/subuid /etc/subgid
# Se não houver, adicione manualmente (geralmente já configurado automaticamente na instalação)
sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 "$USER"
```

## Pod: Gerenciamento nativo de grupos

O nome Podman vem de **Pod** (conceito idêntico ao Pod do Kubernetes) — permite agrupar vários contêineres, compartilhando o namespace de rede:

```bash
# Criar um pod e expor a porta
podman pod create --name mypod -p 8080:80

# Adicionar um contêiner ao pod
podman run -d --pod mypod docker.io/library/nginx
```

## Gerenciar contêineres com systemd (Quadlet)

Para que contêineres iniciem automaticamente com o sistema e sejam gerenciados pelo systemd, recomenda-se o uso do **Quadlet**. Crie arquivos de unidade `.container` em `~/.config/containers/systemd/` (rootless) ou `/etc/containers/systemd/` (nível de sistema):

```ini
# ~/.config/containers/systemd/web.container
[Container]
Image=docker.io/library/nginx
PublishPort=8080:80

[Install]
WantedBy=default.target
```

Em seguida, recarregue e inicie:

```bash
systemctl --user daemon-reload
systemctl --user start web
```

## Comparativo rápido: Podman vs Docker

| Característica | Podman | Docker |
|---|---|---|
| Daemon | Sem (daemonless) | Possui daemon residente |
| Rootless | Suporte nativo padrão | Requer configuração adicional |
| Linha de comando | Compatível com Docker | — |
| Integração com systemd | Quadlet nativo | Requer encapsulamento adicional |
| Instalação no Debian 13 | Diretamente dos repositórios oficiais | Requer adição do repositório oficial do Docker |

## Resumo

- `sudo apt install podman` é suficiente, sem fontes de terceiros.
- Comandos compatíveis com Docker; use `podman-docker` para redirecionar o comando `docker` diretamente.
- Usuários comuns executam rootless; com Quadlet, podem ser gerenciados pelo systemd.

Leitura complementar: [Instalação e uso do Docker](/en/server/docker) · [Virtualização](/en/server/virtualization)
