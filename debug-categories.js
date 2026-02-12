import { getCategorias, getPlatos } from './src/lib/payload-local.js';

async function debug() {
    const allCategories = await getCategorias();
    const allDishes = await getPlatos();

    const categoriesWithDishes = allCategories.map((cat) => ({
        ...cat,
        platos: allDishes.filter((dish) =>
            (dish.categoria === cat.id || dish.categoria?.id === cat.id) && dish.activo !== false
        )
    }));

    const activeCategories = categoriesWithDishes.filter((cat) => cat.activa && cat.platos.length > 0);

    console.log('--- CATEGORIES DATA ---');
    activeCategories.forEach(cat => {
        console.log(`Name: "${cat.nombre}" | Slug: "${cat.slug}" | ID: ${cat.id} | Order: ${cat.orden}`);
    });
}

debug();
