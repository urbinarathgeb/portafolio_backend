# Back - Portafolio API

Backend para el portafolio de Javier Urbina. API REST construida con **Express 5** y **Sequelize** sobre **PostgreSQL**.

## Requisitos

- Node.js >= 18
- pnpm >= 11
- PostgreSQL

## Instalación

```bash
pnpm install
```

## Crear base de datos

```bash
psql -U TU_USUARIO_PG
```
luego 
```bash
CREATE DATABASE portafolio_javier_urbina;
```

## Variables de entorno

El proyecto usa tres archivos `.env`:

| Archivo | Propósito |
|---|---|
| `.env` | Credenciales de BD y config global |
| `.env.development` | Puerto y CORS para desarrollo | 
| `.env.production` | Puerto y CORS para producción |

### Crear un `.env` en la raíz del proyecto con las siguientes variables: 

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=TU_USUARIO_PG
DB_PASSWORD=TU_PASSWORD_PG
DB_DATABASE=portafolio_javier_urbina
ALLOW_EXIT_ON_IDLE=true
```


## Scripts

```bash
pnpm dev      # Levanta el servidor en modo desarrollo (NODE_ENV=development)
pnpm start    # Levanta el servidor en modo producción (NODE_ENV=production)
```

## Estructura del proyecto

```
src/
├── app.js                          # Entry point, configuración de Express y middlewares
├── config/
│   ├── env.config.js               # Carga y validación de variables de entorno
│   └── db.config.js                # Configuración de Sequelize y PostgreSQL
├── models/
│   ├── index.js                    # Asociación entre modelos
│   ├── user.model.js               # Modelo User
│   └── project.model.js            # Modelo Project
├── seeders/
│   └── initial.seed.js             # Datos iniciales de prueba (solo en desarrollo)
├── middlewares/
│   ├── errorHandler.middleware.js   # Handler global de errores (AppError vs inesperados)
│   └── notFound.middleware.js       # Middleware para rutas no encontradas (404)
└── utils/
    └── errors.js                   # Clases de error personalizadas
```

## Manejo de errores

Se usa una jerarquía de clases de error en `src/utils/errors.js`:

| Clase | Status | Uso |
|---|---|---|
| `AppError` | Personalizado | Clase base para errores operacionales |
| `NotFoundError` | 404 | Recurso no encontrado |
| `ValidationError` | 400 | Error de validación |
| `ConflictError` | 409 | Recurso duplicado |
| `InternalError` | 500 | Error interno |

Los errores operacionales (subclases de `AppError`) se envían al cliente con su status y mensaje. Los errores inesperados devuelven un 500 genérico sin exponer detalles internos.

## Stack

- **Express** 5 - Framework web
- **Sequelize** 6 - ORM para PostgreSQL
- **pg** - Driver de PostgreSQL
- **cors** - Middleware de CORS
- **dotenv** - Variables de entorno
- **cross-env** - Compatibilidad cross-platform para NODE_ENV