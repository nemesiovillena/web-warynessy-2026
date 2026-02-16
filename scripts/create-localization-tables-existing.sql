-- Crear enum de locales
DO $$ BEGIN
    CREATE TYPE "_locales" AS ENUM ('es', 'en', 'fr', 'de');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Crear tablas de localización para alergenos
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'alergenos' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para categorias
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'categorias' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para menus
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'menus' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para espacios_caracteristicas
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'espacios_caracteristicas' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para espacios
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'espacios' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para banners
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'banners' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para experiencias_incluye
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'experiencias_incluye' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para experiencias
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'experiencias' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para menus_grupo
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'menus_grupo' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para configuracion_sitio_opening_hours
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'configuracion_sitio_opening_hours' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para configuracion_sitio_footer_logos
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'configuracion_sitio_footer_logos' AND table_schema = 'public') THEN
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
    END IF;
END $$;

-- Crear tablas de localización para configuracion_sitio
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'configuracion_sitio' AND table_schema = 'public') THEN
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
    END IF;
END $$;