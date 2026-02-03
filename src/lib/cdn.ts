/**
 * Bunny.net CDN Helper
 * Transforma URLs de Payload a URLs optimizadas de Bunny.net
 */

const BUNNY_URL = (import.meta.env.PUBLIC_BUNNY_CDN_URL || '').replace(/\/$/, "");
const PAYLOAD_URL = (import.meta.env.PUBLIC_PAYLOAD_API_URL?.replace('/api', '') || 'http://localhost:3000').replace(/\/$/, "");

interface CDNOptions {
    width?: number;
    height?: number;
    quality?: number;
    crop?: 'fill' | 'fit' | 'cover';
}

/**
 * Transforma una URL de imagen para usar el CDN si está configurado
 */
export function getOptimizedImageUrl(src: string, options: CDNOptions = {}): string {
    if (!src) return '/images/placeholder.jpg';

    // Normalizar src si viene como path relativo
    let path = src;

    // Si viene de localhost (típico cuando no se configura PAYLOAD_PUBLIC_SERVER_URL)
    // o viene con la URL de la API configurada
    if (path.includes('localhost:3000') || path.startsWith(PAYLOAD_URL)) {
        path = path.replace(/http:\/\/localhost:3000/, '').replace(PAYLOAD_URL, '');
    }

    // Si sigue siendo una URL absoluta externa (S3, etc), no hacemos nada
    if (path.startsWith('http')) {
        return path;
    }

    // Asegurarnos de que el path empieza por /
    if (!path.startsWith('/')) path = '/' + path;

    // Si estamos en desarrollo puro (localhost) y NO tenemos CDN, devolvemos al server local
    const isLocalDev = typeof window !== 'undefined'
        ? window.location.hostname === 'localhost'
        : process.env.NODE_ENV !== 'production';

    if (!BUNNY_URL || (isLocalDev && !path.includes('/media/'))) {
        return `${PAYLOAD_URL}${path}`;
    }

    // Construir URL de Bunny.net
    const searchParams = new URLSearchParams();
    if (options.width) searchParams.append('w', options.width.toString());
    if (options.height) searchParams.append('h', options.height.toString());
    if (options.quality) searchParams.append('q', options.quality.toString());

    const queryString = searchParams.toString();
    const separator = path.includes('?') ? '&' : '?';

    return `${BUNNY_URL}${path}${queryString ? separator + queryString : ''}`;
}
