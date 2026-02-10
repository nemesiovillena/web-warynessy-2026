// --- SCHEMA DEFINITION ---

// 1. Colección: Categorías de Carta
// Permite crear, ordenar y ocultar secciones enteras (ej: ocultar "Arroces" si se acaba el gas).
const categorySchema = {
  name: "category",
  title: "Categorías de la Carta",
  type: "document",
  fields: [
    { 
      name: "nombre", 
      type: "string", 
      title: "Nombre de la Categoría (ej: Entrantes)" 
    },
    { 
      name: "orden", 
      type: "number", 
      title: "Orden de aparición (1, 2, 3...)" 
    },
    { 
      name: "activa", 
      type: "boolean", 
      title: "¿Categoría Activa?", 
      description: "Desactiva esto para ocultar la categoría de la web sin borrarla.",
      initialValue: true 
    }
  ]
}

// 2. Colección: Menús (Gestión Manual)
// Totalmente independiente de la carta.
const menuSchema = {
  name: "menu",
  title: "Menús Ofertados",
  type: "document",
  fields: [
    { 
      name: "nombre", 
      type: "string", 
      title: "Nombre del Menú" 
    },
    { 
      name: "imagen", 
      type: "image", 
      title: "Imagen Promocional del Menú",
      options: { hotspot: true } // Permite recortar la imagen desde el CMS
    },
    { 
      name: "fechas_dias", 
      type: "string", 
      title: "Fecha e Información", 
      description: "ej: Válido del 1 al 15 de Agosto, solo mediodías."
    },
    { 
      name: "descripcion", 
      type: "text", // Usamos 'text' para párrafos largos o 'array' de 'block' si quieres negritas/cursivas
      title: "Descripción / Composición del Menú", 
      rows: 5
    },
    { 
      name: "precio", 
      type: "number", 
      title: "Precio (€)" 
    },
    {
      name: "activo",
      type: "boolean",
      title: "¿Visible en la web?",
      initialValue: true
    }
  ]
}

// 3. Colección: Platos (Se mantiene igual, vinculada a Categorías)
const dishSchema = {
  name: "dish",
  title: "Platos (Carta)",
  type: "document",
  fields: [
    { name: "nombre", type: "string", title: "Nombre" },
    { name: "descripcion", type: "text", title: "Ingredientes" },
    { name: "precio", type: "number", title: "Precio" },
    { name: "categoria", type: "reference", to: [{ type: "category" }], title: "Categoría" },
    { name: "alergenos", type: "array", of: [{ type: "reference", to: [{ type: "allergen" }] }] }, // Asumiendo que allergenSchema sigue existiendo
    { name: "activo", type: "boolean", title: "Disponible", initialValue: true }
  ]
}