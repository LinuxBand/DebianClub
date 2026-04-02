---
title: Gestão de Segurança
description: Aprenda a gerenciar a segurança do sistema Debian, incluindo controle de acesso de usuários, configuração de firewall, atualizações automáticas e detecção de intrusões.
---

# Gestão de Segurança

Garantir a segurança do sistema Debian é uma tarefa central na administração de sistemas. Este guia apresentará várias áreas-chave para ajudá-lo a fortalecer seu sistema e proteger contra ameaças potenciais.

## 🔐 Usuários e Controle de Acesso

Restringir o acesso ao sistema é a primeira linha de defesa da segurança.

### Impor Políticas de Senhas Fortes

O módulo `libpam-pwquality` pode forçar os usuários a criar senhas mais seguras.

1.  **Instalar o módulo**:
    ```bash
    sudo apt update
    sudo apt install libpam-pwquality
    ```

2.  **Configurar a política**:
    Edite o arquivo `/etc/security/pwquality.conf` para definir as regras de senha.
    ```ini
    # Configuração de exemplo:
    minlen = 10                  # Comprimento mínimo de 10
    dcredit = -1                 # Pelo menos 1 dígito
    ucredit = -1                 # Pelo menos 1 letra maiúscula
    lcredit = -1                 # Pelo menos 1 letra minúscula
    ocredit = -1                 # Pelo menos 1 caractere especial
    difok = 3                    # Pelo menos 3 caracteres diferentes da senha antiga
    ```

### Reforçar a Segurança do SSH

A maneira mais comum de acessar um servidor remotamente é via SSH. Aqui estão algumas recomendações para reforçar a segurança:

1.  **Editar o arquivo de configuração do SSH**:
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

2.  **Configurações recomendadas**:
    - **Desativar login root**: `PermitRootLogin no`
    - **Desativar autenticação por senha (recomenda-se usar chaves)**: `PasswordAuthentication no`
    - **Ativar autenticação por chave pública**: `PubkeyAuthentication yes`
    - **Alterar a porta padrão (opcional)**: `Port 2222`

3.  **Reiniciar o serviço SSH**:
    ```bash
    sudo systemctl restart sshd
    ```

## 🔥 Configuração de Firewall (UFW)

O Debian não vem com um firewall ativado por padrão. O `UFW` (Uncomplicated Firewall) é uma ferramenta de front-end amigável. No Debian 13, o UFW utiliza a estrutura `nftables` (compatível com a sintaxe antiga do `iptables`).

1.  **Instalar o UFW**:
    ```bash
    sudo apt install ufw
    ```

2.  **Configurar regras básicas**:
    ```bash
    sudo ufw default deny incoming   # Negar todas as conexões de entrada
    sudo ufw default allow outgoing  # Permitir todas as conexões de saída
    sudo ufw allow ssh               # Permitir conexões SSH (ou a porta que você alterou)
    sudo ufw allow http              # Se for um servidor web, permitir HTTP
    sudo ufw allow https             # Permitir HTTPS
    ```

3.  **Ativar o UFW**:
    ```bash
    sudo ufw enable
    ```
    O sistema avisará que isso pode interromper conexões SSH existentes; confirme.

4.  **Verificar o status**:
    ```bash
    sudo ufw status verbose
    ```

## 🔄 Atualizações de Segurança Automáticas

Aplicar patches de segurança em tempo hábil é crucial. O `unattended-upgrades` pode instalar atualizações de segurança automaticamente.

1.  **Instalar**:
    ```bash
    sudo apt install unattended-upgrades
    ```

2.  **Ativar**:
    Execute o assistente de configuração, que criará um arquivo de configuração básico.
    ```bash
    sudo dpkg-reconfigure -plow unattended-upgrades
    ```
    Selecione "Sim" na caixa de diálogo que aparecer.

3.  **Ajustar a configuração (opcional)**:
    Você pode editar o arquivo `/etc/apt/apt.conf.d/50unattended-upgrades` para personalizar o comportamento das atualizações, como ativar a reinicialização automática.

## 🛡️ Proteção contra Intrusões (Fail2Ban)

O `Fail2Ban` monitora arquivos de log e atualiza automaticamente as regras do firewall para bloquear endereços IP com base em comportamentos suspeitos (como múltiplas tentativas de login falhas).

1.  **Instalar o Fail2Ban**:
    ```bash
    sudo apt install fail2ban
    ```

2.  **Criar arquivo de configuração local**:
    Não modifique diretamente os arquivos `.conf`. Em vez disso, crie um arquivo `.local` para sobrescrever as configurações.
    ```bash
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
    sudo nano /etc/fail2ban/jail.local
    ```

3.  **Configurar proteção SSH**:
    No arquivo `jail.local`, encontre a seção `[sshd]` e certifique-se de que `enabled = true`. Você pode ajustar `maxretry` (número máximo de tentativas) e `bantime` (duração do bloqueio).
    ```ini
    [sshd]
    enabled = true
    port    = ssh
    maxretry = 3
    bantime = 3600  # Bloquear por 1 hora
    ```

4.  **Reiniciar o serviço**:
    ```bash
    sudo systemctl restart fail2ban
    ```

## 📝 Gerenciamento e Auditoria de Logs

Verificar regularmente os logs do sistema é fundamental para detectar atividades anormais.

- **Usar `journalctl` para visualizar logs**:
  ```bash
  # Ver todos os logs (do mais antigo ao mais recente)
  journalctl

  # Monitorar logs em tempo real
  journalctl -f

  # Ver logs de um serviço específico, por exemplo, sshd
  journalctl -u sshd.service

  # Ver logs do kernel
  journalctl -k
  ```