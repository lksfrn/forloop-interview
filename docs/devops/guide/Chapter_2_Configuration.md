# LXC Configuration

## Tutorial

V Proxmoxu klikněme na nově vytvořený kontejner. Vložte jméno "root" a heslo jaké bylo zadáno při vytváření kontejneru.

Pro nainstalování Nomadu proveďte:

```bash
# Updatnout systém
apt -y update
apt -y upgrade
apt -y install neovim docker.io vim gnupg curl software-properties-common

# Uživatelský management
groupadd admin
useradd -m altais
usermod -aG admin altais
chsh -s /bin/bash altais

# Přidat SSH konfiguraci
echo 'Port 22122' >> /etc/ssh/sshd_config
echo 'PermitRootLogin no' >> /etc/ssh/sshd_config
echo 'PasswordAuthentication no' >> /etc/ssh/sshd_config
echo 'PubkeyAuthentication yes' >> /etc/ssh/sshd_config

# Spustit SSH
systemctl enable --now ssh

# Přidat hashicrop repozitáře a updatetnout a upgradenout balíčky
apt-get -y update
apt-get -y upgrade
apt-get -y install gnupg curl software-properties-common
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
apt-get -y update
apt-get -y install nomad consul waypoint vault docker.io neovim apt-file glusterfs-client
```

Přidejte stroji další network interface mířící na bridge Omnilinku, dejte mu IPv4: `<TODO přidat>/24`, žádnout gateway.

Zkopírujte

Potom můžete přistupovat k tomuto stroji přes

## Shell access

Ke kontejneru je možné přistupovat 3 způsoby - z Proxmox konzole, přes SSH, nebo přes Proxmox `root` účet a příkazu `lxc attach`.

## File access

Kopírování souborů je nejrychlejší přes SSH, specificky utilitu `scp`, či `sshfs`.

## Configuration

Kontejner lze konfigurovat jako klasický stroj, s omezeními, které by ohrozili rodičovský stroj. ( Jako například používání moc zdrojů, používání zařízení, na které by neměl mít přístup, používání kernelovských funkcí, na které je potřeba root v unprivilegovaném kontejneru )
