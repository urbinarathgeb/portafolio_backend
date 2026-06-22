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

### Seed de producción

```bash
ADMIN_EMAIL=admin@tudominio.com ADMIN_PASSWORD=contraseña_segura node scripts/seed-prod.js
```

Script único para poblar la base de datos en producción. Requiere `ADMIN_EMAIL` y `ADMIN_PASSWORD` como variables de entorno (no hardcodeadas). Crea el usuario admin, proyectos, servicios, tecnologías, experiencias y contactos de ejemplo. Usa `findOrCreate`, así que es seguro ejecutarlo múltiples veces.

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
- `service.request.http` — CRUD de servicios (8 requests, GET públicos, POST/PUT/DELETE con JWT)
- `experience.request.http` — CRUD de experiencias con tecnologías (8 requests)
- `technology.request.http` — CRUD de tecnologías (8 requests)

## Adaptación de la consigna (Módulo 8)

Este backend adapta los requerimientos de una clínica médica a un **portafolio personal**. Cada punto de la consigna tiene un símil directo:

| # | Consigna (clínica) | Adaptación (portafolio) | Endpoint | Acceso |
|---|---|---|---|---|
| 1 | `POST /api/login` | Login del admin | `POST /auth/login` | Público |
| 2 | `GET /about` | Información pública de la API | `GET /about` | Público |
| 3 | Listar pacientes (privado) | Listar mensajes de contacto | `GET /contacts` | Privado (JWT) |
| 4 | Listar médicos (privado) | Listar servicios ofrecidos | `GET /services` | Público |
| 5 | Subir exámenes (solo PDF) | Subir imágenes de proyectos (solo imágenes) | `POST /projects/:id/images` | Privado (JWT) |
| 6 | Listar archivos subidos (privado) | Listar imágenes subidas | `GET /images` | Privado (JWT) |

## Endpoints

### Auth

| Método | Ruta | Descripción | Status | Acceso |
|---|---|---|---|---|
| `POST` | `/auth/login` | Iniciar sesión (devuelve JWT) | 200 / 400 / 401 | Público |
| `GET` | `/about` | Información pública de la API | 200 | Público |
| `PATCH` | `/auth/password` | Cambiar contraseña | 200 / 400 / 401 | Privado (JWT) |

> Endpoints protegidos requieren header: `Authorization: Bearer <token>`
>
> **Seguridad:** `POST /auth/login` retorna siempre `"Credenciales inválidas"` tanto para email no registrado como para contraseña incorrecta, para evitar email enumeration.
>
> **Rate limiting:** `POST /auth/login` está limitado a 10 intentos por IP en una ventana de 15 minutos. Al superar el límite, responde con `429 Too Many Requests`.

### Profile

| Método | Ruta | Descripción | Status | Acceso |
|---|---|---|---|---|
| `GET` | `/profile` | Obtener perfil público del admin | 200 / 404 | Público |
| `PATCH` | `/profile` | Actualizar perfil | 200 / 400 / 404 | Privado (JWT) |

**Campos del perfil:**
- `name`, `lastname` (string) — Nombre completo
- `email` (string) — Email de contacto
- `title` (string) — Título profesional (ej: "Desarrollador Full Stack")
- `tagline` (string) — Frase corta de cabecera
- `heroDescription` (text) — Descripción del hero
- `bio` (text) — Biografía
- `availability` (boolean) — Disponibilidad (`true` / `false`)
- `location` (string) — Ubicación
- `avatar` (url) — URL del avatar

### Projects

| Método | Ruta | Descripción | Status | Acceso |
|---|---|---|---|---|
| `GET` | `/projects` | Listar todos los proyectos | 200 | Público |
| `GET` | `/projects/:id` | Obtener un proyecto por ID (incluye imágenes) | 200 / 404 | Público |
| `POST` | `/projects` | Crear un proyecto | 201 / 400 | Privado (JWT) |
| `PUT` | `/projects/:id` | Actualizar un proyecto (incluye `techIds` para tecnologías) | 200 / 404 | Privado (JWT) |
| `DELETE` | `/projects/:id` | Eliminar un proyecto (soft delete) | 200 / 404 | Privado (JWT) |

> **Normalización de tecnologías:** Los proyectos ahora usan una tabla centralizada `technologies` con relación M:N vía `project_technologies`. Al crear/actualizar un proyecto, se envía `techIds: [1, 2, 3]`. La respuesta incluye `techStackDetails: [{ id, name, iconUrl }]`. El frontend mapea con `.map(t => t.name)`. Las tecnologías incluyen el campo `showInStack` para determinar si deben mostrarse en la sección stack del portafolio.
>
> **Cascade:** Al eliminar un proyecto (soft delete), se eliminan automáticamente sus imágenes asociadas y las relaciones en la tabla `project_technologies`.

### Contacts

| Método | Ruta | Descripción | Status | Acceso |
|---|---|---|---|---|
| `POST` | `/contacts` | Enviar un mensaje de contacto (soporta `company` e `interest`) | 201 / 400 | Público |
| `GET` | `/contacts` | Listar todos los mensajes de contacto | 200 | Privado (JWT) |
| `PATCH` | `/contacts/:id` | Marcar mensaje como leído | 200 / 404 | Privado (JWT) |

**Campos adicionales de contacto:**
- `company` (string, opcional) — Empresa del remitente
- `interest` (enum, opcional) — `fulltime` | `freelance` | `consultoria` | `saludar`

### Services

| Método | Ruta | Descripción | Status | Acceso |
|---|---|---|---|---|---|
| `GET` | `/services` | Listar todos los servicios | 200 | Público |
| `GET` | `/services/:id` | Obtener un servicio por ID | 200 / 404 | Público |
| `POST` | `/services` | Crear un servicio | 201 / 400 | Privado (JWT) |
| `PUT` | `/services/:id` | Actualizar un servicio | 200 / 404 | Privado (JWT) |
| `DELETE` | `/services/:id` | Eliminar un servicio (soft delete) | 200 / 404 | Privado (JWT) |

### Experiences

| Método | Ruta | Descripción | Status | Acceso |
|---|---|---|---|---|
| `GET` | `/experiences` | Listar todas las experiencias (incluye tecnologías asociadas) | 200 | Público |
| `GET` | `/experiences/:id` | Obtener una experiencia por ID | 200 / 404 | Público |
| `POST` | `/experiences` | Crear una experiencia con tecnologías | 201 / 400 | Privado (JWT) |
| `PUT` | `/experiences/:id` | Actualizar una experiencia | 200 / 404 | Privado (JWT) |
| `DELETE` | `/experiences/:id` | Eliminar una experiencia (soft delete) | 200 / 404 | Privado (JWT) |

> **Cascade:** Al eliminar una experiencia (soft delete), se eliminan automáticamente sus relaciones en la tabla `experience_technologies`.

### Technologies

| Método | Ruta | Descripción | Status | Acceso |
|---|---|---|---|---|
| `GET` | `/technologies` | Listar todas las tecnologías | 200 | Público |
| `GET` | `/technologies/:id` | Obtener una tecnología por ID | 200 / 404 | Público |
| `POST` | `/technologies` | Crear una tecnología | 201 / 400 | Privado (JWT) |
| `PUT` | `/technologies/:id` | Actualizar una tecnología | 200 / 404 | Privado (JWT) |
| `DELETE` | `/technologies/:id` | Eliminar una tecnología (soft delete) | 200 / 404 | Privado (JWT) |

> **Filtro stack:** `GET /technologies?stack=true` devuelve solo las tecnologías marcadas como visibles en la sección stack del portafolio (`showInStack: true`). Sin el query param, devuelve el listado completo para el dashboard.
>
> **Ordenamiento:** Las tecnologías incluyen el campo `sortOrder` (integer) para controlar el orden de visualización en el stack del portafolio.

### Project Images (protegido)

| Método | Ruta | Descripción | Status |
|---|---|---|---|
| `GET` | `/images` | Listar todas las imágenes subidas | 200 |
| `GET` | `/projects/:id/images` | Listar imágenes de un proyecto | 200 / 404 |
| `POST` | `/projects/:id/images` | Subir imagen a un proyecto (solo jpg/png/webp) | 201 / 400 |
| `PATCH` | `/images/:id/preview` | Establecer o quitar imagen como preview del proyecto | 200 / 404 |

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
│   ├── contact.controller.js           # Handlers de contacts (list, create)
│   ├── experience.controller.js        # Handlers de experiences (CRUD)
│   ├── profile.controller.js           # Handlers de profile (get, update)
│   ├── project.controller.js           # Handlers de projects (CRUD)
│   ├── projectImage.controller.js      # Handlers de imágenes (listAll, listByProject, upload)
│   ├── service.controller.js           # Handlers de services (CRUD)
│   └── technology.controller.js        # Handlers de technologies (CRUD)
├── middlewares/
│   ├── authenticate.middleware.js      # Middleware de verificación JWT
│   ├── errorHandler.middleware.js      # Handler global de errores (AppError, Sequelize, MulterError, inesperados)
│   ├── notFound.middleware.js          # Middleware para rutas no encontradas (404)
│   ├── rateLimiter.middleware.js       # Rate limiting para login (express-rate-limit)
│   ├── upload.middleware.js            # Configuración de multer (memoryStorage, 2MB, filtro de tipos)
│   └── validate.middleware.js          # Middleware genérico de validación (recibe esquema + fuente)
├── models/
│   ├── index.js                        # Asociación entre modelos
│   ├── user.model.js                   # Modelo User
│   ├── project.model.js                # Modelo Project
│   ├── projectImage.model.js           # Modelo ProjectImage
│   ├── projectTech.model.js            # Modelo join table Project↔Technology
│   ├── contact.model.js                # Modelo Contact
│   ├── service.model.js                # Modelo Service
│   ├── experience.model.js             # Modelo Experience
│   ├── experienceTech.model.js         # Modelo join table Experience↔Technology
│   └── technology.model.js             # Modelo Technology
├── routes/
│   ├── auth.routes.js                  # Rutas de autenticación (POST /login, GET /about)
│   ├── contact.routes.js               # Rutas de contacts
│   ├── experience.routes.js            # Rutas de experiences
│   ├── profile.routes.js               # Rutas de profile
│   ├── project.routes.js               # Rutas de projects con validación
│   ├── projectImage.routes.js          # Rutas de imágenes (GET /images, GET/POST /projects/:id/images)
│   ├── service.routes.js               # Rutas de services
│   └── technology.routes.js            # Rutas de technologies
├── seeders/
│   └── initial.seed.js                # Datos iniciales de prueba (solo en desarrollo)
├── services/
│   ├── auth.service.js                 # Lógica de autenticación (login, verificación JWT)
│   ├── cloudinary.service.js           # Servicio de subida de archivos a Cloudinary (stream upload)
│   ├── contact.service.js              # Lógica de negocio de contacts
│   ├── experience.service.js           # Lógica de negocio de experiences
│   ├── profile.service.js              # Lógica de negocio de profile
│   ├── project.service.js              # Lógica de negocio de projects
│   ├── projectImage.service.js         # Lógica de subida a Cloudinary + persistencia en BD
│   ├── service.service.js              # Lógica de negocio de services
│   └── technology.service.js           # Lógica de negocio de technologies
├── utils/
│   ├── asyncHandler.js                 # Wrapper para capturar errores async
│   ├── errors.js                      # Clases de error personalizadas
│   └── response.js                    # Helper de respuesta estandarizada (success)
└── validations/
    ├── rules.js                        # Reglas de validación reutilizables (required, isUrl, isInt, optional, isArray, isArrayOf)
    ├── auth.validation.js              # Esquemas de validación de autenticación
    ├── common.validation.js            # Esquemas compartidos (idParamSchema para validación de :id)
    ├── contact.validation.js           # Esquemas de validación de contacts
    ├── experience.validation.js        # Esquemas de validación de experiences
    ├── profile.validation.js           # Esquemas de validación de profile
    ├── project.validation.js           # Esquemas de validación de projects
    ├── service.validation.js           # Esquemas de validación de services
    └── technology.validation.js        # Esquemas de validación de technologies
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

## Optimizaciones

### Bug fix: `techIds: []` no limpiaba relación M:N

Al enviar un array vacío (`techIds: []`) en proyectos o experiencias, la condición `techIds && techIds.length > 0` impedía ejecutar `setTechnologies`, dejando la relación M:N intacta. Se cambió a `techIds !== undefined` para que un array vacío limpie correctamente todas las tecnologías asociadas.

### Centralización de `idParamSchema`

Se eliminaron 4 definiciones duplicadas de validación del parámetro `:id` moviéndolas a `src/validations/common.validation.js`. Ahora todas las rutas importan `idParamSchema` desde un único lugar.

### Extracción de Cloudinary a servicio propio

La lógica de subida a Cloudinary se extrajo de `projectImage.service.js` a `src/services/cloudinary.service.js`, permitiendo reutilización en otros módulos sin acoplar la subida de archivos a un modelo específico.

### Optimización N+1 en `setPreview`

El método para establecer una imagen como preview de un proyecto recorría todas las imágenes en un loop ejecutando `update` por cada una. Se reemplazó por `ProjectImage.update({ isPreview: false }, { where: { projectId } })`, reduciendo la operación a 2 queries fijas sin importar la cantidad de imágenes.

### Cascade soft-delete

Se implementaron hooks `beforeDestroy` en los modelos:

- **Project (`src/models/project.model.js`)**: Al hacer soft-delete de un proyecto, elimina automáticamente sus imágenes (`project_images`) y limpia las relaciones en `project_technologies`.
- **Experience (`src/models/experience.model.js`)**: Al hacer soft-delete de una experiencia, limpia automáticamente las relaciones en `experience_technologies`.

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

## Seguridad

- **Helmet** — Middleware de seguridad que configura headers HTTP para proteger contra vulnerabilidades web comunes (XSS, clickjacking, MIME sniffing, etc.). Se aplica globalmente en `src/app.js` con configuración por defecto.
- **Morgan** — Logger de requests HTTP en formato `dev` para monitorear todas las peticiones entrantes en consola.
- **Rate limiting** — `POST /auth/login` limitado a 10 intentos por IP en una ventana de 15 minutos mediante `express-rate-limit`. Configuración en `src/middlewares/rateLimiter.middleware.js`.

## Stack

- **Express** 5 - Framework web
- **Sequelize** 6 - ORM para PostgreSQL
- **pg** - Driver de PostgreSQL
- **cors** - Middleware de CORS
- **helmet** - Middleware de seguridad (headers HTTP)
- **morgan** - Logger de requests HTTP
- **express-rate-limit** - Rate limiting para endpoints sensibles
- **dotenv** - Variables de entorno
- **cross-env** - Compatibilidad cross-platform para NODE_ENV
- **multer** - Middleware para subida de archivos (multipart/form-data)
- **cloudinary** - SDK para almacenamiento y administración de archivos en Cloudinary
- **jsonwebtoken** - Generación y verificación de tokens JWT
- **bcrypt** - Hashing de contraseñas