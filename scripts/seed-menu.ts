/**
 * Script para poblar la carta desde CSV
 * Ejecutar con: npx tsx scripts/seed-menu.ts
 */

import { getPayload } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Datos del CSV parseados
const menuData = [
  // APERITIVOS - GRAN VARIEDAD
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Ensaladilla rusa de la casa", price: 7.00 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Sepia tártara", price: 10.00 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Ensalada alicantina de salazones (ración)", price: 13.50 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Ensalada alicantina de salazones (doble)", price: 20.00 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Tomate de temporada con capellán a la llama y encurtidos", price: 13.00 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Jamón ibérico de bellota (ración)", price: 16.00 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Jamón ibérico de bellota (doble)", price: 22.50 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Anchoa en salmuera con tomate (unidad)", price: 2.80 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Carpaccio de picaña con parmesano y aceite de nueces", price: 15.50 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Foie micuit caramelizado con Pedro Ximénez", price: 21.50 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Queso frito con confitura de tomate (ración)", price: 8.00 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Queso frito con confitura de tomate (doble)", price: 10.80 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Mollejas de cordero salteadas con ajetes tiernos (unidad)", price: 13.20 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Mollejas de cordero salteadas con ajetes tiernos (doble)", price: 18.70 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Pad thai. Noodles salteados con gambas y verduras", price: 12.50 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Gyozas de pollo con verduras (4 unidades)", price: 8.20 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Croqueta casera de gamba (unidad)", price: 2.60 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Croqueta casera de rabo de toro con salsa wakame (unidad)", price: 2.60 },
  { category: "Aperitivos", subcategory: "Gran Variedad", dish: "Croqueta de boletus con salsa de trufa (unidad)", price: 2.50 },

  // APERITIVOS - EL MAR
  { category: "Aperitivos", subcategory: "El Mar", dish: "Gambas chili-garlic con stracctiatella de burrata, pan de cristal y cilantro", price: 18.00 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Tartar de salmón marinado y aguacate", price: 16.90 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Tartar de atún rojo Balfegó y mango", price: 21.00 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Tataki de atún rojo Balfegó", price: 19.90 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Zamburiñas (unidad)", price: 2.80 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Quisquilla hervida 100 gr", price: 19.00 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Calamares a la romana con mayonesa (doble)", price: 14.00 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Calamares a la romana con mayonesa (ración)", price: 8.60 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Gambas al ajillo", price: 18.90 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Gambón crujiente frito (unidad)", price: 2.60 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Pulpo a la parrilla con salsa verde", price: 16.00 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Chipirones a la parrilla con salsa verde (doble)", price: 14.00 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Chipirones a la parrilla con salsa verde (ración)", price: 8.60 },
  { category: "Aperitivos", subcategory: "El Mar", dish: "Fritura de chipirones con mayonesa negra", price: 14.20 },

  // APERITIVOS - LA TIERRA
  { category: "Aperitivos", subcategory: "La Tierra", dish: "Berenjena asada, salsa de tomate, crema de queso feta, piñones y aceite de albahaca", price: 18.00 },
  { category: "Aperitivos", subcategory: "La Tierra", dish: "Parrillada de verduras", price: 12.00 },

  // APERITIVOS - LA GRANJA
  { category: "Aperitivos", subcategory: "La Granja", dish: "Huevo de oca sobre mousse de hongos, foie fresco y trufa", price: 23.00 },
  { category: "Aperitivos", subcategory: "La Granja", dish: "Patatas al montón con jamón gran reserva, huevo frito y pimientos del padrón", price: 14.50 },
  { category: "Aperitivos", subcategory: "La Granja", dish: "Huevo a 65º, boletus, ajetes tiernos, puré de patata y trufa", price: 18.80 },
  { category: "Aperitivos", subcategory: "La Granja", dish: "Huevo a 65º, patatas, jamón ibérico y foie fresco", price: 18.50 },

  // ENSALADAS
  { category: "Ensaladas", subcategory: "", dish: "Ensalada mediterránea", price: 9.90 },
  { category: "Ensaladas", subcategory: "", dish: "¡Super Fresh! Ensalada", price: 12.90 },
  { category: "Ensaladas", subcategory: "", dish: "Ensalada de queso de cabra", price: 10.50 },
  { category: "Ensaladas", subcategory: "", dish: "Ensalada de la huerta", price: 8.30 },

  // CUCHARA
  { category: "Cuchara", subcategory: "", dish: "Relleno villenero", price: 12.50 },
  { category: "Cuchara", subcategory: "", dish: "Degustación de relleno villenero", price: 6.50 },
  { category: "Cuchara", subcategory: "", dish: "Triguico villenero", price: 14.00 },
  { category: "Cuchara", subcategory: "", dish: "Degustación de triguico villenero", price: 9.00 },
  { category: "Cuchara", subcategory: "", dish: "Gazpacho villenero con caracoles", price: 16.50 },
  { category: "Cuchara", subcategory: "", dish: "Degustación gazpacho villenero con caracoles", price: 10.50 },

  // ARROCES - SECOS (POR ENCARGO)
  { category: "Arroces", subcategory: "Arroces secos (por encargo)", dish: "Arroz de verduras", price: 15.50 },
  { category: "Arroces", subcategory: "Arroces secos (por encargo)", dish: "Arroz de marisco y pescado", price: 19.50 },
  { category: "Arroces", subcategory: "Arroces secos (por encargo)", dish: "Arroz de bacalao, gambón y coliflor", price: 17.00 },
  { category: "Arroces", subcategory: "Arroces secos (por encargo)", dish: "Arroz a banda", price: 15.50 },
  { category: "Arroces", subcategory: "Arroces secos (por encargo)", dish: "Arroz de magro y verduras", price: 15.50 },
  { category: "Arroces", subcategory: "Arroces secos (por encargo)", dish: "Arroz negro de pescado", price: 15.50 },
  { category: "Arroces", subcategory: "Arroces secos (por encargo)", dish: "Arroz y pata", price: 17.50 },
  { category: "Arroces", subcategory: "Arroces secos (por encargo)", dish: "Arroz con conejo y caracoles", price: 15.80 },

  // ARROCES - MELOSOS
  { category: "Arroces", subcategory: "Arroces melosos", dish: "Arroz meloso de bogabante con almejas", price: 22.00 },
  { category: "Arroces", subcategory: "Arroces melosos", dish: "Arroz meloso de rape y gambas", price: 19.00 },
  { category: "Arroces", subcategory: "Arroces melosos", dish: "Arroz meloso del señoret", price: 17.00 },
  { category: "Arroces", subcategory: "Arroces melosos", dish: "Rissoto de setas de temporada", price: 15.00 },

  // CARNES
  { category: "Carnes", subcategory: "", dish: "Entrecot de ternera a la parrilla con patatas", price: 24.00 },
  { category: "Carnes", subcategory: "", dish: "Entrecot raza angus (EEUU) con patatas", price: 36.00 },
  { category: "Carnes", subcategory: "", dish: "Solomillo de vacuno a la parrilla con patatas", price: 26.00 },
  { category: "Carnes", subcategory: "", dish: "Solomillo de vacuno al estilo Villena", price: 27.50 },
  { category: "Carnes", subcategory: "", dish: "Solomillo de vacuno, salsa de vino tinto, trufa y boletus", price: 33.00 },
  { category: "Carnes", subcategory: "", dish: "Solomillo de vacuno, salsa demi glace de ternera y foie fresco", price: 31.00 },
  { category: "Carnes", subcategory: "", dish: "Chuletón de vacuno mayor selecto", price: 49.00, description: "Precio por kg" },
  { category: "Carnes", subcategory: "", dish: "Rabo de vaca al vino tinto", price: 18.00 },
  { category: "Carnes", subcategory: "", dish: "Secreto con ajetes tiernos, pimientos del padrón y patatas al montón", price: 14.00 },
  { category: "Carnes", subcategory: "", dish: "Jarrete de cordero glaseado con cremoso de puré de patata", price: 22.00 },
  { category: "Carnes", subcategory: "", dish: "Codillo asado estilo alemán con puré de patatas", price: 17.00 },

  // PESCADOS
  { category: "Pescados", subcategory: "", dish: "Rodaballo a la parrilla con verduritas asadas", price: 25.00 },
  { category: "Pescados", subcategory: "", dish: "Lubina trufada con gambitas y almejas", price: 30.00 },
  { category: "Pescados", subcategory: "", dish: "Lubina con refrito de ajos, piñones y verduritas asadas", price: 22.00 },
  { category: "Pescados", subcategory: "", dish: "Lomo de bacalao Giraldo gratinado con alioli y pisto de verdura", price: 26.00 },
  { category: "Pescados", subcategory: "", dish: "Tempura de dorada, rúcula, salsa tártara y tomatitos cherry", price: 18.00 },
  { category: "Pescados", subcategory: "", dish: "Salmón teriyaki con arroz basmati, espinacas salteadas y edamame", price: 18.00 },

  // MONTADITOS
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Ternera a la salsa roquefort", price: 4.10 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Pepito de ternera", price: 3.60 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Ternera con foie micuit", price: 5.10 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Salmón marinado con mantequilla", price: 3.50 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Queso fresco con gambas y salsa de anchoas", price: 4.90 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Jamón ibérico de bellota", price: 4.10 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Completo", price: 3.00 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Mojama de almadraba con rodaja de tomate", price: 3.40 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Hueva de maruca con rodaja de tomate", price: 3.60 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Anchoas en salmuera con rodaja de tomate", price: 5.40 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Bacon con queso fundido", price: 2.90 },
  { category: "Montaditos y panes", subcategory: "Montaditos", dish: "Warynessy", price: 3.00 },

  // MINIBOCATA
  { category: "Montaditos y panes", subcategory: "Minibocata", dish: "Chipirón con pisto de verduras", price: 6.20 },
  { category: "Montaditos y panes", subcategory: "Minibocata", dish: "Ternera con jamón ibérico", price: 7.80 },
  { category: "Montaditos y panes", subcategory: "Minibocata", dish: "Ternera, queso de cabra y champiñón", price: 6.70 },

  // HAMBURGUESAS
  { category: "Montaditos y panes", subcategory: "Hamburguesas", dish: "Burger gourmet", price: 16.50 },
  { category: "Montaditos y panes", subcategory: "Hamburguesas", dish: "Burger de vacuno", price: 13.50 },

  // PAN DE CRISTAL
  { category: "Montaditos y panes", subcategory: "Pan de cristal", dish: "Pollo confitado, queso brie, tomate y salsa de curry", price: 11.50 },
  { category: "Montaditos y panes", subcategory: "Pan de cristal", dish: "Anchoas en salmuera con tomate rallado y piparra dulce", price: 13.50 },
  { category: "Montaditos y panes", subcategory: "Pan de cristal", dish: "Mojama de almadraba y hueva de maruca con tomate rallado y aceite de oliva", price: 13.50 },
  { category: "Montaditos y panes", subcategory: "Pan de cristal", dish: "Jamón ibérico de bellota con tomate rallado y aceite de oliva", price: 14.80 },

  // POSTRES
  { category: "Postres", subcategory: "", dish: "Pan de Calatrava", price: 5.50 },
  { category: "Postres", subcategory: "", dish: "Profiteroles de nata con cobertura de chocolate negro", price: 6.50 },
  { category: "Postres", subcategory: "", dish: "Tarta de queso con arándanos", price: 7.00 },
  { category: "Postres", subcategory: "", dish: "Crema tostada", price: 5.50 },
  { category: "Postres", subcategory: "", dish: "Tiramisú", price: 7.00 },
  { category: "Postres", subcategory: "", dish: "Flan de huevo de la abuela Maruja con quenelle de nata", price: 5.50 },
  { category: "Postres", subcategory: "", dish: "Brownie de chocolate y nueces con helado de vainilla", price: 7.00 },
  { category: "Postres", subcategory: "", dish: "Milhojas de crema con cobertura de chocolate negro y almendras", price: 8.00 },
  { category: "Postres", subcategory: "", dish: "Torrijas, natillas y helado de vainilla y chocolate", price: 8.00 },
  { category: "Postres", subcategory: "", dish: "Helado de vainilla con caramelo", price: 3.80 },
  { category: "Postres", subcategory: "", dish: "Helado de chocolate", price: 4.50 },
  { category: "Postres", subcategory: "", dish: "Helado de turrón con almendras", price: 5.00 },
]

// Datos de vinos y bebidas (con URLs de imágenes)
const bebidasData = [
  // VINOS BLANCOS D.O. ALICANTE
  { category: "Vinos", subcategory: "Blancos D.O. Alicante", dish: "Salicornio Malvasia", price: 24.00, imageUrl: "https://warynessy.com/wp-content/uploads/jet-form-builder/42ffcf057e133f94c1b7b5cf543ef3bd/2025/11/salicorniowebp-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Alicante", dish: "Vinalopo Blanco Sauvignon Blanc", price: 10.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Vinalopo-blanco-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Alicante", dish: "Arrocero", price: 10.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Arrocero-lasVirtudes-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Alicante", dish: "Fruto noble organic", price: 14.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Fruto-Noble-blanco-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Alicante", dish: "Casa Balaguer. Vino de finca", price: 20.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Casa-Balaguerblanco-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Alicante", dish: "Marina Alta", price: 12.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Marina-Alta-600x220.webp" },

  // VINOS BLANCOS D.O. VALENCIA
  { category: "Vinos", subcategory: "Blancos D.O. Valencia", dish: "Beberás de la copa de tu hermana", price: 17.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/beberasdelacopadetuhermanaq-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Valencia", dish: "La Mujer Caballo", price: 32.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/la-mujer-caballo-600x220.webp" },

  // VINOS BLANCOS D.O. RÍAS BAIXAS
  { category: "Vinos", subcategory: "Blancos D.O. Rías Baixas", dish: "Paco & Lola", price: 25.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/pacolola-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Rías Baixas", dish: "Granbazán etq. verde", price: 21.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/grabazan2-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Rías Baixas", dish: "Marqués de Vizhoja", price: 14.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Marques_Vizhoja-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Rías Baixas", dish: "Lías de Martín Codax", price: 30.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/lias2-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Rías Baixas", dish: "Marieta semi-seco", price: 16.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Marieta-1-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Rías Baixas", dish: "Envidia cochina", price: 45.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/envidia-cochina-600x220.webp" },

  // VINOS BLANCOS D.O. RUEDA
  { category: "Vinos", subcategory: "Blancos D.O. Rueda", dish: "Cyatho Verdejo", price: 14.00 },
  { category: "Vinos", subcategory: "Blancos D.O. Rueda", dish: "José Pariente", price: 18.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/jose-pariente-600x220.webp" },
  { category: "Vinos", subcategory: "Blancos D.O. Rueda", dish: "El Gordo del Circo", price: 25.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/el-gordo-del-circo-600x220.webp" },

  // VERMUT
  { category: "Vermut y Cervezas", subcategory: "Vermut", dish: "Yzaguirre Blanco", price: 3.20, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Yzaguirre-blanco-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Vermut", dish: "Yzaguirre rojo", price: 3.20, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/vermut-rojo-yzaguirre1-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Vermut", dish: "Martini rojo", price: 3.20, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Martini-rosso-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Vermut", dish: "Martini blanco Dry", price: 3.50, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Martini-blanco-dry-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Vermut", dish: "Martini blanco", price: 3.20, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/martini-bianco1-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Vermut", dish: "El Bandarra", price: 3.50, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/el_bandarra_rojo-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Vermut", dish: "Lustau Blanco", price: 3.50, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/vermut_lustau-blanco-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Vermut", dish: "Lustau Rojo", price: 3.50, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/vermut_lustau-rojo-600x220.webp" },

  // CERVEZAS
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "El Águila sin filtrar", price: 3.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Aguila-sin-filtrar1-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Mahou tostada 00", price: 3.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Mahou-tostada-00-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Mahou Maestra", price: 3.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Mahou-maestra1-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Mahou Sin Gluten", price: 2.80, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Mahou-sin-gluten-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Mahou 5 estrellas", price: 2.70, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Mahou-5-estrellas-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Estrella de Galicia 00", price: 2.80, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Estrella-de-Galicia-001-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Estrella de Galicia", price: 2.70, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Estrella-de-Galicia1-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "El Aguila Dorada", price: 2.50, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/El-Aguila-dorada-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Voll Damm", price: 3.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Voll-Damm-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Heineken 00", price: 2.80, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Heineken-00-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Heineken", price: 2.80, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Heineken-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Amstel Oro Sin 00", price: 2.70, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Amstel-oro-sin-00-600x220.webp" },
  { category: "Vermut y Cervezas", subcategory: "Cervezas", dish: "Amstel Radler", price: 2.60, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Amstel-Radler-600x220.webp" },

  // ESPUMOSOS
  { category: "Espumosos y vinos dulces", subcategory: "Espumosos", dish: "Benjamín Codorniu", price: 5.50, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Benjamin-Codorniu-600x220.webp" },
  { category: "Espumosos y vinos dulces", subcategory: "Espumosos", dish: "Anna de Codorniu. Brut nature", price: 16.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Anna-Codorniu-600x220.webp" },
  { category: "Espumosos y vinos dulces", subcategory: "Espumosos", dish: "Aria. Segura Viudas. Brut nature", price: 13.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Aria-Brut-600x220.webp" },
  { category: "Espumosos y vinos dulces", subcategory: "Espumosos", dish: "Juve & Camps. Reserva de la familia", price: 25.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Juve-Camps-Reserva-Familia-600x220.webp" },
  { category: "Espumosos y vinos dulces", subcategory: "Espumosos", dish: "Domino de la Vega. Authentique brut nature reserva", price: 18.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Dominio-Vega-Authentique-600x220.webp" },
  { category: "Espumosos y vinos dulces", subcategory: "Espumosos", dish: "Gramona III lustros", price: 60.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Gramona-III-Lustros-600x220.webp" },
  { category: "Espumosos y vinos dulces", subcategory: "Espumosos", dish: "Gramona Imperial. Gran reserva brut", price: 40.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Gramomna-Imperial-600x220.webp" },
  { category: "Espumosos y vinos dulces", subcategory: "Espumosos", dish: "Fuego Lento. Rosado", price: 30.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Fuego-Lento-Rosado-600x220.webp" },

  // VINOS DULCES
  { category: "Espumosos y vinos dulces", subcategory: "Vinos dulces", dish: "Fuego Lento Blanco. Catavino", price: 7.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Fuego-Lento-Alexandria-600x220.webp" },
  { category: "Espumosos y vinos dulces", subcategory: "Vinos dulces", dish: "Fuego Lento Tinto. Catavino", price: 7.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Fuego-Lento-Dulce-600x220.webp" },
  { category: "Espumosos y vinos dulces", subcategory: "Vinos dulces", dish: "Fondillón Tesoro de Villena. Catavino", price: 10.00, imageUrl: "https://warynessy.com/wp-content/uploads/2025/04/Tesoro-de-Villena-600x220.webp" },
]

// Función para generar slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Función para obtener nombre de categoría completo
function getCategoryName(category: string, subcategory: string): string {
  if (!subcategory || subcategory.trim() === '') {
    return category
  }
  return `${category} - ${subcategory}`
}

async function seed() {
  console.log('🌱 Iniciando seed de la carta...\n')

  // Importar configuración de Payload
  const configModule = await import('../payload.config')
  const config = configModule.default

  const payload = await getPayload({ config })

  // Combinar todos los datos
  const allItems = [...menuData, ...bebidasData]

  // Extraer categorías únicas
  const categoriesSet = new Set<string>()
  allItems.forEach(item => {
    const catName = getCategoryName(item.category, item.subcategory)
    categoriesSet.add(catName)
  })

  const categories = Array.from(categoriesSet)
  console.log(`📁 Encontradas ${categories.length} categorías únicas\n`)

  // Crear categorías
  const categoryMap = new Map<string, string>() // nombre -> id

  for (let i = 0; i < categories.length; i++) {
    const catName = categories[i]
    const slug = generateSlug(catName)

    try {
      // Verificar si ya existe
      const existing = await payload.find({
        collection: 'categorias',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  ⏭️  Categoría "${catName}" ya existe`)
        categoryMap.set(catName, existing.docs[0].id as string)
      } else {
        const created = await payload.create({
          collection: 'categorias',
          data: {
            nombre: catName,
            slug: slug,
            orden: i + 1,
            activa: true,
          },
        })
        console.log(`  ✅ Categoría "${catName}" creada`)
        categoryMap.set(catName, created.id as string)
      }
    } catch (error: any) {
      console.error(`  ❌ Error creando categoría "${catName}":`, error.message)
    }
  }

  console.log(`\n📝 Creando ${allItems.length} platos...\n`)

  // Crear platos
  let created = 0
  let skipped = 0
  let errors = 0

  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i]
    const catName = getCategoryName(item.category, item.subcategory)
    const categoryId = categoryMap.get(catName)

    if (!categoryId) {
      console.error(`  ❌ No se encontró categoría para "${item.dish}"`)
      errors++
      continue
    }

    try {
      // Verificar si ya existe
      const existing = await payload.find({
        collection: 'platos',
        where: {
          nombre: { equals: item.dish },
          categoria: { equals: categoryId },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        skipped++
        continue
      }

      await payload.create({
        collection: 'platos',
        data: {
          nombre: item.dish,
          precio: item.price,
          descripcion: (item as any).description || '',
          categoria: categoryId,
          activo: true,
          destacado: false,
          orden: i,
        },
      })
      created++

      if (created % 20 === 0) {
        console.log(`  📊 Progreso: ${created} platos creados...`)
      }
    } catch (error: any) {
      console.error(`  ❌ Error creando "${item.dish}":`, error.message)
      errors++
    }
  }

  console.log(`\n✨ Seed completado!`)
  console.log(`   ✅ Creados: ${created}`)
  console.log(`   ⏭️  Omitidos (ya existían): ${skipped}`)
  console.log(`   ❌ Errores: ${errors}`)

  process.exit(0)
}

seed().catch((error) => {
  console.error('Error en seed:', error)
  process.exit(1)
})
