# Storage

## How `@horak` solved broken HP SSA

https://gist.github.com/mrpeardotnet/a9ce41da99936c0175600f484fa20d03

Toto by melo jit pouzit na vsech nasich serverech...

```bash
echo "deb http://downloads.linux.hpe.com/SDR/repo/mcp stretch/current non-free" > /etc/apt/sources.list.d/hp-mcp.list

wget -q -O - http://downloads.linux.hpe.com/SDR/hpPublicKey1024.pub | apt-key add -
wget -q -O - http://downloads.linux.hpe.com/SDR/hpPublicKey2048.pub | apt-key add -
wget -q -O - http://downloads.linux.hpe.com/SDR/hpPublicKey2048_key1.pub | apt-key add -
wget -q -O - http://downloads.linux.hpe.com/SDR/hpePublicKey2048_key1.pub | apt-key add -

apt update
apt install ssacli
```

## Ceph/GlusterFS/ZFS/NFS
