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

# JWT
JWT_SECRET=tu_secret_super_seguro
JWT_EXPIRES_IN=24h
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

El proyecto incluye archivos `.http` para testing manual en `requests/`. Compatibles con **WebStorm** (HTTP Client) y **VS Code** (REST Client).

### Obtener el token JWT

**WebStorm:** Ejecuta "### 2. Login exitoso" en `auth.request.http`. El token se asigna automáticamente a `{{token}}` vía `client.global.set()`.

**VS Code:** Ejecuta "### 2. Login exitoso" en `auth.request.http`, copia el token de la respuesta y pégalo en `{{token}}`. Crea un archivo `.rest-client.env.json` a partir de `.rest-client.env.json.template` con el token y selecciona environment "dev".

### Archivos disponibles

- `auth.request.http` — Login y about (5 requests)
- `project.request.http` — CRUD de projects (14 requests, GET públicos, POST/PUT/DELETE con JWT)
- `projectImage.request.http` — Subida y listado de imágenes (13 requests, todos con JWT)
- `contact.request.http` — Contacto público y listado privado (5 requests)
- `service.request.http` — CRUD de servicios con JWT (8 requests)

## Adaptación de la consigna (Módulo 8)

Este backend adapta los requerimientos de una clínica médica a un **portafolio personal**. Cada punto de la consigna tiene un símil directo:

| # | Consigna (clínica) | Adaptación (portafolio) | Endpoint | Acceso |
|---|---|---|---|---|
| 1 | `POST /api/login` | Login del admin | `POST /auth/login` | Público |
| 2 | `GET /about` | Información pública de la API | `GET /about` | Público |
| 3 | Listar pacientes (privado) | Listar mensajes de contacto | `GET /contacts` | Privado (JWT) |
| 4 | Listar médicos (privado) | Listar servicios ofrecidos | `GET /services` | Privado (JWT) |
| 5 | Subir exámenes (solo PDF) | Subir imágenes de proyectos (solo imágenes) | `POST /projects/:id/images` | Privado (JWT) |
| 6 | Listar archivos subidos (privado) | Listar imágenes subidas | `GET /images` | Privado (JWT) |

## Endpoints

### Auth

| Método | Ruta | Descripción | Status |
|---|---|---|---|
| `POST` | `/auth/login` | Iniciar sesión (devuelve JWT) | 200 / 400 / 401 |
| `GET` | `/about` | Información pública de la API | 200 |

> Endpoints protegidos requieren header: `Authorization: Bearer <token>`
>
> **Seguridad:** `POST /auth/login` retorna siempre `"Credenciales inválidas"` tanto para email no registrado como para contraseña incorrecta, para evitar email enumeration.

### Projects

| Método | Ruta | Descripción | Status | Acceso |
|---|---|---|---|---|
| `GET` | `/projects` | Listar todos los proyectos | 200 | Público |
| `GET` | `/projects/:id` | Obtener un proyecto por ID (incluye imágenes) | 200 / 404 | Público |
| `POST` | `/projects` | Crear un proyecto | 201 / 400 | Privado (JWT) |
| `PUT` | `/projects/:id` | Actualizar un proyecto | 200 / 404 | Privado (JWT) |
| `DELETE` | `/projects/:id` | Eliminar un proyecto (soft delete) | 200 / 404 | Privado (JWT) |

### Contacts

| Método | Ruta | Descripción | Status | Acceso |
|---|---|---|---|---|
| `POST` | `/contacts` | Enviar un mensaje de contacto | 201 / 400 | Público |
| `GET` | `/contacts` | Listar todos los mensajes de contacto | 200 | Privado (JWT) |
| `PATCH` | `/contacts/:id` | Marcar mensaje como leído | 200 / 404 | Privado (JWT) |

### Services

| Método | Ruta | Descripción | Status | Acceso |
|---|---|---|---|---|
| `GET` | `/services` | Listar todos los servicios | 200 | Privado (JWT) |
| `GET` | `/services/:id` | Obtener un servicio por ID | 200 / 404 | Privado (JWT) |
| `POST` | `/services` | Crear un servicio | 201 / 400 | Privado (JWT) |
| `PUT` | `/services/:id` | Actualizar un servicio | 200 / 404 | Privado (JWT) |
| `DELETE` | `/services/:id` | Eliminar un servicio (soft delete) | 200 / 404 | Privado (JWT) |

### Project Images (protegido)

| Método | Ruta | Descripción | Status |
|---|---|---|---|
| `GET` | `/images` | Listar todas las imágenes subidas | 200 |
| `GET` | `/projects/:id/images` | Listar imágenes de un proyecto | 200 / 404 |
| `POST` | `/projects/:id/images` | Subir imagen a un proyecto (solo jpg/png/webp) | 201 / 400 |

**POST /projects/:id/images** — Enviar como `multipart/form-data` con el campo `image`:

```json
{
  "status": "success",
  "message": "Imagen subida correctamente",
  "data": {
    "id": 1,
    "projectId": 1,
    "url": "https://res.cloudinary.com/...",
    "publicId": "portafolio-javierUrbina/projects/1/imagen",
    "originalName": "imagen.jpg",
    "format": "jpg",
    "bytes": 123456
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
│   ├── auth.controller.js              # Handlers de autenticación (login)
│   ├── project.controller.js           # Handlers de projects (CRUD)
│   ├── contact.controller.js           # Handlers de contacts (list, create)
│   ├── service.controller.js           # Handlers de services (CRUD)
│   └── projectImage.controller.js      # Handlers de imágenes (listAll, listByProject, upload)
├── middlewares/
│   ├── authenticate.middleware.js      # Middleware de verificación JWT
│   ├── errorHandler.middleware.js      # Handler global de errores (AppError, Sequelize, MulterError, inesperados)
│   ├── notFound.middleware.js          # Middleware para rutas no encontradas (404)
│   ├── upload.middleware.js            # Configuración de multer (memoryStorage, 2MB, filtro de tipos)
│   └── validate.middleware.js          # Middleware genérico de validación (recibe esquema + fuente)
├── models/
│   ├── index.js                        # Asociación entre modelos
│   ├── user.model.js                   # Modelo User
│   ├── project.model.js                # Modelo Project
│   ├── projectImage.model.js           # Modelo ProjectImage
│   ├── contact.model.js                # Modelo Contact
│   └── service.model.js                # Modelo Service
├── routes/
│   ├── auth.routes.js                  # Rutas de autenticación (POST /login, GET /about)
│   ├── project.routes.js               # Rutas de projects con validación
│   ├── contact.routes.js               # Rutas de contacts
│   ├── service.routes.js               # Rutas de services
│   └── projectImage.routes.js          # Rutas de imágenes (GET /images, GET/POST /projects/:id/images)
├── seeders/
│   └── initial.seed.js                # Datos iniciales de prueba (solo en desarrollo)
├── services/
│   ├── auth.service.js                 # Lógica de autenticación (login, verificación JWT)
│   ├── project.service.js              # Lógica de negocio de projects
│   ├── contact.service.js              # Lógica de negocio de contacts
│   ├── service.service.js              # Lógica de negocio de services
│   └── projectImage.service.js         # Lógica de subida a Cloudinary + persistencia en BD
├── utils/
│   ├── asyncHandler.js                 # Wrapper para capturar errores async
│   ├── errors.js                      # Clases de error personalizadas
│   └── response.js                    # Helper de respuesta estandarizada (success)
└── validations/
    ├── rules.js                        # Reglas de validación reutilizables (required, isUrl, isInt, optional)
    ├── auth.validation.js              # Esquemas de validación de autenticación
    ├── contact.validation.js           # Esquemas de validación de contacts
    ├── project.validation.js           # Esquemas de validación de projects
    └── service.validation.js           # Esquemas de validación de services
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
- **jsonwebtoken** - Generación y verificación de tokens JWT
- **bcrypt** - Hashing de contraseñas