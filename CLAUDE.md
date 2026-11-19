# ControlStock — Guía para Claude

> **Dónde va:** en la RAÍZ del repo (al lado de `backend/` y `frontend/`), con el nombre `CLAUDE.md`.
> Claude Code lo carga solo al iniciar cada sesión. En Claude.ai no se carga solo: al empezar,
> pedí "leé CLAUDE.md del repo" (o pegá su contenido en las instrucciones del Proyecto).

---

## 1. Qué es el proyecto
<!-- Para qué sirve el sistema, en pocas líneas. -->
Sistema web (intranet) para controlar el inventario de impresoras, insumos y repuestos de un hospital.
Módulos que existen hoy: usuarios, roles, proveedores, servicios, marcas, modelos, insumos,
impresoras, impresoras físicas, impresoras por servicio, ingresos, egresos, stock, repuestos,
reportes, logs y backup.

## 2. Estructura del repo
<!-- Dónde vive cada cosa. -->

controlStockSRV/
├── backend/          API REST
│   ├── routes/       define las URL de cada módulo
│   ├── controllers/  recibe el pedido y arma la respuesta
│   ├── services/     lógica de negocio de cada módulo
│   ├── models/       modelos Sequelize (tablas)
│   ├── validators/   esquemas Joi (schemas.js)
│   ├── middlewares/  auth, roles, validación, rate limit, errores
│   ├── helpers/      jwt, hash de contraseñas, cálculo de stock
│   ├── utils/        createError, logger (winston), normalize
│   ├── migrations/   migraciones Sequelize (.cjs)
│   ├── seeders/      datos iniciales (y data/ con los datos)
│   └── config/       conexión a la base y carga de variables de entorno
├── frontend/         React + Vite
│   └── src/          pages, routes, layout, common, config, utils
├── documentacion/    guías de instalación, migraciones, HTTPS, backup
└── backup_db.sh

## 3. Stack (desarrollo local)

<!-- Versiones principales, para no proponer cosas incompatibles. -->
- **Backend:** Node.js con **ES modules** (`import`/`export`, con extensión `.js` en los imports),
  Express 5, Sequelize 6 + PostgreSQL (`pg`), Joi, JWT (`jsonwebtoken`), bcrypt, Helmet, CORS,
  express-rate-limit, morgan, winston, dotenv-flow.
- **Frontend:** React 19, Vite, react-router-dom 7, axios, Bootstrap + react-bootstrap, Tailwind 4,
  dayjs, jspdf + jspdf-autotable, jwt-decode.
- **Calidad:** ESLint + Prettier ya configurados en ambos lados. Respetarlos.

## 4. Comandos
<!-- Lo que se corre día a día. -->
**Backend** (desde `backend/`, escucha en el puerto 5050):

```bash
npm run dev        # nodemon, NODE_ENV=development
npm run migrate    # aplica migraciones
npm run seed       # carga seeders con sequelize-cli
npm run lint
npm run format
```

Sembrar datos al arrancar el servidor:

```bash
DB_SEED=true npm run dev                          # todos los seeders
SEED_TABLE=<tabla> DB_SEED=true npm run dev       # una sola tabla
```

Tablas válidas para `SEED_TABLE`: usuarios, proveedores, servicios, marcas, modelos, insumos,
modelosInsumos, impresoras, impresorasFisicas, impresoraServicio, repuestos.

**Frontend** (desde `frontend/`, Vite en el puerto 5173):

```bash
npm run dev
npm run build
npm run lint
npm run format
```

## 5. Base de datos y migraciones
<!-- Reglas para no romper datos. -->
- ⚠️ `DB_SYNC=true` ejecuta `sequelize.sync({ force: true })`: **borra y recrea todas las tablas**.
  Nunca lo actives ni lo sugieras salvo que yo lo pida explícitamente y sea una base de desarrollo.
- Las migraciones son `.cjs` y se ordenan por prefijo (`0-`, `1-` … `9-`, `a-`, `b-`, `c-`, `d-`).
  **No edites una migración ya aplicada**: creá una nueva
  (`npx sequelize-cli migration:generate --name <nombre>`) y avisame.
- Cada cambio en un modelo necesita su migración. Si falta, avisame.
- Comandos de migración completos: `documentacion/comandos_migracion.md`.

## 6. Convenciones del backend
<!-- Para que el código nuevo se vea igual al existente. -->
- Cada módulo sigue, en general, el recorrido **route → controller → service → model**.
  Validación con Joi en `validators/schemas.js`; errores con `utils/createError.js`.
- Antes de crear un módulo nuevo, leé uno parecido (por ejemplo `marca` o `modelo`) y seguí su patrón.
- Los permisos por rol se resuelven con los middlewares de `middlewares/` (`verificarRoot`,
  `verificarRootOAdmin`, `authMiddleware`). No dupliques esa lógica en los controllers.
- Las respuestas de la API y los listados llevan **solo los datos necesarios**: nada de campos
  de más ni datos ruidosos.

## 7. Convenciones del frontend

- Componentes de función con hooks. Seguí el estilo de la pantalla vecina (Bootstrap o Tailwind,
  lo que ya use ese componente).
- Cuidá el **caché**: si un cambio no se ve, pensá primero en caché del navegador o de Vite
  antes de tocar el código.
- Las URL de la API se leen de variables `VITE_*_URL` (ver `frontend/.env.development`).

## 8. Seguridad y datos

- Los `.env` del backend **no se suben** a git. `frontend/.env.development` y `.env.production`
  sí están versionados y solo deben contener URLs: **nunca secretos**.
- No agregues al repo dumps con datos reales, contraseñas ni tokens.

## 9. Alcance: solo desarrollo

- Trabajamos en desarrollo local. **No incluyas ni propongas** Nginx, PM2, HTTPS ni despliegue
  (`ecosystem.config.cjs`, `controlStockV2.conf` y la guía de deploy existen pero no se tocan)
  salvo que yo abra explícitamente una tarea de despliegue.
- No agregues librerías ni herramientas innecesarias. Si proponés una, justificala en una línea.

## 10. Cómo quiero que trabajes

- Respondé siempre en **español**.
- Entregá **archivos completos** (no diffs), de a uno, y esperá mi confirmación antes del siguiente.
- Cada archivo lleva **comentarios que expliquen qué hace cada sección**.
- Si algo es ambiguo, **preguntame antes de decidir**. Lo ya confirmado se aplica sin volver a preguntar.
- Pasos accionables y código listo para pegar, con explicación de nivel senior.
- Commits con mensaje claro y accionable (qué cambió y por qué), historial limpio, un commit por tarea.

## 11. PRD y backlog

Este proyecto ya está construido y **no tiene PRD ni BACKLOG**. Para cambios chicos, trabajá directo
con estas reglas. Para un cambio grande (módulo nuevo, rediseño), proponé crear `PRD.md` y
`BACKLOG.md` con la plantilla antes de programar.
