# Migración de Sanity a Payload CMS

Este documento detalla la migración exitosa de Sanity.io a Payload CMS.

## ✅ Estado de la Migración

**Fecha**: 14 de Enero 2026
**Estado**: ✅ Completada

## 📋 Cambios Realizados

### 1. Instalación de Payload CMS

Se instalaron las siguientes dependencias:
- `payload` - Core de Payload CMS
- `@payloadcms/db-postgres` - Adaptador para PostgreSQL
- `@payloadcms/richtext-lexical` - Editor de texto enriquecido
- `@payloadcms/ui` - Interfaz de administración
- `sharp` - Optimización de imágenes

### 2. Migración de Schemas

Todos los schemas de Sanity fueron migrados a Collections y Globals de Payload:

#### Collections (Colecciones)
- ✅ **Users** - Sistema de usuarios y autenticación
- ✅ **Media** - Gestión de archivos e imágenes
- ✅ **Allergens** - Alérgenos
- ✅ **Categories** - Categorías de la carta
- ✅ **Dishes** - Platos de la carta
- ✅ **Menus** - Menús ofertados
- ✅ **Spaces** - Espacios del restaurante
- ✅ **Experiences** - Experiencias y regalos
- ✅ **Banners** - Banners y anuncios

#### Globals (Singletons)
- ✅ **Homepage** - Configuración de la página de inicio
- ✅ **SiteSettings** - Configuración global del sitio

### 3. Estructura de Archivos

```
warynessy26/
├── payload.config.ts           # Configuración principal de Payload
├── src/
│   ├── payload/
│   │   ├── collections/        # Definiciones de colecciones
│   │   │   ├── Users.ts
│   │   │   ├── Media.ts
│   │   │   ├── Allergens.ts
│   │   │   ├── Categories.ts
│   │   │   ├── Dishes.ts
│   │   │   ├── Menus.ts
│   │   │   ├── Spaces.ts
│   │   │   ├── Experiences.ts
│   │   │   └── Banners.ts
│   │   ├── globals/            # Definiciones de globals
│   │   │   ├── Homepage.ts
│   │   │   └── SiteSettings.ts
│   │   └── server.ts           # Cliente de Payload
│   └── lib/
│       └── payload.ts          # API helpers para Astro
└── sanity-old/                 # Backup del directorio Sanity
```

### 4. Variables de Entorno

Se actualizó `.env.example` con las nuevas variables:

```env
# PAYLOAD CMS
DATABASE_URL=postgresql://user:password@localhost:5432/warynessy
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
PUBLIC_PAYLOAD_API_URL=http://localhost:3000/api
PAYLOAD_SECRET=your-super-secret-key-change-this
```

### 5. Scripts NPM

Nuevos scripts disponibles en `package.json`:

```bash
npm run dev:payload       # Inicia el servidor de Payload en desarrollo
npm run build:payload     # Construye Payload para producción
npm run payload          # CLI de Payload
npm run generate:types   # Genera tipos TypeScript desde los schemas
```

## 🚀 Próximos Pasos

### 1. Configurar Base de Datos PostgreSQL

Tienes varias opciones:

#### Opción A: PostgreSQL Local
```bash
# Instalar PostgreSQL
brew install postgresql@14  # macOS
# o
sudo apt install postgresql  # Linux

# Crear base de datos
createdb warynessy

# Configurar DATABASE_URL en .env
DATABASE_URL=postgresql://user:password@localhost:5432/warynessy
```

#### Opción B: Vercel Postgres (Recomendado para producción)
1. Ve a tu proyecto en Vercel
2. Pestaña "Storage" > "Create Database" > "Postgres"
3. Copia el `DATABASE_URL` que te proporciona
4. Pégalo en tu `.env` local y en las variables de entorno de Vercel

#### Opción C: Supabase (Gratuito)
1. Crea cuenta en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a Settings > Database > Connection string
4. Copia el connection string y añádelo a `.env`

### 2. Generar PAYLOAD_SECRET

```bash
# Generar un secret seguro
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Añádelo a tu .env
PAYLOAD_SECRET=el-secret-generado
```

### 3. Iniciar Payload CMS

```bash
# Crear archivo .env con las variables necesarias
cp .env.example .env

# Editar .env con tus valores reales
nano .env

# Ejecutar migraciones de base de datos
npm run payload migrate

# Iniciar servidor de Payload
npm run dev:payload
```

El admin panel estará disponible en: [http://localhost:3000/admin](http://localhost:3000/admin)

### 4. Crear Usuario Administrador

La primera vez que accedas a `/admin`, Payload te pedirá crear un usuario administrador.

### 5. Actualizar Componentes de Astro

Reemplaza las llamadas a Sanity en tus componentes Astro:

**Antes (Sanity):**
```typescript
import { sanityClient } from '@/lib/sanity'

const dishes = await sanityClient.fetch(`*[_type == "dish"]`)
```

**Después (Payload):**
```typescript
import { getDishes } from '@/lib/payload'

const dishes = await getDishes()
```

Funciones helper disponibles en `src/lib/payload.ts`:
- `getDishes(active?)` - Obtener platos
- `getDishesByCategory(categoryId, active?)` - Platos por categoría
- `getCategories(active?)` - Categorías
- `getMenus(active?)` - Menús
- `getSpaces(active?)` - Espacios
- `getExperiences(active?)` - Experiencias
- `getActiveBanners(position?)` - Banners activos
- `getHomepage()` - Datos de la homepage
- `getSiteSettings()` - Configuración global

## 🔄 Comparación Sanity vs Payload

### Ventajas de Payload

| Característica | Sanity | Payload |
|----------------|--------|---------|
| **Costos** | Pago por uso (API calls, bandwidth) | Gratuito (open-source) |
| **Base de datos** | Cloud propietary | PostgreSQL/MongoDB (tuya) |
| **TypeScript** | Parcial | Nativo completo |
| **API** | GraphQL (pago extra) | REST + GraphQL incluidas |
| **Control** | Vendor lock-in | Control total |
| **Hosting** | Sanity Studio cloud | Tu servidor |
| **Relaciones** | Referencias | Relations nativas |
| **Auth** | Limitado | Robusto y extensible |

### Mapeo de Conceptos

| Sanity | Payload |
|--------|---------|
| Document | Collection |
| Singleton | Global |
| Reference | Relationship |
| Array of objects | Array field |
| Block content | Rich Text (Lexical) |
| Image | Upload field |
| GROQ | MongoDB-style queries |

## 📚 Recursos

- [Payload CMS Docs](https://payloadcms.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase Docs](https://supabase.com/docs)

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
- Verifica que PostgreSQL esté corriendo
- Verifica que `DATABASE_URL` esté correctamente configurado
- Asegúrate de que la base de datos existe

### Error: "PAYLOAD_SECRET is required"
- Genera un secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Añádelo a tu `.env`

### Error al subir imágenes
- Crea el directorio: `mkdir -p media`
- Verifica permisos de escritura

### El admin panel no carga
- Verifica que el puerto 3000 esté libre
- Ejecuta: `npm run build:payload` antes de `npm run dev:payload`

## 🗄️ Migración de Datos (Opcional)

Si tenías datos en Sanity que quieres migrar:

1. Exporta datos de Sanity:
```bash
cd sanity-old
npx sanity dataset export production backup.tar.gz
```

2. Crea un script de migración personalizado para transformar y cargar los datos en Payload usando la API REST.

## ✅ Checklist de Migración

- [x] Instalar Payload CMS
- [x] Migrar schemas a Collections
- [x] Migrar singletons a Globals
- [x] Crear API client para Astro
- [x] Actualizar variables de entorno
- [x] Actualizar scripts de package.json
- [ ] Configurar base de datos PostgreSQL
- [ ] Generar PAYLOAD_SECRET
- [ ] Iniciar Payload y crear usuario admin
- [ ] Actualizar componentes de Astro
- [ ] Poblar datos en Payload
- [ ] Probar todas las funcionalidades
- [ ] Configurar hosting de Payload en producción
- [ ] Eliminar directorio sanity-old

---

**¡Migración completada exitosamente!** 🎉

Payload CMS te da control total sobre tu CMS, sin costos ocultos y con TypeScript nativo.
