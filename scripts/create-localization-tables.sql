-- Crear enum de locales
DO $$ BEGIN
    CREATE TYPE "_locales" AS ENUM ('es', 'en', 'fr', 'de');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Crear tablas de localización para alergenos
CREATE TABLE IF NOT EXISTS "alergenos_locales" (
    "nombre" varchar NOT NULL,
    "descripcion" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "alergenos_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."alergenos"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "alergenos_locales_locale_parent_id_unique" 
    ON "alergenos_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para categorias
CREATE TABLE IF NOT EXISTS "categorias_locales" (
    "nombre" varchar NOT NULL,
    "descripcion" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "categorias_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."categorias"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "categorias_locales_locale_parent_id_unique" 
    ON "categorias_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para platos_etiquetas
CREATE TABLE IF NOT EXISTS "platos_etiquetas_locales" (
    "etiqueta" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL,
    CONSTRAINT "platos_etiquetas_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."platos_etiquetas"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "platos_etiquetas_locales_locale_parent_id_unique" 
    ON "platos_etiquetas_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para platos
CREATE TABLE IF NOT EXISTS "platos_locales" (
    "nombre" varchar NOT NULL,
    "descripcion" varchar,
    "precio" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "platos_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."platos"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "platos_locales_locale_parent_id_unique" 
    ON "platos_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para menus
CREATE TABLE IF NOT EXISTS "menus_locales" (
    "nombre" varchar NOT NULL,
    "etiqueta" varchar,
    "descripcion_menu" varchar,
    "fechas_dias" varchar,
    "descripcion" jsonb,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "menus_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."menus"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "menus_locales_locale_parent_id_unique" 
    ON "menus_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para espacios_caracteristicas
CREATE TABLE IF NOT EXISTS "espacios_caracteristicas_locales" (
    "caracteristica" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL,
    CONSTRAINT "espacios_caracteristicas_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."espacios_caracteristicas"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "espacios_caracteristicas_locales_locale_parent_id_unique" 
    ON "espacios_caracteristicas_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para espacios
CREATE TABLE IF NOT EXISTS "espacios_locales" (
    "nombre" varchar NOT NULL,
    "descripcion" jsonb,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "espacios_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."espacios"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "espacios_locales_locale_parent_id_unique" 
    ON "espacios_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para banners
CREATE TABLE IF NOT EXISTS "banners_locales" (
    "titulo" varchar NOT NULL,
    "texto" varchar,
    "link_texto" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "banners_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."banners"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "banners_locales_locale_parent_id_unique" 
    ON "banners_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para paginas
CREATE TABLE IF NOT EXISTS "paginas_locales" (
    "titulo_interno" varchar NOT NULL,
    "hero_title" varchar,
    "hero_subtitle" varchar,
    "meta_title" varchar,
    "meta_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "paginas_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."paginas"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "paginas_locales_locale_parent_id_unique" 
    ON "paginas_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para experiencias_incluye
CREATE TABLE IF NOT EXISTS "experiencias_incluye_locales" (
    "item" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL,
    CONSTRAINT "experiencias_incluye_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."experiencias_incluye"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "experiencias_incluye_locales_locale_parent_id_unique" 
    ON "experiencias_incluye_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para experiencias
CREATE TABLE IF NOT EXISTS "experiencias_locales" (
    "titulo" varchar NOT NULL,
    "descripcion" jsonb,
    "resumen" varchar,
    "validez" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "experiencias_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."experiencias"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "experiencias_locales_locale_parent_id_unique" 
    ON "experiencias_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para menus_grupo
CREATE TABLE IF NOT EXISTS "menus_grupo_locales" (
    "nombre" varchar NOT NULL,
    "descripcion" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "menus_grupo_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."menus_grupo"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "menus_grupo_locales_locale_parent_id_unique" 
    ON "menus_grupo_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para pagina_inicio
CREATE TABLE IF NOT EXISTS "pagina_inicio_locales" (
    "hero_title" varchar NOT NULL,
    "hero_subtitle" varchar,
    "welcome_title" varchar,
    "welcome_text" jsonb,
    "cta_title" varchar,
    "cta_text" varchar,
    "cta_button_text" varchar DEFAULT 'Reservar ahora',
    "seo_title" varchar,
    "seo_description" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "pagina_inicio_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."pagina_inicio"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "pagina_inicio_locales_locale_parent_id_unique" 
    ON "pagina_inicio_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para configuracion_sitio_opening_hours
CREATE TABLE IF NOT EXISTS "configuracion_sitio_opening_hours_locales" (
    "days" varchar,
    "hours" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL,
    CONSTRAINT "configuracion_sitio_opening_hours_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."configuracion_sitio_opening_hours"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "configuracion_sitio_opening_hours_locales_locale_parent_id_u" 
    ON "configuracion_sitio_opening_hours_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para configuracion_sitio_footer_logos
CREATE TABLE IF NOT EXISTS "configuracion_sitio_footer_logos_locales" (
    "alt" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL,
    CONSTRAINT "configuracion_sitio_footer_logos_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."configuracion_sitio_footer_logos"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "configuracion_sitio_footer_logos_locales_locale_parent_id_un" 
    ON "configuracion_sitio_footer_logos_locales" USING btree ("_locale", "_parent_id");

-- Crear tablas de localización para configuracion_sitio
CREATE TABLE IF NOT EXISTS "configuracion_sitio_locales" (
    "title" varchar NOT NULL,
    "description" varchar,
    "contact_whatsapp_message" varchar,
    "contact_address" varchar,
    "copyright" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL,
    CONSTRAINT "configuracion_sitio_locales_parent_id_fk" 
        FOREIGN KEY ("_parent_id") 
        REFERENCES "public"."configuracion_sitio"("id") 
        ON DELETE cascade 
        ON UPDATE no action
);

CREATE UNIQUE INDEX IF NOT EXISTS "configuracion_sitio_locales_locale_parent_id_unique" 
    ON "configuracion_sitio_locales" USING btree ("_locale", "_parent_id");