#!/bin/bash

# Script de Backup/Restore PostgreSQL
# Autor: Erich Boerr
# Fecha: $(date +%F)

# Sentencia para hacer backup de la base de datos

PGPASSWORD="Locuras438" pg_dump -h 127.0.0.1 -p 5432 -U erich -F c -b -v -f /home/erichboerr/controlStockV2/documentacion/controlstock.backup controlstock

# Restaurar backup de la base de datos 

PGPASSWORD="Locuras438" pg_restore -h 127.0.0.1 -p 5432 -U erich -d controlstock -v /home/erichboerr/controlStockV2/documentacion/controlstock.backup

# - La base controlstock debe existir antes de restaurar. Si no existe, creala con:

createdb -h 127.0.0.1 -p 5432 -U erich controlstock

# Alternativa: restaurar en otra base

Si preferís no sobrescribir la actual, podés restaurar en una nueva base:

# Crear nueva base
createdb -h 127.0.0.1 -p 5432 -U erich controlstock_test

# Restaurar en nueva base
PGPASSWORD="Locuras438" pg_restore -h 127.0.0.1 -p 5432 -U erich -d controlstock_test -v /home/erichboerr/controlStockV2/documentacion/controlstock.backup


