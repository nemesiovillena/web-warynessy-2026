/**
 * Servicio para obtener el feed de Instagram
 * Requiere INSTAGRAM_ACCESS_TOKEN y INSTAGRAM_USER_ID en el .env
 */

export interface InstagramPost {
    id: string;
    media_url: string;
    permalink: string;
    caption?: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    timestamp: string;
}

export async function getInstagramFeed(config?: any): Promise<InstagramPost[]> {
    const ACCESS_TOKEN = config?.apiToken || import.meta.env.INSTAGRAM_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN;
    const USER_ID = config?.apiUserId || import.meta.env.INSTAGRAM_USER_ID || process.env.INSTAGRAM_USER_ID;

    if (!ACCESS_TOKEN || !USER_ID) {
        console.warn('Instagram Access Token o User ID no configurados. Se mostrarán posts de prueba.');
        return getMockPosts();
    }

    try {
        const url = `https://graph.instagram.com/${USER_ID}/media?fields=id,media_url,permalink,caption,media_type,timestamp&access_token=${ACCESS_TOKEN}&limit=6`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error('Error al obtener feed de Instagram:', data.error.message);
            return getMockPosts();
        }

        return data.data || [];
    } catch (error) {
        console.error('Error de red al conectar con Instagram API:', error);
        return getMockPosts();
    }
}

function getMockPosts(): InstagramPost[] {
    return [
        {
            id: 'mock_1',
            media_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
            permalink: 'https://instagram.com',
            media_type: 'IMAGE',
            timestamp: new Date().toISOString()
        },
        {
            id: 'mock_2',
            media_url: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80',
            permalink: 'https://instagram.com',
            media_type: 'IMAGE',
            timestamp: new Date().toISOString()
        },
        {
            id: 'mock_3',
            media_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80',
            permalink: 'https://instagram.com',
            media_type: 'IMAGE',
            timestamp: new Date().toISOString()
        },
        {
            id: 'mock_4',
            media_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80',
            permalink: 'https://instagram.com',
            media_type: 'IMAGE',
            timestamp: new Date().toISOString()
        },
        {
            id: 'mock_5',
            media_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
            permalink: 'https://instagram.com',
            media_type: 'IMAGE',
            timestamp: new Date().toISOString()
        },
        {
            id: 'mock_6',
            media_url: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80',
            permalink: 'https://instagram.com',
            media_type: 'IMAGE',
            timestamp: new Date().toISOString()
        }
    ];
}
