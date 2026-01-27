/**
 * Bunny.net CDN Helper
 * Transforma URLs de Payload a URLs optimizadas de Bunny.net
 */

const BUNNY_URL = import.meta.env.PUBLIC_BUNNY_CDN_URL || '';
const PAYLOAD_URL = import.meta.env.PUBLIC_PAYLOAD_API_URL?.replace('/api', '') || 'http://localhost:3000';

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

    // Si ya es una URL absoluta externa, no hacemos nada
    if (src.startsWith('http') && !src.includes(PAYLOAD_URL)) {
        return src;
    }

    // Detectar si es una imagen de Payload
    // Formatos típicos: /media/imagen.jpg o http://localhost:3000/media/imagen.jpg
    let path = src;
    if (path.startsWith(PAYLOAD_URL)) {
        path = path.replace(PAYLOAD_URL, '');
    }

    // Si no tenemos CDN, devolvemos la URL de Payload absoluta
    if (!BUNNY_URL) {
        return `${PAYLOAD_URL}${path}`;
    }

    // Si tenemos CDN, construimos la URL de Bunny.net
    // Las transformaciones de Bunny son vía query params o path
    // Usaremos query params por simplicidad si el Pull Zone lo soporta
    const searchParams = new URLSearchParams();
    if (options.width) searchParams.append('w', options.width.toString());
    if (options.height) searchParams.append('h', options.height.toString());
    if (options.quality) searchParams.append('q', options.quality.toString());

    const queryString = searchParams.toString();
    const separator = path.includes('?') ? '&' : '?';

    return `${BUNNY_URL}${path}${queryString ? separator + queryString : ''}`;
}
