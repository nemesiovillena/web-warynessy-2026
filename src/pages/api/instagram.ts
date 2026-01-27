import type { APIRoute } from 'astro';

export const prerender = false;

// Cache en memoria para reducir llamadas a la API
let cachedPosts: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp: string;
}

export const GET: APIRoute = async () => {
  try {
    const accessToken = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = import.meta.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      console.warn('Instagram API no configurada');
      return new Response(
        JSON.stringify({
          posts: getMockPosts(),
          isMock: true,
          error: 'Instagram API no configurada'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Comprobar cache
    const now = Date.now();
    if (cachedPosts && (now - cacheTimestamp) < CACHE_DURATION) {
      return new Response(
        JSON.stringify({ posts: cachedPosts, cached: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Llamar a Instagram Graph API
    const url = `https://graph.instagram.com/${userId}/media?fields=id,media_url,permalink,caption,media_type,timestamp&access_token=${accessToken}&limit=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Error de Instagram API:', data.error.message);
      return new Response(
        JSON.stringify({
          posts: getMockPosts(),
          isMock: true,
          error: data.error.message
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const posts: InstagramPost[] = data.data || [];

    // Actualizar cache
    cachedPosts = posts;
    cacheTimestamp = now;

    return new Response(
      JSON.stringify({ posts, cached: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error al obtener feed de Instagram:', error);
    return new Response(
      JSON.stringify({
        posts: getMockPosts(),
        isMock: true,
        error: 'Error de conexión'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

function getMockPosts(): InstagramPost[] {
  return [
    {
      id: 'mock_1',
      media_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
      permalink: 'https://instagram.com/warynessy',
      media_type: 'IMAGE',
      timestamp: new Date().toISOString(),
      caption: 'Deliciosa cocina mediterránea'
    },
    {
      id: 'mock_2',
      media_url: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=400',
      permalink: 'https://instagram.com/warynessy',
      media_type: 'IMAGE',
      timestamp: new Date().toISOString(),
      caption: 'Nuestros platos estrella'
    },
    {
      id: 'mock_3',
      media_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400',
      permalink: 'https://instagram.com/warynessy',
      media_type: 'IMAGE',
      timestamp: new Date().toISOString(),
      caption: 'Ambiente único'
    },
    {
      id: 'mock_4',
      media_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400',
      permalink: 'https://instagram.com/warynessy',
      media_type: 'IMAGE',
      timestamp: new Date().toISOString(),
      caption: 'Coctelería de autor'
    },
    {
      id: 'mock_5',
      media_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
      permalink: 'https://instagram.com/warynessy',
      media_type: 'IMAGE',
      timestamp: new Date().toISOString(),
      caption: 'Producto fresco'
    },
    {
      id: 'mock_6',
      media_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=400',
      permalink: 'https://instagram.com/warynessy',
      media_type: 'IMAGE',
      timestamp: new Date().toISOString(),
      caption: 'Postres artesanos'
    }
  ];
}
