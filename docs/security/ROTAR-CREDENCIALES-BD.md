# 🔐 Guía para Rotar Credenciales de Base de Datos

## ⚠️ MOTIVACIÓN

Las credenciales de la base de datos de producción están expuestas en el archivo `.env`:

```
DATABASE_URL=postgresql://warynessy:Warynessy2026SecurePass@72.62.183.215:5436/warynessy
```

**Riesgos**:
- Cualquiera con acceso al repositorio puede conectarse a la BD de producción
- Posible exfiltración de datos de clientes
- Modificación/mala intención de datos
- Ransomware

## 🚨 PASOS INMEDIATOS

### 1. CONECTARSE A LA BD DE PRODUCCIÓN

```bash
# Usando psql (PostgreSQL client)
psql postgresql://warynessy:Warynessy2026SecurePass@72.62.183.215:5436/warynessy

# O usando Docker (si tienes acceso)
docker exec -it <postgres-container> psql -U warynessy -d warynessy
```

### 2. GENERAR NUEVA CONTRASEÑA SEGURA

```bash
# Opción 1: Usar OpenSSL (recomendado)
openssl rand -base64 32
# Output: Ejemplo: abc123XYZ... (32 caracteres)

# Opción 2: Usar generador online
# https://www.lastpass.com/es/password-generator/
# - Longitud: 32+ caracteres
# - Incluir: mayúsculas, minúsculas, números, símbolos
```

### 3. ROTAR CONTRASEÑA EN POSTGRESQL

```sql
-- Reemplaza 'NUEVA_CONTRASEÑA' con la contraseña generada
ALTER USER warynessy WITH PASSWORD 'NUEVA_CONTRASEÑA';
```

### 4. ACTUALIZAR .ENV

**En local**:
```bash
# Editar .env
nano .env

# Cambiar:
DATABASE_URL=postgresql://warynessy:Warynessy2026SecurePass@72.62.183.215:5436/warynessy

# Por:
DATABASE_URL=postgresql://warynessy:NUEVA_CONTRASEÑA@72.62.183.215:5436/warynessy
```

**En producción** (Dokploy):
```bash
# 1. Ir a Dokploy > Proyecto warynessy
# 2. Seleccionar la aplicación
# 3. Ir a "Environment Variables"
# 4. Actualizar DATABASE_URL
# 5. Guardar y desplegar
```

### 5. VERIFICAR QUE LA APLICACIÓN FUNCIONA

```bash
# En local:
npm run dev

# En producción:
# La aplicación debería reiniciarse automáticamente
# Verificar logs en Dokploy
```

### 6. LIMPIAR HISTORIAL DE GIT (OPCIONAL)

Si `.env` fue alguna vez commiteado:

```bash
# ⚠️ ADVERTENCIA: Esto reescribe el historial de git
# Haz backup primero:
git clone warynessy26 warynessy26-backup

# 1. Remover .env de todos los commits
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# 2. Limpiar referencias
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 3. Forzar push (⚠️ CUIDADO)
git push origin --force --all
```

## 🔄 PROCESO DE ROTACIÓN DE CREDENCIALES

### PERIODICIDAD RECOMENDADA
- **Credenciales de BD**: Cada 90 días (3 meses)
- **Claves API (RESEND, Google, etc.): Cada 180 días (6 meses)
- **Tokens de Payload CMS**: Cada 180 días (6 meses)

### CHECKLIST DE ROTACIÓN

- [ ] Generar nueva contraseña segura (32+ caracteres)
- [ ] Actualizar contraseña en PostgreSQL
- [ ] Actualizar .env en desarrollo
- [ ] Actualizar DATABASE_URL en producción (Dokploy)
- [ ] Verificar aplicación funciona correctamente
- [ ] Limpiar historial de git si es necesario
- [ ] Documentar fecha de rotación
- [ ] Comunicar cambio a equipo técnico

## 📋 PLANTILLA DE DOCUMENTACIÓN

Mantener registro en `docs/security/credenciales-rotadas.md`:

```markdown
# Registro de Rotación de Credenciales

## Base de Datos
- **Última rotación**: 2026-02-26
- **Próxima rotación**: 2026-05-26
- **Notas**: Contraseña actualizada tras auditoría de seguridad

## API Keys
### RESEND
- **Última rotación**: TBD
- **Próxima rotación**: TBD

### Google Reviews
- **Última rotación**: TBD
- **Próxima rotación**: TBD

## Payload CMS
- **PAYLOAD_SECRET**: TBD
- **Última rotación**: TBD
- **Próxima rotación**: TBD
```

## 🔐 MEJORES PRÁCTICAS

### 1. GESTIÓN DE SECRETOS
- ✅ Usar `.env.local` para desarrollo (no commitear)
- ✅ Usar variables de entorno en producción (Dokploy, Vercel, etc.)
- ✅ Nunca commitear `.env` ni `.env.production`
- ✅ Usar secretos de GitHub Actions para CI/CD

### 2. SEGURIDAD DE CONTRASEÑAS
- ✅ Longitud mínima: 32 caracteres
- ✅ Incluir: mayúsculas, minúsculas, números, símbolos
- ✅ No usar palabras del diccionario
- ✅ No reusar contraseñas
- ✅ No compartir contraseñas en canales inseguros (email, chat, etc.)

### 3. BACKUP Y RECUPERACIÓN
- ✅ Hacer backup antes de rotar credenciales
- ✅ Documentar procedimiento de recuperación
- ✅ Verificar que backups funcionan

### 4. MONITOREO
- ✅ Configurar alertas de acceso no autorizado
- ✅ Revisar logs de PostgreSQL regularmente
- ✅ Monitorear intentos de conexión fallidos

## 🚨 EN CASO DE COMPROMISO

Si sospechas que las credenciales han sido comprometidas:

1. **Inmediato** (0-15 minutos):
   - Revocar acceso a BD
   - Cambiar todas las contraseñas
   - Revocar API keys

2. **Corto plazo** (15 minutos - 1 hora):
   - Revisar logs de acceso
   - Identificar posible origen del breach
   - Habilitar autenticación 2FA donde sea posible

3. **Medio plazo** (1-24 horas):
   - Rotar TODAS las credenciales
   - Implementar monitoreo adicional
   - Comunicar a usuarios afectados (si hay leak de datos)

## 📚 REFERENCIAS

- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-3/sp800-63-3.html)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/security.html)

---

**Última actualización**: 2026-02-26  
**Autor**: Sentinel - Agente de Seguridad  
**Estado**: ⚠️ URGENTE - Rotar credenciales inmediatamente