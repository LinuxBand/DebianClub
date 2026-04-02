---
title: Comparação de versões
description: Comparação detalhada e guia de seleção para Debian 11, 12 e 13
---

# Guia de comparação de versões do Debian

::: info Sobre esta página
Esta página fornece uma comparação detalhada das principais diferenças entre o Debian 13 (Trixie), Debian 12 (Bookworm) e Debian 11 (Bullseye) para ajudá-lo a escolher a versão mais adequada.
:::

## 📋 Visão geral das versões

| Informações | Debian 13 (Trixie) | Debian 12 (Bookworm) | Debian 11 (Bullseye) |
|---|---|---|---|
| **Status da versão** | Estável atual | Estável anterior | LTS |
| **Data de lançamento** | agosto 2025 | junho 2023 | agosto 2021 |
| **Último lançamento pontual** | 13.4 (2026-03-08) | 12.13 (2026-01-10) | — |
| **Fim do suporte** | ~2030 (incl. LTS) | ~junho 2028 | junho 2026 |
| **Kernel Linux** | 6.12 | 6.1 LTS | 5.10 LTS |
| **Versão do GNOME** | 48 | 43 | 3.38 |

## ⚙️ Componentes principais e ferramentas de desenvolvimento

| Software/Ferramenta | Trixie (Debian 13) | Bookworm (Debian 12) | Bullseye (Debian 11) |
|---|---|---|---|
| **GCC** | 15.x | 12.2 | 10.2 |
| **LLVM/Clang** | 16+ | 14.0 | 11.0 |
| **Python** | 3.12 | 3.11 | 3.9 |
| **Node.js** | 20.x | 18.13 | 12.22 |
| **Go** | 1.21+ | 1.19 | 1.15 |
| **Rust** | 1.70+ | 1.63 | 1.48 |
| **PHP** | 8.3 | 8.2 | 7.4 |

## 🎯 Guia de seleção de versões

### Por caso de uso

- **🖥️ Usuário de desktop**:
  - **Recomendado**: Escolha o **Debian 13 (Trixie)**. É a versão estável atual com os mais recentes ambientes de desktop GNOME 48 / KDE Plasma 6.3.
  - **Opção conservadora**: O **Debian 12 (Bookworm)** como oldstable ainda é mantido, adequado para usuários que preferem não migrar imediatamente.

- **💻 Desenvolvedor**:
  - **Desenvolvimento de aplicações modernas**: Escolha o **Debian 13 (Trixie)**. Inclui GCC 14.2, Python 3.13, PHP 8.3 e as cadeias de ferramentas mais recentes.
  - **Compatibilidade em primeiro lugar**: O **Debian 12 (Bookworm)** ainda recebe atualizações de segurança, adequado para projetos que exigem um ambiente oldstable.

- **🖧 Administrador de servidores**:
  - **Novos deployments**: Recomenda-se fortemente o **Debian 13 (Trixie)**. Como versão estável atual, possui os patches de segurança mais recentes e um ciclo de suporte completo.
  - **Manutenção de sistemas antigos**: O **Debian 12 (Bookworm)** como oldstable ainda é mantido (até ~2028). O suporte LTS do **Debian 11 (Bullseye)** termina em junho de 2026 — planeje sua atualização em breve.

### Caminho de atualização

- **Do Debian 11**: Atualize primeiro para o **Debian 12** e depois para o **Debian 13**. Atualizações entre versões devem ser feitas passo a passo.
- **Do Debian 12**: Recomenda-se atualizar para o **Debian 13**. Com vários lançamentos pontuais (13.4), está bem consolidado.

---

**Quer consultar uma versão específica de software?** [Visite packages.debian.org](https://packages.debian.org/) | [Ver guia de instalação →](/pt/basics/installation)
