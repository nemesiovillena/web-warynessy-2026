# Code Review — Pre-Producción Warynessy
**Fecha:** 2026-03-10
**Revisado por:** code-reviewer agent
**Alcance:** Seguridad, SSR, TypeScript, hooks i18n, build

---

## CRÍTICO — Bloquea producción

### C1. DOMPurify no funciona en Node.js (server-side)
**Archivo:** `src/pages/api/contact.ts:4`

`dompurify` requiere `window`/DOM para funcionar. En Node.js, `DOMPurify.sanitize` es **`undefined`** — confirmado en prueba directa:
```
ERROR: DOMPurify.sanitize is not a function
```
El endpoint `/api/contact` llama a `sanitizeInput()` que llama `DOMPurify.sanitize(...)`. En producción esto lanzará un error 500 en cada envío de formulario de contacto.

**Fix:** Reemplazar `dompurify` con `isomorphic-dompurify` o usar sanitización manual con regex (ya se valida email; para campos de texto plano, `String(input).replace(/<[^>]*>/g, '').trim()` es suficiente dado que el output es HTML de email, no un DOM renderizado).

---

### C2. Bypass hardcodeado en `/api/translate-all`
**Archivo:** `src/app/api/translate-all/route.ts:13`

```ts
if (secret !== process.env.PAYLOAD_SECRET && secret !== 'warynessy-force') {
```

La clave `'warynessy-force'` permite disparar una traducción masiva de toda la base de datos sin autenticación real. Cualquiera que conozca esta cadena puede ejecutar la operación.

**Fix:** Eliminar el bypass `|| secret !== 'warynessy-force'`. Solo validar contra `PAYLOAD_SECRET`.

---

### C3. Contraseña de grupo expuesta en HTML (data-contrasena)
**Archivo:** `src/pages/[lang]/menus.astro:116`

```astro
data-contrasena={tieneContrasena ? grupo.contrasena : undefined}
```

La contraseña en texto plano está visible en el DOM HTML para cualquier usuario que abra DevTools. La verificación se hace client-side comparando `input.value === card.dataset.contrasena`.

**Evaluación de riesgo:** Es "soft protection" intencional (el equipo lo conoce), pero en producción significa que cualquier técnico o usuario avanzado puede ver las contraseñas de grupos corporativos. Si las contraseñas son compartidas con clientes/empresas, estos pueden compartirlas o los competidores pueden acceder.

**Opciones:**
1. **Mínimo aceptable:** Documentar explícitamente que es soft-protection conocida y aceptada. No mezclar estas contraseñas con credenciales reales del sistema.
2. **Solución real:** Mover la validación a un endpoint del servidor (`/api/verify-group-password`) que retorne el contenido si la contraseña es correcta, sin exponer la contraseña en el HTML.

---

## IMPORTANTE — Problemas reales no bloqueantes

### I1. MenusGrupo tiene acceso público total (sin autenticación)
**Archivo:** `src/payload/collections/MenusGrupo.ts:15-19`

```ts
access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
},
```

Cualquier usuario puede crear, actualizar o borrar grupos de menús via la API REST de Payload sin estar autenticado. Esto incluye modificar/borrar contraseñas de grupos.

**Fix:** Restricciones de escritura deberían requerir autenticación:
```ts
create: ({ req: { user } }) => !!user,
update: ({ req: { user } }) => !!user,
delete: ({ req: { user } }) => !!user,
```

---

### I2. SSRF en download-pdf: edge case cuando PUBLIC_BUNNY_CDN_URL está vacío
**Archivo:** `src/pages/api/download-pdf.ts:19-26`

Si `PUBLIC_BUNNY_CDN_URL` está vacío (ej: deploy sin esa var), `allowedHosts` queda `['', 'localhost:3000']`. El filtro `requestedHost === ''` nunca es verdad, pero `requestedHost.endsWith('.')` con host vacío podría tener comportamiento inesperado. Adicionalmente, `localhost:3000` siempre está en la lista de permitidos — en producción esto podría permitir SSRF hacia servicios internos si el pod tiene acceso a localhost:3000.

**Fix:** Eliminar `localhost:3000` del hardcode en producción, o condicionarlo a `NODE_ENV !== 'production'`. También validar que `BUNNY_CDN_URL` no esté vacío antes de añadir a allowedHosts.

---

### I3. getStaticPaths ignorado — warning de build real
**Archivo:** `src/pages/[lang]/menus/[slug].astro:13`

El build muestra:
```
[WARN] getStaticPaths() ignored in dynamic page /src/pages/[lang]/menus/[slug].astro
```

La página tiene `getStaticPaths()` pero no tiene `export const prerender = true`. En output `server`, `getStaticPaths` se ignora silenciosamente. La función `getActiveMenusSlugs()` se ejecuta innecesariamente en cada build.

**Fix:** Eliminar `getStaticPaths()` (ya que es SSR) y dejar solo la lógica de redirect cuando `!menu`.

---

### I4. iFrameResize llamado múltiples veces (reservas.astro)
**Archivo:** `src/pages/[lang]/reservas.astro:91-93`

```js
initReservasIframeResize();           // llamada inmediata
window.addEventListener('load', initReservasIframeResize);  // segunda llamada
document.addEventListener('astro:page-load', initReservasIframeResize); // tercera
```

`iFrameResize` se inicializa hasta 3 veces sobre el mismo iframe `#restaurante-warynessy`. Esto puede causar múltiples event listeners y comportamiento errático de altura.

**Fix:** Guardar flag de inicialización:
```js
var _cmInitialized = false;
function initReservasIframeResize() {
  if (_cmInitialized || typeof iFrameResize !== 'function') return;
  _cmInitialized = true;
  iFrameResize({...}, '#restaurante-warynessy');
}
```

---

### I5. checkOrigin: false en iFrameResize
**Archivo:** `src/pages/[lang]/reservas.astro:74`, `src/pages/[lang]/experiencias.astro:73`

`checkOrigin: false` desactiva validación de origen en mensajes postMessage desde el iframe. Si CoverManager o el iframe de experiencias fuera comprometido, podría manipular el DOM del padre. Riesgo bajo en práctica (iframes de terceros confiables), pero vale documentar.

---

## MENOR — Mejoras recomendadas

### M1. Build produce warnings CSS no críticos
```
[WARN] @import must precede all other statements
[WARN] "file" is not a known CSS property
```
No bloquean producción pero deberían limpiarse para mantener builds limpios.

---

### M2. _cmMaxHeight es variable global (var)
**Archivo:** `src/pages/[lang]/reservas.astro:68`

```js
var _cmMaxHeight = 700;
```

Usar `var` crea una variable global en `window`. Si existe otra página con reservas o se carga el script dos veces, se sobreescribirá. Cambiar a `let` dentro del scope de `initReservasIframeResize` o encapsular en IIFE. (El comentario del issue lo menciona — documentado aquí como confirmación.)

---

### M3. isChanged calculado pero nunca usado para skip
**Archivo:** `src/payload/utils/translation-utils.ts:156-163`

```ts
const isChanged = operation === 'create' || ...
if (!isChanged) {
    console.log(`Campo '${field}' no ha cambiado, pero procedemos...`);
}
// Luego continúa a traducir de todas formas
```

La variable `isChanged` se calcula pero no se usa para condicionar la traducción — siempre se traduce. Tiene sentido para forzar re-traducción, pero el log es confuso y el cálculo es dead code.

---

### M4. fs.readdirSync en tiempo de render (carta.astro)
**Archivo:** `src/pages/[lang]/carta.astro:55`

```ts
if (fs.existsSync(dirPath)) {
  availableImages.set(slug, fs.readdirSync(dirPath));
}
```

`readdirSync` en cada request SSR lee el filesystem. En un servidor con alta carga esto podría ser un bottleneck. Las imágenes de `/public/images/carta` no cambian en runtime. Considerar cachear el mapa de imágenes en módulo-level (se evalúa una sola vez por instancia del servidor).

---

### M5. Política de cancelación hardcodeada en español (reservas.astro)
**Archivo:** `src/pages/[lang]/reservas.astro:113-117`

El bloque de "Política de Cancelación" está en español fijo, ignorando el locale. El teléfono sí usa `siteSettings`, pero el texto de la política no usa `getTranslations()`.

---

## OK — Lo que está bien

- **TypeScript:** `npx tsc --noEmit` pasa sin errores.
- **Build:** Completa con éxito. Astro + Next.js (Payload) construyen correctamente.
- **SSRF download-pdf:** Validación de host implementada correctamente con allowlist.
- **Slug trimming (Menus.ts):** Hook `beforeValidate` hace `trim()` + lowercase + replace espacios en slug. Corregido correctamente.
- **getMenusGrupo:** Llamada correctamente con `(true, locale)` en `menus.astro`. Única página que la usa.
- **translatingIds:** Patrón add/delete en `finally` implementado correctamente en todos los collections. Previene race conditions.
- **slug nunca en fieldsToTranslate:** Verificado en todos los collections — ninguno incluye `slug` en la lista de campos a traducir.
- **CORS/CSRF Payload:** Configurado correctamente usando env vars (`PUBLIC_SITE_URL` + `PAYLOAD_PUBLIC_SERVER_URL`).
- **Usuarios:** Acceso correcto — solo admins pueden crear/actualizar/borrar.
- **Carta agrupación por minOrden:** Lógica correcta — `minOrden` se actualiza si se encuentra una subcategoría con orden menor.
- **Redirect en menus/[slug].astro:** `if (!menu) return Astro.redirect(...)` está presente.
- **No secrets hardcodeados:** Todas las credenciales reales usan `process.env` / `import.meta.env`.
- **DOMPurify en contacto:** La intención de sanitizar es correcta (aunque la implementación tiene el bug de C1).
- **No hay slug de grupos expuesto en fieldsToTranslate de MenusGrupo.ts.**

---

## Acciones prioritarias recomendadas

1. **[C1] Urgente:** Reemplazar `dompurify` en `contact.ts` con sanitización server-compatible. El formulario de contacto está roto en producción.
2. **[C2] Urgente:** Eliminar `'warynessy-force'` del check de secreto en `translate-all/route.ts`.
3. **[C3] Decisión:** Documentar formalmente que `data-contrasena` es soft-protection aceptada, o implementar verificación server-side.
4. **[I1] Antes de go-live:** Añadir `create/update/delete: ({ req: { user } }) => !!user` a `MenusGrupo.ts`.
5. **[I2] Menor urgencia:** Remover `localhost:3000` del allowedHosts de download-pdf en producción.
6. **[I3]:** Eliminar `getStaticPaths()` de `menus/[slug].astro`.
7. **[I4]:** Añadir guard de inicialización única a `iFrameResize`.

---

## Métricas

- TypeScript errors: **0**
- Build result: **OK** (con warnings CSS menores)
- Issues críticos: **3**
- Issues importantes: **5**
- Issues menores: **5**

---

## Preguntas sin resolver

1. ¿La "soft protection" de contraseñas de grupo es aceptable para el cliente? ¿Las empresas saben que no es seguridad real?
2. ¿`/api/translate-all` está expuesto públicamente o solo accesible desde red interna en Dokploy?
3. ¿El formulario de contacto ha sido probado en producción alguna vez? (El bug de DOMPurify haría que fallara siempre.)
