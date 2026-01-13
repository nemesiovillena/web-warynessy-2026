# Sanity Studio - Warynessy Restaurant

Panel de administración de contenido para el sitio web del Restaurante Warynessy.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Autenticarse con Sanity

```bash
npx sanity login
```

### 3. Crear proyecto en Sanity.io

Ve a [sanity.io/manage](https://www.sanity.io/manage) y crea un nuevo proyecto.

### 4. Configurar variables de entorno

Copia `.env.example` a `.env` y añade tu Project ID:

```bash
cp .env.example .env
```

Edita `.env`:
```
SANITY_STUDIO_PROJECT_ID=tu-project-id-aqui
SANITY_STUDIO_DATASET=production
```

### 5. Iniciar el Studio en desarrollo

```bash
npm run dev
```

El Studio estará disponible en `http://localhost:3333`

## 📝 Scripts Disponibles

```bash
npm run dev          # Inicia el Studio en modo desarrollo
npm run build        # Construye el Studio para producción
npm run deploy       # Despliega el Studio en Sanity
```

## 📋 Schemas Disponibles

### Configuración
- **⚙️ Configuración Global**: Logo, contacto, horarios, redes sociales

### Contenido Principal
- **🏠 Página de Inicio**: Hero, textos de bienvenida, galerías

### Carta y Menús
- **🍽️ Platos**: Gestión de platos de la carta
- **📂 Categorías**: Categorías de platos (Entrantes, Carnes, etc.)
- **⚠️ Alérgenos**: Gestión de alérgenos
- **📋 Menús**: Menús especiales (del día, degustación, etc.)

### Espacios y Experiencias
- **🏛️ Espacios**: Salón, bar, terraza, salas privadas
- **🎁 Experiencias**: Packs de regalo y experiencias

### Promociones
- **📢 Banners**: Anuncios y promociones temporales

## 🔧 Personalización

El Studio está configurado con una estructura personalizada en [sanity.config.ts](./sanity.config.ts).

Los schemas se encuentran en la carpeta [schemaTypes/](./schemaTypes/).

## 🌐 Deploy

Para desplegar el Studio en Sanity (accesible desde cualquier lugar):

```bash
npm run deploy
```

Esto creará una URL como: `https://warynessy.sanity.studio`

## 📚 Documentación

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [Sanity Studio](https://www.sanity.io/docs/sanity-studio)

## 🔐 Seguridad

- Nunca subas el archivo `.env` al repositorio
- Configura CORS en Sanity para solo permitir tus dominios
- Crea roles y permisos apropiados para los usuarios del CMS

## 🆘 Soporte

Si encuentras problemas:
1. Verifica que tienes un proyecto creado en Sanity.io
2. Verifica que las variables de entorno estén configuradas
3. Consulta la [documentación oficial](https://www.sanity.io/docs)
