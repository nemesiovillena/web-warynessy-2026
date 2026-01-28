# Gestión del Proyecto - Web Warynessy 2026

## Estado del Proyecto
**Última actualización:** 2026-01-28
**Estado General:** 🟡 En Desarrollo

---

## 📋 Índice de Fases
1. [Fase 0: Configuración Inicial](#fase-0-configuración-inicial)
2. [Fase 1: Backend - CMS Payload](#fase-1-backend---cms-payload)
3. [Fase 2: Frontend - Estructura Astro](#fase-2-frontend---estructura-astro)
4. [Fase 3: Componentes Base](#fase-3-componentes-base)
5. [Fase 4: Páginas Principales](#fase-4-páginas-principales)
6. [Fase 5: Animaciones y Efectos](#fase-5-animaciones-y-efectos)
7. [Fase 6: Integraciones Externas](#fase-6-integraciones-externas)
8. [Fase 7: Optimización y SEO](#fase-7-optimización-y-seo)
9. [Fase 8: Testing y QA](#fase-8-testing-y-qa)
10. [Fase 9: Despliegue y Producción](#fase-9-despliegue-y-producción)

---

## Fase 0: Configuración Inicial
**Estado:** ✅ Completada

### ✅ Tareas Completadas
- [x] Crear repositorio GitHub "web-warynessy-2026"
- [x] Configurar estructura de documentación
- [x] Definir stack tecnológico
- [x] Definir arquitectura de datos
- [x] Definir esquemas de CMS
- [x] Definir paleta de colores
- [x] Crear documento de puntos críticos
- [x] Crear documento de gestión del proyecto
- [x] Configurar .gitignore adecuado
- [x] Crear archivo README.md del proyecto
- [x] Implementar etiquetas dinámicas en platos (badges)
- [x] Documentar todas las variables de entorno (.env.example)

---

## Fase 1: Backend - CMS Payload
**Estado:** ✅ Completada

> **Nota:** Se migró de Sanity.io a Payload CMS para tener mayor control y usar base de datos local PostgreSQL.

### Configuración Base
- [x] Instalar PostgreSQL 14 (Homebrew)
- [x] Crear base de datos 'warynessy'
- [x] Configurar Payload CMS 3.x
- [x] Configurar adaptador PostgreSQL
- [x] Configurar variables de entorno (DATABASE_URL, PAYLOAD_SECRET)
- [x] Crear payload.config.ts con todas las colecciones

### Colecciones del CMS (9 colecciones)
- [x] **Users** - Usuarios del sistema
  - [x] Email, password, nombre, apellido
  - [x] Rol (admin/editor)

- [x] **Media** - Archivos multimedia
  - [x] Subida de imágenes
  - [x] Alt text para accesibilidad

- [x] **Allergens** - Alérgenos
  - [x] Nombre del alérgeno
  - [x] Código identificador
  - [x] Icono/emoji
  - [x] Orden de aparición

- [x] **Categories** - Categorías de Carta
  - [x] Nombre de categoría
  - [x] Slug único
  - [x] Descripción opcional
  - [x] Imagen de categoría
  - [x] Orden de aparición
  - [x] Estado activa/inactiva

- [x] **Dishes** - Platos
  - [x] Nombre del plato
  - [x] Descripción/ingredientes
  - [x] Precio
  - [x] Imagen del plato
  - [x] Categoría (relación)
  - [x] Alérgenos (array de relaciones)
  - [x] Estado activo/inactivo
  - [x] Destacado (boolean)
  - [x] Orden dentro de categoría

- [x] **Menus** - Menús especiales
  - [x] Nombre del menú
  - [x] Descripción
  - [x] Imagen promocional
  - [x] PDF descargable
  - [x] Precio
  - [x] Días disponibles
  - [x] Fechas de validez
  - [x] Estado activo/inactivo
  - [x] Orden de aparición

- [x] **Spaces** - Espacios del Restaurante
  - [x] Nombre del espacio
  - [x] Descripción
  - [x] Imagen principal
  - [x] Galería de imágenes
  - [x] Capacidad
  - [x] Características
  - [x] Estado activo/inactivo
  - [x] Orden de aparición

- [x] **Experiences** - Experiencias/Regalos
  - [x] Nombre de la experiencia
  - [x] Resumen corto
  - [x] Descripción completa
  - [x] Precio
  - [x] Imagen
  - [x] Color de fondo
  - [x] Link de compra
  - [x] Estado activo/inactivo
  - [x] Orden de aparición

- [x] **Banners** - Banners promocionales
  - [x] Título
  - [x] Subtítulo
  - [x] Imagen
  - [x] Texto del botón
  - [x] Link del botón
  - [x] Posición (hero/floating/footer)
  - [x] Prioridad
  - [x] Fechas de validez
  - [x] Estado activo/inactivo

### Globals del CMS (2 globals)
- [x] **Homepage** - Configuración de página inicio
  - [x] Hero title
  - [x] Hero subtitle
  - [x] Hero image
  - [x] Texto de bienvenida (rich text)
  - [x] Galería de inicio
  - [x] Espacios destacados
  - [x] Experiencias destacadas

- [x] **SiteSettings** - Configuración global
  - [x] Título del sitio
  - [x] Descripción
  - [x] Logo
  - [x] Información de contacto (teléfono, email, dirección)
  - [x] Horarios de apertura
  - [x] Redes sociales
  - [x] Copyright

### Scripts de Datos
- [x] **seed.ts** - Script para poblar datos iniciales
  - [x] Usuario administrador (admin@warynessy.com)
  - [x] 14 alérgenos
  - [x] 5 categorías base
  - [x] 11 platos de ejemplo
  - [x] Configuración del sitio

- [x] **reset.ts** - Script para limpiar base de datos
  - [x] Elimina todas las colecciones en orden correcto
  - [x] Resetea globals a valores vacíos

### Integración con Astro
- [x] Crear cliente local Payload (`src/lib/payload-local.ts`)
- [x] Funciones helper para obtener datos:
  - [x] getDishes(), getDishesByCategory()
  - [x] getCategories(), getAllergens()
  - [x] getMenus(), getSpaces(), getExperiences()
  - [x] getActiveBanners()
  - [x] getHomepage(), getSiteSettings()
  - [x] getCategoriesWithDishes(), getFeaturedDishes()

---

## Fase 2: Frontend - Estructura Astro
**Estado:** ✅ Completada (100%)

### Configuración Base
- [x] Inicializar proyecto Astro
- [x] Configurar TypeScript estricto
- [x] Instalar Tailwind CSS
- [x] Configurar Tailwind con paleta personalizada
- [x] Instalar dependencias base (GSAP, Swiper, etc.)
- [x] Configurar cliente de Payload en Astro
- [x] Configurar estructura de carpetas

### Configuración Avanzada
- [x] Configurar `astro.config.mjs` completo
- [x] Configurar View Transitions
- [x] Configurar Image optimization
- [x] Configurar sitemap
- [x] Configurar robots.txt
- [x] Crear tipos TypeScript para Payload

### Layouts Base
- [x] Crear `BaseLayout.astro` (HTML base)
- [x] Crear `MainLayout.astro` (con Header/Footer)
- [x] Configurar meta tags dinámicos
- [x] Configurar Open Graph tags
- [x] Configurar structured data (JSON-LD)

---

## Fase 3: Componentes Base
**Estado:** ✅ Completada (100%)

### Componentes Globales
- [x] **Header**
  - [x] Logo responsive
  - [x] Navegación desktop
  - [x] Menú hamburguesa mobile
  - [x] Botón de reservas destacado
  - [x] Sticky header al scroll
  - [x] Animación de aparición

- [x] **Footer**
  - [x] Información de contacto
  - [x] Horarios
  - [x] Links de redes sociales
  - [x] Logos de certificaciones (Sicted)
  - [x] Links legales
  - [x] Copyright
  - [x] Mapa de ubicación

- [x] **Navigation Mobile**
  - [x] Overlay fullscreen
  - [x] Animación de entrada/salida
  - [x] Links principales
  - [x] Botón cerrar

### Componentes UI Reutilizables
- [x] **Button** (variantes: primary, secondary, outline)
- [x] **Card** (para platos, menús, espacios)
- [x] **Image** (wrapper con lazy loading y WebP)
- [x] **Section** (contenedor con padding consistente)
- [x] **Container** (max-width responsive)
- [x] **Badge** (para alérgenos, etiquetas)
- [x] **Modal** (base reutilizable)
- [x] **Loading** (spinner/skeleton)
- [x] **ErrorBoundary** (manejo de errores)

### Componentes de Contenido
- [x] **DishCard** (tarjeta de plato con precio, imagen, alérgenos)
- [x] **MenuCard** (tarjeta de menú con imagen y descripción)
- [x] **SpaceCard** (tarjeta de espacio del restaurante)
- [x] **GiftCard** (tarjeta de experiencia/regalo)
- [x] **CategorySection** (sección de categoría en carta)
- [x] **AllergenBadge** (icono + tooltip de alérgeno)
- [x] **PriceTag** (formato consistente de precios)

---

## Fase 4: Páginas Principales
**Estado:** ✅ Completada (100%)

### Página Home (Landing)
- [x] Hero section con imagen parallax
- [x] Sección de horarios
- [x] Texto de bienvenida/historia (Our Story)
- [x] Sección "Nuestros Espacios"
- [x] Banner de experiencias/regalos (Gift Card)
- [x] Sección de reseñas y feed Instagram (placeholder)
- [x] Galería de imágenes del restaurante
- [x] Call-to-action de reservas

### Página Carta
- [x] Sistema de filtros por categoría
- [x] Grid responsive de platos
- [x] Filtro por alérgenos (integrado en cards)
- [x] Sidebar de categorías (desktop)
- [x] Pills de categorías (mobile)
- [x] Indicador de alérgenos

### Página Menús
- [x] Grid de menús disponibles
- [x] Cards de menú con imagen y descripción

### Página Espacios
- [x] Hero con imagen del espacio
- [x] Descripción detallada de cada espacio
- [x] Información de capacidad
- [x] Botón de reserva

### Página Experiencias/Regala
- [x] Hero section con imagen parallax personalizada desde CMS
- [x] Integración oficial del widget de Covermanager (Experiencias)
- [x] Guía de compra y canje de menús regalo

### Páginas Legales
- [x] Aviso Legal
- [x] Política de Privacidad
- [x] Política de Cookies

### Página Nosotros/Historia
- [x] Timeline de la historia del restaurante
- [x] Fotos históricas
- [x] Filosofía y valores
- [x] Equipo
- [x] Premios y reconocimientos

### Página Reservas
- [x] Integración iframe de CoverManager
- [x] Información sobre el proceso
- [x] Horarios disponibles
- [x] Política de cancelación
- [x] Contacto alternativo

### Página Contacto
- [x] Formulario de contacto
- [x] Información de contacto
- [x] Mapa interactivo (Google Maps)
- [x] Horarios detallados
- [x] Cómo llegar
- [x] Parking y accesibilidad

### Banner de Cookies
- [x] Banner de consentimiento cookies

---

## Fase 5: Animaciones y Efectos
**Estado:** ✅ Completada (100%)

### GSAP ScrollTrigger
- [x] Configurar GSAP y ScrollTrigger (Global)
- [x] Parallax en hero sections
- [x] Animaciones de fade-in al scroll
- [x] Animaciones de slide-in laterales (Stagger)
- [x] Scale effects en imágenes
- [x] Optimizar rendimiento de animaciones (Client-side only)

### Microinteracciones
- [x] Hover effects en botones
- [x] Active states (click feedback)
- [x] Hover effects en cards
- [x] Animación de menú hamburguesa (Fase anterior)
- [ ] Loading states (Progressive enhancement)
- [ ] Toast notifications (Future)
- [ ] Smooth scroll en navegación
- [ ] Page transitions (View Transitions API)

---

## Fase 6: Integraciones Externas
**Estado:** 🟡 En Progreso (80%)

### CoverManager (Reservas y Experiencias)
- [x] Obtener código de integración
- [x] Implementar widget/iframe de Reservas
- [x] Implementar widget/iframe de Experiencias/Menús Regalo
- [ ] Testear flujo completo de reserva y compra
- [x] Responsive mobile y ajuste dinámico de altura (iFrameResizer)

### Google Places API (Reseñas)
- [x] Configurar API key
- [x] Crear endpoint/función para reseñas (lib/google-reviews.ts + api/reviews.ts)
- [x] Componente de visualización (en Home + GoogleReviews.astro)
- [x] Sistema de caché (endpoint con caché 1 hora)
- [x] Fetch en build time (index.astro)
- [x] Fallback si API falla

### Instagram API
- [x] Configurar Instagram Basic Display API (lib/instagram.ts)
- [x] Crear endpoint para últimos posts (api/instagram.ts)
- [x] Sistema de caché (30 minutos en endpoint)
- [x] Componente de galería Instagram (en Home Section 7)
- [x] Enlaces a perfil de Instagram
- [x] Fallback si API falla (mock posts)

### Bunny.net CDN
- [ ] Crear cuenta Bunny.net
- [ ] Configurar pull zone
- [ ] Migrar imágenes pesadas
- [ ] Configurar transformaciones de imagen
- [ ] Testear velocidad de carga
- [ ] Configurar cache headers

### Google Analytics / Tracking
- [x] Configurar Google Analytics 4
- [x] Cookie consent integration
- [ ] Implementar tracking de eventos
- [ ] Tracking de conversiones (reservas)
- [ ] Tracking de clicks en menú
- [ ] Dashboard de métricas básicas

---

## Fase 7: Optimización y SEO
**Estado:** 🟡 En Progreso (70%)

### Performance
- [x] Lazy loading de imágenes (ResponsiveImage con loading="lazy")
- [x] Decoding async en imágenes
- [x] Preload de fuentes (preconnect fonts.googleapis.com)
- [ ] Optimización de imágenes (WebP/AVIF) - pendiente Bunny CDN
- [ ] Code splitting
- [ ] Minificación de CSS/JS (build time)
- [ ] Font optimization (subset fonts)
- [ ] Lighthouse score > 90 (todas las métricas)
- [ ] Core Web Vitals optimizados

### SEO On-Page
- [x] Meta descriptions únicas por página (SEO.astro)
- [x] Title tags optimizados
- [x] Alt text en todas las imágenes (ResponsiveImage requiere alt)
- [x] URLs amigables (Astro file-based routing)
- [x] Sitemap XML (astro-sitemap integration)
- [x] Robots.txt configurado
- [x] Canonical URLs (SEO.astro)
- [ ] Estructura de headings (H1, H2, H3) - verificar

### SEO Técnico
- [x] Schema.org - Restaurant (Schema.astro)
- [x] Schema.org - Menu (Schema.astro)
- [x] Open Graph tags (SEO.astro con og:locale, og:site_name)
- [x] Twitter Cards (SEO.astro)
- [x] Theme color para móviles
- [x] Robots meta tag
- [x] Schema.org - LocalBusiness
- [ ] Datos estructurados validados (Google Rich Results Test)
- [ ] Search Console configurado
- [ ] Verificación de indexación

### Accesibilidad
- [x] Labels en formularios (contacto.astro)
- [x] ARIA roles en dialogs (CookieBanner)
- [x] Skip to content link (MainLayout.astro)
- [x] Focus visible styles (global.css)
- [x] Prefers-reduced-motion (global.css)
- [x] Navegación por teclado (focus-visible en todos los elementos)
- [ ] Contraste de colores WCAG AA - verificar
- [ ] Test con screen reader
- [ ] Lighthouse Accessibility > 90

---

## Fase 8: Testing y QA
**Estado:** ⚪ Pendiente

### Testing Funcional
- [ ] Navegación completa en todas las páginas
- [ ] Formulario de contacto funcional
- [ ] Widget de reservas funcional
- [ ] Filtros de carta funcionando
- [ ] Links externos funcionando
- [ ] Descarga de PDFs (si aplica)
- [ ] Integración CMS > Frontend correcta

### Testing Cross-Browser
- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari (última versión)
- [ ] Edge (última versión)
- [ ] Safari iOS
- [ ] Chrome Android

### Testing Responsive
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] Large Desktop (1920px+)
- [ ] Orientación portrait/landscape

### Testing de Rendimiento
- [ ] Lighthouse Performance > 90
- [ ] GTmetrix Grade A
- [ ] WebPageTest Speed Index < 3s
- [ ] Tiempo de carga total < 2s
- [ ] TTI (Time to Interactive) < 3.5s

### Testing de Seguridad
- [ ] HTTPS configurado
- [ ] Headers de seguridad (CSP, HSTS)
- [ ] Sanitización de inputs
- [ ] Protección CSRF en formularios
- [ ] Validación de datos de entrada
- [ ] API keys protegidas (no expuestas)

---

## Fase 9: Despliegue y Producción
**Estado:** ⚪ Pendiente

### Preparación Pre-Deploy
- [ ] Configurar variables de entorno en Vercel/Netlify
- [ ] Configurar dominio personalizado
- [ ] Configurar certificado SSL
- [ ] Configurar redirects necesarios
- [ ] Configurar headers personalizados
- [ ] Crear backup de base de datos

### Deploy Payload CMS
- [ ] Configurar PostgreSQL en producción (Vercel Postgres/Supabase)
- [ ] Deploy de Payload admin (si se usa)
- [ ] Configurar usuarios y permisos finales
- [ ] Crear guía de uso para el cliente

### Deploy Frontend
- [ ] Conectar repositorio a Vercel/Netlify
- [ ] Configurar build settings
- [ ] Deploy a ambiente de staging
- [ ] Review completo en staging
- [ ] Deploy a producción
- [ ] Verificar deploy exitoso

### Configuración DNS
- [ ] Configurar registros A/CNAME
- [ ] Configurar registro MX (si email)
- [ ] Verificar propagación DNS
- [ ] Testear dominio final

### Post-Deploy
- [ ] Verificar todas las páginas en producción
- [ ] Verificar analytics funcionando
- [ ] Verificar integraciones externas
- [ ] Submit sitemap a Google
- [ ] Submit sitemap a Bing
- [ ] Configurar Google My Business

### Monitoreo y Mantenimiento
- [ ] Configurar uptime monitoring (UptimeRobot)
- [ ] Configurar alertas de errores (Sentry)
- [ ] Configurar backup automático de BD
- [ ] Documentar proceso de actualización
- [ ] Crear manual de uso para cliente
- [ ] Planificar revisiones mensuales

---

## 📊 Resumen de Progreso

### Por Fase
- **Fase 0:** ✅ Completada (100%)
- **Fase 1:** ✅ Completada (100%) - Migración a Payload CMS
- **Fase 2:** ✅ Completada (100%)
- **Fase 3:** ✅ Completada (100%)
- **Fase 4:** ✅ Completada (100%)
- **Fase 5:** ✅ Completada (100%) - Animaciones y Microinteracciones
- **Fase 6:** 🟡 En Progreso (80%) - CoverManager + GA4 + Reviews + Instagram integrados
- **Fase 7:** 🟡 En Progreso (70%) - SEO + Accesibilidad mejorada
- **Fase 8:** ⚪ Pendiente (0%)
- **Fase 9:** ⚪ Pendiente (0%)

### Progreso Total: ~85%

---

## 🎯 Próximos Pasos Inmediatos

1. ✅ ~~Completar configuración inicial (Fase 0)~~
2. ✅ ~~Migrar de Sanity a Payload CMS~~
3. ✅ ~~Configurar PostgreSQL local~~
4. ✅ ~~Crear todas las colecciones y globals~~
5. ✅ ~~Crear scripts de seed y reset~~
6. ✅ ~~Integrar Payload con Astro (payload-local.ts)~~
7. ✅ ~~Actualizar index.astro para usar Payload~~
8. ✅ ~~Completar componentes base (Header, Footer)~~
9. ✅ ~~Crear página de Carta con datos de Payload~~
10. ✅ ~~Mejorar la página Home con datos reales e imágenes de fondo en Regala Gastronomía~~
11. ✅ ~~Crear página Nosotros/Historia (con equipo)~~
12. ✅ ~~Crear página Experiencias (con integración completa de Covermanager)~~
13. ✅ ~~Crear página Contacto (con horarios, cómo llegar, parking)~~
14. ✅ ~~Banner de cookies RGPD~~
15. ✅ ~~Integrar Google Analytics~~ (Fase 6)
16. ✅ ~~Integrar Google Places API para reseñas~~ (Fase 6)
17. ✅ ~~Integrar Instagram API~~ (Fase 6)
18. **Configurar CDN para imágenes (Bunny.net)** (Fase 6)
19. **Optimización SEO y Validación de Datos Estructurados** (Fase 7)

---

## 📝 Notas y Decisiones

### Decisiones Técnicas
- **CMS elegido:** Payload CMS 3.x (self-hosted)
- **Base de datos:** PostgreSQL (local en desarrollo)
- **Integración:** API Local de Payload (sin servidor HTTP separado)
- **Hosting:** Vercel (preferido) o Netlify
- **CDN imágenes:** Bunny.net (pendiente)
- **Reservas:** CoverManager (widget)
- **Analytics:** Google Analytics 4

### Cambios Importantes
- **2026-01-15:** Migración de Sanity.io a Payload CMS
  - Razón: Mayor control sobre los datos, uso de PostgreSQL local
  - Se crearon 9 colecciones + 2 globals equivalentes a los schemas de Sanity
  - Se usa la API local de Payload (`getPayload()`) directamente desde Astro
- **2026-01-27:** Mejora de SEO Técnico y UX de Carta
  - Se implementó `LocalBusiness` con GeoCoordinates en `Schema.astro`
  - Se añadieron etiquetas dinámicas (badges) a los platos en `DishCard.astro`
  - Limpieza y documentación completa de `.env.example`

### Archivos Clave Creados
- `payload.config.ts` - Configuración principal de Payload
- `src/payload/collections/*.ts` - 9 colecciones
- `src/payload/globals/*.ts` - 2 globals
- `src/lib/payload-local.ts` - Cliente local para Astro
- `scripts/seed.ts` - Poblar datos iniciales
- `scripts/reset.ts` - Limpiar base de datos
- `src/components/ui/CookieBanner.astro` - Banner de cookies RGPD
- `src/components/analytics/GoogleAnalytics.astro` - Integración GA4 con consentimiento

### Consideraciones Especiales
- **Parallax móvil:** Desactivar o suavizar usando `matchMedia()`
- **Imágenes:** Priorizar WebP, lazy loading obligatorio
- **Menús:** Sistema independiente de la carta
- **Alérgenos:** Gestión centralizada con iconos

### Riesgos Identificados
- Performance de parallax en móviles bajos
- Cuotas de APIs externas (Instagram, Google)
- Complejidad de la carta con muchos platos
- Mantenimiento del contenido por cliente

---

## 📞 Contactos y Recursos

### APIs y Servicios
- Payload CMS: [payloadcms.com](https://payloadcms.com/)
- Vercel: [vercel.com](https://vercel.com/)
- Bunny.net: [bunny.net](https://bunny.net/)
- CoverManager: [Integración pendiente]

### Documentación Técnica
- Astro: [docs.astro.build](https://docs.astro.build/)
- Payload CMS: [payloadcms.com/docs](https://payloadcms.com/docs/)
- GSAP: [greensock.com/docs](https://greensock.com/docs/)
- Tailwind: [tailwindcss.com/docs](https://tailwindcss.com/docs/)
- Swiper: [swiperjs.com](https://swiperjs.com/)

---

**Última revisión:** 2026-01-28
**Próxima revisión:** 2026-02-03
**Responsable:** Equipo de Desarrollo
