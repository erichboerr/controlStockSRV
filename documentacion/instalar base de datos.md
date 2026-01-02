# Instalación de PostgreSQL en Ubuntu Server
1. Instalar paquetes
sudo apt update
sudo apt install postgresql postgresql-contrib -y

(Esto instala el servidor y utilidades adicionales.)

2. Verificar servicio
sudo systemctl status postgresql

Debe aparecer como active (running).
Si no, lo levantás con:
sudo systemctl start postgresql
sudo systemctl enable postgresql

3. Crear usuario y base de datos
Por defecto, PostgreSQL crea un usuario postgres. Entramos al shell:
sudo -u postgres psql

Dentro del prompt psql:
-- Crear usuario para tu proyecto
CREATE USER erich WITH PASSWORD 'tu_password_segura';

-- Crear base de datos para controlStock
CREATE DATABASE controlstock OWNER erich;

-- Dar privilegios
GRANT ALL PRIVILEGES ON DATABASE controlstock TO erich;

Salir:
\q

4. Configuración de acceso
Editar archivo de configuración:
sudo nano /etc/postgresql/16/main/pg_hba.conf
(la carpeta 16 depende de la versión instalada).
Agregar línea para permitir conexiones locales con contraseña:
host    all             all             127.0.0.1/32            md5


Reiniciar servicio:
sudo systemctl restart postgresql

5. Probar conexión
Desde tu usuario normal:
psql -h 127.0.0.1 -U erich -d controlstock
Te pedirá la contraseña que definiste.

🔗 Integración con tu backend
En tu backend/.env:
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=controlstock
DB_USER=erich
DB_PASS=tu_password_segura


Y Sequelize lo toma desde ahí.

