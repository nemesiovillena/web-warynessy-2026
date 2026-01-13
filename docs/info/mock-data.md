{
  "datos_carta": {
    "categorias": [
      { 
        "id": "cat_gran_variedad", 
        "nombre": "Gran Variedad", 
        "orden": 1, 
        "activa": true 
      },
      { 
        "id": "cat_la_granja", 
        "nombre": "La Granja", 
        "orden": 2, 
        "activa": true 
      },
      { 
        "id": "cat_arroces", 
        "nombre": "Arroces Secos", 
        "orden": 3, 
        "activa": false 
      }
    ],
    "platos": [
      {
        "id": "pl_ensaladilla",
        "nombre": "Ensaladilla rusa",
        "descripcion": "Con mayonesa casera y atún.",
        "precio": 7.00,
        "categoria_id": "cat_gran_variedad",
        "alergenos_ids": ["al_huevo", "al_pescado"],
        "activo": true
      },
      {
        "id": "pl_arroz_banda",
        "nombre": "Arroz a banda",
        "descripcion": "Mínimo 2 personas.",
        "precio": 15.50,
        "categoria_id": "cat_arroces",
        "alergenos_ids": ["al_pescado"],
        "activo": true
      }
    ]
  },
  "datos_menus": [
    {
      "id": "menu_diario",
      "nombre": "Menú del Día",
      "imagen": "/img/menus/menu-dia-bg.jpg",
      "fechas_dias": "Lunes a Viernes (no festivos)",
      "descripcion": "Disfruta de nuestra selección diaria. Incluye:\n- 3 Entrantes al centro a compartir.\n- Plato principal a elegir entre Arroz, Carne o Pescado.\n- Postre casero o Café.\n- 1 Bebida incluida.",
      "precio": 18.50,
      "activo": true
    },
    {
      "id": "menu_san_valentin",
      "nombre": "Especial San Valentín",
      "imagen": "/img/menus/love-menu.jpg",
      "fechas_dias": "Solo noche del 14 de Febrero",
      "descripcion": "Cena romántica con velas.\n\nCocktail de Bienvenida.\nEntrantes: Ostras y Foie.\nPrincipal: Solomillo al Pedro Ximénez.\nPostre: Corazón de Chocolate fundido.",
      "precio": 45.00,
      "activo": true
    },
    {
      "id": "menu_grupos",
      "nombre": "Menú Grupos",
      "imagen": "/img/menus/grupos.jpg",
      "fechas_dias": "Sábados y Domingos (Mínimo 8 pax)",
      "descripcion": "La mejor opción para celebraciones.\nConsultar opciones vegetarianas.",
      "precio": 32.00,
      "activo": false
    }
  ]
}