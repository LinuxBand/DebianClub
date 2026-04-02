---
title: Tails — Distribuição Derivada do Debian
description: Um OS live amnésico construído para privacidade e anonimato — roteia todo o tráfego pelo Tor e não deixa rastros após o desligamento.
---

# Tails

Tails — abreviação de **The Amnesic Incognito Live System** — é um sistema operacional live construído sobre o Debian stable, projetado com um objetivo principal: proteger sua privacidade e anonimato. Deve ser iniciado a partir de um pendrive USB, roda inteiramente na RAM e não deixa rastros no computador host após o desligamento.

## Informações básicas

| Atributo | Detalhes |
|---|---|
| Baseado em | Debian stable |
| Ciclo de lançamento | Atualizações de segurança aproximadamente a cada 6–8 semanas |
| Desktop padrão | GNOME (personalizado, simplificado) |
| Usuários-alvo | Jornalistas, ativistas, usuários preocupados com privacidade |
| Site | [https://tails.boum.org](https://tails.boum.org) |

## Recursos principais

- **Amnésico por design**: O sistema roda na RAM. Ao desligar, todos os arquivos temporários e histórico de navegação são apagados da memória.
- **Roteamento Tor obrigatório**: Toda conexão de rede é roteada pelo Tor. Aplicativos que tentam se conectar fora do Tor são bloqueados automaticamente.
- **Suite de ferramentas de privacidade**: Tor Browser, Thunderbird com criptografia OpenPGP, OnionShare, KeePassXC.
- **Armazenamento persistente criptografado**: Partição criptografada opcional no pendrive USB para salvar documentos entre sessões.

## Primeiros passos

```bash
# Tails deve ser executado a partir de um pendrive USB (mínimo 8 GB)

# Passo 1 — Baixar a imagem:
# https://tails.boum.org/install/

# Passo 2 — Gravar no USB:
# Primeira instalação: usar balenaEtcher (https://www.balena.io/etcher/)

# Nota: Executar o Tails dentro de uma máquina virtual enfraquece
# significativamente suas garantias de segurança.
```

::: warning Limitações
O Tails protege sua privacidade durante uma sessão, mas não pode defender contra vigilância em nível de hardware ou erros cometidos pelo usuário.
:::

## Links úteis

- Site: [https://tails.boum.org](https://tails.boum.org)
- Guia de instalação: [https://tails.boum.org/install/](https://tails.boum.org/install/)

---

## Próximos passos

Voltar à [visão geral das distribuições derivadas do Debian](/pt/variants/).
