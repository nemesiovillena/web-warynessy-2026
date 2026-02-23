# Guía para Exportar la Base de Datos de Producción

## 📋 Instrucciones para Exportar Dump de PostgreSQL

Esta guía explica cómo exportar la base de datos de producción de www.warynessy.com a un archivo dump para restaurarlo en el entorno local.

---

## 🔍 Opción 1: Desde Servidor de Producción Directo

Si tienes acceso SSH al servidor de producción:

### 1. Conectarse al servidor
```bash
ssh usuario@tu-servidor-produccion
```

### 2. Ubicar la configuración de PostgreSQL
Busca las credenciales de conexión en el servidor. Normalmente en:
- Archivos de configuración de Payload
- Variables de entorno
- Archivos de configuración de la aplicación

### 3. Exportar el dump
```bash
# Formato completo con datos y estructura (recomendado)
pg_dump -U postgres -h localhost -p 5432 -F c -b -v -f warynessy.dump warynessy

# O formato SQL plano (más lento al importar pero compatible)
pg_dump -U postgres -h localhost -p 5432 warynessy > warynessy.sql
```

**Parámetros explicados:**
- `-U postgres`: Usuario de PostgreSQL
- `-h localhost`: Host de la base de datos
- `-p 5432`: Puerto de PostgreSQL
- `-F c`: Formato custom (más eficiente)
- `-b`: Incluir blobs (archivos binarios)
- `-v`: Verbose (muestra progreso)
- `-f warynessy.dump`: Nombre del archivo de salida
- `warynessy`: Nombre de la base de datos

### 4. Descargar el dump al local
```bash
# Desde tu máquina local
scp usuario@tu-servidor-produccion:/ruta/a/warynessy.dump .

# Si usas rsync (más eficiente para archivos grandes)
rsync -avz --progress usuario@tu-servidor-produccion:/ruta/a/warynessy.dump .
```

---

## 🔍 Opción 2: Desde Railway, Vercel u Otro PaaS

Si tu base de datos está en Railway, Vercel Postgres u otro servicio en la nube:

### Railway

```bash
# Instalar CLI de Railway
npm install -g @railway/cli

# Login
railway login

# Listar proyectos
railway list

# Seleccionar el proyecto
railway project

# Obtener URL de conexión
railway domain

# Exportar dump usando la URL de conexión
pg_dump -U postgres -h <host> -p <port> -F c warynessy > warynessy.dump
```

### Vercel Postgres (Neon)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Obtener variables de entorno
vercel env pull .env.local

# Usar DATABASE_URL para exportar
pg_dump $DATABASE_URL -F c > warynessy.dump
```

---

## 🔍 Opción 3: Desde pgAdmin u Otro Cliente Gráfico

Si usas pgAdmin, DBeaver o similar:

1. **Abrir pgAdmin**
2. **Conectarse al servidor de producción**
3. **Click derecho en la base de datos warynessy**
4. **Seleccionar "Backup"**
5. **Configurar:**
   - Format: Custom
   - Encoding: UTF8
   - Role: postgres
   - Filename: warynessy.dump
6. **Click en "Backup"**

---

## 🔍 Opción 4: Usando Docker en Producción

Si la BD está en un contenedor Docker en producción:

```bash
# Listar contenedores corriendo
docker ps

# Entrar al contenedor de PostgreSQL
docker exec -i nombre-contenedor-pg pg_dump -U postgres warynessy > warynessy.dump

# O si necesitas ejecutar comandos dentro del contenedor
docker exec -it nombre-contenedor-pg sh
pg_dump -U postgres warynessy > /tmp/warynessy.dump
exit
docker cp nombre-contenedor-pg:/tmp/warynessy.dump .
```

---

## 📦 Verificar el Dump

Una vez exportado, verifica que el archivo se generó correctamente:

```bash
# Ver tamaño del archivo
ls -lh warynessy.dump

# Verificar contenido (solo formato custom)
pg_restore -l warynessy.dump | head -20

# Si es formato SQL plano
head -50 warynessy.sql
```

---

## 🔐 Consideraciones de Seguridad

⚠️ **IMPORTANTE:**

1. **NO commits el dump en Git**
   - Agrega `*.dump`, `*.sql` a `.gitignore`
   - El dump contiene datos sensibles

2. **Protege el archivo localmente**
   ```bash
   chmod 600 warynessy.dump
   ```

3. **Elimina el dump del servidor después de descargarlo**
   ```bash
   rm warynessy.dump
   ```

4. **Usa variables de entorno, no hardcodees credenciales**

---

## 📝 Próximos Pasos

Una vez tengas el archivo `warynessy.dump` en tu máquina local:

1. Copia el dump al directorio raíz del proyecto:
   ```bash
   cp /ruta/donde/esta/warynessy.dump .
   ```

2. Levanta el contenedor de PostgreSQL:
   ```bash
   docker compose up -d db
   ```

3. Espera a que la base de datos esté lista:
   ```bash
   docker compose logs -f db
   ```

4. Restaurar el dump (ver RESTAURAR-BD.md):

   ```bash
   # Formato custom
   docker compose exec -T db pg_restore -U postgres -d warynessy --clean --if-exists < warynessy.dump

   # Si es formato SQL plano
   docker compose exec -T db psql -U postgres warynessy < warynessy.sql
   ```

5. Verificar la restauración:
   ```bash
   docker compose exec db psql -U postgres warynessy -c "SELECT COUNT(*) FROM platos;"
   docker compose exec db psql -U postgres warynessy -c "SELECT COUNT(*) FROM menus;"
   docker compose exec db psql -U postgres warynessy -c "\dt"
   ```

---

## ❌ Solución de Problemas Comunes

### Error: "connection refused"
- Verifica que el puerto 5432 esté abierto
- Revisa el host (localhost vs 127.0.0.1)
- Confirma que PostgreSQL esté corriendo

### Error: "FATAL: password authentication failed"
- Verifica la contraseña de usuario postgres
- Asegúrate de que el usuario tenga permisos

### Error: "database does not exist"
- Lista todas las bases de datos:
  ```bash
  psql -U postgres -h localhost -l
  ```
- Usa el nombre correcto de la BD

### Archivo muy grande (> 1GB)
- Usa compresión:
  ```bash
  pg_dump -F c warynessy | gzip > warynessy.dump.gz
  ```
- Descomprime al restaurar:
  ```bash
  gunzip -c warynessy.dump.gz | pg_restore -d warynessy
  ```

---

## 📚 Comandos Útiles

```bash
# Ver tamaño de la base de datos
psql -U postgres warynessy -c "SELECT pg_size_pretty(pg_database_size('warynessy'));"

# Ver tablas y sus tamaños
psql -U postgres warynessy -c "
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
"

# Ver conteo de registros por tabla
psql -U postgres warynessy -c "
SELECT 
  schemaname,
  tablename,
  n_tup_ins AS inserts,
  n_tup_upd AS updates,
  n_tup_del AS deletes,
  n_live_tup AS live_rows,
  n_dead_tup AS dead_rows
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
"
```

---

**Nota:** Si tienes problemas para exportar desde producción, podemos crear datos de prueba de desarrollo en su lugar. ¡Avísame!