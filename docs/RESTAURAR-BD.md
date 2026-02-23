# Guía para Restaurar la Base de Datos Local

## 📋 Instrucciones para Restaurar Dump de PostgreSQL

Esta guía explica cómo restaurar el dump de producción en el entorno local usando Docker.

---

## 🚀 Paso 1: Levantar el Contenedor de PostgreSQL

### 1.1 Iniciar el contenedor
```bash
docker compose up -d db
```

### 1.2 Verificar que el contenedor está corriendo
```bash
docker compose ps
```

Deberías ver algo como:
```
NAME                IMAGE                  STATUS
idioma_db   postgres:17-alpine   Up 2 seconds (healthy)
```

### 1.3 Verificar que la BD está lista
```bash
docker compose logs db
```

Busca el mensaje: `database system is ready to accept connections`

---

## 📦 Paso 2: Preparar el Dump

### 2.1 Colocar el dump en el directorio raíz
```bash
# Si el dump está en otra ubicación
cp /ruta/donde/esta/warynessy.dump .

# Verificar que está ahí
ls -lh warynessy.dump
```

### 2.2 Verificar el formato del dump
```bash
# Si es formato custom (.dump)
pg_restore -l warynessy.dump | head -20

# Si es formato SQL (.sql)
head -50 warynessy.sql
```

---

## 💾 Paso 3: Restaurar el Dump

### 3.1 Opción A: Formato Custom (.dump) - RECOMENDADO

```bash
# Restaurar con limpieza previa
docker compose exec -T db pg_restore \
  -U postgres \
  -d warynessy \
  --clean \
  --if-exists \
  --no-owner \
  --no-acl \
  < warynessy.dump

# Si la BD no existe, créala primero
docker compose exec db createdb -U postgres warynessy

# Luego restaura
docker compose exec -T db pg_restore \
  -U postgres \
  -d warynessy \
  --no-owner \
  --no-acl \
  < warynessy.dump
```

**Parámetros explicados:**
- `-U postgres`: Usuario de PostgreSQL
- `-d warynessy`: Base de datos destino
- `--clean`: Limpia objetos existentes
- `--if-exists`: No error si objeto no existe
- `--no-owner`: No restaura ownership
- `--no-acl`: No restaura ACLs
- `-T`: Lee de stdin

### 3.2 Opción B: Formato SQL (.sql)

```bash
# Restaurar formato SQL plano
docker compose exec -T db psql \
  -U postgres \
  -d warynessy \
  < warynessy.sql
```

### 3.3 Opción C: Dump Comprimido (.dump.gz)

```bash
# Descomprimir y restaurar
gunzip -c warynessy.dump.gz | \
  docker compose exec -T db pg_restore \
  -U postgres \
  -d warynessy \
  --no-owner \
  --no-acl
```

---

## ✅ Paso 4: Verificar la Restauración

### 4.1 Conectarse a la base de datos
```bash
docker compose exec db psql -U postgres warynessy
```

### 4.2 Verificar tablas
```sql
-- Listar todas las tablas
\dt

-- Deberías ver algo como:
-- Schema |       Name        | Type  |  Owner
--------+-------------------+-------+----------
-- public | alergenos         | table | postgres
-- public | archivos          | table | postgres
-- public | banners           | table | postgres
-- public | categorias        | table | postgres
-- public | espacios          | table | postgres
-- public | experiencias      | table | postgres
-- public | menus             | table | postgres
-- public | menus_grupo       | table | postgres
-- public | paginas           | table | postgres
-- public | platos            | table | postgres
-- public | usuarios          | table | postgres
```

### 4.3 Contar registros en tablas principales
```sql
-- Contar platos
SELECT COUNT(*) FROM platos;

-- Contar menús
SELECT COUNT(*) FROM menus;

-- Contar categorías
SELECT COUNT(*) FROM categorias;

-- Contar usuarios
SELECT COUNT(*) FROM usuarios;
```

### 4.4 Verificar datos específicos
```sql
-- Ver primeros 5 platos
SELECT id, nombre, precio FROM platos LIMIT 5;

-- Ver primera categoría
SELECT * FROM categorias LIMIT 1;
```

### 4.5 Salir de psql
```sql
\q
```

---

## 🔍 Paso 5: Verificación Completa desde Terminal

### 5.1 Conteo rápido de todas las tablas
```bash
docker compose exec db psql -U postgres warynessy -c "
SELECT 
  schemaname,
  tablename,
  n_live_tup AS rows
FROM pg_stat_user_tables 
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;
"
```

### 5.2 Ver tamaño de la base de datos
```bash
docker compose exec db psql -U postgres warynessy -c "
SELECT pg_size_pretty(pg_database_size('warynessy'));
"
```

### 5.3 Ver tablas con sus tamaños
```bash
docker compose exec db psql -U postgres warynessy -c "
SELECT 
  tablename,
  pg_size_pretty(pg_total_relation_size(tablename)) AS size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(tablename) DESC;
"
```

---

## 🧪 Paso 6: Probar Conexión desde Payload

### 6.1 Configurar .env
```bash
# Asegúrate de que .env tenga la configuración correcta
echo "DATABASE_URL=postgresql://postgres:your_password@localhost:5433/warynessy" >> .env
```

### 6.2 Probar conexión
```bash
# Iniciar Payload y verificar conexión
npm run dev:payload
```

### 6.3 Verificar en el admin panel
1. Abre http://localhost:3000/admin
2. Verifica que puedas ver los datos restaurados
3. Revisa las colecciones principales (platos, menús, etc.)

---

## 🔄 Paso 7: Comandos Útiles de Mantenimiento

### 7.1 Reiniciar el contenedor
```bash
docker compose restart db
```

### 7.2 Ver logs en tiempo real
```bash
docker compose logs -f db
```

### 7.3 Entrar al contenedor
```bash
docker compose exec db sh
# Ahora estás dentro del contenedor
psql -U postgres warynessy
```

### 7.4 Hacer backup de la BD local
```bash
# Backup local
docker compose exec db pg_dump -U postgres warynessy -F c > warynessy-local.dump

# Backup comprimido
docker compose exec db pg_dump -U postgres warynessy | gzip > warynessy-local.dump.gz
```

### 7.5 Limpiar y recrear BD
```bash
# Detener y eliminar volumen
docker compose down -v

# Levantar de nuevo (BD vacía)
docker compose up -d db

# Restaurar dump
docker compose exec -T db pg_restore -U postgres -d warynessy --no-owner --no-acl < warynessy.dump
```

---

## ❌ Solución de Problemas Comunes

### Error: "database does not exist"
```bash
# Crear la base de datos
docker compose exec db createdb -U postgres warynessy

# Intentar restaurar nuevamente
```

### Error: "connection refused"
```bash
# Verificar que el contenedor está corriendo
docker compose ps

# Verificar puerto
docker compose port db 5432

# Debería mostrar: 5432 -> 0.0.0.0:5433
```

### Error: "role does not exist"
```bash
# Crear usuario postgres
docker compose exec db psql -U postgres -c "CREATE USER postgres WITH SUPERUSER;"
```

### Error de permisos
```bash
# Cambiar permisos del dump
chmod 644 warynessy.dump

# Intentar restaurar nuevamente
```

### Restauración muy lenta
```bash
# Verificar espacio en disco
df -h

# Verificar uso de memoria
docker stats
```

### Tablas vacías después de restauración
```bash
# Verificar que el dump tiene datos
pg_restore -l warynessy.dump | grep "TABLE DATA"

# Restaurar sin --clean
docker compose exec -T db pg_restore \
  -U postgres \
  -d warynessy \
  --no-owner \
  --no-acl \
  < warynessy.dump
```

---

## 📊 Verificación de Datos Clave

### Verificar estructura de platos
```bash
docker compose exec db psql -U postgres warynessy -c "
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'platos' 
ORDER BY ordinal_position;
"
```

### Verificar relaciones
```bash
docker compose exec db psql -U postgres warynessy -c "
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema='public';
"
```

---

## ✅ Checklist de Verificación

- [ ] Contenedor PostgreSQL corriendo (docker compose ps)
- [ ] Base de datos warynessy creada
- [ ] Dump restaurado sin errores
- [ ] Todas las tablas presentes (\dt)
- [ ] Registros en platos (SELECT COUNT(*) FROM platos;)
- [ ] Registros en menús (SELECT COUNT(*) FROM menus;)
- [ ] Datos coherentes (SELECT * FROM platos LIMIT 5;)
- [ ] Conexión desde Payload funciona
- [ ] Admin panel muestra datos correctamente

---

## 🎯 Próximos Pasos

Una vez restaurada y verificada la BD:

1. **Sprint 1** - Configurar localization en Payload CMS
2. **Sprint 2** - Configurar Astro i18n routing
3. **Sprint 3** - Implementar DeepL hooks
4. **Sprint 4** - SEO, Accesibilidad, Testing
5. **Sprint 5** - Marketing, Documentación, Go-Live

---

**Documentación relacionada:**
- [EXPORTAR-BD-PRODUCCION.md](./EXPORTAR-BD-PRODUCCION.md) - Guía para exportar desde producción
- [README-I18N.md](../README-I18N.md) - Plan completo de migración multilenguaje

**¿Necesitas ayuda?** Revisa los logs del contenedor con `docker compose logs db`