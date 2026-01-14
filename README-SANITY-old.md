# 🍽️ Warynessy 2026 - Sitio Web del Restaurante

Sitio web oficial del Restaurante Warynessy, construido con tecnologías modernas para ofrecer una experiencia de usuario excepcional y facilitar la gestión de contenido.

## 🚀 Stack Tecnológico

### Frontend
- **[Astro](https://astro.build)** - Framework principal (arquitectura de islas)
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos utility-first
- **[GSAP](https://greensock.com/gsap/)** - Animaciones y efectos parallax
- **[Swiper.js](https://swiperjs.com/)** - Carruseles y sliders

### Backend / CMS
- **[Sanity.io](https://www.sanity.io/)** - Headless CMS
- **Sanity Studio** - Dashboard de administración

### Infraestructura
- **[Vercel](https://vercel.com/)** / **[Netlify](https://www.netlify.com/)** - Hosting y deployment
- **[Bunny.net](https://bunny.net/)** - CDN para imágenes y videos
- **[GitHub](https://github.com/)** - Control de versiones

### Integraciones
- **CoverManager** - Sistema de reservas
- **Google Places API** - Reseñas de clientes
- **Instagram API** - Feed de Instagram
- **Google Analytics 4** - Análisis de tráfico

## 📁 Estructura del Proyecto

```
warynessy26/
├── docs/                      # Documentación del proyecto
│   ├── agents/               # Definiciones de agentes especializados
│   ├── info/                 # Información técnica y arquitectura
│   └── gestion-proyecto.md   # Gestión completa del proyecto
├── src/                       # Código fuente (se creará con Astro)
│   ├── components/           # Componentes reutilizables
│   ├── layouts/              # Layouts de página
│   ├── pages/                # Páginas del sitio
│   ├── styles/               # Estilos globales
│   └── lib/                  # Utilidades y helpers
├── public/                    # Archivos estáticos
├── sanity/                    # Configuración de Sanity CMS
│   └── schemas/              # Schemas de contenido
├── .env.example              # Variables de entorno de ejemplo
├── .gitignore                # Archivos ignorados por Git
├── astro.config.mjs          # Configuración de Astro
├── tailwind.config.mjs       # Configuración de Tailwind
├── tsconfig.json             # Configuración de TypeScript
├── package.json              # Dependencias del proyecto
└── README.md                 # Este archivo
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- npm, yarn o pnpm
- Cuenta en Sanity.io
- Cuenta en Vercel/Netlify (para deployment)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/nemesiovillena/web-warynessy-2026.git
cd web-warynessy-2026
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# Sanity
PUBLIC_SANITY_PROJECT_ID=tu-project-id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu-api-token

# Google APIs
PUBLIC_GOOGLE_PLACES_API_KEY=tu-api-key
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Instagram
INSTAGRAM_ACCESS_TOKEN=tu-access-token

# CoverManager
PUBLIC_COVER_MANAGER_ID=tu-id

# Bunny.net
BUNNY_CDN_URL=tu-cdn-url
BUNNY_API_KEY=tu-api-key
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

El sitio estará disponible en `http://localhost:4321`

## 📝 Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye el sitio para producción
npm run preview      # Preview del build de producción
npm run astro        # Ejecuta comandos de Astro CLI
```

## 🎨 Configuración de Sanity Studio

### Inicializar Sanity

```bash
cd sanity
npm install
npm run dev
```

Sanity Studio estará disponible en `http://localhost:3333`

### Deploy de Sanity Studio

```bash
cd sanity
npm run deploy
```

## 🌐 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Configura las variables de entorno en el dashboard
3. Deploy automático en cada push a `main`

### Netlify

1. Conecta tu repositorio en [netlify.com](https://netlify.com)
2. Configura las variables de entorno
3. Build command: `npm run build`
4. Publish directory: `dist`

## 📋 Gestión del Proyecto

Para ver todas las tareas, fases y progreso del proyecto, consulta:

📄 **[docs/gestion-proyecto.md](docs/gestion-proyecto.md)**

Este documento contiene:
- 9 fases de desarrollo con +330 tareas
- Estado actual del proyecto
- Próximos pasos
- Notas técnicas y decisiones
- Riesgos identificados

## 📚 Documentación Adicional

- **[Stack Tecnológico](docs/info/stack-tecnologico.md)** - Detalles del stack elegido
- **[Arquitectura de Datos](docs/info/arquitectura-datos.md)** - Estructura de datos del CMS
- **[Schemas](docs/info/schema.md)** - Definición de schemas de Sanity
- **[Paleta de Colores](docs/info/paleta-colores.md)** - Colores del diseño
- **[Puntos Críticos](docs/info/puntos-criticos.md)** - Consideraciones importantes
- **[Mock Data](docs/info/mock-data.md)** - Datos de prueba

## 🎯 Características Principales

- ✅ **Rendimiento Ultra-Rápido**: Astro con arquitectura de islas
- ✅ **CMS Headless**: Gestión de contenido sin tocar código
- ✅ **Carta Dinámica**: Actualización en tiempo real desde el CMS
- ✅ **Gestión de Menús**: Sistema independiente de menús
- ✅ **Reservas Online**: Integración con CoverManager
- ✅ **Animaciones Suaves**: Parallax y efectos con GSAP
- ✅ **Responsive**: Optimizado para móviles y tablets
- ✅ **SEO Optimizado**: Meta tags, schema.org, sitemap
- ✅ **Imágenes Optimizadas**: WebP, lazy loading automático
- ✅ **Alérgenos**: Sistema de gestión de alérgenos
- ✅ **Multi-espacio**: Galería de diferentes espacios del restaurante

## 🔧 Mantenimiento

### Actualizar Contenido

1. Accede a Sanity Studio
2. Edita el contenido necesario
3. Publica los cambios
4. El sitio se reconstruirá automáticamente (webhook)

### Actualizar Dependencias

```bash
npm update
# o
npm outdated  # Ver dependencias desactualizadas
```

### Backup del CMS

```bash
# Exportar datos de Sanity
npx sanity dataset export production backup.tar.gz
```

## 🐛 Debugging

### Logs de Build

Vercel/Netlify proporcionan logs detallados de cada build en su dashboard.

### Errores Comunes

1. **Error de Build**: Verifica que todas las variables de entorno estén configuradas
2. **Imágenes no cargan**: Verifica la configuración del CDN
3. **CMS no conecta**: Verifica PROJECT_ID y DATASET en `.env`

## 📞 Soporte y Contacto

- **Repositorio**: [github.com/nemesiovillena/web-warynessy-2026](https://github.com/nemesiovillena/web-warynessy-2026)
- **Issues**: [GitHub Issues](https://github.com/nemesiovillena/web-warynessy-2026/issues)

## 📄 Licencia

© 2026 Restaurante Warynessy. Todos los derechos reservados.

---

**Última actualización:** 2026-01-13
**Versión:** 1.0.0
**Estado:** 🟡 En Desarrollo
