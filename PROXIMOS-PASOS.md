# ✅ Configuración PostgreSQL Completada

## 🎉 Estado Actual

✅ PostgreSQL instalado y corriendo
✅ Base de datos `warynessy` creada
✅ Variables de entorno configuradas en `.env`
✅ PAYLOAD_SECRET generado
✅ Directorio `media/` creado
✅ Tipos TypeScript generados

---

## ⚠️ Nota Importante sobre Payload 3.x

Payload CMS 3.x está diseñado principalmente para funcionar con **Next.js**. El servidor standalone que intentamos configurar tiene limitaciones.

Tienes **2 opciones** para continuar:

---

## Opción 1: Usar Payload con Next.js (Recomendado) ⭐

Esta es la forma oficial y más completa de usar Payload 3.x.

### Ventajas
- ✅ Admin Panel completo y funcional
- ✅ Hot reload en desarrollo
- ✅ Todas las features de Payload
- ✅ Documentación oficial completa
- ✅ Deploy fácil en Vercel

### Pasos

```bash
# 1. Crear proyecto Next.js con Payload
npx create-payload-app@latest warynessy-cms

# Durante la instalación:
# - Template: blank
# - Database: PostgreSQL
# - Usar tu DATABASE_URL existente

# 2. Copiar tus collections y globals
cp -r src/payload/collections warynessy-cms/src/
cp -r src/payload/globals warynessy-cms/src/

# 3. Actualizar payload.config.ts en el nuevo proyecto

# 4. Iniciar
cd warynessy-cms
npm run dev

# Admin: http://localhost:3000/admin
```

Luego, tu proyecto Astro consumirá la API de Payload desde `http://localhost:3000/api`.

---

## Opción 2: Usar Solo la API de Payload (Desarrollo)

Para desarrollo rápido, puedes usar Payload solo como API local sin admin panel visual.

### Ventajas
- ✅ Setup más simple
- ✅ Perfecto para desarrollo
- ✅ Usa tu configuración actual

### Desventajas
- ⚠️ Sin Admin Panel visual
- ⚠️ Gestión de contenido por código/scripts

### Cómo usar

Crea contenido usando scripts o directamente desde tu código Astro:

```typescript
// scripts/seed.ts
import { getPayload } from 'payload'
import config from '../payload.config.js'

const seed = async () => {
  const payload = await getPayload({ config })

  // Crear usuario admin
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@warynessy.com',
      password: 'tu-password-seguro',
      role: 'admin',
    },
  })

  // Crear contenido
  await payload.create({
    collection: 'categories',
    data: {
      nombre: 'Entrantes',
      slug: 'entrantes',
      orden: 1,
      activa: true,
    },
  })

  console.log('✅ Contenido creado')
}

seed()
```

Ejecutar:
```bash
tsx scripts/seed.ts
```

---

## 💡 Mi Recomendación

Para el proyecto Warynessy, te recomiendo **Opción 1: Next.js + Payload**.

**Por qué:**
1. Tendrás un admin panel completo para gestionar el contenido
2. El cliente del restaurante podrá añadir platos, menús, etc. sin tocar código
3. Es la forma oficial y mejor documentada
4. Deploy fácil en Vercel (gratis)

**Arquitectura final:**
```
┌─────────────────┐
│  Astro Frontend │  (Puerto 4321)
│  warynessy26/   │
└────────┬────────┘
         │ API calls
         ▼
┌─────────────────┐
│  Payload CMS    │  (Puerto 3000)
│  Next.js Admin  │
│  + API          │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  PostgreSQL     │
│  Local/Vercel   │
└─────────────────┘
```

---

## 🚀 Siguiente Paso Recomendado

### Crear el proyecto Payload con Next.js

```bash
# En el mismo directorio padre
cd ..

# Crear proyecto Payload
npx create-payload-app@latest warynessy-cms

# Configuración:
# - Template: blank
# - Database: PostgreSQL
# - Database URL: (pegar tu DATABASE_URL de .env)
```

Luego te ayudo a:
1. Copiar tus collections y globals
2. Configurar la conexión entre Astro y Payload
3. Crear el primer usuario admin
4. Poblar contenido inicial

---

## 📁 Archivos Actuales

Todo el trabajo de migración está completo:

✅ Collections migradas (9):
- [src/payload/collections/Users.ts](src/payload/collections/Users.ts)
- [src/payload/collections/Media.ts](src/payload/collections/Media.ts)
- [src/payload/collections/Allergens.ts](src/payload/collections/Allergens.ts)
- [src/payload/collections/Categories.ts](src/payload/collections/Categories.ts)
- [src/payload/collections/Dishes.ts](src/payload/collections/Dishes.ts)
- [src/payload/collections/Menus.ts](src/payload/collections/Menus.ts)
- [src/payload/collections/Spaces.ts](src/payload/collections/Spaces.ts)
- [src/payload/collections/Experiences.ts](src/payload/collections/Experiences.ts)
- [src/payload/collections/Banners.ts](src/payload/collections/Banners.ts)

✅ Globals migrados (2):
- [src/payload/globals/Homepage.ts](src/payload/globals/Homepage.ts)
- [src/payload/globals/SiteSettings.ts](src/payload/globals/SiteSettings.ts)

✅ Cliente API para Astro:
- [src/lib/payload.ts](src/lib/payload.ts)

✅ Configuración:
- [payload.config.ts](payload.config.ts)
- [.env](.env) (configurado)

---

## ❓ ¿Qué prefieres?

1. **Opción Next.js**: Te ayudo a crear el proyecto Payload con Next.js
2. **Opción API solo**: Te ayudo a crear scripts para poblar contenido sin admin panel
3. **Otra cosa**: Dime qué necesitas

---

**Estado**: PostgreSQL ✅ | Schemas migrados ✅ | Listo para siguiente paso

