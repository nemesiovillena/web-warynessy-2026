# Migración Multilenguaje Warynessy - Documentación Completa

## 📋 Resumen del Proyecto

Migración de www.warynessy.com (Astro 5.x + Payload CMS 3.x + PostgreSQL 17) a 4 idiomas (es, en, fr, de) manteniendo SEO perfecto, UX impecable, accesibilidad WCAG 2.2 AA y zero-downtime en producción.

## 🎯 Objetivos Principales

- ✅ Español (es) como idioma base y defaultLocale (raíz / sin prefijo)
- ✅ Rutas: /en/, /fr/, /de/ (prefixDefaultLocale: false en Astro)
- ✅ Subdominio de staging: idiomas.warynessy.com (nueva DB + nuevo deploy)
- ✅ Merge a dominio principal con zero-downtime (DNS + blue-green)
- ✅ Datos existentes en castellano migrados intactos como es
- ✅ Resto de idiomas generados con DeepL + revisión humana

## 🏗️ Arquitectura Tecnológica Actual

### Tecnologías Detectadas (2026-02-23)

```json
{
  "astro": "^5.16.9",
  "payload": "3.74.0",
  "next": "15.4.10",
  "tailwindcss": "^4.1.18",
  "@payloadcms/db-postgres": "3.74.0",
  "@payloadcms/next": "3.74.0",
  "postgres": "^8.17.1",
  "sharp": "^0.34.5",
  "gsap": "^3.14.2",
  "swiper": "^12.0.3"
}
```

### Colecciones Payload CMS (11 colecciones)

1. **Usuarios** - Gestión de usuarios del CMS
2. **Archivos** - Gestión de media (Bunny Storage CDN)
3. **Alergenos** - Información de alérgenos de alimentos
4. **Categorias** - Categorías de platos
5. **Platos** - Platos del menú con imágenes, precios, alérgenos
6. **Menus** - Menús del restaurante
7. **MenusGrupo** - Grupos de menús
8. **Espacios** - Espacios del restaurante
9. **Banners** - Banners promocionales
10. **Paginas** - Páginas de contenido
11. **Experiencias** - Experiencias gastronómicas

### Globals Payload CMS (2)

1. **PaginaInicio** - Contenido de página principal
2. **ConfiguracionSitio** - Configuración global del sitio

### Estructura de Archivos

```
idioma.warynessy.com/
├── docker-compose.yml          # PostgreSQL 17 configurado
├── .env.example               # Variables de entorno
├── astro.config.mjs           # Configuración Astro (NECESITA i18n)
├── payload.config.ts          # Configuración Payload (NECESITA localization)
├── server.ts                  # Servidor Express
├── src/
│   ├── payload/
│   │   ├── collections/       # 11 colecciones
│   │   │   ├── Alergenos.ts
│   │   │   ├── Archivos.ts
│   │   │   ├── Banners.ts
│   │   │   ├── Categorias.ts
│   │   │   ├── Espacios.ts
│   │   │   ├── Experiencias.ts
│   │   │   ├── Menus.ts
│   │   │   ├── MenusGrupo.ts
│   │   │   ├── Paginas.ts
│   │   │   ├── Platos.ts      # EJEMPLO: nombre, descripcion, precio, etc.
│   │   │   └── Usuarios.ts
│   │   ├── globals/           # 2 globals
│   │   │   ├── PaginaInicio.ts
│   │   │   └── ConfiguracionSitio.ts
│   │   └── payload-types.ts   # Tipos generados automáticamente
│   └── [componentes frontend]
├── public/
├── scripts/
└── docs/
```

## 📝 Plan de Sprints (6 semanas estimadas)

### Sprint 0 – Preparación (1 semana) ✅ INICIADO

**Estado actual:**
- ✅ Docker Compose configurado con PostgreSQL 17
- ✅ .env.example creado con todas las variables necesarias
- ✅ Repositorio clonado y analizado
- ✅ Tecnologías y dependencias identificadas

**Pendientes:**
- ⏳ Crear branch `feature/i18n-multilang`
- ⏳ Levantar BD Docker: `docker compose up -d db`
- ⏳ Configurar subdominio idiomas.warynessy.com
- ⏳ Migrar dump de producción a BD local
- ⏳ Validar datos existentes

**Comandos:**
```bash
# Levantar BD
docker compose up -d db

# Migrar datos (cuando se tenga el dump)
docker compose exec -T db psql -U postgres warynessy < warynessy.dump

# Verificar conexión
docker compose exec db psql -U postgres warynessy -c "SELECT COUNT(*) FROM platos;"
```

### Sprint 1 – Base de Datos & Payload Localization (1 semana)

**Objetivos:**
- Configurar localization en payload.config.ts
- Migrar estructura de colecciones a multiidioma
- Crear script de migración de datos existentes
- Implementar integración DeepL batch

**Cambios requeridos en colecciones:**

Ejemplo de transformación para `Platos.ts`:
```typescript
// ANTES (monolingüe)
fields: [
  {
    name: 'nombre',
    type: 'text',
    label: 'Nombre del Plato',
    required: true,
  },
  {
    name: 'descripcion',
    type: 'textarea',
    label: 'Descripción / Ingredientes',
  },
  // ... otros campos no localizados
]

// DESPUÉS (multilenguaje)
fields: [
  {
    name: 'nombre',
    type: 'text',
    label: 'Nombre del Plato',
    required: true,
    localized: true, // ← NUEVO
  },
  {
    name: 'descripcion',
    type: 'textarea',
    label: 'Descripción / Ingredientes',
    localized: true, // ← NUEVO
  },
  // ... campos no localizados (precio, orden, etc.)
]
```

**Campos que deben ser localizados:**
- Textos descriptivos (nombre, descripción, contenido)
- Meta tags (title, description)
- Etiquetas personalizadas

**Campos que NO deben ser localizados:**
- Slug (mantener en español)
- Números (precio, orden)
- Booleans (activo, destacado)
- Relaciones
- Fechas

**Script de migración:** `scripts/migrate-locales.ts`
```typescript
// 1. Leer todos los registros existentes
// 2. Para cada campo localized: true
// 3. Traducir de ES a EN, FR, DE con DeepL
// 4. Actualizar registro con nuevo formato: { es: "valor", en: "trad", ... }
```

### Sprint 2 – Astro i18n Routing + Frontend (1 semana)

**Cambios en astro.config.mjs:**

```javascript
// ANTES
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'middleware' }),
  // ... resto de config
})

// DESPUÉS
import i18n from 'astro-i18next' // o @astrojs/i18n

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'middleware' }),
  integrations: [
    i18n({
      defaultLocale: 'es',
      locales: ['es', 'en', 'fr', 'de'],
      prefixDefaultLocale: false, // / para español, /en/ para inglés
      routing: {
        redirectToDefaultLocale: false,
      },
    }),
    sitemap(),
  ],
  site: 'https://warynessy.com',
  // ... resto de config
})
```

**Componente de selección de idioma:**

`src/components/LanguageSelector.tsx`
```tsx
import { getRelativeLocaleUrl } from 'astro:i18n'
import { useState } from 'react'

const languages = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
]

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        {currentLocaleFlag}
      </button>
      {isOpen && (
        <ul className="absolute dropdown">
          {languages.map(lang => (
            <li key={lang.code}>
              <a href={getRelativeLocaleUrl(lang.code)}>
                {lang.flag} {lang.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### Sprint 3 – Integración DeepL + Hooks Automáticos (1 semana)

**Hook de traducción automática:**

`src/payload/hooks/autoTranslate.ts`
```typescript
import { DeepL } from 'deepl-node'

const deepl = new DeepL(process.env.DEEPL_AUTH_KEY!)

export const autoTranslateHook = async ({ data, previousData, req }) => {
  // Detectar cambios en español
  const changesInEs = detectChanges(data.es, previousData?.es)
  
  if (changesInEs.length > 0) {
    // Traducir automáticamente a EN, FR, DE
    for (const field of changesInEs) {
      const translations = await translateText(
        data.es[field],
        ['en', 'fr', 'de']
      )
      
      data.en[field] = translations.en
      data.fr[field] = translations.fr
      data.de[field] = translations.de
    }
  }
  
  return data
}
```

### Sprint 4 – SEO, Accesibilidad, Testing & Seguridad (1 semana)

**SEO Multilenguaje:**
- Sitemap por idioma: sitemap-es.xml, sitemap-en.xml, etc.
- Hreflang tags en cada página
- Meta tags dinámicos por idioma

**Accesibilidad WCAG 2.2 AA:**
- `lang` attribute en `<html>` por idioma
- Alt texts traducidos para imágenes
- ARIA labels en selectors de idioma
- Focus management en cambio de idioma

**Testing E2E:**
- Suite de Playwright para cada idioma
- Tests de navegación entre idiomas
- Tests de contenido traducido

### Sprint 5 – Marketing, Documentación & Go-Live (1 semana)

**Marketing:**
- Adaptar copywriting por cultura
- Landing pages específicas por idioma
- CTAs localizados

**Documentación:**
- README multilenguaje
- Guías de uso del CMS multilenguaje
- Documentación de API multilenguaje

**Go-Live:**
- Deploy blue-green a producción
- Validación completa en staging
- Merge sin downtime

## 🔧 Configuración de Variables de Entorno

Crear `.env` (no commit en Git):

```bash
# ===========================================
# Configuración de Base de Datos PostgreSQL
# ===========================================
POSTGRES_PASSWORD=your_secure_password_here
DATABASE_URL=postgresql://postgres:your_secure_password_here@localhost:5433/warynessy

# ===========================================
# Configuración Payload CMS
# ===========================================
PAYLOAD_SECRET=your_payload_secret_key_here_generate_with_openssl_rand_base64_32
PAYLOAD_PUBLIC_SERVER_URL=https://idiomas.warynessy.com
PUBLIC_SITE_URL=https://www.warynessy.com

# ===========================================
# Configuración DeepL
# ===========================================
DEEPL_AUTH_KEY=your_deepl_api_key_here
DEEPL_SOURCE_LANG=ES
DEEPL_TARGET_LANGUAGES=EN,FR,DE

# ===========================================
# Configuración Astro
# ===========================================
SITE_URL=https://idiomas.warynessy.com
PROD_SITE_URL=https://www.warynessy.com

# ===========================================
# Configuración i18n
# ===========================================
DEFAULT_LOCALE=es
LOCALES=es,en,fr,de

# ===========================================
# Variables de Entorno (Node)
# ===========================================
NODE_ENV=development
PORT=4321

# ===========================================
# Bunny Storage (CDN)
# ===========================================
BUNNY_STORAGE_PASSWORD=your_bunny_storage_password
BUNNY_STORAGE_ZONE_NAME=your_zone_name
PUBLIC_BUNNY_CDN_URL=warynessy.b-cdn.net
```

## 📦 Instalación de Dependencias Adicionales

```bash
# Core i18n
npm install @astrojs/i18next astro-i18next

# DeepL
npm install deepl-node

# Country flags
npm install react-country-flag

# SEO
npm install @astrojs/sitemap

# Testing (opcional)
npm install -D @playwright/test
```

## 🔄 Flujo de Trabajo de Traducción

1. **Contenido en Español (Base)**
   - Se crea/actualiza en el CMS
   - Se marca como idioma principal

2. **Traducción Automática (DeepL)**
   - Hook detecta cambio en ES
   - Traduce automáticamente a EN, FR, DE
   - Marca como "requiere revisión"

3. **Revisión Humana**
   - Content Manager revisa traducciones
   - Acepta o corrige manualmente
   - Marca como "aprobado"

4. **Publicación**
   - Contenido disponible en todos los idiomas
   - SEO optimizado con hreflang

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Levantar BD PostgreSQL
docker compose up -d db

# Iniciar servidor de desarrollo (Astro + Payload)
npm run dev

# Iniciar solo Payload admin
npm run dev:admin

# Build para producción
npm run build

# Start en producción
npm start
```

## 📊 Checklist de Migración por Colección

- [ ] **Alergenos** - localizar nombre, descripción
- [ ] **Archivos** - NO localizar (solo metadata)
- [ ] **Banners** - localizar título, texto, CTA
- [ ] **Categorias** - localizar nombre, descripción
- [ ] **Espacios** - localizar nombre, descripción
- [ ] **Experiencias** - localizar nombre, descripción, detalles
- [ ] **Menus** - localizar nombre, descripción
- [ ] **MenusGrupo** - localizar nombre, descripción
- [ ] **Paginas** - localizar título, contenido, slug (mantener ES)
- [ ] **Platos** - localizar nombre, descripción, etiquetas
- [ ] **Usuarios** - NO localizar (sistema)

## 📚 Recursos Adicionales

- [Astro i18n Documentation](https://docs.astro.build/en/guides/internationalization/)
- [Payload CMS Localization](https://payloadcms.com/docs/configuration/localization)
- [DeepL API Documentation](https://www.deepl.com/docs-api/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Google SEO Multilingual Sites](https://developers.google.com/search/docs/specialty/international)

## ⚠️ Notas Importantes

1. **Zero-Downtime Strategy**: Utilizar blue-green deployment con subdominio de staging
2. **Data Preservation**: Datos existentes en español NO se modifican, solo se transforman al nuevo formato
3. **SEO Preservation**: Mantener URLs existentes, agregar prefijos de idioma sin redirecciones 301
4. **Performance**: Implementar cacheo por idioma en Payload
5. **Testing**: Validar exhaustivamente en staging antes de merge

---

**Estado del proyecto**: Sprint 0 - Preparación en curso
**Última actualización**: 2026-02-23
**Responsable**: Equipo de Desarrollo Warynessy