#!/bin/bash
# Script de backup automático PostgreSQL
# Autor: Erich

# Variables
DB_NAME="controlstock"
DB_USER="erich"
DB_PASS="Locuras438"
DB_HOST="127.0.0.1"
DB_PORT="5432"
BACKUP_DIR="/home/erichboerr/controlStockV2/backup_DB"

# Fecha para el nombre del archivo
DATE=$(date +%F_%H-%M)

# Ejecutar backup
PGPASSWORD="$DB_PASS" pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -F c -b -v \
-f "$BACKUP_DIR/${DB_NAME}_$DATE.backup" $DB_NAME