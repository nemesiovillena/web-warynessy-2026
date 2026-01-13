# Gestión del Proyecto - Web Warynessy 2026

## Estado del Proyecto
**Última actualización:** 2026-01-13
**Estado General:** 🟡 En Planificación

---

## 📋 Índice de Fases
1. [Fase 0: Configuración Inicial](#fase-0-configuración-inicial)
2. [Fase 1: Backend - CMS Sanity](#fase-1-backend---cms-sanity)
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

### 🔄 Tareas Pendientes
- [x] Configurar .gitignore adecuado
- [x] Crear archivo README.md del proyecto
- [x] Configurar variables de entorno (.env.example)

---

## Fase 1: Backend - CMS Sanity
**Estado:** ⚪ Pendiente

### Configuración Base
- [ ] Crear cuenta Sanity.io
- [ ] Inicializar proyecto Sanity Studio
- [ ] Configurar CLI de Sanity
- [ ] Configurar CORS para dominios permitidos
- [ ] Configurar proyecto en dataset "production"

### Schemas del CMS
- [ ] **Schema: Configuración Global**
  - [ ] Logo del restaurante
  - [ ] Links de redes sociales
  - [ ] Horarios de apertura
  - [ ] Footer logos (Sicted, etc.)
  - [ ] Copyright y textos legales
  - [ ] Información de contacto

- [ ] **Schema: Alérgenos**
  - [ ] Nombre del alérgeno
  - [ ] Icono/código
  - [ ] Descripción

- [ ] **Schema: Categorías de Carta**
  - [ ] Nombre de categoría
  - [ ] Orden de aparición
  - [ ] Estado activo/inactivo
  - [ ] Descripción opcional

- [ ] **Schema: Platos**
  - [ ] Nombre del plato
  - [ ] Descripción/ingredientes
  - [ ] Precio
  - [ ] Imagen optimizada
  - [ ] Categoría (referencia)
  - [ ] Alérgenos (array de referencias)
  - [ ] Estado disponible/agotado
  - [ ] Orden dentro de categoría

- [ ] **Schema: Menús**
  - [ ] Nombre del menú
  - [ ] Imagen promocional
  - [ ] Fechas y días de validez
  - [ ] Descripción/composición
  - [ ] Precio
  - [ ] Estado visible/oculto
  - [ ] PDF descargable (opcional)

- [ ] **Schema: Espacios del Restaurante**
  - [ ] Nombre del espacio (Salón, Bar, Terraza)
  - [ ] Descripción
  - [ ] Galería de imágenes (array)
  - [ ] Orden de aparición

- [ ] **Schema: Experiencias/Regalos**
  - [ ] Título de la experiencia
  - [ ] Descripción
  - [ ] Precio
  - [ ] Link de compra
  - [ ] Color de fondo (hex)
  - [ ] Imagen destacada
  - [ ] Estado activo/inactivo

- [ ] **Schema: Página Landing**
  - [ ] Hero Title
  - [ ] Hero Subtitle
  - [ ] Hero Image
  - [ ] Texto sobre fundación/historia
  - [ ] Galería de bienvenida (array)

- [ ] **Schema: Banners/Anuncios**
  - [ ] Título
  - [ ] Texto
  - [ ] Imagen
  - [ ] Link (opcional)
  - [ ] Fecha inicio
  - [ ] Fecha fin
  - [ ] Posición en la web

### Contenido Inicial
- [ ] Cargar datos mock de prueba
- [ ] Cargar imágenes de prueba optimizadas
- [ ] Configurar todos los alérgenos
- [ ] Crear categorías base de la carta
- [ ] Crear al menos 3 platos por categoría (prueba)

### Configuración Avanzada
- [ ] Configurar CDN de Sanity para imágenes
- [ ] Configurar webhooks para rebuild automático
- [ ] Configurar roles y permisos de usuarios
- [ ] Personalizar Sanity Studio (logo, colores)
- [ ] Crear documentación para el cliente del CMS

---

## Fase 2: Frontend - Estructura Astro
**Estado:** ⚪ Pendiente

### Configuración Base
- [ ] Inicializar proyecto Astro
- [ ] Configurar TypeScript estricto
- [ ] Instalar Tailwind CSS
- [ ] Configurar Tailwind con paleta personalizada
- [ ] Instalar dependencias base (GSAP, Swiper, etc.)
- [ ] Configurar cliente de Sanity en Astro
- [ ] Configurar estructura de carpetas

### Configuración Avanzada
- [ ] Configurar `astro.config.mjs` completo
- [ ] Configurar View Transitions
- [ ] Configurar Image optimization
- [ ] Configurar sitemap
- [ ] Configurar robots.txt
- [ ] Crear archivo de tipos TypeScript para Sanity

### Layouts Base
- [ ] Crear `BaseLayout.astro` (HTML base)
- [ ] Crear `MainLayout.astro` (con Header/Footer)
- [ ] Configurar meta tags dinámicos
- [ ] Configurar Open Graph tags
- [ ] Configurar structured data (JSON-LD)

---

## Fase 3: Componentes Base
**Estado:** ⚪ Pendiente

### Componentes Globales
- [ ] **Header**
  - [ ] Logo responsive
  - [ ] Navegación desktop
  - [ ] Menú hamburguesa mobile
  - [ ] Botón de reservas destacado
  - [ ] Sticky header al scroll
  - [ ] Animación de aparición

- [ ] **Footer**
  - [ ] Información de contacto
  - [ ] Horarios
  - [ ] Links de redes sociales
  - [ ] Logos de certificaciones (Sicted)
  - [ ] Links legales
  - [ ] Copyright
  - [ ] Mapa de ubicación

- [ ] **Navigation Mobile**
  - [ ] Overlay fullscreen
  - [ ] Animación de entrada/salida
  - [ ] Links principales
  - [ ] Botón cerrar

### Componentes UI Reutilizables
- [ ] **Button** (variantes: primary, secondary, outline)
- [ ] **Card** (para platos, menús, espacios)
- [ ] **Image** (wrapper con lazy loading y WebP)
- [ ] **Section** (contenedor con padding consistente)
- [ ] **Container** (max-width responsive)
- [ ] **Badge** (para alérgenos, etiquetas)
- [ ] **Modal** (base reutilizable)
- [ ] **Loading** (spinner/skeleton)
- [ ] **ErrorBoundary** (manejo de errores)

### Componentes de Contenido
- [ ] **DishCard** (tarjeta de plato con precio, imagen, alérgenos)
- [ ] **MenuCard** (tarjeta de menú con imagen y descripción)
- [ ] **SpaceCard** (tarjeta de espacio del restaurante)
- [ ] **GiftCard** (tarjeta de experiencia/regalo)
- [ ] **CategorySection** (sección de categoría en carta)
- [ ] **AllergenBadge** (icono + tooltip de alérgeno)
- [ ] **PriceTag** (formato consistente de precios)

---

## Fase 4: Páginas Principales
**Estado:** ⚪ Pendiente

### Página Home (Landing)
- [ ] Hero section con imagen parallax
- [ ] Texto de bienvenida/fundación
- [ ] Sección "Nuestros Espacios" (scroll horizontal)
- [ ] Banner de experiencias/regalos
- [ ] Sección destacada de menús
- [ ] Galería de imágenes del restaurante
- [ ] Sección de reseñas Google
- [ ] Call-to-action de reservas
- [ ] Instagram feed (últimos posts)

### Página Carta
- [ ] Sistema de filtros por categoría
- [ ] Grid responsive de platos
- [ ] Filtro por alérgenos
- [ ] Búsqueda de platos
- [ ] Sidebar de categorías (desktop)
- [ ] Pills de categorías (mobile)
- [ ] Animación de entrada de items
- [ ] Modal de detalle de plato (opcional)
- [ ] Indicador de platos agotados
- [ ] Botón de descarga PDF (opcional)

### Página Menús
- [ ] Grid de menús disponibles
- [ ] Filtros por fecha/tipo
- [ ] Detalle expandible de cada menú
- [ ] Descargar PDF de menú
- [ ] Indicador de validez temporal
- [ ] Call-to-action de reserva

### Página Espacios
- [ ] Hero con imagen del espacio
- [ ] Descripción detallada de cada espacio
- [ ] Galería de imágenes (Swiper)
- [ ] Información de capacidad
- [ ] Botón de consulta para eventos
- [ ] Sección de usos sugeridos

### Página Experiencias/Regala
- [ ] Hero section
- [ ] Cards de experiencias disponibles
- [ ] Detalle de cada experiencia
- [ ] Botón de compra externa
- [ ] Testimonios (opcional)
- [ ] FAQ sobre el proceso

### Página Nosotros/Historia
- [ ] Timeline de la historia del restaurante
- [ ] Fotos históricas
- [ ] Filosofía y valores
- [ ] Equipo (opcional)
- [ ] Premios y reconocimientos

### Página Reservas
- [ ] Integración iframe de CoverManager
- [ ] Información sobre el proceso
- [ ] Horarios disponibles
- [ ] Política de cancelación
- [ ] Contacto alternativo

### Página Contacto
- [ ] Formulario de contacto
- [ ] Información de contacto
- [ ] Mapa interactivo (Google Maps)
- [ ] Horarios detallados
- [ ] Cómo llegar
- [ ] Parking y accesibilidad

### Páginas Legales
- [ ] Aviso Legal
- [ ] Política de Privacidad
- [ ] Política de Cookies
- [ ] Banner de consentimiento cookies

---

## Fase 5: Animaciones y Efectos
**Estado:** ⚪ Pendiente

### GSAP ScrollTrigger
- [ ] Configurar GSAP y ScrollTrigger
- [ ] Parallax en hero sections
- [ ] Animaciones de fade-in al scroll
- [ ] Animaciones de slide-in laterales
- [ ] Scale effects en imágenes
- [ ] Pinned sections (scroll controlado)
- [ ] Configurar matchMedia para mobile
- [ ] Optimizar rendimiento de animaciones

### Swiper.js (Carruseles)
- [ ] Carrusel de espacios del restaurante
- [ ] Galería de imágenes de platos
- [ ] Carrusel de testimonios
- [ ] Carrusel de Instagram feed
- [ ] Configuración responsive
- [ ] Touch gestures optimizados
- [ ] Lazy loading de imágenes

### Microinteracciones
- [ ] Hover effects en botones
- [ ] Hover effects en cards
- [ ] Animación de menú hamburguesa
- [ ] Loading states
- [ ] Toast notifications
- [ ] Smooth scroll en navegación
- [ ] Page transitions (View Transitions API)

---

## Fase 6: Integraciones Externas
**Estado:** ⚪ Pendiente

### CoverManager (Reservas)
- [ ] Obtener código de integración
- [ ] Implementar widget/iframe
- [ ] Botón flotante de reservas
- [ ] Testear flujo completo de reserva
- [ ] Responsive mobile

### Google Places API (Reseñas)
- [ ] Configurar API key
- [ ] Crear endpoint/función para reseñas
- [ ] Componente de visualización
- [ ] Sistema de caché
- [ ] Fetch en build time
- [ ] Fallback si API falla

### Instagram API
- [ ] Configurar Instagram Basic Display API
- [ ] Crear endpoint para últimos posts
- [ ] Sistema de caché (reducir llamadas)
- [ ] Componente de galería Instagram
- [ ] Enlaces a perfil de Instagram
- [ ] Fallback si API falla

### Bunny.net CDN
- [ ] Crear cuenta Bunny.net
- [ ] Configurar pull zone
- [ ] Migrar imágenes pesadas
- [ ] Configurar transformaciones de imagen
- [ ] Testear velocidad de carga
- [ ] Configurar cache headers

### Google Analytics / Tracking
- [ ] Configurar Google Analytics 4
- [ ] Implementar tracking de eventos
- [ ] Tracking de conversiones (reservas)
- [ ] Tracking de clicks en menú
- [ ] Cookie consent integration
- [ ] Dashboard de métricas básicas

---

## Fase 7: Optimización y SEO
**Estado:** ⚪ Pendiente

### Performance
- [ ] Optimización de imágenes (WebP/AVIF)
- [ ] Lazy loading de imágenes
- [ ] Code splitting
- [ ] Minificación de CSS/JS
- [ ] Preload de recursos críticos
- [ ] Font optimization (subset fonts)
- [ ] Lighthouse score > 90 (todas las métricas)
- [ ] Core Web Vitals optimizados

### SEO On-Page
- [ ] Meta descriptions únicas por página
- [ ] Title tags optimizados
- [ ] Estructura de headings (H1, H2, H3)
- [ ] Alt text en todas las imágenes
- [ ] URLs amigables
- [ ] Sitemap XML
- [ ] Robots.txt configurado
- [ ] Canonical URLs

### SEO Técnico
- [ ] Schema.org - Restaurant
- [ ] Schema.org - Menu
- [ ] Schema.org - LocalBusiness
- [ ] Open Graph tags (Facebook)
- [ ] Twitter Cards
- [ ] Datos estructurados validados
- [ ] Search Console configurado
- [ ] Verificación de indexación

### Accesibilidad
- [ ] Contraste de colores WCAG AA
- [ ] Navegación por teclado
- [ ] Labels en formularios
- [ ] ARIA labels donde necesario
- [ ] Skip to content link
- [ ] Focus visible
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
- [ ] Crear backup de CMS

### Deploy Sanity Studio
- [ ] Deploy de Sanity Studio
- [ ] Configurar dominio para Studio (ej: studio.warynessy.com)
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
- [ ] Configurar backup automático de CMS
- [ ] Documentar proceso de actualización
- [ ] Crear manual de uso para cliente
- [ ] Planificar revisiones mensuales

---

## 📊 Resumen de Progreso

### Por Fase
- **Fase 0:** ✅ Completada (100%)
- **Fase 1:** ⚪ Pendiente (0%)
- **Fase 2:** ⚪ Pendiente (0%)
- **Fase 3:** ⚪ Pendiente (0%)
- **Fase 4:** ⚪ Pendiente (0%)
- **Fase 5:** ⚪ Pendiente (0%)
- **Fase 6:** ⚪ Pendiente (0%)
- **Fase 7:** ⚪ Pendiente (0%)
- **Fase 8:** ⚪ Pendiente (0%)
- **Fase 9:** ⚪ Pendiente (0%)

### Progreso Total: 10% (Fase 0 completada)

---

## 🎯 Próximos Pasos Inmediatos

1. **Completar configuración inicial** (Fase 0 pendientes)
2. **Crear cuenta y configurar Sanity.io** (Inicio Fase 1)
3. **Inicializar proyecto Astro** (Inicio Fase 2)
4. **Definir estructura de carpetas definitiva**

---

## 📝 Notas y Decisiones

### Decisiones Técnicas
- **CMS elegido:** Sanity.io (SaaS)
- **Hosting:** Vercel (preferido) o Netlify
- **CDN imágenes:** Bunny.net + Sanity CDN
- **Reservas:** CoverManager (widget)
- **Analytics:** Google Analytics 4

### Consideraciones Especiales
- **Parallax móvil:** Desactivar o suavizar usando `matchMedia()`
- **Imágenes:** Priorizar WebP, lazy loading obligatorio
- **Menús:** Sistema independiente de la carta
- **Alérgenos:** Gestión centralizada con iconos

### Riesgos Identificados
- ⚠️ Performance de parallax en móviles bajos
- ⚠️ Cuotas de APIs externas (Instagram, Google)
- ⚠️ Complejidad de la carta con muchos platos
- ⚠️ Mantenimiento del contenido por cliente

---

## 📞 Contactos y Recursos

### APIs y Servicios
- Sanity.io: [sanity.io](https://www.sanity.io/)
- Vercel: [vercel.com](https://vercel.com/)
- Bunny.net: [bunny.net](https://bunny.net/)
- CoverManager: [Integración pendiente]

### Documentación Técnica
- Astro: [docs.astro.build](https://docs.astro.build/)
- GSAP: [greensock.com/docs](https://greensock.com/docs/)
- Tailwind: [tailwindcss.com/docs](https://tailwindcss.com/docs/)
- Swiper: [swiperjs.com](https://swiperjs.com/)

---

**Última revisión:** 2026-01-13
**Próxima revisión:** [Pendiente]
**Responsable:** Equipo de Desarrollo
