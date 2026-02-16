# Guía de Desarrollo - Idiomas (i18n)

## 📋 Resumen

El proyecto está configurado para soportar 4 idiomas: **Español (es), Inglés (en), Francés (fr)** y **Alemán (de)**.

La implementación utiliza:
- **Payload CMS Localization**: Gestión de contenido multi-idioma en el backend
- **DeepL API**: Traducción automática desde español a otros idiomas
- **Astro i18n**: Manejo de rutas y rendering por idioma en el frontend

---

## 🚀 Modos de Desarrollo

### Opción 1: Servidor Unificado (Producción)
**Recomendado para:**
- Verificar la aplicación completa
- Testing de producción
- Despliegue

```bash
# Compilar Astro
npm run build:astro

# Iniciar servidor unificado (puerto 3000)
npm run dev:payload
```

**URLs:**
- Frontend: http://localhost:3000/
- Payload Admin: http://localhost:3000/admin
- API: http://localhost:3000/api

**⚠️ Limitaciones:**
- Debes recompilar Astro cada vez que hagas cambios
- No tiene hot reload

---

### Opción 2: Dos Servidores Separados (Desarrollo) ⭐
**Recomendado para:**
- Desarrollo activo
- Hot reload
- Pruebas rápidas

```bash
# Iniciar ambos servidores
npm run dev:all
```

**URLs:**
- **Frontend (Astro)**: http://localhost:4321/
  - Hot reload automático
  - Cambios instantáneos
- **Payload Admin (Next.js)**: http://localhost:3000/admin
  - Panel de administración
  - Gestión de contenido

**Logs:**
- Astro: `logs/astro.log`
- Payload: `logs/payload.log`

---

## 🌐 Estructura de Rutas (Astro i18n)

### Rutas Disponibles

| Idioma | Ruta | URL |
|--------|------|-----|
| Español | `/` | http://localhost:4321/ |
| Inglés | `/en/` | http://localhost:4321/en/ |
| Francés | `/fr/` | http://localhost:4321/fr/ |
| Alemán | `/de/` | http://localhost:4321/de/ |

### Ejemplos

- **Inicio español**: `http://localhost:4321/`
- **Inicio inglés**: `http://localhost:4321/en/`
- **Menús español**: `http://localhost:4321/menus`
- **Menús inglés**: `http://localhost:4321/en/menus`
- **Reservas español**: `http://localhost:4321/reservas`
- **Reservas francés**: `http://localhost:4321/fr/reservas`

---

## 📝 Flujo de Trabajo con Idiomas

### 1. Crear Contenido en Español

1. Accede al panel de Payload: http://localhost:3000/admin
2. Crea o edita contenido en español (idioma por defecto)
3. Guarda los cambios

### 2. Traducción Automática

**Configuración:**
- La API key de DeepL está configurada en `.env` (`DEEPL_API_KEY`)
- El hook `auto-translate` detecta cambios en español
- Traduce automáticamente a: inglés, francés y alemán

**Proceso:**
1. Al guardar en español, el sistema traduce campos vacíos en otros idiomas
2. Las traducciones se guardan automáticamente en la base de datos
3. Puedes ver/editar traducciones manuales en Payload

### 3. Verificar en el Frontend

1. Navega a: http://localhost:4321/
2. Usa el selector de idioma (banderas) en el header
3. Cambia entre idiomas para ver las traducciones

---

## 🛠️ Componentes y Utilidades

### Selector de Idioma

**Ubicación:** `src/components/ui/LanguageSwitcher.astro`

**Uso en Header:**
```astro
<LanguageSwitcher class="mr-4" />
```

**Características:**
- Banderas: 🇪🇸 🇬🇧 🇫🇷 🇩🇪
- Hover para mostrar menú
- Cambia la URL al idioma seleccionado

---

### Obtener Datos en un Idioma Específico

**Todas las funciones de `src/lib/payload-local.ts` aceptan el parámetro `locale`:**

```typescript
// Obtener platos en inglés
const platosEn = await getPlatos(true, 'en')

// Obtener menús en francés
const menusFr = await getMenus(true, 'fr')

// Obtener configuración del sitio en alemán
const configDe = await getConfiguracionSitio('de')
```

**En páginas de Astro:**
```astro
---
const locale = Astro.currentLocale;
const siteSettings = await getSiteSettings(locale);
const homepage = await getHomepage(locale);
---
```

---

## 🔧 Configuración

### Payload CMS (`payload.config.ts`)

```typescript
localization: {
  locales: ['es', 'en', 'fr', 'de'],
  defaultLocale: 'es',
  fallback: true,
}
```

### Astro (`astro.config.mjs`)

```typescript
i18n: {
  defaultLocale: 'es',
  locales: ['es', 'en', 'fr', 'de'],
  routing: {
    prefixDefaultLocale: false, // / no /es
  },
}
```

### Variables de Entorno (`.env`)

```env
# API Key de DeepL para traducción automática
DEEPL_API_KEY=your_deepl_api_key_here

# URLs de los servidores
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
PUBLIC_PAYLOAD_API_URL=http://localhost:3000/api
PUBLIC_SITE_URL=http://localhost:4321
```

---

## 🐛 Troubleshooting

### Problema: Las traducciones no aparecen

**Solución:**
1. Verifica que `DEEPL_API_KEY` esté configurada en `.env`
2. Asegúrate de editar en el idioma español (default locale)
3. Revisa los logs de Payload para errores de traducción
4. Verifica que los campos en otros idiomas estén vacíos antes de guardar

### Problema: El selector de idioma no funciona

**Solución:**
1. Asegúrate de que Astro i18n esté configurado
2. Verifica que estás usando dos servidores (`npm run dev:all`)
3. Revisa la consola del navegador para errores de JavaScript

### Problema: Error al acceder a http://localhost:4321

**Solución:**
1. Ejecuta `npm run dev:all` para iniciar ambos servidores
2. O ejecuta `npm run dev` para solo Astro
3. Verifica que el puerto 4321 no esté en uso

### Problema: Error al acceder a Payload Admin

**Solución:**
1. Ejecuta `npm run dev:admin` para iniciar Payload
2. O ejecuta `npm run dev:all` para ambos servidores
3. Verifica que el puerto 3000 no esté en uso
4. Revisa el archivo `.env` para conexión a PostgreSQL

---

## 📚 Referencias Útiles

- [Documentación de Payload Localization](https://payloadcms.com/docs/configuration/localization)
- [Documentación de Astro i18n](https://docs.astro.build/en/guides/i18n/)
- [API de DeepL](https://www.deepl.com/es/docs-api/)

---

## ✅ Checklist de Implementación de Idiomas

- [x] Configurar localización en Payload
- [x] Implementar hook de auto-traducción (DeepL)
- [x] Configurar i18n en Astro
- [x] Crear componente LanguageSwitcher
- [x] Actualizar funciones de fetch para soportar `locale`
- [x] Configurar DeepL API key
- [x] Crear script de desarrollo con dos servidores
- [ ] Probar traducción automática
- [ ] Verificar selector de idioma en todas las páginas
- [ ] Probar navegación entre idiomas

---

## 🚀 Próximos Pasos

1. **Probar traducción automática:**
   - Crear un plato nuevo en español
   - Verificar que se traduzca automáticamente
   - Comprobar traducciones en el frontend

2. **Texto estático del UI:**
   - Traducir botones y etiquetas fijas (reservar, contactar, etc.)
   - Opción A: Diccionario JSON
   - Opción B: Colección "Configuración Sitio" en Payload

3. **SEO multi-idioma:**
   - Verificar meta tags en cada idioma
   - Comprobar sitemap con todas las URLs

4. **Testing:**
   - Probar navegación completa en cada idioma
   - Verificar que el contenido cambia correctamente
   - Comprobar que el selector de idioma funciona en móviles