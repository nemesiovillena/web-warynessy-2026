import { sql } from '@payloadcms/db-postgres'
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ 
  BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_configuracion_sitio_instagram_config_method') THEN
      CREATE TYPE "public"."enum_configuracion_sitio_instagram_config_method" AS ENUM('api', 'widget');
    END IF;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "menus_grupo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"descripcion" varchar,
  	"imagen_portada_id" integer,
  	"orden" numeric DEFAULT 0,
  	"activo" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "menus_grupo_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"menus_id" integer
  );
  
  -- Añadir columnas a tablas existentes de forma segura
  DO $$ 
  BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='alergenos' AND column_name='imagen_id') THEN
      ALTER TABLE "alergenos" ADD COLUMN "imagen_id" integer;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='menus' AND column_name='etiqueta') THEN
      ALTER TABLE "menus" ADD COLUMN "etiqueta" varchar;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='menus' AND column_name='descripcion_menu') THEN
      ALTER TABLE "menus" ADD COLUMN "descripcion_menu" varchar;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payload_locked_documents_rels' AND column_name='menus_grupo_id') THEN
      ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "menus_grupo_id" integer;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='configuracion_sitio' AND column_name='instagram_config_method') THEN
      ALTER TABLE "configuracion_sitio" ADD COLUMN "instagram_config_method" "enum_configuracion_sitio_instagram_config_method" DEFAULT 'api';
    END IF;
  END $$;

  -- Constraints (solo si no existen)
  DO $$ 
  BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='menus_grupo_imagen_portada_id_archivos_id_fk') THEN
      ALTER TABLE "menus_grupo" ADD CONSTRAINT "menus_grupo_imagen_portada_id_archivos_id_fk" FOREIGN KEY ("imagen_portada_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='menus_grupo_rels_parent_fk') THEN
      ALTER TABLE "menus_grupo_rels" ADD CONSTRAINT "menus_grupo_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menus_grupo"("id") ON DELETE cascade ON UPDATE no action;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='menus_grupo_rels_menus_fk') THEN
      ALTER TABLE "menus_grupo_rels" ADD CONSTRAINT "menus_grupo_rels_menus_fk" FOREIGN KEY ("menus_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  -- Índices (CREATE INDEX IF NOT EXISTS ya es nativo en PG)
  CREATE INDEX IF NOT EXISTS "menus_grupo_imagen_portada_idx" ON "menus_grupo" USING btree ("imagen_portada_id");
  CREATE INDEX IF NOT EXISTS "menus_grupo_updated_at_idx" ON "menus_grupo" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "menus_grupo_created_at_idx" ON "menus_grupo" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "menus_grupo_rels_order_idx" ON "menus_grupo_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "menus_grupo_rels_parent_idx" ON "menus_grupo_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "menus_grupo_rels_path_idx" ON "menus_grupo_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "menus_grupo_rels_menus_id_idx" ON "menus_grupo_rels" USING btree ("menus_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "menus_grupo_rels" CASCADE;
  DROP TABLE IF EXISTS "menus_grupo" CASCADE;
  ALTER TABLE "menus" DROP COLUMN IF EXISTS "etiqueta";
  ALTER TABLE "menus" DROP COLUMN IF EXISTS "descripcion_menu";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "menus_grupo_id";
  DROP TYPE IF EXISTS "public"."enum_configuracion_sitio_instagram_config_method";
  `)
}
