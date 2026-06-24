---
title: "Configuração de Placa Gráfica Dupla NVIDIA Optimus"
description: "Configurar placa gráfica híbrida NVIDIA Optimus em laptops Debian 13, instalar drivers e usar PRIME Render Offload"
---

# Configuração de Placa Gráfica Dupla NVIDIA Optimus

Muitos laptops possuem simultaneamente uma **placa gráfica integrada Intel/AMD** e uma **placa gráfica dedicada NVIDIA**. A NVIDIA chama essa tecnologia de **Optimus**. No uso diário, a placa integrada, que economiza energia, gerencia a tela; quando é necessário alto desempenho (jogos, renderização, CUDA), a placa dedicada é ativada. Este artigo explica como instalar corretamente os drivers e usar PRIME Render Offload no Debian 13.

## Primeiro Passo: Verificar o Hardware

```bash
# Lista todas as placas gráficas, confirmando a existência de Intel/AMD e NVIDIA
lspci | grep -E "VGA|3D"
```

Se duas placas forem exibidas (ex.: uma Intel e uma NVIDIA), então a arquitetura é Optimus híbrida.

## Segundo Passo: Ativar os Repositórios non-free-firmware e non-free

O driver proprietário da NVIDIA está no componente `non-free`. Verifique se os repositórios já incluem `non-free` e `non-free-firmware` (a sintaxe deb822 padrão do Debian 13 está descrita em [Formato de fonte deb822](/pt/administration/deb822)):

```text
Components: main contrib non-free non-free-firmware
```

Após modificar, execute:

```bash
sudo apt update
```

## Terceiro Passo: Instalar o Driver NVIDIA

Os repositórios oficiais do Debian já contêm drivers NVIDIA testados. **Prefira os pacotes oficiais** em vez do instalador `.run` do site da NVIDIA:

```bash
# Instalar os cabeçalhos do kernel (necessários para compilar os módulos do driver)
sudo apt install linux-headers-amd64

# Instalar o driver NVIDIA e suporte a PRIME
sudo apt install nvidia-driver firmware-misc-nonfree

# Reiniciar para carregar os drivers
sudo reboot
```

O processo de instalação compila automaticamente os módulos para o kernel atual via DKMS. O pacote `nvidia-driver` do Debian já vem configurado para PRIME – ao iniciar, o desktop é gerenciado pela placa integrada, e a placa dedicada é ativada sob demanda – exatamente o comportamento desejado para laptops que economizam bateria.

## Quarto Passo: Verificar

```bash
# Verificar o status da placa dedicada (se o driver estiver funcionando, mostrará informações da GPU)
nvidia-smi

# Confirmar o renderizador OpenGL atual (padrão deve ser a placa integrada Intel/AMD)
glxinfo | grep "OpenGL renderer"
```

`glxinfo` faz parte do pacote `mesa-utils` (`sudo apt install mesa-utils`).

## Quinto Passo: Executar Programas com a Placa Dedicada Sob Demanda (PRIME Render Offload)

No dia a dia, use a placa integrada para economizar energia; quando precisar, delegue a renderização de **um único programa** para a placa dedicada. Isso é chamado de **PRIME Render Offload**:

```bash
# Executar um programa com a placa dedicada
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia <nome_do_programa>

# Exemplo: executar glxgears (teste) com a placa dedicada
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia glxgears
```

Para facilitar, defina um alias no `~/.bashrc`:

```bash
alias nv-run='__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia'
# Depois: nv-run blender
```

Os ambientes de desktop (GNOME/KDE) geralmente oferecem a opção "Executar com placa gráfica dedicada" no menu de contexto dos aplicativos – por baixo dos panos, é exatamente o mecanismo acima.

## CUDA / Uso Computacional

Se o objetivo for apenas executar cálculos CUDA (ex.: inferência de IA) e não renderização gráfica, após instalar o driver, o simples fato de o `nvidia-smi` reconhecer a placa dedicada já é suficiente – não é necessário PRIME Offload. Para instalar o kit de ferramentas CUDA:

```bash
sudo apt install nvidia-cuda-toolkit
```

## Wayland e Problemas Comuns

- **Wayland**: Drivers NVIDIA recentes já possuem bom suporte ao Wayland. Se encontrar artefatos visuais ou impossibilidade de login, troque para a sessão **Xorg** na tela de login para depuração.
- **Tela preta / não consegue entrar no desktop**: No GRUB, adicione temporariamente `nomodeset` ao final da linha do `linux` para entrar em um desktop de baixa resolução e verifique a instalação do driver.
- **`nvidia-smi` exibe "No devices found"**: Geralmente indica que o driver não foi compilado corretamente para o kernel atual. Verifique se `linux-headers-amd64` está instalado e execute novamente `sudo apt install --reinstall nvidia-driver`.

## Resumo

- Ativar a fonte `non-free` → instalar `linux-headers-amd64` + `nvidia-driver` → reiniciar.
- A placa integrada é padrão para economia de energia. Para usar a placa dedicada sob demanda, utilize `__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia`.
- Prefira os pacotes oficiais do Debian; evite o instalador `.run` do site da NVIDIA.

Leitura adicional: [Compatibilidade de Hardware](/en/basics/hardware-compatibility) · [Formato de fonte deb822](/pt/administration/deb822)
