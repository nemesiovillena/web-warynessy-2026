#!/bin/bash

# Script de inicialización de Payload CMS para Warynessy

echo "🍽️  Inicializando Payload CMS para Warynessy..."
echo ""

# Verificar que existe .env
if [ ! -f ".env" ]; then
    echo "⚠️  No se encontró archivo .env"
    echo "📝 Creando .env desde .env.example..."
    cp .env.example .env
    echo "✅ Archivo .env creado"
    echo ""
    echo "⚠️  IMPORTANTE: Edita el archivo .env con tus valores:"
    echo "   - DATABASE_URL (PostgreSQL)"
    echo "   - PAYLOAD_SECRET (generar con: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\")"
    echo ""
    exit 1
fi

# Verificar DATABASE_URL
if ! grep -q "^DATABASE_URL=" .env || grep -q "your-" .env; then
    echo "⚠️  DATABASE_URL no configurado en .env"
    echo "📝 Configura DATABASE_URL con tu conexión a PostgreSQL"
    echo ""
    echo "Opciones:"
    echo "  1. Vercel Postgres: https://vercel.com/storage/postgres"
    echo "  2. Supabase: https://supabase.com (gratis)"
    echo "  3. Local: postgresql://localhost:5432/warynessy"
    echo ""
    exit 1
fi

# Verificar PAYLOAD_SECRET
if ! grep -q "^PAYLOAD_SECRET=" .env || grep -q "your-" .env; then
    echo "⚠️  PAYLOAD_SECRET no configurado en .env"
    echo "🔑 Generando PAYLOAD_SECRET..."
    SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

    # Añadir o reemplazar PAYLOAD_SECRET
    if grep -q "^PAYLOAD_SECRET=" .env; then
        sed -i.bak "s/^PAYLOAD_SECRET=.*/PAYLOAD_SECRET=$SECRET/" .env
    else
        echo "PAYLOAD_SECRET=$SECRET" >> .env
    fi

    echo "✅ PAYLOAD_SECRET generado y guardado en .env"
    echo ""
fi

# Crear directorio para media si no existe
if [ ! -d "media" ]; then
    echo "📁 Creando directorio media/..."
    mkdir -p media
    echo "✅ Directorio media/ creado"
    echo ""
fi

# Ejecutar migraciones
echo "🔄 Ejecutando migraciones de base de datos..."
npm run payload migrate:create
npm run payload migrate

if [ $? -eq 0 ]; then
    echo "✅ Migraciones completadas exitosamente"
    echo ""
else
    echo "❌ Error al ejecutar migraciones"
    echo "   Verifica tu DATABASE_URL en .env"
    exit 1
fi

# Generar tipos TypeScript
echo "📝 Generando tipos TypeScript..."
npm run generate:types

if [ $? -eq 0 ]; then
    echo "✅ Tipos generados exitosamente"
    echo ""
else
    echo "⚠️  Error al generar tipos (puedes continuar de todas formas)"
    echo ""
fi

echo "🎉 ¡Inicialización completada!"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Inicia Payload: npm run dev:payload"
echo "   2. Accede al admin: http://localhost:3000/admin"
echo "   3. Crea tu usuario administrador"
echo "   4. Comienza a añadir contenido"
echo ""
echo "💡 Comandos útiles:"
echo "   npm run dev              - Inicia Astro (frontend)"
echo "   npm run dev:payload      - Inicia Payload CMS"
echo "   npm run build            - Build completo"
echo "   npm run generate:types   - Regenerar tipos TypeScript"
echo ""
