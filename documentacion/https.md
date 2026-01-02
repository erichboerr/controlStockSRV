# 📑 Configuración HTTPS en Nginx (self‑signed)

## 1. Generar certificado y clave
En el Ubuntu Server:

sudo mkdir -p /etc/ssl/intranet
cd /etc/ssl/intranet

# Generar certificado autofirmado válido por 365 días
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout intranet.local.key \
  -out intranet.local.crt


👉 Durante el proceso, cuando te pida *Common Name (CN)* poné:  

intranet.local

## 2. Configurar Nginx con HTTPS
Editar tu archivo de sitio:

sudo nano /etc/nginx/sites-available/controlStock.conf

server {
    listen 80;
    server_name intranet.local;

    # Redirigir todo HTTP a HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name intranet.local;

    ssl_certificate /etc/ssl/intranet/intranet.local.crt;
    ssl_certificate_key /etc/ssl/intranet/intranet.local.key;

    root /home/erich/controlstock/frontend/build;
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

## 3. Activar sitio y reiniciar Nginx
sudo ln -s /etc/nginx/sites-available/controlStock.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

## 4. Configurar clientes (Windows)
- Copiar el certificado `intranet.local.crt` desde el Ubuntu Server al equipo Windows (ej. Escritorio).
- Editar el archivo `C:\Windows\System32\drivers\etc\hosts` y agregar:
  172.27.56.240   intranet.local
- Importar el certificado en el Administrador de certificados:
  - Win + R → `mmc`
  - Archivo → Agregar o quitar complemento → Certificados → Cuenta de equipo → Equipo local
  - Expandir **Certificados (Equipo local)** → **Entidades emisoras raíz de confianza** → **Certificados**
  - Click derecho → Importar → seleccionar `intranet.local.crt`
- Abrir navegador y probar:
  https://intranet.local
  https://intranet.local/api/auth/login

## 🚀 Resultado
- Los clientes acceden a:  
 
  https://intranet.local
  
- El frontend se sirve por HTTPS.  
- El backend responde en:  
  
  https://intranet.local/api/...
  

# 📑 Importar certificado en Windows

## 1. Copiar el certificado al cliente
- Desde tu Ubuntu Server, copiá el archivo `intranet.local.crt` al equipo Windows (por ejemplo al Escritorio).  
- Podés usar `scp`, compartirlo por red o un pendrive.

## 2. Abrir el Administrador de certificados
- Presioná `Win + R` → escribí `mmc` → Enter.  
- En la ventana de consola, menú **Archivo → Agregar o quitar complemento**.  
- Seleccioná **Certificados** → **Agregar**.  
- Elegí **Cuenta de equipo** → **Siguiente** → **Equipo local** → **Finalizar**.  
- Aceptar.

## 3. Importar el certificado
- En el panel izquierdo, expandí **Certificados (Equipo local)** → **Entidades emisoras raíz de confianza** → **Certificados**.  
- Click derecho → **Todas las tareas → Importar**.  
- Seleccioná tu archivo `intranet.local.crt`.  
- Finalizá el asistente.

## 4. Verificar
- Abrí un navegador en Windows.  
- Entrá a:  
  https://intranet.local
  
- Si tu `/etc/hosts` apunta a `172.27.56.240 intranet.local`, debería cargar el frontend sin advertencias de seguridad.  
- El backend responde en:
  
  https://intranet.local/api/...
  
## 🚀 Checklist rápido
1. Copiar `intranet.local.crt` a Windows.  
2. Importarlo en **Entidades emisoras raíz de confianza**.  
3. Configurar `hosts` en Windows:     
   172.27.56.240   intranet.local   
4. Probar acceso en navegador → debe abrir sin alertas.

👉 Con esto tu intranet queda **segura y confiable** en Windows.  

