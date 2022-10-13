# Docker

Dale je treba mit [Docker](https://www.docker.com/) vcetne [Docker Compose](https://docs.docker.com/compose/). Jedna se zpusob virtualizace. Diky tomu muzeme zajistit, abychom meli vsichni co nejpodobnejsi setup. Zaroven to velmi zjednodusuje praci s databazi.

## Post install

After Linux installation, you should run:

```bash
sudo systemctl enable --now docker # autostart Docker
sudo usermod -a -G docker $USER # use it as an regular user
```

Then restart computer. Check that everything works:

```bash
docker info
```

## Glossary

**Image** je poklad (formicka) pro container. Ve svete OOP se jedna o deklaraci tridy, rekneme. Image si typicky stahnete jednou.

**Container** je instance image (v OOP instance tridy). Containery vytvarite a nicite v prubehu vcelku bezne. Jedna se o jednoucelove nezavisle mini operacni systemy.

**Volume** se stara o napojeni dat z hostu do kontejneru. Slozka/soubor pak mohou existovat v obou mistech. Jsou dva typy, _Volume_ je pro vytvoreni globalni slozky nekde hluboko v `/etc`, ke ktere pristupujete pomoci jmena, ne cesty, a pak je tu _Bind Mount_, ktery zas mapuje slozku z file systemu skrz nejcasteji relativni cestu.

**Tag** je nazev image. Hrube receno ma tag format `<repository>/<user>/<name>:<version>`. Docker specifikuje pouze `<name>:<version>`, zbytek je nepovinny. Pokud se ani `<version>` nevyplni, pouzije se defaultni `latest`. Nekdy se v `<version>` prida jeste dodatek, ktery dale specifikuje verzi. Napr. `node:14-alpine` znamena, ze pouzivame Node ve verzi 14 postaveny na Alpine Linuxu.

## Docker Hub

[**Docker Hub**](https://hub.docker.com/) poskytuje velke mnostvi at uz oficialnich ci komunitnich imagu. Ty maji vetsinou nekolik tagu.

**Alpine** (`alpine`) je velice minimalisticky Linux a pouziva se predevsim na produkci. Nema prakticky zadne nastroje.

**Stretch** (`stretch`) je osekana verze Debianu. Hodi se pro vyvoj, protoze obsahuje vetsinu nastroju.

## Commands

::: warning
Prepinac `-f path/to/my-docker-compose.yml` se musi pouzit pro **kazdy** nasledujici prikaz, pokud neni pritomen `docker-compose.yml` (tj. Docker hleda configuracni soubor ve stejne slozce a vsech nadrazenych, odkud se vola prikaz). Poradi prepinacu a commandu je dulezite.

```bash
docker-compose -f path/to/my-docker-compose.yml <cmd>
```

:::

Zakladni prikaz rozbehne vsechny sluzby dle `docker-compose.yml` S prepinacem `-d` (az za `up`) se sluzby rozbehnou na pozadi, tj. muzes zavrit terminal:

```bash
docker-compose up
docker-compose up -d
```

Nasledujici prikaz stopne a smaze vsechny sluzby. Hodi se treba pro reset databaze:

```bash
docker-compose down
```

Pokud chces jen stopnout bezici sluby, ale data v kontejnerech (tedy samotne kontejnery) neodstranit, pouzij tohle. Pro opetovne nastartovani zas to druhe:

```bash
docker-compose stop
docker-compose start
```

Nejnovejsi image ziskas pomoci:

```bash
docker-compose pull
```

Nekdy se hodi vytvorit konzoli primo v kontejneru a problemy odstranit rucne treba takto (misto `bash` lze dat jen `sh`):

```bash
docker-compose exec <service> bash
```

::: warning
Casto se bude stavat, ze nektery z portu je jiz v pocitaci zabrany nebo ze ho pouziva jiny kontejner bezici na pozadi. Prikaz, ktery zabije a smaze vsechny kontejnery je `docker rm -f $(docker ps -a -q)`. Je to nasilne, pouzivej s rozvahou.
:::
