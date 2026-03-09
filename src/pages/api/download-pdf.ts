import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Proxy endpoint para descargar PDFs desde Bunny CDN.
 * Necesario porque el atributo `download` de HTML no funciona en URLs cross-origin.
 * Recibe: ?url=<url_codificada>&filename=<nombre_archivo>
 */
export const GET: APIRoute = async ({ url }) => {
    const pdfUrl = url.searchParams.get('url');
    const filename = url.searchParams.get('filename') || 'menu.pdf';

    if (!pdfUrl) {
        return new Response('URL requerida', { status: 400 });
    }

    // Validar que la URL sea de nuestro CDN o servidor Payload para evitar SSRF
    const BUNNY_CDN_URL = import.meta.env.PUBLIC_BUNNY_CDN_URL || '';
    const PAYLOAD_URL = import.meta.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

    const allowedHosts = [
        BUNNY_CDN_URL.replace(/^https?:\/\//, '').replace(/\/$/, ''),
        new URL(PAYLOAD_URL).host,
        'localhost:3000',
    ].filter(Boolean);

    let requestedHost: string;
    try {
        requestedHost = new URL(pdfUrl).host;
    } catch {
        return new Response('URL inválida', { status: 400 });
    }

    const isAllowed = allowedHosts.some(h => requestedHost === h || requestedHost.endsWith(`.${h}`));
    if (!isAllowed) {
        return new Response('URL no permitida', { status: 403 });
    }

    try {
        const response = await fetch(pdfUrl);
        if (!response.ok) {
            return new Response('Error al obtener el archivo', { status: response.status });
        }

        const contentType = response.headers.get('content-type') || 'application/pdf';
        const buffer = await response.arrayBuffer();

        // Sanitizar el nombre del archivo para la cabecera Content-Disposition
        const safeFilename = filename.replace(/[^a-zA-Z0-9._\-]/g, '_');

        return new Response(buffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${safeFilename}"`,
                'Content-Length': buffer.byteLength.toString(),
                'Cache-Control': 'private, max-age=3600',
            },
        });
    } catch (error) {
        console.error('[download-pdf] Error al hacer proxy del PDF:', error);
        return new Response('Error interno', { status: 500 });
    }
};
