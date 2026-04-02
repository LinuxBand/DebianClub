---
title: Requisitos do Sistema
description: Guia de verificação de requisitos de hardware e compatibilidade antes da instalação do Debian 13
---

# Verificação de Requisitos do Sistema

Antes de instalar o Debian 13, é muito importante garantir que seu computador atenda aos requisitos básicos. Esta página ajudará você a verificar a compatibilidade de hardware e os requisitos do sistema.

## 🖥️ Requisitos de Hardware

### Requisitos Mínimos do Sistema

| Componente | Requisito Mínimo | Explicação |
|------|----------|------|
| **Processador** | 1 GHz single-core | Arquitetura amd64 (recomendada) ou arm64 |
| **Memória** | 2 GB RAM | Ambientes de desktop exigem mais memória |
| **Armazenamento** | 25 GB | Inclui sistema básico e aplicativos |
| **Placa de Vídeo** | Suporte a 1024×768 | Placa integrada é suficiente |
| **Rede** | Cabo ou sem fio | Configurar fontes de software após a instalação |

### Configuração Recomendada

| Componente | Configuração Recomendada | Vantagem |
|------|----------|------|
| **Processador** | Dual-core 2 GHz+ | Multitarefa mais fluida |
| **Memória** | 8 GB RAM+ | Suporte para execução simultânea de vários aplicativos |
| **Armazenamento** | 50 GB SSD | Inicialização e resposta mais rápidas |
| **Placa de Vídeo** | Placa de vídeo dedicada | Suporte a aceleração por hardware e jogos |

::: tip 💡 Dica para Iniciantes
Se você não tem certeza sobre a configuração do seu hardware, pode pressionar <span class="kbd">Win + R</span> no Windows, digitar `dxdiag` para visualizar as informações do sistema.
:::

## 🔍 Verificação de Compatibilidade de Hardware

### 1. Verificação da Arquitetura do Processador

O Debian 13 suporta várias arquiteturas de processador:

#### Arquiteturas Suportadas
- **amd64** (64-bit) - Processadores Intel/AMD 64-bit (recomendação principal)
- **arm64** - Processadores ARM 64-bit (novos Mac, Raspberry Pi 4, etc.)
- **armhf** - Processadores ARM 32-bit (Raspberry Pi antigos, etc.)
- **riscv64** - Processadores RISC-V 64-bit (🆕 Novo no Debian 13)
- **ppc64el** - Processadores IBM Power little-endian 64-bit
- **s390x** - Processadores IBM z/Architecture 64-bit

::: warning Status do suporte i386 (32-bit)
O Debian 13 (Trixie) **não oferece mais i386 como uma arquitetura de instalação regular**. Não há kernel de instalação oficial i386, nem Debian Installer para i386. O propósito da manutenção do i386 no Debian é: executar aplicativos legados de 32 bits no modo multiarquitetura (multiarch) em sistemas amd64, e não instalar um sistema i386 completo de forma independente. Se seu hardware suporta apenas 32 bits, consulte distribuições como antiX Linux que ainda mantêm versões de instalação i386.
:::

#### Como Verificar Sua Arquitetura

**No Windows:**
```cmd
# Pressione Win + R, digite cmd, e execute:
wmic computersystem get systemtype
```

**Em um sistema Linux existente:**
```bash
# Verificar a arquitetura do processador
uname -m
```

### 2. Verificação de Memória

#### Requisitos de Memória para Diferentes Ambientes de Desktop

| Ambiente de Desktop | Memória Mínima | Memória Recomendada | Características |
|----------|----------|----------|------|
| **GNOME** | 4 GB | 8 GB | Moderno, rico em recursos |
| **KDE Plasma** | 4 GB | 8 GB | Altamente personalizável |
| **Xfce** | 2 GB | 4 GB | Leve, ideal para máquinas antigas |
| **LXDE** | 1 GB | 2 GB | Extremamente leve e minimalista |
| **Linha de Comando** | 512 MB | 1 GB | Apenas interface de texto |

::: warning ⚠️ Impacto da Memória Insuficiente
Se a memória for insuficiente, o sistema pode usar frequentemente o espaço de swap, causando uma queda severa no desempenho.
:::

### 3. Verificação de Espaço de Armazenamento

#### Sugestão de Alocação de Espaço em Disco

```bash
# Esquema de partição recomendado (50GB de espaço total)
/          # Partição raiz: 25 GB
/home      # Diretório do usuário: 20 GB  
swap       # Partição swap: 4 GB (igual ao tamanho da memória)
/boot/efi  # Partição EFI: 1 GB (sistemas UEFI)
```

#### Necessidades de Espaço para Diferentes Usos

| Uso | Espaço Mínimo | Espaço Recomendado | Explicação |
|------|----------|----------|------|
| **Sistema Básico** | 10 GB | 20 GB | Apenas o sistema central |
| **Uso Desktop** | 25 GB | 50 GB | Inclui software de escritório |
| **Ambiente de Desenvolvimento** | 50 GB | 100 GB | Inclui ferramentas de desenvolvimento |
| **Trabalho Multimídia** | 100 GB | 500 GB+ | Edição de vídeo, etc. |

## 🔧 Compatibilidade de Hardware

### Compatibilidade de Placas de Vídeo

#### Placas NVIDIA
```bash
# Suporte do Debian para NVIDIA
✅ Driver de código aberto: nouveau (padrão)
✅ Driver oficial: nvidia-driver (requer instalação adicional)
⚠️  Modelos muito antigos podem ter suporte limitado
```

#### Placas AMD
```bash
# Suporte para placas AMD
✅ Driver de código aberto: radeon/amdgpu (padrão)
✅ Driver oficial: amdgpu-pro (opcional)
✅ A maioria dos modelos tem bom suporte
```

#### Placas de Vídeo Integradas Intel
```bash
# Suporte para placas Intel
✅ Driver de código aberto: i915 (padrão)
✅ Suporte excelente, funciona imediatamente
✅ Bom suporte para aceleração por hardware
```

### Compatibilidade de Dispositivos de Rede

#### Chipsets Wi-Fi
A maioria dos chips Wi-Fi modernos tem bom suporte, mas alguns requerem firmware não-livre:

| Fabricante | Situação do Suporte | Observação |
|------|----------|------|
| **Intel** | ✅ Excelente | Requer pacote de firmware |
| **Broadcom** | ⚠️ Razoável | Alguns modelos requerem driver proprietário |
| **Realtek** | ✅ Bom | A maioria dos modelos é suportada |
| **Atheros** | ✅ Excelente | Bom suporte por drivers de código aberto |

#### Rede Cabo
Quase todas as interfaces de rede cabeada têm suporte completo.

## 📋 Lista de Verificação Pré-Instalação

### Itens Obrigatórios

- [ ] **Processador**: Confirmar arquitetura (amd64/arm64, para PCs modernos recomenda-se amd64)
- [ ] **Memória**: Pelo menos 2 GB, recomendado 8 GB+
- [ ] **Armazenamento**: Pelo menos 25 GB de espaço livre
- [ ] **Rede**: Confirmar que a conexão de rede está disponível
- [ ] **Modo de Inicialização**: Confirmar UEFI ou Legacy BIOS

### Verificações Recomendadas

- [ ] **Placa de Vídeo**: Verificar modelo, preparar driver correspondente
- [ ] **Wi-Fi**: Anotar o modelo do chipset
- [ ] **Impressora**: Verificar marca e modelo
- [ ] **Bluetooth**: Confirmar se é necessário
- [ ] **Placa de Som**: Geralmente suportada

## 🔬 Coleta de Informações do Sistema

### Coletar Informações de Hardware

Se você deseja informações detalhadas sobre o hardware, pode usar os seguintes métodos:

#### No Windows
1. Pressione <span class="kbd">Win + R</span>
2. Digite `msinfo32` e pressione Enter
3. Visualize as informações do "Resumo do Sistema"

#### Usando o Live USB
```bash
# Execute após inicializar o Debian Live USB
sudo lshw -short          # Visão geral do hardware
lscpu                     # Informações da CPU
free -h                   # Informações de memória
lsblk                     # Dispositivos de armazenamento
lspci                     # Dispositivos PCI
lsusb                     # Dispositivos USB
```

## ⚡ Sugestões de Otimização de Desempenho

### SSD vs HDD

| Tipo de Armazenamento | Vantagem | Desvantagem | Cenário de Uso |
|----------|------|------|----------|
| **SSD** | Rápido, silencioso | Preço mais alto | Recomendado como disco do sistema |
| **HDD** | Preço baixo, grande capacidade | Lento, faz ruído | Adequado para armazenar arquivos |

### Configuração Recomendada com Dois Discos
```bash
SSD (120GB+) → Sistema + Programas
HDD (1TB+)   → Documentos + Arquivos de mídia
```

## 🆘 Resolução de Problemas de Compatibilidade

### Problemas Comuns

#### Wi-Fi Não Funciona
**Solução:**
1. Verificar se é necessário firmware não-livre
2. Usar rede cabeada para instalar o pacote de firmware
3. Considerar usar um adaptador Wi-Fi USB

#### Problemas com Driver de Placa de Vídeo
**Solução:**
1. Primeiro usar o driver de código aberto
2. Após o sistema estar estável, instalar o driver proprietário
3. Preparar uma placa de vídeo integrada como alternativa

#### Sem Saída de Áudio
**Solução:**
1. Verificar a configuração do ALSA
2. Instalar o PulseAudio
3. Atualizar o kernel pode resolver

## Próximos Passos

Após concluir a verificação de hardware, você pode continuar:

1. [Experimentar em Máquina Virtual](/basics/virtual-machine) - Teste o Debian sem riscos em uma máquina virtual primeiro
2. [Baixar a Imagem do Debian 13](/basics/download) - Obter os arquivos de instalação
3. [Criar Mídia de Inicialização](/basics/bootable-media) - Preparar a mídia de instalação
4. [Iniciar o Processo de Instalação](/basics/installation) - Instalar o sistema oficialmente

---

**Compatibilidade de hardware confirmada?** [Comece a Baixar o Debian 13 →](/basics/download)