🚀 Guía de Deploy con PM2

Este documento resume los pasos necesarios para desplegar la aplicación en el servidor y asegurar que PM2 mantenga los procesos activos incluso después de un reinicio.

1. Actualizar el código desde el repositorio

git pull origin main
npm install

2. Reiniciar procesos con PM2

pm2 restart controlStock-Backend


Si usás un archivo de configuración:

pm2 restart ecosystem.config.cjs

Verificar estado:

pm2 list

3. Guardar estado de procesos

pm2 save

Esto asegura que la lista de procesos quede registrada en ~/.pm2/dump.pm2.

4. Configurar arranque automático

Generar script de inicio con systemd:

pm2 startup systemd

El comando mostrará una línea que debe ejecutarse con sudo. Ejemplo:

sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u erich --hp /home/erich

5. Verificar servicio

systemctl status pm2-erich

Debe aparecer como active (running).

6. Probar reinicio del servidor

sudo reboot

Al volver a iniciar sesión:

pm2 list

Tus procesos deben aparecer en estado online.

✅ Checklist rápido

git pull origin main → actualizar código.

npm install → instalar dependencias.
pm2 restart → reiniciar procesos.
pm2 save → guardar estado.
pm2 startup systemd → configurar arranque automático.
systemctl status pm2-erichboerr → verificar servicio.
Reiniciar servidor y confirmar con pm2 list.
Con esto tu backend queda desplegado y protegido contra reinicios del servidor.