import { sql } from '@payloadcms/db-postgres'
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   CREATE TYPE "public"."enum_usuarios_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_menus_dias_semana" AS ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo');
  CREATE TYPE "public"."enum_menus_horario" AS ENUM('comidas', 'cenas', 'ambos');
  CREATE TYPE "public"."enum_banners_posicion" AS ENUM('home-top', 'home-middle', 'home-bottom', 'carta-top', 'menus-top', 'global-top');
  CREATE TYPE "public"."enum_banners_tipo" AS ENUM('info', 'promo', 'warning', 'event');
  CREATE TABLE "usuarios_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "usuarios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"role" "enum_usuarios_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "archivos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "alergenos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"codigo" varchar NOT NULL,
  	"descripcion" varchar,
  	"icono" varchar,
  	"orden" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categorias" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"descripcion" varchar,
  	"orden" numeric DEFAULT 1 NOT NULL,
  	"activa" boolean DEFAULT true,
  	"imagen_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "platos_etiquetas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar NOT NULL
  );
  
  CREATE TABLE "platos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"descripcion" varchar,
  	"precio" numeric NOT NULL,
  	"imagen_id" integer,
  	"categoria_id" integer NOT NULL,
  	"activo" boolean DEFAULT true,
  	"destacado" boolean DEFAULT false,
  	"orden" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "platos_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"alergenos_id" integer
  );
  
  CREATE TABLE "menus_dias_semana" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_menus_dias_semana",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "menus" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"imagen_id" integer,
  	"precio" numeric NOT NULL,
  	"fechas_dias" varchar,
  	"fecha_inicio" timestamp(3) with time zone,
  	"fecha_fin" timestamp(3) with time zone,
  	"descripcion" jsonb,
  	"pdf_id" integer,
  	"activo" boolean DEFAULT true,
  	"destacado" boolean DEFAULT false,
  	"orden" numeric DEFAULT 0,
  	"horario" "enum_menus_horario",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "espacios_galeria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"imagen_id" integer NOT NULL
  );
  
  CREATE TABLE "espacios_caracteristicas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caracteristica" varchar NOT NULL
  );
  
  CREATE TABLE "espacios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"descripcion" jsonb,
  	"capacidad" numeric,
  	"orden" numeric DEFAULT 0 NOT NULL,
  	"activo" boolean DEFAULT true,
  	"disponible_eventos" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiencias_incluye" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "experiencias" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"descripcion" jsonb,
  	"resumen" varchar,
  	"precio" numeric NOT NULL,
  	"imagen_id" integer NOT NULL,
  	"link_compra" varchar,
  	"color_fondo" varchar,
  	"validez" varchar,
  	"activo" boolean DEFAULT true,
  	"destacado" boolean DEFAULT false,
  	"orden" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "banners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"texto" varchar,
  	"imagen_id" integer,
  	"link_url" varchar,
  	"link_texto" varchar,
  	"link_externo" boolean DEFAULT false,
  	"fecha_inicio" timestamp(3) with time zone NOT NULL,
  	"fecha_fin" timestamp(3) with time zone NOT NULL,
  	"posicion" "enum_banners_posicion" NOT NULL,
  	"tipo" "enum_banners_tipo",
  	"activo" boolean DEFAULT true,
  	"prioridad" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"usuarios_id" integer,
  	"archivos_id" integer,
  	"alergenos_id" integer,
  	"categorias_id" integer,
  	"platos_id" integer,
  	"menus_id" integer,
  	"espacios_id" integer,
  	"experiencias_id" integer,
  	"banners_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"usuarios_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pagina_inicio_galeria_inicio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"imagen_id" integer NOT NULL
  );
  
  CREATE TABLE "pagina_inicio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_image_id" integer NOT NULL,
  	"welcome_title" varchar,
  	"welcome_text" jsonb,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"cta_button_text" varchar DEFAULT 'Reservar ahora',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pagina_inicio_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"espacios_id" integer,
  	"experiencias_id" integer
  );
  
  CREATE TABLE "configuracion_sitio_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"days" varchar,
  	"hours" varchar,
  	"closed" boolean DEFAULT false
  );
  
  CREATE TABLE "configuracion_sitio_footer_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "configuracion_sitio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"logo_id" integer,
  	"description" varchar,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"contact_address" varchar,
  	"contact_postal_code" varchar,
  	"contact_city" varchar,
  	"contact_province" varchar,
  	"contact_country" varchar,
  	"contact_google_maps_url" varchar,
  	"contact_coordinates_lat" numeric,
  	"contact_coordinates_lng" numeric,
  	"social_media_facebook" varchar,
  	"social_media_instagram" varchar,
  	"social_media_twitter" varchar,
  	"social_media_tiktok" varchar,
  	"social_media_youtube" varchar,
  	"social_media_tripadvisor" varchar,
  	"copyright" varchar,
  	"cover_manager_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "usuarios_sessions" ADD CONSTRAINT "usuarios_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categorias" ADD CONSTRAINT "categorias_imagen_id_archivos_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "platos_etiquetas" ADD CONSTRAINT "platos_etiquetas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platos" ADD CONSTRAINT "platos_imagen_id_archivos_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "platos" ADD CONSTRAINT "platos_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "platos_rels" ADD CONSTRAINT "platos_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."platos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platos_rels" ADD CONSTRAINT "platos_rels_alergenos_fk" FOREIGN KEY ("alergenos_id") REFERENCES "public"."alergenos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus_dias_semana" ADD CONSTRAINT "menus_dias_semana_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus" ADD CONSTRAINT "menus_imagen_id_archivos_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menus" ADD CONSTRAINT "menus_pdf_id_archivos_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "espacios_galeria" ADD CONSTRAINT "espacios_galeria_imagen_id_archivos_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "espacios_galeria" ADD CONSTRAINT "espacios_galeria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."espacios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "espacios_caracteristicas" ADD CONSTRAINT "espacios_caracteristicas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."espacios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiencias_incluye" ADD CONSTRAINT "experiencias_incluye_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiencias"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_imagen_id_archivos_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "banners" ADD CONSTRAINT "banners_imagen_id_archivos_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_usuarios_fk" FOREIGN KEY ("usuarios_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_archivos_fk" FOREIGN KEY ("archivos_id") REFERENCES "public"."archivos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_alergenos_fk" FOREIGN KEY ("alergenos_id") REFERENCES "public"."alergenos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categorias_fk" FOREIGN KEY ("categorias_id") REFERENCES "public"."categorias"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_platos_fk" FOREIGN KEY ("platos_id") REFERENCES "public"."platos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menus_fk" FOREIGN KEY ("menus_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_espacios_fk" FOREIGN KEY ("espacios_id") REFERENCES "public"."espacios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiencias_fk" FOREIGN KEY ("experiencias_id") REFERENCES "public"."experiencias"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_banners_fk" FOREIGN KEY ("banners_id") REFERENCES "public"."banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_usuarios_fk" FOREIGN KEY ("usuarios_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_inicio_galeria_inicio" ADD CONSTRAINT "pagina_inicio_galeria_inicio_imagen_id_archivos_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_inicio_galeria_inicio" ADD CONSTRAINT "pagina_inicio_galeria_inicio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pagina_inicio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_inicio" ADD CONSTRAINT "pagina_inicio_hero_image_id_archivos_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pagina_inicio_rels" ADD CONSTRAINT "pagina_inicio_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pagina_inicio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_inicio_rels" ADD CONSTRAINT "pagina_inicio_rels_espacios_fk" FOREIGN KEY ("espacios_id") REFERENCES "public"."espacios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pagina_inicio_rels" ADD CONSTRAINT "pagina_inicio_rels_experiencias_fk" FOREIGN KEY ("experiencias_id") REFERENCES "public"."experiencias"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "configuracion_sitio_opening_hours" ADD CONSTRAINT "configuracion_sitio_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."configuracion_sitio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "configuracion_sitio_footer_logos" ADD CONSTRAINT "configuracion_sitio_footer_logos_logo_id_archivos_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "configuracion_sitio_footer_logos" ADD CONSTRAINT "configuracion_sitio_footer_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."configuracion_sitio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "configuracion_sitio" ADD CONSTRAINT "configuracion_sitio_logo_id_archivos_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."archivos"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "usuarios_sessions_order_idx" ON "usuarios_sessions" USING btree ("_order");
  CREATE INDEX "usuarios_sessions_parent_id_idx" ON "usuarios_sessions" USING btree ("_parent_id");
  CREATE INDEX "usuarios_updated_at_idx" ON "usuarios" USING btree ("updated_at");
  CREATE INDEX "usuarios_created_at_idx" ON "usuarios" USING btree ("created_at");
  CREATE UNIQUE INDEX "usuarios_email_idx" ON "usuarios" USING btree ("email");
  CREATE INDEX "archivos_updated_at_idx" ON "archivos" USING btree ("updated_at");
  CREATE INDEX "archivos_created_at_idx" ON "archivos" USING btree ("created_at");
  CREATE UNIQUE INDEX "archivos_filename_idx" ON "archivos" USING btree ("filename");
  CREATE INDEX "archivos_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "archivos" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "archivos_sizes_card_sizes_card_filename_idx" ON "archivos" USING btree ("sizes_card_filename");
  CREATE INDEX "archivos_sizes_hero_sizes_hero_filename_idx" ON "archivos" USING btree ("sizes_hero_filename");
  CREATE INDEX "alergenos_updated_at_idx" ON "alergenos" USING btree ("updated_at");
  CREATE INDEX "alergenos_created_at_idx" ON "alergenos" USING btree ("created_at");
  CREATE UNIQUE INDEX "categorias_slug_idx" ON "categorias" USING btree ("slug");
  CREATE INDEX "categorias_imagen_idx" ON "categorias" USING btree ("imagen_id");
  CREATE INDEX "categorias_updated_at_idx" ON "categorias" USING btree ("updated_at");
  CREATE INDEX "categorias_created_at_idx" ON "categorias" USING btree ("created_at");
  CREATE INDEX "platos_etiquetas_order_idx" ON "platos_etiquetas" USING btree ("_order");
  CREATE INDEX "platos_etiquetas_parent_id_idx" ON "platos_etiquetas" USING btree ("_parent_id");
  CREATE INDEX "platos_imagen_idx" ON "platos" USING btree ("imagen_id");
  CREATE INDEX "platos_categoria_idx" ON "platos" USING btree ("categoria_id");
  CREATE INDEX "platos_updated_at_idx" ON "platos" USING btree ("updated_at");
  CREATE INDEX "platos_created_at_idx" ON "platos" USING btree ("created_at");
  CREATE INDEX "platos_rels_order_idx" ON "platos_rels" USING btree ("order");
  CREATE INDEX "platos_rels_parent_idx" ON "platos_rels" USING btree ("parent_id");
  CREATE INDEX "platos_rels_path_idx" ON "platos_rels" USING btree ("path");
  CREATE INDEX "platos_rels_alergenos_id_idx" ON "platos_rels" USING btree ("alergenos_id");
  CREATE INDEX "menus_dias_semana_order_idx" ON "menus_dias_semana" USING btree ("order");
  CREATE INDEX "menus_dias_semana_parent_idx" ON "menus_dias_semana" USING btree ("parent_id");
  CREATE UNIQUE INDEX "menus_slug_idx" ON "menus" USING btree ("slug");
  CREATE INDEX "menus_imagen_idx" ON "menus" USING btree ("imagen_id");
  CREATE INDEX "menus_pdf_idx" ON "menus" USING btree ("pdf_id");
  CREATE INDEX "menus_updated_at_idx" ON "menus" USING btree ("updated_at");
  CREATE INDEX "menus_created_at_idx" ON "menus" USING btree ("created_at");
  CREATE INDEX "espacios_galeria_order_idx" ON "espacios_galeria" USING btree ("_order");
  CREATE INDEX "espacios_galeria_parent_id_idx" ON "espacios_galeria" USING btree ("_parent_id");
  CREATE INDEX "espacios_galeria_imagen_idx" ON "espacios_galeria" USING btree ("imagen_id");
  CREATE INDEX "espacios_caracteristicas_order_idx" ON "espacios_caracteristicas" USING btree ("_order");
  CREATE INDEX "espacios_caracteristicas_parent_id_idx" ON "espacios_caracteristicas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "espacios_slug_idx" ON "espacios" USING btree ("slug");
  CREATE INDEX "espacios_updated_at_idx" ON "espacios" USING btree ("updated_at");
  CREATE INDEX "espacios_created_at_idx" ON "espacios" USING btree ("created_at");
  CREATE INDEX "experiencias_incluye_order_idx" ON "experiencias_incluye" USING btree ("_order");
  CREATE INDEX "experiencias_incluye_parent_id_idx" ON "experiencias_incluye" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "experiencias_slug_idx" ON "experiencias" USING btree ("slug");
  CREATE INDEX "experiencias_imagen_idx" ON "experiencias" USING btree ("imagen_id");
  CREATE INDEX "experiencias_updated_at_idx" ON "experiencias" USING btree ("updated_at");
  CREATE INDEX "experiencias_created_at_idx" ON "experiencias" USING btree ("created_at");
  CREATE INDEX "banners_imagen_idx" ON "banners" USING btree ("imagen_id");
  CREATE INDEX "banners_updated_at_idx" ON "banners" USING btree ("updated_at");
  CREATE INDEX "banners_created_at_idx" ON "banners" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_usuarios_id_idx" ON "payload_locked_documents_rels" USING btree ("usuarios_id");
  CREATE INDEX "payload_locked_documents_rels_archivos_id_idx" ON "payload_locked_documents_rels" USING btree ("archivos_id");
  CREATE INDEX "payload_locked_documents_rels_alergenos_id_idx" ON "payload_locked_documents_rels" USING btree ("alergenos_id");
  CREATE INDEX "payload_locked_documents_rels_categorias_id_idx" ON "payload_locked_documents_rels" USING btree ("categorias_id");
  CREATE INDEX "payload_locked_documents_rels_platos_id_idx" ON "payload_locked_documents_rels" USING btree ("platos_id");
  CREATE INDEX "payload_locked_documents_rels_menus_id_idx" ON "payload_locked_documents_rels" USING btree ("menus_id");
  CREATE INDEX "payload_locked_documents_rels_espacios_id_idx" ON "payload_locked_documents_rels" USING btree ("espacios_id");
  CREATE INDEX "payload_locked_documents_rels_experiencias_id_idx" ON "payload_locked_documents_rels" USING btree ("experiencias_id");
  CREATE INDEX "payload_locked_documents_rels_banners_id_idx" ON "payload_locked_documents_rels" USING btree ("banners_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_usuarios_id_idx" ON "payload_preferences_rels" USING btree ("usuarios_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "pagina_inicio_galeria_inicio_order_idx" ON "pagina_inicio_galeria_inicio" USING btree ("_order");
  CREATE INDEX "pagina_inicio_galeria_inicio_parent_id_idx" ON "pagina_inicio_galeria_inicio" USING btree ("_parent_id");
  CREATE INDEX "pagina_inicio_galeria_inicio_imagen_idx" ON "pagina_inicio_galeria_inicio" USING btree ("imagen_id");
  CREATE INDEX "pagina_inicio_hero_image_idx" ON "pagina_inicio" USING btree ("hero_image_id");
  CREATE INDEX "pagina_inicio_rels_order_idx" ON "pagina_inicio_rels" USING btree ("order");
  CREATE INDEX "pagina_inicio_rels_parent_idx" ON "pagina_inicio_rels" USING btree ("parent_id");
  CREATE INDEX "pagina_inicio_rels_path_idx" ON "pagina_inicio_rels" USING btree ("path");
  CREATE INDEX "pagina_inicio_rels_espacios_id_idx" ON "pagina_inicio_rels" USING btree ("espacios_id");
  CREATE INDEX "pagina_inicio_rels_experiencias_id_idx" ON "pagina_inicio_rels" USING btree ("experiencias_id");
  CREATE INDEX "configuracion_sitio_opening_hours_order_idx" ON "configuracion_sitio_opening_hours" USING btree ("_order");
  CREATE INDEX "configuracion_sitio_opening_hours_parent_id_idx" ON "configuracion_sitio_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "configuracion_sitio_footer_logos_order_idx" ON "configuracion_sitio_footer_logos" USING btree ("_order");
  CREATE INDEX "configuracion_sitio_footer_logos_parent_id_idx" ON "configuracion_sitio_footer_logos" USING btree ("_parent_id");
  CREATE INDEX "configuracion_sitio_footer_logos_logo_idx" ON "configuracion_sitio_footer_logos" USING btree ("logo_id");
  CREATE INDEX "configuracion_sitio_logo_idx" ON "configuracion_sitio" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   DROP TABLE "usuarios_sessions" CASCADE;
  DROP TABLE "usuarios" CASCADE;
  DROP TABLE "archivos" CASCADE;
  DROP TABLE "alergenos" CASCADE;
  DROP TABLE "categorias" CASCADE;
  DROP TABLE "platos_etiquetas" CASCADE;
  DROP TABLE "platos" CASCADE;
  DROP TABLE "platos_rels" CASCADE;
  DROP TABLE "menus_dias_semana" CASCADE;
  DROP TABLE "menus" CASCADE;
  DROP TABLE "espacios_galeria" CASCADE;
  DROP TABLE "espacios_caracteristicas" CASCADE;
  DROP TABLE "espacios" CASCADE;
  DROP TABLE "experiencias_incluye" CASCADE;
  DROP TABLE "experiencias" CASCADE;
  DROP TABLE "banners" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "pagina_inicio_galeria_inicio" CASCADE;
  DROP TABLE "pagina_inicio" CASCADE;
  DROP TABLE "pagina_inicio_rels" CASCADE;
  DROP TABLE "configuracion_sitio_opening_hours" CASCADE;
  DROP TABLE "configuracion_sitio_footer_logos" CASCADE;
  DROP TABLE "configuracion_sitio" CASCADE;
  DROP TYPE "public"."enum_usuarios_role";
  DROP TYPE "public"."enum_menus_dias_semana";
  DROP TYPE "public"."enum_menus_horario";
  DROP TYPE "public"."enum_banners_posicion";
  DROP TYPE "public"."enum_banners_tipo";`)
}
