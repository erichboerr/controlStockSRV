# 📑 Guía de instalación y configuración de Ubuntu Server para ControlStock

## 1. No usar root directamente
- Lo ideal es crear un usuario normal con privilegios sudo.  
- Root se usa solo para tareas puntuales, pero no conviene trabajar siempre con él (por seguridad y buenas prácticas).

# Crear usuario (ejemplo: erich)
sudo adduser erich

# Darle permisos sudo
sudo usermod -aG sudo erich

# Luego cerrás sesión y entrás con tu usuario:
su - erich


## 2. Actualizar el sistema

sudo apt update && sudo apt upgrade -y

## 3. Configuración básica del servidor

### Firewall (UFW)

sudo apt install ufw -y
sudo ufw allow OpenSSH
sudo ufw enable

Esto asegura que podés entrar por SSH si lo necesitás.

### Zona horaria y localización
sudo timedatectl set-timezone America/Argentina/Buenos_Aires

### Paquetes esenciales
sudo apt install build-essential curl git -y

## 4. Asignar IP fija
Ubuntu Server usa **Netplan** para configurar la red.  
Editá el archivo de configuración (la ruta puede variar según la versión, normalmente `/etc/netplan/01-netcfg.yaml` o `/etc/netplan/00-installer-config.yaml`):

sudo nano /etc/netplan/01-netcfg.yaml

Ejemplo de configuración con IP fija `172.27.56.240`:

network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:   # nombre de tu interfaz, puede ser distinto (ver con ip a)
      dhcp4: no
      addresses:
        - 172.27.56.240/24
      gateway4: 172.27.56.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 1.1.1.1

Aplicar cambios:
sudo netplan apply

Verificar:

ip a
ping 8.8.8.8

---

## 5. Preparar entorno para Node.js y PM2

# Instalar Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2 global
sudo npm install -g pm2
pm2 install pm2-logrotate

## 6. Instalar Nginx
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

## 7. Crear estructura de proyectos
mkdir -p ~/controlstock/backend
mkdir -p ~/controlstock/frontend

## 8. Configuración del frontend con Nginx
cd ~/controlstockv2/frontend
npm install
npm run build

Crear archivo de configuración:
sudo nano /etc/nginx/sites-available/controlStockv2.conf

server {
    listen 80;
    server_name intranet.local;

    root /home/erich/controlstockv2/frontend/build;
    index index.html;

    # Frontend (SPA)
    location / {
        try_files $uri /index.html;
    }

    # Backend (todo lo que empiece con /api)
    location /api {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

Activar sitio:

sudo ln -s /etc/nginx/sites-available/controlStockv2.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

## 9. Correr PM2
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
