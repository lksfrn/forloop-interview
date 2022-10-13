# HashiCorp

## Consul

## Nomad

### Useful linky:

[Dokumentace .nomad souborů služeb](https://www.nomadproject.io/docs/job-specification)

-  [Dokumentace `job` (to co se spustí)](https://www.nomadproject.io/docs/job-specification/job)
-  [Dokumentace `service` (jak to bude zaregistrováno v Consulu)](https://www.nomadproject.io/docs/job-specification/service)

[Dokumentace .hcl nastavení Nomadu](https://www.nomadproject.io/docs/configuration)

### Co dělat když služba nestartuje?

`nomad job status <služba>`

Pod **Allocations** bude několik ID, vyberte nejnovější a

`nomad alloc status <ALLOC_ID>`

Toto vypíše logy jednotlivých tasků a jejich statusy, jakákoli chyba aplikace by se měla ukázat zde

### Kde hledat logy?

Nejjednodušší cesta je `nomad alloc logs <ALLOC_ID>`.

Sekundární cestou může být nalezení stroje na kterém služba běží a podívat se přímo na logy z Dockeru.

### Template nomad job

```hcl
# Nomad job template

job "<JOB NAME>" { # TODO: Change JOBNAME to a unique name
  datacenters = ["dc1"]
  type        = "service"

  group "<GROUP NAME>" { # TODO: Change GROUPNAME to a unique name
    count = 1

    network {
      port "http" {
        to = 80 # TODO: adjust port if neccessary
      }
    }

    service {
      name = "<SERVICE NAME>" # TODO: Change SERVICENAME to a unique name

      tags = [
        "traefik.enable=true",
        "traefik.http.routers.${NOMAD_GROUP_NAME}.rule=Host(`<DOMAIN>.swgeeks.cz`)", # TODO: change DOMAIN to a destination domain
        "traefik.http.routers.${NOMAD_GROUP_NAME}.tls=true",
        "traefik.http.routers.${NOMAD_GROUP_NAME}.tls.certresolver=myresolver",
      ]

      port = "http"

      check {
        name     = "alive"
        type     = "http"
        path     = "/"
        interval = "10s"
        timeout  = "3m"
      }
    }

    restart {
      attempts = 2
      interval = "30m"
      delay    = "15s"
      mode     = "fail"
    }

    task "<TASK NAME>" { # TODO: Change TASKNAME to describe the task ( 'api' or 'web' ... )
      driver = "docker"

      env { # TODO: Change environment variables for this task
      	USER = "user"
	PASSWORD = "pass"
      }

      resources {
        cpu    = 100 # mCPU
        memory = 512 # MB
      }

      config {
        image = "<DOCKER IMAGE>" # TODO: Change docker image

	ports = ["http"]

	# TODO: Delete mount or set 'source' and 'target'
        mount {
          type     = "bind"
          target   = "<CONTAINER MOUNT>"
          source   = "/data/<NFS MOUNT>"
          readonly = false

          bind_options {
            propagation = "rshared"
          }
        }
      }
    }


    # TODO: Delete secondary task or change it to your service's needs
    task "db" {
      driver = "docker"

      env {
        POSTGRES_DB = "database"
        POSTGRES_USER = "user"
        POSTGRES_PASSWORD = "pass"
      }

      resources {
        cpu    = 100
        #memory = 512
      }

      config {
        image = "postgres"
        #ports = ["http"]
      }
    }
  }
}

```

## Vault

[Interaktivní tutoriál](https://play.instruqt.com/hashicorp/tracks/nomad-integration-with-vault/challenges/verify-agents/notes?auto_start)

### Základy

-  Vault data se ukládají do Consulu
-  Vault server běží pouze na hashi-server-0
-  Vault se musí po zapnutí `Unseal`-nout, pomocí `vault operator unseal`
