
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const PLACE_ID = process.env.GOOGLE_PLACE_ID;

    console.log('Probando API con:');
    console.log('PLACE_ID:', PLACE_ID);
    console.log('API_KEY:', API_KEY ? 'Presente' : 'Ausente');

    if (!API_KEY || !PLACE_ID) {
        console.error('Faltan variables de entorno.');
        return;
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}&language=es`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            console.error('Error de API:', data.error_message || data.status);
        } else {
            console.log('Éxito! Reseñas encontradas:', data.result.reviews?.length || 0);
            if (data.result.reviews && data.result.reviews.length > 0) {
                console.log('Nombre del primer autor:', data.result.reviews[0].author_name);
                console.log('Texto ejemplo:', data.result.reviews[0].text.substring(0, 50) + '...');
            } else {
                console.log('No se devolvieron reseñas (esto puede pasar si el sitio no tiene reseñas públicas o si la API solo devuelve algunas en la respuesta básica).');
            }
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

test();
