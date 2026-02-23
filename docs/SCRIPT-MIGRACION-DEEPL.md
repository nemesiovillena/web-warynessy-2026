# Guía de Migración de Localización con DeepL

Este documento explica cómo ejecutar el script de migración que traduce automáticamente todos los datos existentes del español al inglés, francés y alemán usando DeepL.

## Requisitos Previos

1. **API Key de DeepL**
   - Necesitas una cuenta en [DeepL API](https://www.deepl.com/pro-api)
   - El plan gratuito permite hasta 500,000 caracteres/mes
   - Para 247 platos + 10 menús + 35 categorías, necesitarás aproximadamente 150,000-200,000 caracteres

2. **Configurar el archivo `.env`**
   ```bash
   # Añade tu API key de DeepL
   DEEPL_AUTH_KEY=your_actual_api_key_here
   ```

3. **Asegurar que la base de datos está corriendo**
   ```bash
   docker compose up -d db
   ```

## Ejecutar el Script

El script está ubicado en `scripts/migrate-locales.ts`.

### Opción 1: Ejecutar con tsx (recomendado)

```bash
npx tsx scripts/migrate-locales.ts
```

### Opción 2: Compilar y ejecutar con Node

```bash
npm run build
node dist/scripts/migrate-locales.js
```

## Qué hace el Script

El script realiza lo siguiente:

1. **Validación**
   - Verifica que `DEEPL_AUTH_KEY` esté configurado
   - Si no lo está, muestra un error y sale

2. **Migración por Colecciones**
   - Platos (247 registros)
   - Categorías (35 registros)
   - Menús (10 registros)
   - Espacios
   - Banners
   - Páginas
   - Experiencias

3. **Migración de Globals**
   - Página de Inicio
   - Configuración del Sitio

4. **Procesamiento de Campos**
   - Traduce todos los campos `localized: true`
   - Maneja arrays (etiquetas, características, incluye)
   - Maneja objetos anidados (link.texto)
   - Traduce a 3 idiomas: inglés (en-GB), francés (fr), alemán (de)

5. **Manejo de Errores**
   - Reintentos automáticos (hasta 3 intentos)
   - Fallback al texto original si falla la traducción
   - Pausas entre peticiones para no sobrepasar límites de API

## Campos que se Traducen

| Colección | Campos |
|-----------|---------|
| Platos | nombre, descripcion, etiquetas |
| Categorías | nombre, descripcion |
| Menús | nombre, etiqueta, descripcion_menu, fechasDias, descripcion |
| Espacios | nombre, descripcion, caracteristicas |
| Banners | titulo, texto, link.texto |
| Páginas | tituloInterno, heroTitle, heroSubtitle, metaTitle, metaDescription |
| Experiencias | titulo, descripcion, resumen, incluye, validez |
| PaginaInicio (global) | heroTitle, heroSubtitle, welcomeTitle, welcomeText, ctaTitle, ctaText, ctaButtonText, seoTitle, seoDescription |
| ConfiguracionSitio (global) | title, description, whatsappMessage, address, openingHours, footerLogos.alt, copyright |

## Tiempo Estimado

- **Con plan gratuito de DeepL**: 30-45 minutos
- **Con plan Pro**: 10-15 minutos (más rápido, sin límites de velocidad)

El tiempo varía dependiendo de:
- Cantidad de datos
- Plan de DeepL (free vs pro)
- Latencia de red

## Costo Estimado

| Plan | Costo | Límite Mensual |
|------|--------|---------------|
| Free | €0 | 500,000 caracteres |
| Starter | €4.99/mes | 10M caracteres |
| Advanced | €9.99/mes | Ilimitado |

Para este proyecto (aprox. 150,000 caracteres):
- **Plan gratuito**: Suficiente
- **Plan Starter**: Más rápido, sin límites de velocidad

## Progreso y Logs

El script muestra progreso detallado:

```
🚀 Iniciando migración de localización con DeepL
==================================================
🌍 Idiomas objetivo: en-GB, fr, de
📚 Colecciones a migrar: platos, categorias, menus, espacios, banners, paginas, experiencias
==================================================

🔄 Migrando colección: platos
==================================================
📊 Encontrados 247 documentos

📝 Procesando: Ensalada de Tomate
✓ platos.nombre: "Ensalada de Tomate..." → en-GB
✓ platos.nombre: "Ensalada de Tomate..." → fr
✓ platos.nombre: "Ensalada de Tomate..." → de
✓ platos.descripcion: "Deliciosa ensalada..." → en-GB
✓ platos.descripcion: "Deliciosa ensalada..." → fr
✓ platos.descripcion: "Deliciosa ensalada..." → de
✅ Documento 123 actualizado

[... más documentos ...]

📈 Resumen platos:
   - Documentos encontrados: 247
   - Documentos actualizados: 247
   - Errores: 0

[... más colecciones ...]

==================================================
✅ Migración completada
==================================================
```

## Verificación Post-Migración

Después de ejecutar el script, verifica que los datos se migraron correctamente:

1. **En el Admin de Payload**
   - Ve a cualquier colección (ej: Platos)
   - Verás pestañas para cada idioma (ES, EN, FR, DE)
   - Los datos en español deberían estar intactos
   - Los otros idiomas deberían tener las traducciones

2. **En la Base de Datos**
   ```bash
   docker compose exec db psql -U warynessy warynessy -c \
     "SELECT id, nombre->>'es' as es, nombre->>'en' as en FROM platos LIMIT 5;"
   ```

3. **API de Payload**
   ```bash
   # Ver datos en español
   curl http://localhost:3000/api/platos?locale=es&depth=0
   
   # Ver datos en inglés
   curl http://localhost:3000/api/platos?locale=en&depth=0
   ```

## Solución de Problemas

### Error: "DEEPL_AUTH_KEY no configurado"
**Solución**: Añade tu API key al archivo `.env`:
```bash
DEEPL_AUTH_KEY=your_actual_api_key_here
```

### Error: "Quota exceeded"
**Solución**: Has superado el límite de tu plan DeepL:
- Plan Free: 500,000 caracteres/mes
- Espera al próximo mes o actualiza a un plan superior

### Error: "Authentication failed"
**Solución**: Tu API key es incorrecta o inválida:
- Verifica que la key sea correcta
- Asegúrate de usar una API key de DeepL (no de la cuenta normal)

### El script es muy lento
**Solución**: Estás usando el plan gratuito que tiene límites de velocidad:
- Considera actualizar al plan Starter (€4.99/mes) para traducciones más rápidas
- O espera más tiempo entre ejecuciones

### Algunas traducciones no son correctas
**Solución**: DeepL es excelente pero no perfecto:
1. Revisa las traducciones en el admin de Payload
2. Corrige manualmente las que no sean correctas
3. Puedes reejecutar el script para traducciones específicas si modificas el código

## Reejecución del Script

Si necesitas reejecutar el script (por ejemplo, para corregir traducciones):

**Opción 1: Traducir solo campos específicos**
Modifica `fieldsToTranslate` en el script para incluir solo los campos que necesitas reescribir.

**Opción 2: Traducir solo una colección**
Modifica la función `main()` para comentar las colecciones que no necesitas.

**Opción 3: Sobrescribir todo**
Simplemente ejecuta el script de nuevo; sobrescribirá las traducciones existentes.

## Próximos Pasos

Después de completar la migración:

1. **Revisar Traducciones**
   - Accede al admin de Payload
   - Revisa muestras de cada idioma
   - Corrige manualmente las traducciones incorrectas

2. **Implementar Hooks Automáticos**
   - Configurar hooks `afterChange` para traducir automáticamente nuevos datos
   - Ver `docs/IMPLEMENTACION-HOOKS-DEEPL.md` (próximamente)

3. **Probar en Frontend**
   - Configurar Astro i18n routing
   - Implementar selector de idioma con banderas
   - Verificar que los datos se muestran correctamente en cada idioma

4. **Desplegar a Staging**
   - Subir cambios a idiomas.warynessy.com
   - Realizar pruebas completas en todos los idiomas

## Soporte

Si encuentras problemas:

1. Revisa los logs del script para errores específicos
2. Consulta la [documentación de DeepL API](https://www.deepl.com/docs-api)
3. Verifica la [documentación de Payload Localization](https://payloadcms.com/docs/configuration/localization)
4. Revisa los issues del proyecto o contacta al equipo de desarrollo

## Notas Importantes

⚠️ **No interrumpas el script** mientras se está ejecutando, podrías dejar datos parcialmente traducidos.

⚠️ **Haz backup antes** de ejecutar el script por primera vez:
```bash
docker compose exec db pg_dump -U warynessy warynessy > backup-antes-migracion.sql
```

✅ **Los datos en español nunca se modifican** durante la migración, solo se añaden traducciones.

✅ **Puedes revertir cambios** restaurando el backup si algo sale mal.