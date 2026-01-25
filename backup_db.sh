#!/bin/bash
# Script de backup automático PostgreSQL con rotación
# Autor: Erich

DB_NAME="controlstock"
DB_USER="erich"
DB_PASS="Locuras438"
DB_HOST="127.0.0.1"
DB_PORT="5432"
BACKUP_DIR="/home/erichboerr/controlStockV2/backup_DB"
DATE=$(date +%F_%H-%M)

# Crear backup
PGPASSWORD="$DB_PASS" pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -F c -b -v \
-f "$BACKUP_DIR/${DB_NAME}_$DATE.backup" $DB_NAME

# Rotación: borrar backups más viejos de 7 días
find "$BACKUP_DIR" -type f -name "${DB_NAME}_*.backup" -mtime +7 -exec rm {} \;