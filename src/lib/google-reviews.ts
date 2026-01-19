/**
 * Servicio para obtener reseñas reales de Google
 * Requiere GOOGLE_API_KEY y GOOGLE_PLACE_ID en el .env
 */

export interface GoogleReview {
    author_name: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
    profile_photo_url?: string;
}

export async function getGoogleReviews(): Promise<GoogleReview[]> {
    const API_KEY = import.meta.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;
    const PLACE_ID = import.meta.env.GOOGLE_PLACE_ID || process.env.GOOGLE_PLACE_ID;

    if (!API_KEY || !PLACE_ID) {
        console.warn('Google API Key o Place ID no configurados. Se mostrarán reseñas de prueba.');
        return getMockReviews();
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}&language=es`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            console.error('Error al obtener reseñas de Google:', data.error_message || data.status);
            return getMockReviews();
        }

        return data.result.reviews || [];
    } catch (error) {
        console.error('Error de red al conectar con Google Places API:', error);
        return getMockReviews();
    }
}

function getMockReviews(): GoogleReview[] {
    return [
        {
            author_name: "Cliente de Prueba",
            rating: 5,
            relative_time_description: "hace una semana",
            text: "Excelente servicio y comida increíble. Muy recomendado.",
            time: Date.now() / 1000,
            profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-EMjD..."
        }
    ];
}
