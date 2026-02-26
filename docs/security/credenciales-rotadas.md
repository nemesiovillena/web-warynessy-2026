# Registro de Rotación de Credenciales

## Base de Datos de Producción

### Rotación #1
- **Fecha**: 2026-02-26
- **Realizado por**: Usuario
- **Motivo**: Auditoría de seguridad - Vulnerabilidades críticas encontradas
- **Usuario**: warynessy
- **Servidor**: 72.62.183.215:5436
- **Base de datos**: warynessy

**Contraseña anterior**: `Warynessy2026SecurePass` (COMPROMETIDA - expuesta en .env)

**Contraseña nueva**: `A2Eiw+Pwm/0dPpl2QP5BapKICJXDCrqmUv4icZ/e5zQ=` (44 caracteres, segura)

**Próxima rotación**: 2026-05-26 (90 días)

**Estado**: 
- [x] Contraseña generada con OpenSSL (32 bytes, base64)
- [x] Contraseña rotada en PostgreSQL
- [x] .env actualizado en desarrollo
- [ ] DATABASE_URL actualizado en Dokploy (Pendiente - MANUAL)
- [ ] Aplicación verificada en producción (Pendiente)

**Notas**:
- La contraseña anterior estaba expuesta en el archivo .env del repositorio
- Cualquiera con acceso al repositorio podía conectarse a la BD de producción
- Se generó nueva contraseña con 44 caracteres usando: `openssl rand -base64 32`
- Se sigue estándar NIST para longitudes de contraseñas (32+ caracteres)

---

## API Keys

### RESEND
- **Última rotación**: TBD
- **Próxima rotación**: TBD
- **Estado**: Pendiente de rotación

### Google Reviews
- **Última rotación**: TBD
- **Próxima rotación**: TBD
- **Estado**: Pendiente de rotación

---

## Payload CMS

### PAYLOAD_SECRET
- **Valor actual**: `50761fc388a111c680f0d6e76afca43decb58684e4bf0fa8fb0e5b1779bb1341`
- **Última rotación**: TBD
- **Próxima rotación**: TBD
- **Estado**: Pendiente de rotación

---

## Checklist de Rotación de Credenciales

### Credenciales Rotadas
- [x] Base de Datos de Producción (2026-02-26)

### Credenciales Pendientes de Rotación
- [ ] RESEND_API_KEY
- [ ] BUNNY_API_KEY
- [ ] BUNNY_STORAGE_PASSWORD
- [ ] PAYLOAD_SECRET
- [ ] GOOGLE_API_KEY (opcional - API pública)

---

## Referencias

- [x] Guía de rotación: `docs/security/ROTAR-CREDENCIALES-BD.md`
- [x] Guía de verificación: `docs/security/VERIFICAR-PRODUCCION.md`
- [x] Reporte de seguridad: Ver historial de conversación (Sentinel)

---

**Última actualización**: 2026-02-26
**Próxima revisión**: 2026-05-26
**Responsable**: Usuario