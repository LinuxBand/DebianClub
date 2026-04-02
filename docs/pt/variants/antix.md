---
title: antiX — Distribuição Derivada do Debian
description: Um derivado Debian ultra-leve que roda com apenas 256 MB de RAM, usa sysvinit e dá nova vida a hardware antigo.
---

# antiX

antiX é um derivado do Debian stable extremamente leve liderado pelo desenvolvedor grego anticapitalista, projetado especificamente para computadores antigos e hardware com poucos recursos. Roda sem systemd (usando sysvinit em vez disso) e pode funcionar confortavelmente com apenas 256 MB de RAM. É também a camada base sobre a qual o MX Linux é construído.

## Informações básicas

| Atributo | Detalhes |
|---|---|
| Baseado em | Debian stable |
| Ciclo de lançamento | Segue Debian stable; lançamentos atualizados periódicos |
| Desktop padrão | IceWM (padrão), Fluxbox, JWM, Herbstluftwm |
| Usuários-alvo | Donos de hardware antigo, minimalistas, usuários anti-systemd |
| Site | [https://antixlinux.com](https://antixlinux.com) |

## Recursos principais

- **Pegada radical e leve**: Um desktop antiX completo fica ocioso com 150–200 MB de RAM.
- **Sem systemd**: antiX usa sysvinit como sistema init.
- **Quatro edições de instalação**: Full, Base, Core (somente linha de comando) e Net.
- **Suporte legado a 32 bits**: Uma das poucas distribuições ativamente mantidas que ainda fornece imagens de 32 bits.

## Primeiros passos

```bash
# Baixar de: https://antixlinux.com/download/
# Disponível nas edições Full, Base, Core e Net — 32 e 64 bits

# Após a instalação, atualizar o sistema
sudo apt update && sudo apt upgrade -y

# Verificar uso de RAM
free -h

# Gerenciamento de serviços com sysvinit
sudo service <nome-do-servico> start
sudo update-rc.d <nome-do-servico> enable
```

::: tip antiX vs. MX Linux
antiX é a escolha mais extrema — mais enxuta, mais próxima da linha de comando. MX Linux é construído sobre antiX mas adiciona ferramentas gráficas e uma interface mais amigável.
:::

## Links úteis

- Site: [https://antixlinux.com](https://antixlinux.com)
- Download: [https://antixlinux.com/download/](https://antixlinux.com/download/)
- Fóruns da comunidade: [https://www.antixforum.com](https://www.antixforum.com)

---

## Próximos passos

Voltar à [visão geral das distribuições derivadas do Debian](/pt/variants/).
