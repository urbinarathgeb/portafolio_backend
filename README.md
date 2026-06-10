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

## Variables de entorno

El proyecto usa tres archivos `.env`:

| Archivo | Propósito | Carga en |
|---|---|---|
| `.env` | Credenciales de BD, Cloudinary y config global | Siempre |
| `.env.development` | Puerto y CORS para desarrollo | `NODE_ENV=development` |
| `.env.production` | Puerto y CORS para producción | `NODE_ENV=production` |

### `.env`

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=TU_USUARIO_PG
DB_PASSWORD=TU_PASSWORD_PG
DB_DATABASE=portafolio_javier_urbina
ALLOW_EXIT_ON_IDLE=true

# Cloudinary (subida de archivos)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### `.env.development`

```env
PORT=3001
CORS_ORIGIN=*
```

### `.env.production`

```env
PORT=8080
CORS_ORIGIN=https://tudominio.com
```

> **Nota sobre el puerto:** El puerto se lee desde el archivo `.env` correspondiente al entorno. El fallback `|| 3000` en el código es intencional — si al arrancar ves el puerto 3000 en vez del configurado, significa que las variables de entorno no se están cargando correctamente.

## Crear base de datos

Opción A — Si ya tienes un usuario de PostgreSQL:

```bash
psql -U TU_USUARIO_PG
```

```sql
CREATE DATABASE portafolio_javier_urbina;
```

Opción B — Crear un usuario dedicado desde cero:

```sql
CREATE USER portafolio_user WITH PASSWORD 'tu_password';
CREATE DATABASE portafolio_javier_urbina OWNER portafolio_user;
```

Luego actualizar `.env` con las credenciales del usuario creado.

## Scripts

```bash
pnpm dev      # Levanta el servidor en modo desarrollo (NODE_ENV=development)
pnpm start    # Levanta el servidor en modo producción (NODE_ENV=production)
```

> **Nota:** En modo desarrollo (`pnpm dev`), las tablas se recrean y se ejecutan los seeders automáticamente en cada inicio (`sequelize.sync({ force: true })`). En producción solo se crean si no existen.

## Cómo probar

El proyecto incluye archivos de requests para testing manual en `requests/`:

- `project.request.http` / `project.request.rest` — CRUD de projects (14 requests)
- `file.request.http` / `file.request.rest` — Subida y listado de archivos (5 requests)

> **Nota:** Para probar la subida de archivos, coloca tus archivos dentro de la carpeta `requests/` y ajusta las rutas según tus archivos reales.
>
> **Alternativa rápida con curl** (no necesitas editar nada, solo cambia la ruta):
> ```bash
> curl -X POST http://localhost:3001/files \
>   -F "file=@/ruta/completa/hacia/tu/imagen.jpg" \
>   -w "\nHTTP %{http_code}\n"
> ```
> Con `curl` el nombre del archivo se toma automáticamente, no necesitas tocar nada.

## Endpoints

### Projects

| Método | Ruta | Descripción | Status |
|---|---|---|---|
| `GET` | `/projects` | Listar todos los proyectos | 200 |
| `GET` | `/projects/:id` | Obtener un proyecto por ID | 200 / 404 |
| `POST` | `/projects` | Crear un proyecto | 201 / 400 |
| `PUT` | `/projects/:id` | Actualizar un proyecto | 200 / 404 |
| `DELETE` | `/projects/:id` | Eliminar un proyecto (soft delete) | 200 / 404 |

### Files

| Método | Ruta | Middlewares | Descripción | Status |
|--------|------|------------|-------------|--------|
| `POST` | `/files` | `uploadSingle` (multer) | Subir un archivo a Cloudinary (max 20MB) | 201 / 400 |
| `GET` | `/files` | — | Listar archivos subidos a Cloudinary | 200 |

> ⚠️ **Importante:** El `filename` del `Content-Disposition` en el multipart debe coincidir con el nombre real del archivo. Ese valor es el `originalName` que Cloudinary usará como identificador en la nube.

**POST /files** — Enviar como `multipart/form-data` con el campo `file`:

```json
{
  "status": "success",
  "message": "Archivo subido correctamente",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "portafolio-javierUrbina/imagen",
    "format": "jpg",
    "bytes": 123456,
    "originalName": "imagen.jpg"
  }
}
```

### Formato de respuesta

**Éxito:**
```json
{
  "status": "success",
  "message": "Descripción en español",
  "data": { ... }
}
```

**Éxito con código personalizado (DELETE):**
```json
{
  "status": "success",
  "code": "PROJECT_DELETED",
  "message": "Proyecto eliminado correctamente"
}
```

**Error:**
```json
{
  "status": "error",
  "message": "Descripción del error en español"
}
```

**Error de validación (400):**
```json
{
  "status": "error",
  "message": "Error de validación",
  "errors": [
    { "field": "title", "message": "El campo title es obligatorio" }
  ]
}
```

## Estructura del proyecto

```
src/
├── app.js                              # Entry point, configuración de Express y middlewares
├── config/
│   ├── env.config.js                   # Carga y validación de variables de entorno
│   ├── db.config.js                    # Configuración de Sequelize y PostgreSQL
│   └── cloudinary.config.js            # Configuración del SDK de Cloudinary
├── controllers/
│   ├── project.controller.js           # Handlers de projects (list, detail, create, update, remove)
│   └── file.controller.js              # Handlers de files (upload, list)
├── middlewares/
│   ├── errorHandler.middleware.js      # Handler global de errores (AppError, Sequelize, MulterError, inesperados)
│   ├── notFound.middleware.js          # Middleware para rutas no encontradas (404)
│   ├── upload.middleware.js            # Configuración de multer (memoryStorage, 20MB, filtro de tipos)
│   └── validate.middleware.js          # Middleware genérico de validación (recibe esquema + fuente)
├── models/
│   ├── index.js                        # Asociación entre modelos
│   ├── user.model.js                   # Modelo User
│   └── project.model.js                # Modelo Project
├── routes/
│   ├── project.routes.js               # Rutas de projects con validación
│   └── file.routes.js                  # Rutas de files (POST /, GET /)
├── seeders/
│   └── initial.seed.js                # Datos iniciales de prueba (solo en desarrollo)
├── services/
│   ├── project.service.js              # Lógica de negocio de projects
│   └── file.service.js                 # Lógica de subida y listado de archivos via Cloudinary
├── utils/
│   ├── asyncHandler.js                 # Wrapper para capturar errores async
│   ├── errors.js                      # Clases de error personalizadas
│   └── response.js                    # Helpers de respuesta estandarizada (success, error)
└── validations/
    ├── rules.js                        # Reglas de validación reutilizables (required, isUrl, isInt, optional)
    └── project.validation.js          # Esquemas de validación de projects (create, update, idParam)
```

## Arquitectura

Flujo estricto de dependencias:

```
Route → Controller → Service → Model
```

- **Routes:** Definen endpoints y aplican middlewares de validación.
- **Controllers:** Reciben request/response, orquestan lógica. Solo invocan services.
- **Services:** Contienen lógica de negocio. Invocan métodos de modelos Sequelize.
- **Models:** Definiciones Sequelize. No contienen lógica de negocio.

## Manejo de errores

Se usa una jerarquía de clases de error en `src/utils/errors.js`:

| Clase | Status | Uso |
|---|---|---|
| `AppError` | Personalizado | Clase base para errores operacionales |
| `NotFoundError` | 404 | Recurso no encontrado |
| `ValidationError` | 400 | Error de validación |
| `ConflictError` | 409 | Recurso duplicado |
| `InternalError` | 500 | Error interno |

El middleware `errorHandler` maneja los siguientes tipos de errores:

1. **`MulterError`** → 400 con mensaje descriptivo (archivo muy grande, demasiados archivos, etc.)
2. **`FileFilterError`** → 400 tipo de archivo no permitido
3. **`SequelizeValidationError`** → 400 con detalle de campos
4. **`SequelizeUniqueConstraintError`** → 409 recurso duplicado
5. **`AppError` (operacional)** → status y mensaje custom
6. **Errores inesperados** → 500 genérico (detalle y stack solo en desarrollo)

## Validación

Validación en dos capas:

1. **Middleware** (`src/middlewares/validate.middleware.js`): Valida input del request usando esquemas definidos en `src/validations/`. Reglas reutilizables en `src/validations/rules.js`.
2. **Modelo Sequelize**: Validaciones a nivel BD (`validate` en definición de campos).

## Stack

- **Express** 5 - Framework web
- **Sequelize** 6 - ORM para PostgreSQL
- **pg** - Driver de PostgreSQL
- **cors** - Middleware de CORS
- **dotenv** - Variables de entorno
- **cross-env** - Compatibilidad cross-platform para NODE_ENV
- **multer** - Middleware para subida de archivos (multipart/form-data)
- **cloudinary** - SDK para almacenamiento y administración de archivos en Cloudinary