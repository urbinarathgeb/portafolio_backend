# Reglas de Agrupación y Mensajes

## 1. Lógica de Agrupación (Atomic Commits)

- **Identificar Dominios:** Separar los cambios por área (ej: Base de Datos, Backend, Frontend).
- **No mezclar:** Si hay cambios en la base de datos y en la documentación, deben ir en commits separados.
- **Unidad Lógica:** Si varios archivos forman parte de una misma funcionalidad (ej: la lógica de `bookings`), agruparlos en un solo commit.

## 2. Estándar de Mensajes

- **Longitud:** Máximo 100 caracteres.
- **Formato:** `<tipo>: <descripción en español>` (Tipos: feat, fix, chore, docs, refactor, style).
- **Tono:** Verbos en infinitivo (Crear, Añadir, Configurar, Eliminar).
- **Idioma:** Mensaje en español, manteniendo términos técnicos de DB/Código en inglés (ej: "feat: crear tabla showtimes").

## 3. Procedimiento Automático

1. Antes de actuar, ejecutar `git status` y `git diff --stat`.
2. Para cada grupo de archivos con una intención común:
   - `git add <archivos_específicos>`
   - `git commit -m "<tipo>: <descripción_corta_y_lógica>"`
3. Al finalizar todos los grupos, detectar la rama actual y ejecutar `git push origin <rama_actual>`.
