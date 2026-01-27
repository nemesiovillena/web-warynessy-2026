import type { APIRoute } from 'astro';

export const prerender = false;

// Cache en memoria para reducir llamadas a la API
let cachedReviews: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hora

interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface Review {
  author: string;
  authorUrl?: string;
  avatar?: string;
  rating: number;
  relativeTime: string;
  text: string;
  date: string;
}

export const GET: APIRoute = async () => {
  try {
    const apiKey = import.meta.env.GOOGLE_API_KEY;
    const placeId = import.meta.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      console.error('GOOGLE_API_KEY o GOOGLE_PLACE_ID no configurados');
      return new Response(
        JSON.stringify({
          error: 'Configuración de Google Places no disponible',
          reviews: getFallbackReviews()
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Comprobar cache
    const now = Date.now();
    if (cachedReviews && (now - cacheTimestamp) < CACHE_DURATION) {
      return new Response(
        JSON.stringify({ reviews: cachedReviews, cached: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Llamar a Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=es&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Error de Google Places API:', data.status, data.error_message);
      return new Response(
        JSON.stringify({
          error: `Error de API: ${data.status}`,
          reviews: getFallbackReviews()
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Transformar reseñas
    const reviews: Review[] = (data.result?.reviews || []).map((review: GoogleReview) => ({
      author: review.author_name,
      authorUrl: review.author_url,
      avatar: review.profile_photo_url,
      rating: review.rating,
      relativeTime: review.relative_time_description,
      text: review.text,
      date: new Date(review.time * 1000).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long'
      })
    }));

    // Actualizar cache
    cachedReviews = {
      items: reviews,
      averageRating: data.result?.rating || 0,
      totalReviews: data.result?.user_ratings_total || 0
    };
    cacheTimestamp = now;

    return new Response(
      JSON.stringify({ reviews: cachedReviews, cached: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    return new Response(
      JSON.stringify({
        error: 'Error al obtener reseñas',
        reviews: getFallbackReviews()
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Reseñas de fallback cuando la API no está disponible
function getFallbackReviews() {
  return {
    items: [
      {
        author: 'María G.',
        avatar: null,
        rating: 5,
        relativeTime: 'hace 2 semanas',
        text: 'Una experiencia gastronómica excepcional. Los platos son verdaderas obras de arte y el servicio impecable. El arroz con bogavante es espectacular.',
        date: 'enero 2026'
      },
      {
        author: 'Carlos R.',
        avatar: null,
        rating: 5,
        relativeTime: 'hace 1 mes',
        text: 'Cocina tradicional elevada a otro nivel. El ambiente es acogedor y el personal muy atento. Repetiremos sin duda.',
        date: 'diciembre 2025'
      },
      {
        author: 'Ana P.',
        avatar: null,
        rating: 5,
        relativeTime: 'hace 2 meses',
        text: 'Celebramos nuestro aniversario aquí y fue perfecto. Los postres caseros son increíbles. Muy recomendable para ocasiones especiales.',
        date: 'noviembre 2025'
      }
    ],
    averageRating: 4.8,
    totalReviews: 156,
    isFallback: true
  };
}
