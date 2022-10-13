# LXC

## Tutorial

Vytvořme si kontejner na Nomad server. Nejdřív je potřeba stáhnout nějaký vzor `Datacenter/Proxmox/local -> content -> Templates`. Stáhněte Ubuntu 20.04. Poté vytvořte LXC kontejner pomocí `Datacenter/Proxmox (pravý klik) -> Create CT`. Hostname zvolte libovolný. Heslo zvolte libovolné, bude to heslo na uživatele `root`. Pro naše účely odklikněte `unprivileged` kontejner. Vložte váš veřejný SSH klíč. `Next`. V Template vyberte `Ubuntu 20.04`. `Root Disk`, `CPU` ponechme beze změny. Memory zvyšme na `4096`M. V tabu `Network` vyberte v poli `Bridge` možnost `Internal`. Změntě IPv4 na DHCP. Zbytek nastavení ponechte.

## How to create an LXC container

Nejjednoduší způsob jak vytvořit kontejner je přes Proxmoxí interface, `Datacenter/Proxmox -> Create CT`. Pokud kontejner nepotřebuje používat Docker, externí zařízení tak jsme hotovi. Důležité nastavení je "unprivileged", které nelze změnit po vytvoření kontejneru.

### Special permissions

Pokud kontejner potřebuje speciální oprávění, je potřeba zaškrtnout `privileged` při vytváření. Dále je potřeba specifikovat co přesně kontejneru bude dovoleno v souboru `/etc/pve/lxc/<NUM>.conf`.

Některé kontejner potřebují ještě `lxc.cap.drop: `, pokud potřebujete používat Docker. Každopádně kontejner musí mít featuru "nesting=1".

Přidejte řádky

```
lxc.cgroup.devices.allow: b 8:* rwm
lxc.mount.entry: /dev/sdb dev/sdb none bind,optional,create=file
lxc.mount.entry: /dev/sdb1 dev/sdb1 none bind,optional,create=file
```

Pro kontejner který bude mít přístup k disku

#### Help! My LXC doesn't have access to X

1. Pokud jde o nějaké linuxové zařízení(nacházejíc se v `/dev`) , napište do `<NUM>.conf` `lxc.cgroup.devices.allow: a *:* rwm`. Tento řádek dovolí kontejneru přístup ke všem zařízením rodiče
2. Pokud jde o apparmor tak odinstalujte apparmor na kontejneru
3. Na Proxmox hostu použijte příkaz `cgget /lxc/<NUM>`, takto zjistíte, jaké oprávění kontejner reálně má ( občas se proxmox rozhodne to neaktualizovat )

## Comment

Co jsou LXC? Jak se liší od Dockeru? - Pro všechny účely je Docker a LXC to samé, ale LXC umí méně.
Je ale důležité pochopit, že ani Docker, ani LXC, **nejsou virtuální stroje**. Jsou to procesy, které běží na vašem stroji, jenom kolem nich Docker, či LXC, postaví malou ohrádku.
Nastavení této ohrádky se řídí několika technologiemi: `cgroups` a `namespace` hlavně, dále různými možnostmi samotného Linuxu. Tato ohrádka udělá několik věcí, omezí přístup procesů k výpočetním zdrojům ( pomocí `cgroups`), omezí přístup procesů k dalším procesům (izoluje ho) ( pomocí `namespace`), oddělí ho od hlavního filesystému ( pomocí `namespace` ), oddělí jeho uživatele od uživatelů původního stroje (Toto je rozdíl u takzvaně `privileged` kontejnerů, ty nejsou uživatelsky oddělené od rodičovského stroje).
