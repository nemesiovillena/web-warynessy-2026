-- Crear todas las tablas de localización necesarias
-- Ejecutar directamente en la base de datos

-- Tabla de localización para configuracion_sitio
CREATE TABLE IF NOT EXISTS "configuracion_sitio_locales" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "description" varchar,
    "contact_whatsapp_message" varchar,
    "contact_address" varchar,
    "copyright" varchar,
    "_locale" varchar NOT NULL,
    "_parent_id" integer NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "configuracion_sitio_locales_parent_idx" ON "configuracion_sitio_locales" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "configuracion_sitio_locales_locale_idx" ON "configuracion_sitio_locales" USING btree ("_locale");

-- Tabla de localización para openingHours
CREATE TABLE IF NOT EXISTS "configuracion_sitio_opening_hours_locales" (
    "id" serial PRIMARY KEY NOT NULL,
    "days" varchar,
    "hours" varchar,
    "_locale" varchar NOT NULL,
    "_parent_id" integer NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "configuracion_sitio_opening_hours_locales_parent_idx" ON "configuracion_sitio_opening_hours_locales" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "configuracion_sitio_opening_hours_locales_locale_idx" ON "configuracion_sitio_opening_hours_locales" USING btree ("_locale");

-- Tabla de localización para footerLogos
CREATE TABLE IF NOT EXISTS "configuracion_sitio_footer_logos_locales" (
    "id" serial PRIMARY KEY NOT NULL,
    "alt" varchar,
    "_locale" varchar NOT NULL,
    "_parent_id" integer NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "configuracion_sitio_footer_logos_locales_parent_idx" ON "configuracion_sitio_footer_logos_locales" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "configuracion_sitio_footer_logos_locales_locale_idx" ON "configuracion_sitio_footer_logos_locales" USING btree ("_locale");

-- Tablas de localización para colecciones
CREATE TABLE IF NOT EXISTS "espacios_locales" (
    "id" serial PRIMARY KEY NOT NULL,
    "nombre" varchar NOT NULL,
    "descripcion" varchar,
    "_locale" varchar NOT NULL,
    "_parent_id" integer NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "espacios_locales_parent_idx" ON "espacios_locales" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "espacios_locales_locale_idx" ON "espacios_locales" USING btree ("_locale");

CREATE TABLE IF NOT EXISTS "alergenos_locales" (
    "id" serial PRIMARY KEY NOT NULL,
    "nombre" varchar NOT NULL,
    "descripcion" varchar,
    "_locale" varchar NOT NULL,
    "_parent_id" integer NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "alergenos_locales_parent_idx" ON "alergenos_locales" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "alergenos_locales_locale_idx" ON "alergenos_locales" USING btree ("_locale");

CREATE TABLE IF NOT EXISTS "categorias_locales" (
    "id" serial PRIMARY KEY NOT NULL,
    "nombre" varchar NOT NULL,
    "descripcion" varchar,
    "_locale" varchar NOT NULL,
    "_parent_id" integer NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "categorias_locales_parent_idx" ON "categorias_locales" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "categorias_locales_locale_idx" ON "categorias_locales" USING btree ("_locale");

-- Agregar columnas faltantes a configuracion_sitio
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='configuracion_sitio' AND column_name='instagram_config_api_token') THEN
        ALTER TABLE "configuracion_sitio" ADD COLUMN "instagram_config_api_token" varchar;
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='configuracion_sitio' AND column_name='instagram_config_api_user_id') THEN
        ALTER TABLE "configuracion_sitio" ADD COLUMN "instagram_config_api_user_id" varchar;
    END IF;
END $$;