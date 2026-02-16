#!/bin/bash

# Script para ejecutar ambos servidores en desarrollo
# Payload (admin) en puerto 3000 y Astro (frontend) en puerto 4321

# Limpiar procesos existentes
echo "🧹 Limpiando procesos existentes..."
pkill -f "node.*next" 2>/dev/null
pkill -f "node.*astro" 2>/dev/null
sleep 2

echo "🚀 Iniciando servidores de desarrollo..."
echo "📊 Payload Admin: http://localhost:3000/admin"
echo "📡 Astro Frontend: http://localhost:4321"
echo ""

# Crear directorio de logs si no existe
mkdir -p logs

# Iniciar Payload/Next.js en background primero
echo "📊 Iniciando Payload/Next.js en puerto 3000..."
npm run dev:admin > logs/payload.log 2>&1 &
PAYLOAD_PID=$!

# Esperar a que Payload esté listo
echo "⏳ Esperando a que Payload esté listo..."
sleep 8

# Verificar que Payload esté corriendo
if ! curl -s http://localhost:3000/api > /dev/null 2>&1; then
    echo "❌ Error: Payload no se inició correctamente. Revisa logs/payload.log"
    exit 1
fi

echo "✅ Payload está listo!"

# Iniciar Astro en background
echo "🌐 Iniciando Astro en puerto 4321..."
npm run dev > logs/astro.log 2>&1 &
ASTRO_PID=$!

# Esperar a que Astro esté listo
sleep 3

echo ""
echo "✅ Servidores iniciados correctamente!"
echo ""
echo "📝 Logs guardados en: logs/"
echo "   - Astro: logs/astro.log"
echo "   - Payload: logs/payload.log"
echo ""
echo "🌐 URLs:"
echo "   Frontend: http://localhost:4321/"
echo "   Payload:  http://localhost:3000/admin"
echo ""
echo "Para detener los servidores, presiona Ctrl+C"

# Función de limpieza al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servidores..."
    kill $PAYLOAD_PID $ASTRO_PID 2>/dev/null
    wait 2>/dev/null
    echo "✅ Servidores detenidos"
    exit 0
}

# Capturar señales de salida
trap cleanup INT TERM

# Mantener script corriendo
wait
