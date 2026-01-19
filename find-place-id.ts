
import dotenv from 'dotenv';
dotenv.config();

async function findPlace() {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const query = 'Warynessy'; // Nombre del restaurante

    if (!API_KEY) {
        console.error('Falta API_KEY.');
        return;
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            console.error('Error de API:', data.status, data.error_message);
        } else if (data.results && data.results.length > 0) {
            console.log('Resultados encontrados:');
            data.results.forEach((r, i) => {
                console.log(`${i + 1}. ${r.name}`);
                console.log(`   Dirección: ${r.formatted_address}`);
                console.log(`   PLACE_ID: ${r.place_id}`);
            });
        } else {
            console.log('No se encontraron resultados para "Warynessy".');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

findPlace();
