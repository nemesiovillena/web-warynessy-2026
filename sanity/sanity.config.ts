import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Warynessy Restaurant',

  projectId: '6hx8igb1',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // Configuración Global (singleton)
            S.listItem()
              .title('⚙️ Configuración Global')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),

            S.divider(),

            // Gestión de Contenido
            S.listItem()
              .title('🏠 Página de Inicio')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),

            S.divider(),

            // Carta y Menús
            S.listItem()
              .title('🍽️ Carta')
              .child(
                S.list()
                  .title('Gestión de Carta')
                  .items([
                    S.listItem()
                      .title('Platos')
                      .schemaType('dish')
                      .child(S.documentTypeList('dish').title('Todos los Platos')),
                    S.listItem()
                      .title('Categorías')
                      .schemaType('category')
                      .child(S.documentTypeList('category').title('Categorías')),
                    S.listItem()
                      .title('Alérgenos')
                      .schemaType('allergen')
                      .child(S.documentTypeList('allergen').title('Alérgenos')),
                  ])
              ),

            S.listItem()
              .title('📋 Menús')
              .schemaType('menu')
              .child(S.documentTypeList('menu').title('Todos los Menús')),

            S.divider(),

            // Espacios y Experiencias
            S.listItem()
              .title('🏛️ Espacios')
              .schemaType('space')
              .child(S.documentTypeList('space').title('Espacios del Restaurante')),

            S.listItem()
              .title('🎁 Experiencias / Regalos')
              .schemaType('experience')
              .child(S.documentTypeList('experience').title('Experiencias')),

            S.divider(),

            // Banners
            S.listItem()
              .title('📢 Banners y Anuncios')
              .schemaType('banner')
              .child(S.documentTypeList('banner').title('Banners')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
