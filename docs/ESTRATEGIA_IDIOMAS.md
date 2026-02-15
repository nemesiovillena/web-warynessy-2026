# Estrategia de Internacionalización Automática (ES -> EN, FR, DE)

Esta es la solución técnica para implementar soporte multi-idioma sin necesidad de introducir traducciones manualmente.

## Resumen de la Solución
Utilizaremos **Payload CMS Localization** junto con **Hooks de Traducción Automática** conectados a la API de **DeepL** (recomendado por calidad en Europa) o Google Translate.

El flujo será 100% automático:
1. Tú escribes el contenido en **Español** en el panel de administración.
2. Al guardar, el sistema detecta qué campos en otros idiomas están vacíos.
3. El sistema envía el texto en español a la API de DeepL.
4. Recibe las traducciones y rellena los campos de Inglés, Francés y Alemán automáticamente.
5. El Frontend (Astro) muestra el contenido correcto según la URL (`/es`, `/en`, `/de`, `/fr`).

---

## 1. Backend: Configuración en Payload CMS

### A. Habilitar Localización
En `payload.config.ts`, activamos los idiomas deseados.

```typescript
// src/payload.config.ts
export default buildConfig({
  localization: {
    locales: ['es', 'en', 'fr', 'de'],
    defaultLocale: 'es',
    fallback: true,
  },
  // ... resto de la config
})
```

### B. Hook de Traducción Automática (`autoTranslateHook`)
Crearemos un "Collection Hook" reutilizable que se puede añadir a cualquier colección (Platos, Menús, Páginas).

**Pseudocódigo del Hook:**
1. Se ejecuta `beforeChange` (antes de guardar en la base de datos).
2. Verifica si el idioma actual es 'es' (Español).
3. Itera sobre los campos localizados (ej: `titulo`, `descripcion`, `precio`).
4. Si `data.en.titulo` está vacío, llama a `DeepL.translate(data.es.titulo, 'ES', 'EN')`.
5. Repite para FR y DE.
6. Guarda el documento con todos los idiomas rellenos.

**Requisitos:**
- Cuenta en **DeepL API Free** (permite 500,000 caracteres/mes gratis, suficiente para un restaurante).
- API Key configurada en `.env` (`DEEPL_API_KEY`).

---

## 2. Frontend: Rutas en Astro i18n

### A. Configuración de Rutas
Astro manejará prefijos de URL para cada idioma.
- `warynessy.com/` -> Español (por defecto)
- `warynessy.com/en/` -> Inglés
- `warynessy.com/fr/` -> Francés
- `warynessy.com/de/` -> Alemán

### B. Obtención de Datos (Fetching)
Las funciones que obtienen datos de Payload (`getPlatos`, `getMenus`) aceptarán un parámetro `locale`.

```typescript
// Ejemplo
export async function getPlatos({ locale = 'es' }) {
  const query = qs.stringify({
    locale: locale, // Payload devolverá el contenido en este idioma
  });
  return fetch(`${API_URL}/platos?${query}`);
}
```

### C. Componentes UI
Textos fijos como "Reservar Mesa", "Ver Menú", "Contacto" se gestionarán mediante un archivo de diccionario simple JSON o una colección "Configuración Global" en Payload para que también sean traducibles.

**Selector de Idioma (Banderas):**
Se implementará un componente `LanguageSwitcher` en el `Header` (menú principal).
- Mostrará las 4 banderas: 🇪🇸 🇬🇧 🇫🇷 🇩🇪
- Al hacer clic, redirigirá a la misma página en el idioma seleccionado (ej: `/es/carta` -> `/en/menu`).
- Se mantendrá visible en versión móvil y escritorio.

---

## 3. Pasos para Implementar

1.  **Instalar dependencia de traducción:** `npm install deepl-node` (o similar).
2.  **Configurar Payload:** Activar `localization` en `payload.config.ts`.
3.  **Crear el Hook:** Implementar `src/payload/hooks/auto-translate.ts`.
4.  **Aplicar Hook:** Añadir el hook a las colecciones `Platos`, `Menus`, `Paginas`.
5.  **Actualizar Frontend:** Modificar `src/pages/[lang]/...` o usar middleware de Astro para manejar las rutas y pasar el `locale` a las llamadas de API.

## Ventajas
- **Cero esfuerzo manual:** Solo escribes en español.
- **Calidad profesional:** DeepL ofrece traducciones muy naturales para textos gastronómicos.
- **Coste cero:** El tier gratuito de DeepL es suficiente para el volumen de texto de este sitio.
- **Control total:** Si una traducción automática no te gusta, siempre puedes editar manualmente el campo en el admin de Payload.

## Desventajas
- Aumenta ligeramente el tiempo de "Guardar" en el admin (unos segundos mientras traduce).
