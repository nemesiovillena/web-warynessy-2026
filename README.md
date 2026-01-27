# 🍽️ Warynessy 2026 - Sitio Web del Restaurante

Sitio web oficial del Restaurante Warynessy, construido con tecnologías modernas para ofrecer una experiencia de usuario excepcional y facilitar la gestión de contenido.

> **🔄 MIGRADO A PAYLOAD CMS** - Este proyecto ha sido migrado de Sanity.io a Payload CMS. Ver [MIGRACION-PAYLOAD.md](MIGRACION-PAYLOAD.md) para detalles completos.

## 🚀 Stack Tecnológico

### Frontend
- **[Astro](https://astro.build)** - Framework principal (arquitectura de islas)
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos utility-first
- **[GSAP](https://greensock.com/gsap/)** - Animaciones y efectos parallax
- **[Swiper.js](https://swiperjs.com/)** - Carruseles y sliders

### Backend / CMS
- **[Payload CMS](https://payloadcms.com/)** - Headless CMS TypeScript-native
- **PostgreSQL** - Base de datos relacional

### Infraestructura
- **[Vercel](https://vercel.com/)** / **[Netlify](https://www.netlify.com/)** - Hosting y deployment
- **[Vercel Postgres](https://vercel.com/storage/postgres)** / **[Supabase](https://supabase.com/)** - Base de datos
- **[Bunny.net](https://bunny.net/)** - CDN para imágenes y videos (opcional)
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
├── src/                       # Código fuente
│   ├── components/           # Componentes reutilizables
│   ├── layouts/              # Layouts de página
│   ├── pages/                # Páginas del sitio
│   ├── styles/               # Estilos globales
│   ├── lib/                  # Utilidades y helpers
│   └── payload/              # Configuración de Payload CMS
│       ├── collections/      # Collections (tipos de documento)
│       └── globals/          # Globals (singletons)
├── public/                    # Archivos estáticos
├── media/                     # Archivos subidos al CMS
├── payload.config.ts          # Configuración de Payload
├── MIGRACION-PAYLOAD.md       # Guía de migración a Payload
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
- PostgreSQL (local o Vercel Postgres / Supabase)
- Cuenta en Vercel/Netlify (para deployment)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/nemesiovillena/web-warynessy-2026.git
cd web-warynessy-2026
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# Payload CMS
DATABASE_URL=postgresql://user:password@localhost:5432/warynessy
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
PUBLIC_PAYLOAD_API_URL=http://localhost:3000/api
PAYLOAD_SECRET=tu-secret-generado

# Google APIs
PUBLIC_GOOGLE_PLACES_API_KEY=tu-api-key
# Analíticas y CDN
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
PUBLIC_BUNNY_CDN_URL=https://tu-zona.b-cdn.net
```

#### Generar PAYLOAD_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Configurar Base de Datos

Tienes varias opciones para PostgreSQL:

#### Opción A: Vercel Postgres (Recomendado)
1. Ve a tu proyecto en Vercel
2. Pestaña "Storage" > "Create Database" > "Postgres"
3. Copia el `DATABASE_URL`
4. Pégalo en tu `.env`

#### Opción B: Supabase (Gratuito)
1. Crea cuenta en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Settings > Database > Connection string
4. Copia y pega en `.env`

#### Opción C: PostgreSQL Local
```bash
# Instalar PostgreSQL
brew install postgresql@14  # macOS
# o
sudo apt install postgresql  # Linux

# Crear base de datos
createdb warynessy

# Configurar DATABASE_URL en .env
DATABASE_URL=postgresql://localhost:5432/warynessy
```

### 5. Iniciar Payload CMS

```bash
# Ejecutar migraciones
npm run payload migrate

# Iniciar servidor de Payload
npm run dev:payload
```

El admin panel estará disponible en `http://localhost:3000/admin`

**Primera vez**: Al acceder a `/admin`, Payload te pedirá crear un usuario administrador.

### 6. Ejecutar en Desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## 📝 Scripts Disponibles

```bash
npm run dev              # Inicia el servidor de desarrollo de Astro
npm run dev:payload      # Inicia el servidor de Payload CMS
npm run build            # Construye el sitio y Payload para producción
npm run build:payload    # Construye solo Payload
npm run preview          # Preview del build de producción
npm run generate:types   # Genera tipos TypeScript desde Payload
npm run astro            # Ejecuta comandos de Astro CLI
npm run payload          # Ejecuta comandos de Payload CLI
```

## 🌐 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Configura las variables de entorno en el dashboard
3. Añade Vercel Postgres desde la pestaña Storage
4. Deploy automático en cada push a `main`

### Netlify

1. Conecta tu repositorio en [netlify.com](https://netlify.com)
2. Configura las variables de entorno
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Configura PostgreSQL externo (Supabase recomendado)

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

- **[MIGRACION-PAYLOAD.md](MIGRACION-PAYLOAD.md)** - Guía completa de migración a Payload
- **[Stack Tecnológico](docs/info/stack-tecnologico.md)** - Detalles del stack elegido
- **[Arquitectura de Datos](docs/info/arquitectura-datos.md)** - Estructura de datos del CMS
- **[Paleta de Colores](docs/info/paleta-colores.md)** - Colores del diseño
- **[Puntos Críticos](docs/info/puntos-criticos.md)** - Consideraciones importantes
- **[Mock Data](docs/info/mock-data.md)** - Datos de prueba

## 🎯 Características Principales

- ✅ **Rendimiento Ultra-Rápido**: Astro con arquitectura de islas
- ✅ **CMS TypeScript-Native**: Payload CMS con control total
- ✅ **Base de Datos Propia**: PostgreSQL sin vendor lock-in
- ✅ **Carta Dinámica**: Actualización en tiempo real desde el CMS
- ✅ **Gestión de Menús**: Sistema independiente de menús
- ✅ **Reservas Online**: Integración con CoverManager
- ✅ **Animaciones Suaves**: Parallax y efectos con GSAP
- ✅ **Responsive**: Optimizado para móviles y tablets
- ✅ Analíticas Avanzadas: GA4 integrado con tracking de eventos de conversión
- ✅ Optimización de Imágenes: Soporte para Bunny.net CDN
- ✅ **Sin Costos Ocultos**: Open-source, sin pago por API calls

## 🔧 Mantenimiento

### Actualizar Contenido

1. Accede a Payload Admin Panel (`http://localhost:3000/admin`)
2. Edita el contenido necesario
3. Guarda los cambios
4. El sitio se reconstruirá automáticamente (webhook)

### Actualizar Dependencias

```bash
npm update
# o
npm outdated  # Ver dependencias desactualizadas
```

### Backup del CMS

```bash
# Backup de PostgreSQL
pg_dump -U user warynessy > backup.sql

# O usar herramientas de Vercel/Supabase para backups automáticos
```

## 🐛 Debugging

### Logs de Build

Vercel/Netlify proporcionan logs detallados de cada build en su dashboard.

### Errores Comunes

1. **Error de Build**: Verifica que todas las variables de entorno estén configuradas
2. **Imágenes no cargan**: Verifica que el directorio `media/` exista y tenga permisos
3. **CMS no conecta**: Verifica `DATABASE_URL` y que PostgreSQL esté corriendo
4. **Error en Payload**: Verifica que `PAYLOAD_SECRET` esté configurado

Ver [MIGRACION-PAYLOAD.md](MIGRACION-PAYLOAD.md) para más troubleshooting.

## 📞 Soporte y Contacto

- **Repositorio**: [github.com/nemesiovillena/web-warynessy-2026](https://github.com/nemesiovillena/web-warynessy-2026)
- **Issues**: [GitHub Issues](https://github.com/nemesiovillena/web-warynessy-2026/issues)

## 📄 Licencia

© 2026 Restaurante Warynessy. Todos los derechos reservados.

---

**Última actualización:** 2026-01-14
**Versión:** 1.0.0
**Estado:** 🟡 En Desarrollo
**CMS:** Payload CMS (migrado desde Sanity.io)
