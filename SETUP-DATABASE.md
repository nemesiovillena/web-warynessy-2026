# 🗄️ Configuración de Base de Datos PostgreSQL

## Opción 1: Vercel Postgres (Recomendado) ⭐

### Ventajas
- ✅ Integración perfecta con Vercel
- ✅ 256 MB gratis (suficiente para empezar)
- ✅ Backups automáticos
- ✅ Configuración en 2 minutos
- ✅ Escalable sin cambiar código

### Pasos

1. **Ir a Vercel Dashboard**
   ```
   https://vercel.com/dashboard
   ```

2. **Seleccionar tu proyecto**
   - Busca "warynessy" o tu proyecto
   - Click en el proyecto

3. **Crear Base de Datos**
   - Click en la pestaña **"Storage"**
   - Click en **"Create Database"**
   - Selecciona **"Postgres"**
   - Click en **"Continue"**

4. **Configurar Database**
   - Database Name: `warynessy-db` (o el que prefieras)
   - Region: Selecciona la más cercana (eu-west-1 para Europa)
   - Click en **"Create"**

5. **Copiar Connection String**
   - Una vez creada, ve a la pestaña **".env.local"**
   - Copia el valor de `POSTGRES_URL`
   - Ejemplo: `postgres://default:abc123@ep-something.us-east-1.postgres.vercel-storage.com:5432/verceldb`

6. **Configurar .env Local**
   ```bash
   # En tu proyecto
   nano .env

   # Pega el DATABASE_URL
   DATABASE_URL=postgres://default:abc123@ep-something.us-east-1.postgres.vercel-storage.com:5432/verceldb
   ```

7. **Generar PAYLOAD_SECRET**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   Copia el resultado a `.env`:
   ```env
   PAYLOAD_SECRET=el-secret-que-acabas-de-generar
   ```

8. **Ejecutar Migraciones**
   ```bash
   npm run payload migrate
   ```

9. **Iniciar Payload**
   ```bash
   npm run dev:payload
   ```

10. **Verificar**
    - Abre: http://localhost:3000/admin
    - Deberías ver la pantalla de crear usuario

---

## Opción 2: Supabase (Gratis Forever)

### Ventajas
- ✅ 500 MB gratis para siempre
- ✅ Interface visual para gestionar DB
- ✅ Backups automáticos
- ✅ Auth adicional incluido
- ✅ Realtime features disponibles

### Pasos

1. **Crear Cuenta en Supabase**
   ```
   https://supabase.com
   ```
   - Sign up gratis
   - Verifica tu email

2. **Crear Proyecto**
   - Click en **"New Project"**
   - Organization: Crea una nueva o usa existente
   - Name: `warynessy`
   - Database Password: Genera una segura y **guárdala**
   - Region: Selecciona la más cercana
   - Click en **"Create new project"**
   - Espera 1-2 minutos mientras se crea

3. **Obtener Connection String**
   - En el sidebar, click en **"Settings"** (⚙️)
   - Click en **"Database"**
   - Busca **"Connection string"**
   - Selecciona la pestaña **"URI"**
   - Copia el connection string
   - Reemplaza `[YOUR-PASSWORD]` con tu password

   Ejemplo:
   ```
   postgresql://postgres.abcdefg:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
   ```

4. **Configurar .env**
   ```bash
   nano .env
   ```

   ```env
   DATABASE_URL=postgresql://postgres.abcdefg:tu-password@aws-0-us-east-1.pooler.supabase.com:5432/postgres
   PAYLOAD_SECRET=genera-uno-con-el-comando-de-abajo
   ```

5. **Generar PAYLOAD_SECRET**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. **Ejecutar Migraciones**
   ```bash
   npm run payload migrate
   ```

7. **Iniciar Payload**
   ```bash
   npm run dev:payload
   ```

---

## Opción 3: PostgreSQL Local (Solo Desarrollo)

### Ventajas
- ✅ Totalmente gratis
- ✅ No requiere internet
- ✅ Velocidad máxima
- ⚠️ Solo para desarrollo local

### Instalar PostgreSQL

#### macOS
```bash
# Con Homebrew
brew install postgresql@14
brew services start postgresql@14

# Verificar instalación
psql --version
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

# Iniciar servicio
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Windows
Descarga el instalador desde:
```
https://www.postgresql.org/download/windows/
```

### Crear Base de Datos

```bash
# Conectarse a PostgreSQL
psql postgres

# Crear base de datos
CREATE DATABASE warynessy;

# Crear usuario (opcional)
CREATE USER warynessy_user WITH PASSWORD 'tu_password';

# Dar permisos
GRANT ALL PRIVILEGES ON DATABASE warynessy TO warynessy_user;

# Salir
\q
```

### Configurar .env

```env
# Si usas usuario por defecto
DATABASE_URL=postgresql://localhost:5432/warynessy

# Si creaste usuario custom
DATABASE_URL=postgresql://warynessy_user:tu_password@localhost:5432/warynessy

# Generar PAYLOAD_SECRET
PAYLOAD_SECRET=genera-uno-con-node
```

### Generar Secret y Migrar

```bash
# Generar secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Ejecutar migraciones
npm run payload migrate

# Iniciar Payload
npm run dev:payload
```

---

## 🚀 Script de Inicialización Automática

Una vez configurado `DATABASE_URL` y `PAYLOAD_SECRET` en `.env`, ejecuta:

```bash
./init-payload.sh
```

Este script automáticamente:
- ✅ Verifica configuración
- ✅ Genera PAYLOAD_SECRET si falta
- ✅ Crea directorio media/
- ✅ Ejecuta migraciones
- ✅ Genera tipos TypeScript

---

## ✅ Verificación

Después de configurar, verifica que todo funciona:

```bash
# 1. Ejecutar migraciones
npm run payload migrate

# 2. Iniciar Payload
npm run dev:payload

# 3. Abrir navegador
open http://localhost:3000/admin

# 4. Deberías ver la pantalla de crear usuario
```

---

## 🐛 Troubleshooting

### Error: "connection refused"
```bash
# Verificar que PostgreSQL está corriendo
# Vercel/Supabase: Verifica el connection string
# Local:
brew services list  # macOS
sudo systemctl status postgresql  # Linux
```

### Error: "authentication failed"
- Verifica password en connection string
- En Supabase: Copia el password correcto
- En local: Verifica usuario y password

### Error: "database does not exist"
```bash
# Crear la base de datos
psql postgres
CREATE DATABASE warynessy;
\q
```

### Error: "PAYLOAD_SECRET is required"
```bash
# Generar secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Añadir a .env
echo "PAYLOAD_SECRET=tu-secret-generado" >> .env
```

### Puerto 3000 ya en uso
```bash
# Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9

# O cambiar puerto en payload.config.ts
# serverURL: 'http://localhost:3001'
```

---

## 📊 Comparativa de Opciones

| Característica | Vercel Postgres | Supabase | Local |
|----------------|----------------|----------|-------|
| **Setup** | ⭐⭐⭐ Muy fácil | ⭐⭐⭐ Fácil | ⭐⭐ Medio |
| **Gratis** | 256 MB | 500 MB | Ilimitado |
| **Backups** | ✅ Automáticos | ✅ Automáticos | ❌ Manual |
| **Velocidad** | ⭐⭐⭐ Rápido | ⭐⭐⭐ Rápido | ⭐⭐⭐⭐ Muy rápido |
| **Producción** | ✅ Listo | ✅ Listo | ❌ No |
| **Interface UI** | ⚠️ Básica | ✅ Completa | ❌ CLI |
| **Escalabilidad** | ✅ Automática | ✅ Fácil | ⚠️ Manual |

**Recomendación**:
- **Desarrollo + Producción**: Vercel Postgres
- **Desarrollo con features extras**: Supabase
- **Solo desarrollo local**: PostgreSQL Local

---

## 🎯 Siguiente Paso

Una vez configurada la base de datos:

1. ✅ Ejecuta: `npm run dev:payload`
2. ✅ Abre: http://localhost:3000/admin
3. ✅ Crea tu usuario administrador
4. ✅ Comienza a añadir contenido

Ver [MIGRACION-PAYLOAD.md](MIGRACION-PAYLOAD.md) para siguiente pasos.
