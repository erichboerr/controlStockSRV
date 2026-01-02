## 🧪 Comandos de Migración

```bash
# Eliminar todas las migraciones
npx sequelize-cli db:migrate:undo:all

# Aplicar todas las migraciones
npx sequelize-cli db:migrate

# Crear nueva migración
npx sequelize-cli migration:generate --name nombre_tabla

# Crear nuevo modelo
npx sequelize-cli model:generate --name Nombre --attributes campo:tipo,...