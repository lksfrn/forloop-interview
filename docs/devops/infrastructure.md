# Infrastructure

## Servers

### Server 1 (Proxmox now - ESX)

-  HP ProLiant DL380 Gen9
-  Serial Number CZJ52208N1
-  iLO 172.21.10.203

#### Configuration

-  2x Intel(R) Xeon(R) CPU E5-2620 v3 @ 2.40GHz; 6 cores; 12 threads
-  128GB RAM (8x HPE SmartMemory 752369-081 DIMM DDR4 16384 MB 2133 MHz 1.2 V RDIMM)
-  1x HPE Ethernet 1Gb 4-port 331i Adapter
-  1x HP FlexFabric 10Gb 2-port 533FLR-T Adapter
-  1x Smart Array P440ar Controller
-  1x Smart Array P440 Controller

#### Storage

-  8x EG1200FDNJT HP V2 G8 G9 1.2TB 6G 10K 2.5 SAS
-  2x Samsung 1TB consumer SATA SSD

### Server 2 (Proxmox new, CEPH)

-  HP ProLiant DL380 Gen9
-  Serial Number CZJ51708Y9
-  iLO 172.21.10.212

#### Configuration

-  2x Intel(R) Xeon(R) CPU E5-2680 v4 @ 2.40GHz; 14 cores; 28 threads
-  512GB RAM (16x HPE SmartMemory 809083-091 DIMM DDR4 32768 MB 2400 MHz 1.2 V RDIMM)
-  1x HPE Ethernet 1Gb 4-port 331i Adapter
-  1x HP FlexFabric 10Gb 2-port 533FLR-T Adapter
-  1x Smart Array P840 Controller + HP 12G SAS Expander Card

#### Storage

-  8x Hitachi 0B28589 800GB SAS SSD
-  2x Samsung 860 DCT 1.92TB Datacenter SATA SSD

### Server 3 (vmWare - ESX2, damaged)

-  HP ProLiant DL380 Gen9
-  Serial Number CZJ7440805
-  iLO 172.21.10.207

#### Configuration

-  2x Intel(R) Xeon(R) CPU E5-2667 v4 @ 3.20GHz; 8 cores; 16 threads
-  128GB RAM (8x HPE SmartMemory 809081-081 DIMM DDR4 16384 MB 2400 MHz 1.2 V RDIMM)
-  1x HPE Ethernet 1Gb 4-port 331i Adapter
-  1x HP Ethernet 10Gb 2-port 530T Adapter
-  1x Smart Array P840ar Controller

#### Storage

-  12x EH000900JWCPN HP G8-G10 900GB 12G 15K 2.5 SAS
-  4x WDC 2TB RED NAS SATA SSD

### Server 4 (GiTy)

-  HP ProLiant DL380 Gen8
-  Serial Number CZ223100P6
-  iLO 217.64.15.42:26003

#### Configuration

-  2x Intel(R) Xeon(R) CPU E5-2680 @ 2.70GHz; 8 cores; 16 threads
-  256GB RAM (16x HPE SmartMemory 647653-081 DIMM DDR3 16384 MB 1333 MHz 1.35 V RDIMM)
-  1x HHP NC364T PCIe Quad Port Gigabit Server Adapter
-  1x HP Ethernet 10Gb 2-port 530 FLR-SFP+ Adapter
-  1x Smart Array P420i Controller

#### Storage

-  4x EG1200JEMDA HP G8-G10 1.2TB 12G 10K 2.5 SAS
-  2x Samsung 2TB consumer SATA SSD
-  2x Kingston 7.68TB Datacenter SATA SSD
