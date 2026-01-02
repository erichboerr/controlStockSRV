# 📦 Estructura Técnica de la Base de Datos

Este documento describe la arquitectura de la base de datos del sistema, incluyendo tablas, campos, claves, relaciones y configuraciones de trazabilidad.

---

## 🧱 roles
- `id`: INTEGER, PK, autoIncrement
- `rol`: STRING, NOT NULL, UNIQUE
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid

## 🧱 usuarios
- `id`: INTEGER, PK, autoIncrement
- `user`: STRING, NOT NULL, UNIQUE
- `password`: STRING, NOT NULL
- `rolId`: INTEGER, FK → roles(id), CASCADE update, RESTRICT delete
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid

## 🧱 servicios
- `id`: INTEGER, PK, autoIncrement
- `nombre`: STRING, NOT NULL, UNIQUE
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid

## 🧱 proveedores
- `id`: INTEGER, PK, autoIncrement
- `proveedor`: STRING, NOT NULL, UNIQUE
- `email`: STRING, NOT NULL, UNIQUE
- `telefono`: STRING, NOT NULL, UNIQUE
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid

## 🧱 marcas
- `id`: INTEGER, PK, autoIncrement
- `marca`: STRING, NOT NULL, UNIQUE
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid

## 🧱 modelos
- `id`: INTEGER, PK, autoIncrement
- `modelo`: STRING, NOT NULL
- `marcaId`: INTEGER, FK → marcas(id), CASCADE delete
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid
- Índice único: `modelo + marcaId`

## 🧱 insumos
- `id`: INTEGER, PK, autoIncrement
- `insumo`: STRING, NOT NULL
- `modeloId`: INTEGER, FK → modelos(id), CASCADE delete
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid

## 🧱 impresoras
- `id`: INTEGER, PK, autoIncrement
- `marcaId`: INTEGER, FK → marcas(id), CASCADE delete
- `modeloId`: INTEGER, FK → modelos(id), CASCADE delete
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid
- Índice único: `marcaId + modeloId`

## 🧱 impresora_fisica
- `id`: INTEGER, PK, autoIncrement
- `numeroSerie`: STRING, NOT NULL, UNIQUE
- `remito`: STRING, opcional
- `fechaEntrega`: DATE, opcional
- `proveedorId`: INTEGER, FK → proveedores(id), CASCADE delete
- `impresoraId`: INTEGER, FK → impresoras(id), CASCADE delete
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid

## 🧱 impresora_servicio
- `id`: INTEGER, PK, autoIncrement
- `impresoraFisicaId`: INTEGER, FK → impresora_fisica(id), CASCADE delete
- `servicioId`: INTEGER, FK → servicios(id), CASCADE delete
- `fechaEntrega`: DATE, opcional
- `fechaRetiro`: DATE, opcional
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid

## 🧱 movimiento_insumo
- `id`: INTEGER, PK, autoIncrement
- `tipo`: ENUM("ingreso", "egreso"), NOT NULL
- `cantidad`: INTEGER, NOT NULL, min: 1
- `fecha`: DATE, NOT NULL
- `insumoId`: INTEGER, FK → insumos(id), CASCADE delete
- `proveedorId`: INTEGER, FK → proveedores(id), SET NULL
- `servicioId`: INTEGER, FK → servicios(id), SET NULL
- `flagHabilitado`: BOOLEAN, default: true
- `createdAt`, `updatedAt`: DATE, timestamps
- `deletedAt`: DATE, paranoid

---

## 🔗 Mapa de relaciones

- `Usuario` → `Rol` (N:1)
- `Modelo` → `Marca` (N:1)
- `Insumo` → `Modelo` (N:1)
- `Impresora` → `Modelo` y `Marca` (1:1)
- `ImpresoraFisica` → `Impresora` y `Proveedor` (N:1)
- `ImpresoraServicio` → `ImpresoraFisica` y `Servicio` (N:1)
- `MovimientoInsumo` → `Insumo`, `Proveedor`, `Servicio` (N:1)

---
