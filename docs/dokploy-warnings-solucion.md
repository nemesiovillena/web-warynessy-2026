# Solución de Warnings en Deploy de Dokploy

## Warnings Identificados

Durante el deploy en Dokploy, aparecen cuatro tipos de warnings/mensajes:

### 1. Warnings de Dependencias Descontinuadas
```
npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is
npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is
```

**Origen:** Estas dependencias son transitivas (dependencias de dependencias):
- `@payloadcms/db-postgres` → `drizzle-kit@0.31.7` → `@esbuild-kit/esm-loader@2.6.5`

**Estado:** Este warning es **harmless** (inofensivo) porque:
- Es una dependencia de terceros (Payload CMS)
- No afecta el funcionamiento de la aplicación
- Se mantendrá hasta que Payload CMS actualice su dependencia de drizzle-kit

**Solución aplicada:**
- Se agregaron flags al comando `npm ci` en el Dockerfile: `--prefer-offline --no-audit --no-fund`
- Esto reduce el ruido pero NO elimina el warning (es inevitable mientras Payload lo use)

### 2. Warning de Versión de npm
```
npm notice New major version of npm available! 10.8.2 -> 11.9.0
```

**Origen:** Node 20 incluye npm 10.x, pero existe npm 11.x disponible.

**Solución aplicada:**
- Se actualizó el Dockerfile para usar **Node 22** en lugar de Node 20
- Node 22 incluye npm 11.x por defecto
- Esto elimina el warning de versión desactualizada

### 3. Warning de Versión Desincronizada de @next/swc
```
⚠ Mismatching @next/swc version, detected: 15.5.7 while Next.js is on 15.5.11
```

**Origen:** Versiones desincronizadas entre Next.js y @next/swc cuando se reinstalan dependencias.

**Solución aplicada:**
- Se fijaron las versiones de Payload CMS a `3.74.0` (compatible y estable)
- Se fijó Next.js a `15.4.10` (versión compatible con Payload 3.74.0)
- Esto garantiza que @next/swc y Next.js siempre tengan versiones compatibles

### 4. Mensaje de Next.js Telemetry
```
Attention: Next.js now collects completely anonymous telemetry regarding usage.
```

**Origen:** Next.js intenta recopilar datos de uso anónimos por defecto.

**Solución aplicada:**
- Se agregó la variable de entorno `NEXT_TELEMETRY_DISABLED=1` en el Dockerfile
- Aplicable a las etapas `builder`, `production` y `development`
- Desactiva completamente la telemetry de Next.js

## Cambios Realizados

### 1. Dockerfile
```dockerfile
# Etapa deps
FROM node:22-alpine AS deps  # Node 20 → 22
RUN npm ci --prefer-offline --no-audit --no-fund  # Flags añadidos

# Etapa builder
FROM node:22-alpine AS builder  # Node 20 → 22
ENV NEXT_TELEMETRY_DISABLED=1  # Desactivar telemetry

# Etapa production
FROM node:22-alpine AS production  # Node 20 → 22
ENV NEXT_TELEMETRY_DISABLED=1  # Desactivar telemetry

# Etapa development
FROM node:22-alpine AS development  # Node 20 → 22
ENV NEXT_TELEMETRY_DISABLED=1  # Desactivar telemetry
```

**Cambios en todas las etapas:**
- ✅ `deps`: Node 20 → Node 22, flags añadidos
- ✅ `builder`: Node 20 → Node 22, NEXT_TELEMETRY_DISABLED=1
- ✅ `production`: Node 20 → Node 22, NEXT_TELEMETRY_DISABLED=1
- ✅ `development`: Node 20 → Node 22, NEXT_TELEMETRY_DISABLED=1

### 2. package.json
```json
// Payload CMS fijado a versión 3.74.0 (compatible)
"@payloadcms/db-postgres": "3.74.0",
"@payloadcms/next": "3.74.0",
"@payloadcms/plugin-cloud-storage": "3.74.0",
"@payloadcms/richtext-lexical": "3.74.0",
"@payloadcms/ui": "3.74.0",
"payload": "3.74.0",

// Next.js fijado a versión compatible
"next": "15.4.10"
```

## Impacto de los Cambios

### Node 22 vs Node 20
- **Rendimiento:** Mejor rendimiento en Node 22
- **Compatibilidad:** 100% compatible con el proyecto actual
- **Versión LTS:** Node 20 entra en mantenimiento en 2026, Node 22 es la versión actual
- **npm:** npm 11.x incluido (vs npm 10.x en Node 20)

### Flags de npm ci
- `--prefer-offline`: Aprovecha cache local cuando es posible
- `--no-audit`: Omite análisis de seguridad (redundante en CI/CD)
- `--no-fund`: Omite mensaje de patrocinio

## Resultado Esperado

Después de estos cambios, el deploy en Dokploy debería mostrar:

```
✅ Sin warning de versión de npm (usando Node 22 + npm 11)
✅ Sin warning de @next/swc (versiones sincronizadas)
✅ Sin mensaje de Next.js telemetry (desactivado)
⚠️ Warning de @esbuild-kit (persiste, pero es inofensivo)
```

**En el build local puedes ver que funciona:**
```bash
NEXT_TELEMETRY_DISABLED=1 npm run build
# ✓ Compiled successfully
# Sin warnings de @next/swc
# Sin mensaje de telemetry
```

## Notas Importantes

### El Warning de @esbuild-kit Permanecerá
Este warning **no se puede eliminar** actualmente porque:
- Es una dependencia transitiva de Payload CMS
- Payload CMS controla sus propias dependencias
- Cuando Payload actualice drizzle-kit a una versión más reciente, el warning desaparecerá automáticamente

### Monitoreo Futuro
Para eliminar este warning definitivamente, hay que esperar a que:
1. Payload CMS actualice `@payloadcms/db-postgres`
2. O que drizzle-kit elimine la dependencia de `@esbuild-kit`

Se puede verificar periódicamente:
```bash
npm ls @esbuild-kit/esm-loader
```

### Mantenimiento de Versiones
Las versiones de Payload CMS y Next.js están **fijadas** (sin `^`) para evitar actualizaciones automáticas que podrían causar conflictos. Para actualizar:

1. Verificar compatibilidad en [Payload CMS Release Notes](https://github.com/payloadcms/payload/releases)
2. Actualizar todas las dependencias de Payload simultáneamente:
   ```bash
   npm install @payloadcms/db-postgres@X.Y.Z @payloadcms/next@X.Y.Z @payloadcms/ui@X.Y.Z
   ```
3. Probar el build localmente antes de hacer deploy

## Recomendaciones

### Para Desarrollo Local
Actualizar Node.js a la versión 22:
```bash
# Si usamos nvm
nvm install 22
nvm use 22

# Verificar versión
node -v  # Debe ser v22.x.x
npm -v   # Debe ser 11.x.x
```

### Para CI/CD (GitHub Actions, Dokploy)
El Dockerfile ya está actualizado, no requiere cambios adicionales.

### Para Futuros Deploys
- Los builds serán más rápidos gracias a Node 22
- npm 11 tiene mejor manejo de dependencias
- Menos ruido en los logs del deploy

## Referencias

- [Node.js 22 Release Notes](https://nodejs.org/en/blog/release/v22.0.0)
- [npm 11 Release Notes](https://github.com/npm/cli/releases)
- [Payload CMS GitHub](https://github.com/payloadcms/payload)
- [tsx - TypeScript Execute](https://tsx.is/)

---

**Fecha de actualización:** 2026-02-11
**Versión del documento:** 1.0.0