--
-- PostgreSQL database dump
--

\restrict VNeSpvXXLMfJHNMXCcpQWfY9WjaFExR61B67Ae6ooSGrDCh9jiC5PbvWvJvM3f0

-- Dumped from database version 15.15 (Debian 15.15-1.pgdg13+1)
-- Dumped by pg_dump version 15.16 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_banners_posicion; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_banners_posicion AS ENUM (
    'home-top',
    'home-middle',
    'home-bottom',
    'carta-top',
    'menus-top',
    'global-top'
);


--
-- Name: enum_banners_tipo; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_banners_tipo AS ENUM (
    'info',
    'promo',
    'warning',
    'event'
);


--
-- Name: enum_configuracion_sitio_instagram_config_method; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_configuracion_sitio_instagram_config_method AS ENUM (
    'api',
    'widget'
);


--
-- Name: enum_menus_dias_semana; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_menus_dias_semana AS ENUM (
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo'
);


--
-- Name: enum_menus_horario; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_menus_horario AS ENUM (
    'comidas',
    'cenas',
    'ambos'
);


--
-- Name: enum_usuarios_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_usuarios_role AS ENUM (
    'admin',
    'editor'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alergenos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alergenos (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    codigo character varying NOT NULL,
    descripcion character varying,
    icono character varying,
    orden numeric DEFAULT 0 NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    imagen_id integer
);


--
-- Name: alergenos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.alergenos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: alergenos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.alergenos_id_seq OWNED BY public.alergenos.id;


--
-- Name: archivos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.archivos (
    id integer NOT NULL,
    alt character varying,
    caption character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric,
    sizes_thumbnail_url character varying,
    sizes_thumbnail_width numeric,
    sizes_thumbnail_height numeric,
    sizes_thumbnail_mime_type character varying,
    sizes_thumbnail_filesize numeric,
    sizes_thumbnail_filename character varying,
    sizes_card_url character varying,
    sizes_card_width numeric,
    sizes_card_height numeric,
    sizes_card_mime_type character varying,
    sizes_card_filesize numeric,
    sizes_card_filename character varying,
    sizes_hero_url character varying,
    sizes_hero_width numeric,
    sizes_hero_height numeric,
    sizes_hero_mime_type character varying,
    sizes_hero_filesize numeric,
    sizes_hero_filename character varying
);


--
-- Name: archivos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.archivos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: archivos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.archivos_id_seq OWNED BY public.archivos.id;


--
-- Name: banners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.banners (
    id integer NOT NULL,
    titulo character varying NOT NULL,
    texto character varying,
    imagen_id integer,
    link_url character varying,
    link_texto character varying,
    link_externo boolean DEFAULT false,
    fecha_inicio timestamp(3) with time zone NOT NULL,
    fecha_fin timestamp(3) with time zone NOT NULL,
    posicion public.enum_banners_posicion NOT NULL,
    tipo public.enum_banners_tipo,
    activo boolean DEFAULT true,
    prioridad numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: banners_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.banners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: banners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.id;


--
-- Name: categorias; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    slug character varying NOT NULL,
    descripcion character varying,
    orden numeric DEFAULT 1 NOT NULL,
    activa boolean DEFAULT true,
    imagen_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: configuracion_sitio; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.configuracion_sitio (
    id integer NOT NULL,
    title character varying NOT NULL,
    logo_id integer,
    description character varying,
    contact_phone character varying,
    contact_email character varying,
    contact_address character varying,
    contact_postal_code character varying,
    contact_city character varying,
    contact_province character varying,
    contact_country character varying,
    contact_google_maps_url character varying,
    contact_coordinates_lat numeric,
    contact_coordinates_lng numeric,
    social_media_facebook character varying,
    social_media_instagram character varying,
    social_media_twitter character varying,
    social_media_tiktok character varying,
    social_media_youtube character varying,
    social_media_tripadvisor character varying,
    copyright character varying,
    cover_manager_id character varying,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone,
    contact_whatsapp character varying,
    contact_whatsapp_message character varying,
    instagram_config_method public.enum_configuracion_sitio_instagram_config_method DEFAULT 'api'::public.enum_configuracion_sitio_instagram_config_method,
    instagram_config_api_token character varying,
    instagram_config_api_user_id character varying,
    instagram_config_embed_code character varying
);


--
-- Name: configuracion_sitio_footer_logos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.configuracion_sitio_footer_logos (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    logo_id integer NOT NULL,
    alt character varying NOT NULL,
    link character varying
);


--
-- Name: configuracion_sitio_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.configuracion_sitio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: configuracion_sitio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.configuracion_sitio_id_seq OWNED BY public.configuracion_sitio.id;


--
-- Name: configuracion_sitio_opening_hours; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.configuracion_sitio_opening_hours (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    days character varying,
    hours character varying,
    closed boolean DEFAULT false
);


--
-- Name: espacios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.espacios (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    slug character varying NOT NULL,
    descripcion jsonb,
    capacidad numeric,
    orden numeric DEFAULT 0 NOT NULL,
    activo boolean DEFAULT true,
    disponible_eventos boolean DEFAULT false,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: espacios_caracteristicas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.espacios_caracteristicas (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    caracteristica character varying NOT NULL
);


--
-- Name: espacios_galeria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.espacios_galeria (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    imagen_id integer NOT NULL
);


--
-- Name: espacios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.espacios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: espacios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.espacios_id_seq OWNED BY public.espacios.id;


--
-- Name: menus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menus (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    slug character varying NOT NULL,
    imagen_id integer,
    precio numeric NOT NULL,
    fechas_dias character varying,
    fecha_inicio timestamp(3) with time zone,
    fecha_fin timestamp(3) with time zone,
    descripcion jsonb,
    pdf_id integer,
    activo boolean DEFAULT true,
    destacado boolean DEFAULT false,
    orden numeric DEFAULT 0,
    horario public.enum_menus_horario,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    descripcion_menu character varying,
    etiqueta character varying
);


--
-- Name: menus_dias_semana; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menus_dias_semana (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum_menus_dias_semana,
    id integer NOT NULL
);


--
-- Name: menus_dias_semana_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.menus_dias_semana_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menus_dias_semana_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.menus_dias_semana_id_seq OWNED BY public.menus_dias_semana.id;


--
-- Name: menus_grupo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menus_grupo (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion character varying,
    imagen_portada_id integer,
    orden numeric DEFAULT 0,
    activo boolean DEFAULT true,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: menus_grupo_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.menus_grupo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menus_grupo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.menus_grupo_id_seq OWNED BY public.menus_grupo.id;


--
-- Name: menus_grupo_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menus_grupo_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    menus_id integer
);


--
-- Name: menus_grupo_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.menus_grupo_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menus_grupo_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.menus_grupo_rels_id_seq OWNED BY public.menus_grupo_rels.id;


--
-- Name: menus_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.menus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.menus_id_seq OWNED BY public.menus.id;


--
-- Name: pagina_inicio; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pagina_inicio (
    id integer NOT NULL,
    hero_title character varying NOT NULL,
    hero_subtitle character varying,
    hero_image_id integer NOT NULL,
    welcome_title character varying,
    welcome_text jsonb,
    cta_title character varying,
    cta_text character varying,
    cta_button_text character varying DEFAULT 'Reservar ahora'::character varying,
    seo_title character varying,
    seo_description character varying,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


--
-- Name: pagina_inicio_galeria_inicio; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pagina_inicio_galeria_inicio (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    imagen_id integer NOT NULL
);


--
-- Name: pagina_inicio_galeria_regalo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pagina_inicio_galeria_regalo (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    imagen_id integer NOT NULL
);


--
-- Name: pagina_inicio_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pagina_inicio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pagina_inicio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pagina_inicio_id_seq OWNED BY public.pagina_inicio.id;


--
-- Name: pagina_inicio_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pagina_inicio_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    espacios_id integer,
    experiencias_id integer,
    menus_grupo_id integer,
    paginas_id integer
);


--
-- Name: pagina_inicio_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pagina_inicio_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pagina_inicio_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pagina_inicio_rels_id_seq OWNED BY public.pagina_inicio_rels.id;


--
-- Name: paginas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.paginas (
    id integer NOT NULL,
    titulo_interno character varying NOT NULL,
    slug character varying NOT NULL,
    hero_image_id integer NOT NULL,
    hero_title character varying,
    hero_subtitle character varying,
    meta_title character varying,
    meta_description character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    imagen_espacio1_id integer,
    imagen_espacio2_id integer,
    imagen_espacio3_id integer,
    imagen_espacio4_id integer
);


--
-- Name: paginas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.paginas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: paginas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.paginas_id_seq OWNED BY public.paginas.id;


--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    usuarios_id integer,
    archivos_id integer,
    alergenos_id integer,
    categorias_id integer,
    platos_id integer,
    menus_id integer,
    espacios_id integer,
    banners_id integer,
    paginas_id integer,
    experiencias_id integer,
    menus_grupo_id integer
);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    usuarios_id integer
);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: platos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.platos (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion character varying,
    precio numeric NOT NULL,
    imagen_id integer,
    categoria_id integer NOT NULL,
    activo boolean DEFAULT true,
    destacado boolean DEFAULT false,
    orden numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: platos_etiquetas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.platos_etiquetas (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    etiqueta character varying NOT NULL
);


--
-- Name: platos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.platos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: platos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.platos_id_seq OWNED BY public.platos.id;


--
-- Name: platos_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.platos_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    alergenos_id integer
);


--
-- Name: platos_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.platos_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: platos_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.platos_rels_id_seq OWNED BY public.platos_rels.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    first_name character varying,
    last_name character varying,
    role public.enum_usuarios_role DEFAULT 'editor'::public.enum_usuarios_role NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: usuarios_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


--
-- Name: alergenos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alergenos ALTER COLUMN id SET DEFAULT nextval('public.alergenos_id_seq'::regclass);


--
-- Name: archivos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.archivos ALTER COLUMN id SET DEFAULT nextval('public.archivos_id_seq'::regclass);


--
-- Name: banners id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.banners ALTER COLUMN id SET DEFAULT nextval('public.banners_id_seq'::regclass);


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: configuracion_sitio id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuracion_sitio ALTER COLUMN id SET DEFAULT nextval('public.configuracion_sitio_id_seq'::regclass);


--
-- Name: espacios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.espacios ALTER COLUMN id SET DEFAULT nextval('public.espacios_id_seq'::regclass);


--
-- Name: menus id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus ALTER COLUMN id SET DEFAULT nextval('public.menus_id_seq'::regclass);


--
-- Name: menus_dias_semana id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus_dias_semana ALTER COLUMN id SET DEFAULT nextval('public.menus_dias_semana_id_seq'::regclass);


--
-- Name: menus_grupo id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus_grupo ALTER COLUMN id SET DEFAULT nextval('public.menus_grupo_id_seq'::regclass);


--
-- Name: menus_grupo_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus_grupo_rels ALTER COLUMN id SET DEFAULT nextval('public.menus_grupo_rels_id_seq'::regclass);


--
-- Name: pagina_inicio id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio ALTER COLUMN id SET DEFAULT nextval('public.pagina_inicio_id_seq'::regclass);


--
-- Name: pagina_inicio_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_rels ALTER COLUMN id SET DEFAULT nextval('public.pagina_inicio_rels_id_seq'::regclass);


--
-- Name: paginas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.paginas ALTER COLUMN id SET DEFAULT nextval('public.paginas_id_seq'::regclass);


--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: platos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platos ALTER COLUMN id SET DEFAULT nextval('public.platos_id_seq'::regclass);


--
-- Name: platos_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platos_rels ALTER COLUMN id SET DEFAULT nextval('public.platos_rels_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: alergenos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alergenos (id, nombre, codigo, descripcion, icono, orden, updated_at, created_at, imagen_id) FROM stdin;
1	Gluten	G	Gluten		1	2026-01-26 17:52:49.861+00	2026-01-15 12:07:42.962+00	31
2	Crustáceos	C	\N		2	2026-01-26 18:09:05.105+00	2026-01-15 12:07:42.964+00	34
3	Huevos	H	\N		3	2026-01-26 18:09:29.386+00	2026-01-15 12:07:42.966+00	35
4	Pescado	P	Pescado		4	2026-01-26 18:09:54.8+00	2026-01-15 12:07:42.968+00	36
5	Cacahuetes	Ca	\N		5	2026-01-26 18:10:41.358+00	2026-01-15 12:07:42.97+00	37
6	Soja	S	\N		6	2026-01-26 18:11:19.681+00	2026-01-15 12:07:42.972+00	38
7	Lácteos	L	\N		7	2026-01-26 18:11:43.739+00	2026-01-15 12:07:42.974+00	39
8	Frutos secos	F	\N		8	2026-01-26 18:13:38.385+00	2026-01-15 12:07:42.975+00	40
9	Apio	Ap	\N		9	2026-01-26 18:13:56.671+00	2026-01-15 12:07:42.977+00	41
10	Mostaza	M	\N		10	2026-01-26 18:14:16.844+00	2026-01-15 12:07:42.979+00	42
11	Sésamo	Se	\N		11	2026-01-26 18:15:10.617+00	2026-01-15 12:07:42.98+00	43
12	Sulfitos	Su	\N		12	2026-01-26 18:16:41.575+00	2026-01-15 12:07:42.981+00	44
13	Moluscos	Mo	\N		13	2026-01-26 18:17:03.918+00	2026-01-15 12:07:42.982+00	45
14	Altramuces	Al	\N		14	2026-01-26 18:17:27.254+00	2026-01-15 12:07:42.983+00	46
\.


--
-- Data for Name: archivos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.archivos (id, alt, caption, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height, sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename, sizes_card_url, sizes_card_width, sizes_card_height, sizes_card_mime_type, sizes_card_filesize, sizes_card_filename, sizes_hero_url, sizes_hero_width, sizes_hero_height, sizes_hero_mime_type, sizes_hero_filesize, sizes_hero_filename) FROM stdin;
2	\N	\N	2026-01-15 13:46:20.337+00	2026-01-15 13:46:20.337+00	/api/archivos/file/IMG_3981-1.webp	/api/archivos/file/IMG_3981-1.webp	IMG_3981-1.webp	image/webp	516986	3843	2789	50	50	/api/archivos/file/IMG_3981-1.webp	400	300	image/jpeg	20233	IMG_3981-1-400x300.jpg	/api/archivos/file/IMG_3981-1.webp	768	576	image/jpeg	58353	IMG_3981-1-768x576.jpg	/api/archivos/file/IMG_3981-1.webp	1920	1080	image/jpeg	190828	IMG_3981-1-1920x1080.jpg
3	\N	\N	2026-01-15 13:48:01.246+00	2026-01-15 13:48:01.246+00	/api/archivos/file/Brindis-de-An%CC%83o-Nuevo-bebidas-para-brindar-en-2021.webp	/api/archivos/file/Brindis-de-An%CC%83o-Nuevo-bebidas-para-brindar-en-2021.webp	Brindis-de-Año-Nuevo-bebidas-para-brindar-en-2021.webp	image/webp	80544	1219	864	50	50	/api/archivos/file/Brindis-de-An%CC%83o-Nuevo-bebidas-para-brindar-en-2021.webp	400	300	image/jpeg	19269	Brindis-de-Año-Nuevo-bebidas-para-brindar-en-2021-400x300.jpg	/api/archivos/file/Brindis-de-An%CC%83o-Nuevo-bebidas-para-brindar-en-2021.webp	768	576	image/jpeg	54747	Brindis-de-Año-Nuevo-bebidas-para-brindar-en-2021-768x576.jpg	/api/archivos/file/Brindis-de-An%CC%83o-Nuevo-bebidas-para-brindar-en-2021.webp	\N	\N	\N	\N	\N
5	\N	\N	2026-01-15 16:01:13.044+00	2026-01-15 16:01:13.044+00	/api/archivos/file/entrada.webp	/api/archivos/file/entrada.webp	entrada.webp	image/webp	91404	1600	839	50	50	/api/archivos/file/entrada.webp	400	300	image/jpeg	17470	entrada-400x300.jpg	/api/archivos/file/entrada.webp	768	576	image/jpeg	50160	entrada-768x576.jpg	/api/archivos/file/entrada.webp	\N	\N	\N	\N	\N
6	\N	\N	2026-01-15 16:04:07.248+00	2026-01-15 16:04:07.248+00	/api/archivos/file/Chilli-garlic-Warynessy-Villena.webp	/api/archivos/file/Chilli-garlic-Warynessy-Villena.webp	Chilli-garlic-Warynessy-Villena.webp	image/webp	78636	1200	1316	50	50	/api/archivos/file/Chilli-garlic-Warynessy-Villena.webp	400	300	image/webp	17794	Chilli-garlic-Warynessy-Villena-400x300.webp	/api/archivos/file/Chilli-garlic-Warynessy-Villena.webp	768	576	image/webp	43228	Chilli-garlic-Warynessy-Villena-768x576.webp	/api/archivos/file/Chilli-garlic-Warynessy-Villena.webp	1920	1080	image/webp	114126	Chilli-garlic-Warynessy-Villena-1920x1080.webp
7	\N	\N	2026-01-15 16:04:31.188+00	2026-01-15 16:04:31.188+00	/api/archivos/file/menu-villenero.webp	/api/archivos/file/menu-villenero.webp	menu-villenero.webp	image/webp	62320	600	600	50	50	/api/archivos/file/menu-villenero.webp	400	300	image/webp	22276	menu-villenero-400x300.webp	/api/archivos/file/menu-villenero.webp	768	576	image/webp	49060	menu-villenero-768x576.webp	/api/archivos/file/menu-villenero.webp	\N	\N	\N	\N	\N
8	Arroz y pata	\N	2026-01-19 16:12:07.226+00	2026-01-19 16:12:07.226+00	/api/archivos/file/arrozypata.webp	/api/archivos/file/arrozypata.webp	arrozypata.webp	image/webp	677064	1536	2048	50	50	/api/archivos/file/arrozypata.webp	400	300	image/webp	35076	arrozypata-400x300.webp	/api/archivos/file/arrozypata.webp	768	576	image/webp	125778	arrozypata-768x576.webp	/api/archivos/file/arrozypata.webp	1920	1080	image/webp	398298	arrozypata-1920x1080.webp
9	\N	\N	2026-01-19 16:13:05.953+00	2026-01-19 16:13:05.953+00	/api/archivos/file/celebraciones-Warynessy.webp	/api/archivos/file/celebraciones-Warynessy.webp	celebraciones-Warynessy.webp	image/webp	137822	1200	1600	50	50	/api/archivos/file/celebraciones-Warynessy.webp	400	300	image/webp	21886	celebraciones-Warynessy-400x300.webp	/api/archivos/file/celebraciones-Warynessy.webp	768	576	image/webp	58914	celebraciones-Warynessy-768x576.webp	/api/archivos/file/celebraciones-Warynessy.webp	1920	1080	image/webp	126014	celebraciones-Warynessy-1920x1080.webp
10	\N	\N	2026-01-19 16:15:07.059+00	2026-01-19 16:15:07.059+00	/api/archivos/file/gazpachos.webp	/api/archivos/file/gazpachos.webp	gazpachos.webp	image/webp	308378	1800	2400	50	50	/api/archivos/file/gazpachos.webp	400	300	image/webp	22386	gazpachos-400x300.webp	/api/archivos/file/gazpachos.webp	768	576	image/webp	62032	gazpachos-768x576.webp	/api/archivos/file/gazpachos.webp	1920	1080	image/webp	178340	gazpachos-1920x1080.webp
11	\N	\N	2026-01-19 16:15:19.464+00	2026-01-19 16:15:19.464+00	/api/archivos/file/plato_warynessy.webp	/api/archivos/file/plato_warynessy.webp	plato_warynessy.webp	image/webp	192844	1800	1895	50	50	/api/archivos/file/plato_warynessy.webp	400	300	image/webp	11044	plato_warynessy-400x300.webp	/api/archivos/file/plato_warynessy.webp	768	576	image/webp	28768	plato_warynessy-768x576.webp	/api/archivos/file/plato_warynessy.webp	1920	1080	image/webp	86330	plato_warynessy-1920x1080.webp
12	\N	\N	2026-01-19 16:25:46.158+00	2026-01-19 16:25:46.158+00	/api/archivos/file/warynessy4.webp	/api/archivos/file/warynessy4.webp	warynessy4.webp	image/webp	303102	1800	1471	50	50	/api/archivos/file/warynessy4.webp	400	300	image/webp	19942	warynessy4-400x300.webp	/api/archivos/file/warynessy4.webp	768	576	image/webp	55994	warynessy4-768x576.webp	/api/archivos/file/warynessy4.webp	1920	1080	image/webp	184150	warynessy4-1920x1080.webp
13	\N	\N	2026-01-19 16:27:49.94+00	2026-01-19 16:27:49.94+00	/api/archivos/file/comedor-privado-Warynessy.webp	/api/archivos/file/comedor-privado-Warynessy.webp	comedor-privado-Warynessy.webp	image/webp	66622	1200	900	50	50	/api/archivos/file/comedor-privado-Warynessy.webp	400	300	image/webp	15066	comedor-privado-Warynessy-400x300.webp	/api/archivos/file/comedor-privado-Warynessy.webp	768	576	image/webp	36504	comedor-privado-Warynessy-768x576.webp	/api/archivos/file/comedor-privado-Warynessy.webp	\N	\N	\N	\N	\N
14	\N	\N	2026-01-19 16:32:54.775+00	2026-01-19 16:32:54.775+00	/api/archivos/file/barra-de-restaurante.webp	/api/archivos/file/barra-de-restaurante.webp	barra-de-restaurante.webp	image/webp	81136	900	500	50	50	/api/archivos/file/barra-de-restaurante.webp	400	300	image/webp	21756	barra-de-restaurante-400x300.webp	/api/archivos/file/barra-de-restaurante.webp	768	576	image/webp	54606	barra-de-restaurante-768x576.webp	/api/archivos/file/barra-de-restaurante.webp	\N	\N	\N	\N	\N
15	\N	\N	2026-01-19 16:33:44.517+00	2026-01-19 16:33:44.517+00	/api/archivos/file/celebraciones-Warynessy-1.webp	/api/archivos/file/celebraciones-Warynessy-1.webp	celebraciones-Warynessy-1.webp	image/webp	137822	1200	1600	50	50	/api/archivos/file/celebraciones-Warynessy-1.webp	400	300	image/webp	21886	celebraciones-Warynessy-1-400x300.webp	/api/archivos/file/celebraciones-Warynessy-1.webp	768	576	image/webp	58914	celebraciones-Warynessy-1-768x576.webp	/api/archivos/file/celebraciones-Warynessy-1.webp	1920	1080	image/webp	126014	celebraciones-Warynessy-1-1920x1080.webp
16	Croquetas de gamba - restaurante Warynessy . Villena	\N	2026-01-20 11:53:37.241+00	2026-01-20 11:53:37.241+00	/api/archivos/file/Warynessy_Carta-1.webp	/api/archivos/file/Warynessy_Carta-1.webp	Warynessy_Carta-1.webp	image/webp	84876	2048	1365	50	50	/api/archivos/file/Warynessy_Carta-1.webp	400	300	image/webp	6850	Warynessy_Carta-1-400x300.webp	/api/archivos/file/Warynessy_Carta-1.webp	768	576	image/webp	17362	Warynessy_Carta-1-768x576.webp	/api/archivos/file/Warynessy_Carta-1.webp	1920	1080	image/webp	55414	Warynessy_Carta-1-1920x1080.webp
17	Sicted	\N	2026-01-21 17:18:20.362+00	2026-01-21 17:18:20.362+00	/api/archivos/file/Sicted.webp	/api/archivos/file/Sicted.webp	Sicted.webp	image/webp	13830	480	201	50	50	/api/archivos/file/Sicted.webp	400	300	image/png	50483	Sicted-400x300.png	/api/archivos/file/Sicted.webp	\N	\N	\N	\N	\N	/api/archivos/file/Sicted.webp	\N	\N	\N	\N	\N
18	Ruta del vino de Alicante	\N	2026-01-21 17:19:23.906+00	2026-01-21 17:19:23.906+00	/api/archivos/file/ruta-valicante.webp	/api/archivos/file/ruta-valicante.webp	ruta-valicante.webp	image/webp	18756	900	900	50	50	/api/archivos/file/ruta-valicante.webp	400	300	image/png	23775	ruta-valicante-400x300.png	/api/archivos/file/ruta-valicante.webp	768	576	image/png	57346	ruta-valicante-768x576.png	/api/archivos/file/ruta-valicante.webp	\N	\N	\N	\N	\N
19	L´Exquisit	\N	2026-01-21 17:19:58.981+00	2026-01-21 17:19:58.981+00	/api/archivos/file/exquisit-mediterrani.png.webp	/api/archivos/file/exquisit-mediterrani.png.webp	exquisit-mediterrani.png.webp	image/webp	12440	500	500	50	50	/api/archivos/file/exquisit-mediterrani.png.webp	400	300	image/webp	10144	exquisit-mediterrani.png-400x300.webp	/api/archivos/file/exquisit-mediterrani.png.webp	\N	\N	\N	\N	\N	/api/archivos/file/exquisit-mediterrani.png.webp	\N	\N	\N	\N	\N
20	Sicted	\N	2026-01-21 17:23:20.325+00	2026-01-21 17:23:20.325+00	/api/archivos/file/Sicted-1.webp	/api/archivos/file/Sicted-1.webp	Sicted-1.webp	image/webp	13830	480	201	50	50	/api/archivos/file/Sicted-1.webp	400	300	image/png	50483	Sicted-1-400x300.png	/api/archivos/file/Sicted-1.webp	\N	\N	\N	\N	\N	/api/archivos/file/Sicted-1.webp	\N	\N	\N	\N	\N
21	Ruta del Vino de Alicante	\N	2026-01-21 17:23:37.927+00	2026-01-21 17:23:37.927+00	/api/archivos/file/ruta-valicante-1.webp	/api/archivos/file/ruta-valicante-1.webp	ruta-valicante-1.webp	image/webp	18756	900	900	50	50	/api/archivos/file/ruta-valicante-1.webp	400	300	image/png	23775	ruta-valicante-1-400x300.png	/api/archivos/file/ruta-valicante-1.webp	768	576	image/png	57346	ruta-valicante-1-768x576.png	/api/archivos/file/ruta-valicante-1.webp	\N	\N	\N	\N	\N
22	L`Exquisit	\N	2026-01-21 17:23:54.406+00	2026-01-21 17:23:54.406+00	/api/archivos/file/exquisit-mediterrani.png-1.webp	/api/archivos/file/exquisit-mediterrani.png-1.webp	exquisit-mediterrani.png-1.webp	image/webp	12440	500	500	50	50	/api/archivos/file/exquisit-mediterrani.png-1.webp	400	300	image/webp	10144	exquisit-mediterrani.png-1-400x300.webp	/api/archivos/file/exquisit-mediterrani.png-1.webp	\N	\N	\N	\N	\N	/api/archivos/file/exquisit-mediterrani.png-1.webp	\N	\N	\N	\N	\N
23	Zona barra	\N	2026-01-21 17:53:48.336+00	2026-01-21 17:53:48.336+00	/api/archivos/file/IMG_2866.webp	/api/archivos/file/IMG_2866.webp	IMG_2866.webp	image/webp	1278468	4032	3024	50	50	/api/archivos/file/IMG_2866.webp	400	300	image/webp	24758	IMG_2866-400x300.webp	/api/archivos/file/IMG_2866.webp	768	576	image/webp	74658	IMG_2866-768x576.webp	/api/archivos/file/IMG_2866.webp	1920	1080	image/webp	308644	IMG_2866-1920x1080.webp
24	\N	\N	2026-01-21 18:17:16.405+00	2026-01-21 18:17:16.405+00	/api/archivos/file/warynessy2.webp	/api/archivos/file/warynessy2.webp	warynessy2.webp	image/webp	220498	1800	1350	50	50	/api/archivos/file/warynessy2.webp	400	300	image/webp	16158	warynessy2-400x300.webp	/api/archivos/file/warynessy2.webp	768	576	image/webp	48574	warynessy2-768x576.webp	/api/archivos/file/warynessy2.webp	1920	1080	image/webp	117686	warynessy2-1920x1080.webp
25	\N	\N	2026-01-21 18:41:35.292+00	2026-01-21 18:41:35.291+00	/api/archivos/file/tarjeta%20regalo%20Warynessy.webp	/api/archivos/file/tarjeta%20regalo%20Warynessy.webp	tarjeta regalo Warynessy.webp	image/webp	265308	2048	1536	50	50	/api/archivos/file/tarjeta%20regalo%20Warynessy.webp	400	300	image/webp	18550	tarjeta regalo Warynessy-400x300.webp	/api/archivos/file/tarjeta%20regalo%20Warynessy.webp	768	576	image/webp	66034	tarjeta regalo Warynessy-768x576.webp	/api/archivos/file/tarjeta%20regalo%20Warynessy.webp	1920	1080	image/webp	198620	tarjeta regalo Warynessy-1920x1080.webp
26	\N	\N	2026-01-21 18:43:12.301+00	2026-01-21 18:43:12.301+00	/api/archivos/file/barra-de-restaurante-1.webp	/api/archivos/file/barra-de-restaurante-1.webp	barra-de-restaurante-1.webp	image/webp	81136	900	500	50	50	/api/archivos/file/barra-de-restaurante-1.webp	400	300	image/webp	21756	barra-de-restaurante-1-400x300.webp	/api/archivos/file/barra-de-restaurante-1.webp	768	576	image/webp	54606	barra-de-restaurante-1-768x576.webp	/api/archivos/file/barra-de-restaurante-1.webp	\N	\N	\N	\N	\N
27	\N	\N	2026-01-21 18:43:43.373+00	2026-01-21 18:43:43.373+00	/api/archivos/file/barra-de-restaurante-2.webp	/api/archivos/file/barra-de-restaurante-2.webp	barra-de-restaurante-2.webp	image/webp	81136	900	500	50	50	/api/archivos/file/barra-de-restaurante-2.webp	400	300	image/webp	21756	barra-de-restaurante-2-400x300.webp	/api/archivos/file/barra-de-restaurante-2.webp	768	576	image/webp	54606	barra-de-restaurante-2-768x576.webp	/api/archivos/file/barra-de-restaurante-2.webp	\N	\N	\N	\N	\N
28	\N	\N	2026-01-21 18:44:44.154+00	2026-01-21 18:44:44.154+00	/api/archivos/file/entrada-1.webp	/api/archivos/file/entrada-1.webp	entrada-1.webp	image/webp	85096	1600	839	50	50	/api/archivos/file/entrada-1.webp	400	300	image/webp	9736	entrada-1-400x300.webp	/api/archivos/file/entrada-1.webp	768	576	image/webp	25876	entrada-1-768x576.webp	/api/archivos/file/entrada-1.webp	\N	\N	\N	\N	\N
29	\N	\N	2026-01-21 18:45:56.663+00	2026-01-21 18:45:56.663+00	/api/archivos/file/warynessy.webp	/api/archivos/file/warynessy.webp	warynessy.webp	image/webp	132478	1920	1280	50	50	/api/archivos/file/warynessy.webp	400	300	image/webp	19984	warynessy-400x300.webp	/api/archivos/file/warynessy.webp	768	576	image/webp	40792	warynessy-768x576.webp	/api/archivos/file/warynessy.webp	1920	1080	image/webp	96920	warynessy-1920x1080.webp
30	\N	\N	2026-01-21 18:46:44.724+00	2026-01-21 18:46:44.724+00	/api/archivos/file/warynessy2-1.webp	/api/archivos/file/warynessy2-1.webp	warynessy2-1.webp	image/webp	220498	1800	1350	50	50	/api/archivos/file/warynessy2-1.webp	400	300	image/webp	16158	warynessy2-1-400x300.webp	/api/archivos/file/warynessy2-1.webp	768	576	image/webp	48574	warynessy2-1-768x576.webp	/api/archivos/file/warynessy2-1.webp	1920	1080	image/webp	117686	warynessy2-1-1920x1080.webp
32	Huevo	\N	2026-01-26 17:13:19.662+00	2026-01-26 17:13:19.662+00	/api/archivos/file/IconoAlergenoHuevo-Egg_icon-icons.com_67598.svg	/api/archivos/file/IconoAlergenoHuevo-Egg_icon-icons.com_67598.svg	IconoAlergenoHuevo-Egg_icon-icons.com_67598.svg	image/svg+xml	9747	262	372	\N	\N	/api/archivos/file/IconoAlergenoHuevo-Egg_icon-icons.com_67598.svg	\N	\N	\N	\N	\N	/api/archivos/file/IconoAlergenoHuevo-Egg_icon-icons.com_67598.svg	\N	\N	\N	\N	\N	/api/archivos/file/IconoAlergenoHuevo-Egg_icon-icons.com_67598.svg	\N	\N	\N	\N	\N
33	Pescado	\N	2026-01-26 17:14:06.635+00	2026-01-26 17:14:06.635+00	/api/archivos/file/Fish_icon-icons.com_67594.svg	/api/archivos/file/Fish_icon-icons.com_67594.svg	Fish_icon-icons.com_67594.svg	image/svg+xml	7659	262	372	\N	\N	/api/archivos/file/Fish_icon-icons.com_67594.svg	\N	\N	\N	\N	\N	/api/archivos/file/Fish_icon-icons.com_67594.svg	\N	\N	\N	\N	\N	/api/archivos/file/Fish_icon-icons.com_67594.svg	\N	\N	\N	\N	\N
31	Gluten	\N	2026-01-26 17:52:16.229+00	2026-01-26 16:31:48.237+00	/api/archivos/file/gluten-derivados-300x300.webp	/api/archivos/file/gluten-derivados-300x300.webp	gluten-derivados-300x300.webp	image/webp	7196	300	300	\N	\N	/api/archivos/file/gluten-derivados-300x300.webp	400	300	image/webp	12258	gluten-derivados-300x300-400x300.webp	/api/archivos/file/gluten-derivados-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/gluten-derivados-300x300.webp	\N	\N	\N	\N	\N
34	Crustáceos	\N	2026-01-26 18:09:01.982+00	2026-01-26 18:09:01.982+00	/api/archivos/file/crustaceos-300x300.webp	/api/archivos/file/crustaceos-300x300.webp	crustaceos-300x300.webp	image/webp	7548	300	300	50	50	/api/archivos/file/crustaceos-300x300.webp	400	300	image/webp	12350	crustaceos-300x300-400x300.webp	/api/archivos/file/crustaceos-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/crustaceos-300x300.webp	\N	\N	\N	\N	\N
35	Huevos	\N	2026-01-26 18:09:26.762+00	2026-01-26 18:09:26.762+00	/api/archivos/file/huevos-300x300.webp	/api/archivos/file/huevos-300x300.webp	huevos-300x300.webp	image/webp	5538	300	300	50	50	/api/archivos/file/huevos-300x300.webp	400	300	image/webp	10378	huevos-300x300-400x300.webp	/api/archivos/file/huevos-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/huevos-300x300.webp	\N	\N	\N	\N	\N
36	Pescado	\N	2026-01-26 18:09:54.092+00	2026-01-26 18:09:54.092+00	/api/archivos/file/pescados-300x300.webp	/api/archivos/file/pescados-300x300.webp	pescados-300x300.webp	image/webp	5252	300	300	50	50	/api/archivos/file/pescados-300x300.webp	400	300	image/webp	9648	pescados-300x300-400x300.webp	/api/archivos/file/pescados-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/pescados-300x300.webp	\N	\N	\N	\N	\N
37	Cacahuetes	\N	2026-01-26 18:10:39.995+00	2026-01-26 18:10:39.995+00	/api/archivos/file/cacahuetes-300x300.webp	/api/archivos/file/cacahuetes-300x300.webp	cacahuetes-300x300.webp	image/webp	7000	300	300	50	50	/api/archivos/file/cacahuetes-300x300.webp	400	300	image/webp	11908	cacahuetes-300x300-400x300.webp	/api/archivos/file/cacahuetes-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/cacahuetes-300x300.webp	\N	\N	\N	\N	\N
38	Soja	\N	2026-01-26 18:11:04.493+00	2026-01-26 18:11:04.493+00	/api/archivos/file/soja-300x300.webp	/api/archivos/file/soja-300x300.webp	soja-300x300.webp	image/webp	6966	300	300	50	50	/api/archivos/file/soja-300x300.webp	400	300	image/webp	11688	soja-300x300-400x300.webp	/api/archivos/file/soja-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/soja-300x300.webp	\N	\N	\N	\N	\N
39	Lácteos	\N	2026-01-26 18:11:40.335+00	2026-01-26 18:11:40.335+00	/api/archivos/file/lacteos-300x300.webp	/api/archivos/file/lacteos-300x300.webp	lacteos-300x300.webp	image/webp	4918	300	300	50	50	/api/archivos/file/lacteos-300x300.webp	400	300	image/webp	9464	lacteos-300x300-400x300.webp	/api/archivos/file/lacteos-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/lacteos-300x300.webp	\N	\N	\N	\N	\N
40	Frutos de cáscara	\N	2026-01-26 18:13:37.117+00	2026-01-26 18:13:37.117+00	/api/archivos/file/cascaras-frutos-secos-300x300.webp	/api/archivos/file/cascaras-frutos-secos-300x300.webp	cascaras-frutos-secos-300x300.webp	image/webp	6154	300	300	50	50	/api/archivos/file/cascaras-frutos-secos-300x300.webp	400	300	image/webp	11040	cascaras-frutos-secos-300x300-400x300.webp	/api/archivos/file/cascaras-frutos-secos-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/cascaras-frutos-secos-300x300.webp	\N	\N	\N	\N	\N
41	Apio	\N	2026-01-26 18:13:55.191+00	2026-01-26 18:13:55.191+00	/api/archivos/file/apio-300x300.webp	/api/archivos/file/apio-300x300.webp	apio-300x300.webp	image/webp	4640	300	300	50	50	/api/archivos/file/apio-300x300.webp	400	300	image/webp	9628	apio-300x300-400x300.webp	/api/archivos/file/apio-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/apio-300x300.webp	\N	\N	\N	\N	\N
42	Mostaza	\N	2026-01-26 18:14:15.699+00	2026-01-26 18:14:15.699+00	/api/archivos/file/mostaza-300x300.webp	/api/archivos/file/mostaza-300x300.webp	mostaza-300x300.webp	image/webp	5654	300	300	50	50	/api/archivos/file/mostaza-300x300.webp	400	300	image/webp	10058	mostaza-300x300-400x300.webp	/api/archivos/file/mostaza-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/mostaza-300x300.webp	\N	\N	\N	\N	\N
43	Sésamo	\N	2026-01-26 18:15:06.971+00	2026-01-26 18:15:06.971+00	/api/archivos/file/granos-sesamo-300x300.webp	/api/archivos/file/granos-sesamo-300x300.webp	granos-sesamo-300x300.webp	image/webp	4492	300	300	50	50	/api/archivos/file/granos-sesamo-300x300.webp	400	300	image/webp	9386	granos-sesamo-300x300-400x300.webp	/api/archivos/file/granos-sesamo-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/granos-sesamo-300x300.webp	\N	\N	\N	\N	\N
44	Sulfitos	\N	2026-01-26 18:16:40.185+00	2026-01-26 18:16:40.185+00	/api/archivos/file/dioxido-azufre-sulfitos-300x300.webp	/api/archivos/file/dioxido-azufre-sulfitos-300x300.webp	dioxido-azufre-sulfitos-300x300.webp	image/webp	6954	300	300	50	50	/api/archivos/file/dioxido-azufre-sulfitos-300x300.webp	400	300	image/webp	11350	dioxido-azufre-sulfitos-300x300-400x300.webp	/api/archivos/file/dioxido-azufre-sulfitos-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/dioxido-azufre-sulfitos-300x300.webp	\N	\N	\N	\N	\N
45	Moluscos	\N	2026-01-26 18:17:02.949+00	2026-01-26 18:17:02.949+00	/api/archivos/file/moluscos-300x300.webp	/api/archivos/file/moluscos-300x300.webp	moluscos-300x300.webp	image/webp	5184	300	300	50	50	/api/archivos/file/moluscos-300x300.webp	400	300	image/webp	9994	moluscos-300x300-400x300.webp	/api/archivos/file/moluscos-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/moluscos-300x300.webp	\N	\N	\N	\N	\N
46	Altramuces	\N	2026-01-26 18:17:26.377+00	2026-01-26 18:17:26.377+00	/api/archivos/file/altramuces-300x300.webp	/api/archivos/file/altramuces-300x300.webp	altramuces-300x300.webp	image/webp	5230	300	300	50	50	/api/archivos/file/altramuces-300x300.webp	400	300	image/webp	10074	altramuces-300x300-400x300.webp	/api/archivos/file/altramuces-300x300.webp	\N	\N	\N	\N	\N	/api/archivos/file/altramuces-300x300.webp	\N	\N	\N	\N	\N
47	\N	\N	2026-01-26 19:45:05.781+00	2026-01-26 19:45:05.781+00	/api/archivos/file/gazpachos-1.webp	/api/archivos/file/gazpachos-1.webp	gazpachos-1.webp	image/webp	308378	1800	2400	50	50	/api/archivos/file/gazpachos-1.webp	400	300	image/webp	22386	gazpachos-1-400x300.webp	/api/archivos/file/gazpachos-1.webp	768	576	image/webp	62032	gazpachos-1-768x576.webp	/api/archivos/file/gazpachos-1.webp	1920	1080	image/webp	178340	gazpachos-1-1920x1080.webp
4	Gazpacho villenero	\N	2026-01-26 21:26:54.496+00	2026-01-15 16:01:02.084+00	/api/archivos/file/gazpachos-2.webp	/api/archivos/file/gazpachos-2.webp	gazpachos-2.webp	image/webp	308378	1800	2400	50	50	/api/archivos/file/gazpachos-2.webp	400	300	image/webp	22386	gazpachos-2-400x300.webp	/api/archivos/file/gazpachos-2.webp	768	576	image/webp	62032	gazpachos-2-768x576.webp	/api/archivos/file/gazpachos-2.webp	1920	1080	image/webp	178340	gazpachos-2-1920x1080.webp
49	Menú vegetariano	\N	2026-01-26 21:32:52.465+00	2026-01-26 21:32:52.465+00	/api/archivos/file/plato_warynessy-1.webp	/api/archivos/file/plato_warynessy-1.webp	plato_warynessy-1.webp	image/webp	192844	1800	1895	50	50	/api/archivos/file/plato_warynessy-1.webp	400	300	image/webp	11044	plato_warynessy-1-400x300.webp	/api/archivos/file/plato_warynessy-1.webp	768	576	image/webp	28768	plato_warynessy-1-768x576.webp	/api/archivos/file/plato_warynessy-1.webp	1920	1080	image/webp	86330	plato_warynessy-1-1920x1080.webp
48	\N	\N	2026-01-27 19:54:07.863+00	2026-01-26 21:29:58.706+00	/api/archivos/file/Menu-del-dia.webp	/api/archivos/file/Menu-del-dia.webp	Menu-del-dia.webp	image/webp	668654	4284	4512	50	50	/api/archivos/file/Menu-del-dia.webp	400	300	image/webp	15584	Menu-del-dia-400x300.webp	/api/archivos/file/Menu-del-dia.webp	768	576	image/webp	41740	Menu-del-dia-768x576.webp	/api/archivos/file/Menu-del-dia.webp	1920	1080	image/webp	160522	Menu-del-dia-1920x1080.webp
50	\N	\N	2026-01-27 19:59:07.656+00	2026-01-27 19:59:07.656+00	/api/archivos/file/IMG_0097.webp	/api/archivos/file/IMG_0097.webp	IMG_0097.webp	image/webp	308614	1537	2049	50	50	/api/archivos/file/IMG_0097.webp	400	300	image/webp	24442	IMG_0097-400x300.webp	/api/archivos/file/IMG_0097.webp	768	576	image/webp	66542	IMG_0097-768x576.webp	/api/archivos/file/IMG_0097.webp	1920	1080	image/webp	164464	IMG_0097-1920x1080.webp
51	\N	\N	2026-01-27 19:59:22.766+00	2026-01-27 19:59:22.766+00	/api/archivos/file/IMG_5422.webp	/api/archivos/file/IMG_5422.webp	IMG_5422.webp	image/webp	493242	4032	3024	50	50	/api/archivos/file/IMG_5422.webp	400	300	image/webp	11854	IMG_5422-400x300.webp	/api/archivos/file/IMG_5422.webp	768	576	image/webp	30322	IMG_5422-768x576.webp	/api/archivos/file/IMG_5422.webp	1920	1080	image/webp	105238	IMG_5422-1920x1080.webp
52	\N	\N	2026-01-27 20:00:29.821+00	2026-01-27 20:00:29.821+00	/api/archivos/file/plato_warynessy2.webp	/api/archivos/file/plato_warynessy2.webp	plato_warynessy2.webp	image/webp	250534	1800	2400	50	50	/api/archivos/file/plato_warynessy2.webp	400	300	image/webp	17704	plato_warynessy2-400x300.webp	/api/archivos/file/plato_warynessy2.webp	768	576	image/webp	46262	plato_warynessy2-768x576.webp	/api/archivos/file/plato_warynessy2.webp	1920	1080	image/webp	133536	plato_warynessy2-1920x1080.webp
53	\N	\N	2026-01-27 20:00:42.564+00	2026-01-27 20:00:42.564+00	/api/archivos/file/arrozypata-1.webp	/api/archivos/file/arrozypata-1.webp	arrozypata-1.webp	image/webp	677064	1536	2048	50	50	/api/archivos/file/arrozypata-1.webp	400	300	image/webp	35076	arrozypata-1-400x300.webp	/api/archivos/file/arrozypata-1.webp	768	576	image/webp	125778	arrozypata-1-768x576.webp	/api/archivos/file/arrozypata-1.webp	1920	1080	image/webp	398298	arrozypata-1-1920x1080.webp
54	\N	\N	2026-01-28 17:28:49.662+00	2026-01-28 17:28:49.662+00	/api/archivos/file/plato_warynessy-2.webp	/api/archivos/file/plato_warynessy-2.webp	plato_warynessy-2.webp	image/webp	192844	1800	1895	50	50	/api/archivos/file/plato_warynessy-2.webp	400	300	image/webp	11044	plato_warynessy-2-400x300.webp	/api/archivos/file/plato_warynessy-2.webp	768	576	image/webp	28768	plato_warynessy-2-768x576.webp	/api/archivos/file/plato_warynessy-2.webp	1920	1080	image/webp	86330	plato_warynessy-2-1920x1080.webp
55	\N	\N	2026-01-28 17:36:36.148+00	2026-01-28 17:30:51.662+00	/api/archivos/file/picana.webp	/api/archivos/file/picana.webp	picana.webp	image/webp	665300	3024	3250	50	50	/api/archivos/file/picana.webp	400	300	image/webp	32700	picana-400x300.webp	/api/archivos/file/picana.webp	768	576	image/webp	88334	picana-768x576.webp	/api/archivos/file/picana.webp	1920	1080	image/webp	227658	picana-1920x1080.webp
56	\N	\N	2026-01-28 18:15:30.025+00	2026-01-28 18:15:30.024+00	/api/archivos/file/ensalada-queso.webp	/api/archivos/file/ensalada-queso.webp	ensalada-queso.webp	image/webp	1176200	3024	4032	50	50	/api/archivos/file/ensalada-queso.webp	400	300	image/webp	41314	ensalada-queso-400x300.webp	/api/archivos/file/ensalada-queso.webp	768	576	image/webp	116802	ensalada-queso-768x576.webp	/api/archivos/file/ensalada-queso.webp	1920	1080	image/webp	273406	ensalada-queso-1920x1080.webp
57	\N	\N	2026-01-28 18:16:13.01+00	2026-01-28 18:16:13.01+00	/api/archivos/file/ensalada-queso-1.webp	/api/archivos/file/ensalada-queso-1.webp	ensalada-queso-1.webp	image/webp	1176200	3024	4032	50	50	/api/archivos/file/ensalada-queso-1.webp	400	300	image/webp	41314	ensalada-queso-1-400x300.webp	/api/archivos/file/ensalada-queso-1.webp	768	576	image/webp	116802	ensalada-queso-1-768x576.webp	/api/archivos/file/ensalada-queso-1.webp	1920	1080	image/webp	273406	ensalada-queso-1-1920x1080.webp
58	\N	\N	2026-01-28 18:17:04.36+00	2026-01-28 18:17:04.36+00	/api/archivos/file/warynessy-1.webp	/api/archivos/file/warynessy-1.webp	warynessy-1.webp	image/webp	410966	1080	1080	50	50	/api/archivos/file/warynessy-1.webp	400	300	image/webp	51574	warynessy-1-400x300.webp	/api/archivos/file/warynessy-1.webp	768	576	image/webp	172178	warynessy-1-768x576.webp	/api/archivos/file/warynessy-1.webp	1920	1080	image/webp	490350	warynessy-1-1920x1080.webp
59	\N	\N	2026-01-28 18:21:54.264+00	2026-01-28 18:21:54.264+00	/api/archivos/file/dorada-tempura.webp	/api/archivos/file/dorada-tempura.webp	dorada-tempura.webp	image/webp	1015464	4284	4477	50	50	/api/archivos/file/dorada-tempura.webp	400	300	image/webp	21892	dorada-tempura-400x300.webp	/api/archivos/file/dorada-tempura.webp	768	576	image/webp	57984	dorada-tempura-768x576.webp	/api/archivos/file/dorada-tempura.webp	1920	1080	image/webp	171018	dorada-tempura-1920x1080.webp
60	\N	\N	2026-01-28 18:22:23.945+00	2026-01-28 18:22:23.945+00	/api/archivos/file/menu-villenero-1.webp	/api/archivos/file/menu-villenero-1.webp	menu-villenero-1.webp	image/webp	62320	600	600	50	50	/api/archivos/file/menu-villenero-1.webp	400	300	image/webp	22276	menu-villenero-1-400x300.webp	/api/archivos/file/menu-villenero-1.webp	768	576	image/webp	49060	menu-villenero-1-768x576.webp	/api/archivos/file/menu-villenero-1.webp	\N	\N	\N	\N	\N
114	\N	\N	2026-02-12 20:00:15.772+00	2026-02-12 20:00:15.282+00	/api/archivos/file/ukan-1.webp	\N	ukan-1.webp	image/webp	21154	1696	608	50	50	/api/archivos/file/ukan-1-400x300.png	400	300	image/png	139738	ukan-1-400x300.png	/api/archivos/file/ukan-1-768x576.png	768	576	image/png	512210	ukan-1-768x576.png	/api/archivos/file/ukan-1.webp	\N	\N	\N	\N	\N
61	Carta restaurante Warynessy	Carta restaurante Warynessy	2026-02-03 16:53:34.608+00	2026-02-03 16:53:33.676+00	/api/archivos/file/Warynessy_Carta-1-1920x1080.webp	\N	Warynessy_Carta-1-1920x1080.webp	image/webp	56566	1920	1080	50	50	/api/archivos/file/Warynessy_Carta-1-1920x1080-400x300.webp	400	300	image/webp	7380	Warynessy_Carta-1-1920x1080-400x300.webp	/api/archivos/file/Warynessy_Carta-1-1920x1080-768x576.webp	768	576	image/webp	17320	Warynessy_Carta-1-1920x1080-768x576.webp	/api/archivos/file/Warynessy_Carta-1-1920x1080-1920x1080.webp	1920	1080	image/webp	50604	Warynessy_Carta-1-1920x1080-1920x1080.webp
62	Carta restaurante Warynessy	Carta restaurante Warynessy	2026-02-03 16:55:03.721+00	2026-02-03 16:55:03.602+00	/api/archivos/file/warynessy-arroz.webp	\N	warynessy-arroz.webp	image/webp	80024	1200	1200	50	50	/api/archivos/file/warynessy-arroz-400x300.webp	400	300	image/webp	12732	warynessy-arroz-400x300.webp	/api/archivos/file/warynessy-arroz-768x576.webp	768	576	image/webp	29836	warynessy-arroz-768x576.webp	/api/archivos/file/warynessy-arroz-1920x1080.webp	1920	1080	image/webp	63108	warynessy-arroz-1920x1080.webp
63	\N	\N	2026-02-04 17:00:09.523+00	2026-02-04 17:00:09.352+00	/api/archivos/file/barra-de-restaurante-3.webp	\N	barra-de-restaurante-3.webp	image/webp	81136	900	500	50	50	/api/archivos/file/barra-de-restaurante-3-400x300.webp	400	300	image/webp	21756	barra-de-restaurante-3-400x300.webp	/api/archivos/file/barra-de-restaurante-3-768x576.webp	768	576	image/webp	54606	barra-de-restaurante-3-768x576.webp	/api/archivos/file/barra-de-restaurante-3.webp	\N	\N	\N	\N	\N
64	\N	\N	2026-02-04 19:40:20.734+00	2026-02-04 19:40:20.505+00	/api/archivos/file/barra-warynessy.webp	\N	barra-warynessy.webp	image/webp	708414	4032	3024	50	50	/api/archivos/file/barra-warynessy-400x300.webp	400	300	image/webp	15886	barra-warynessy-400x300.webp	/api/archivos/file/barra-warynessy-768x576.webp	768	576	image/webp	41532	barra-warynessy-768x576.webp	/api/archivos/file/barra-warynessy-1920x1080.webp	1920	1080	image/webp	154372	barra-warynessy-1920x1080.webp
66	\N	\N	2026-02-04 19:40:45.445+00	2026-02-04 19:40:45.34+00	/api/archivos/file/comedor-privado-Warynessy-1.webp	\N	comedor-privado-Warynessy-1.webp	image/webp	66622	1200	900	50	50	/api/archivos/file/comedor-privado-Warynessy-1-400x300.webp	400	300	image/webp	15066	comedor-privado-Warynessy-1-400x300.webp	/api/archivos/file/comedor-privado-Warynessy-1-768x576.webp	768	576	image/webp	36504	comedor-privado-Warynessy-1-768x576.webp	/api/archivos/file/comedor-privado-Warynessy-1.webp	\N	\N	\N	\N	\N
1	Zona comedor Warynessy	Zona comedor Warynessy	2026-02-10 15:38:52.528+00	2026-01-15 13:41:55.163+00	/api/archivos/file/Portada-Warynessy.webp	\N	Portada-Warynessy.webp	image/webp	146736	3168	1344	50	50	/api/archivos/file/Portada-Warynessy-400x300.webp	400	300	image/webp	11038	Portada-Warynessy-400x300.webp	/api/archivos/file/Portada-Warynessy-768x576.webp	768	576	image/webp	25964	Portada-Warynessy-768x576.webp	/api/archivos/file/Portada-Warynessy-1920x1080.webp	1920	1080	image/webp	72000	Portada-Warynessy-1920x1080.webp
67	\N	\N	2026-02-04 19:40:59.862+00	2026-02-04 19:40:59.693+00	/api/archivos/file/comedor-Warynessy.webp	\N	comedor-Warynessy.webp	image/webp	91966	1080	810	50	50	/api/archivos/file/comedor-Warynessy-400x300.webp	400	300	image/webp	19308	comedor-Warynessy-400x300.webp	/api/archivos/file/comedor-Warynessy-768x576.webp	768	576	image/webp	55374	comedor-Warynessy-768x576.webp	/api/archivos/file/comedor-Warynessy.webp	\N	\N	\N	\N	\N
115	\N	\N	2026-02-12 20:00:38.174+00	2026-02-12 20:00:37.92+00	/api/archivos/file/ukan-2.webp	\N	ukan-2.webp	image/webp	21154	1696	608	50	50	/api/archivos/file/ukan-2-400x300.png	400	300	image/png	139738	ukan-2-400x300.png	/api/archivos/file/ukan-2-768x576.png	768	576	image/png	512210	ukan-2-768x576.png	/api/archivos/file/ukan-2.webp	\N	\N	\N	\N	\N
118	\N	\N	2026-02-13 15:46:58.388+00	2026-02-13 15:46:58.128+00	/api/archivos/file/la-vina-mateu-tinto-g.webp	\N	la-vina-mateu-tinto-g.webp	image/webp	27672	954	284	50	50	/api/archivos/file/la-vina-mateu-tinto-g-400x300.webp	400	300	image/webp	8940	la-vina-mateu-tinto-g-400x300.webp	/api/archivos/file/la-vina-mateu-tinto-g-768x576.webp	768	576	image/webp	20062	la-vina-mateu-tinto-g-768x576.webp	/api/archivos/file/la-vina-mateu-tinto-g.webp	\N	\N	\N	\N	\N
69	\N	\N	2026-02-09 21:45:06.194+00	2026-02-09 21:45:06.007+00	/api/archivos/file/medievo-2026.webp	\N	medievo-2026.webp	image/webp	114716	1200	675	50	50	/api/archivos/file/medievo-2026-400x300.avif	400	300	image/avif	23903	medievo-2026-400x300.avif	/api/archivos/file/medievo-2026-768x576.avif	768	576	image/avif	57877	medievo-2026-768x576.avif	/api/archivos/file/medievo-2026.webp	\N	\N	\N	\N	\N
70	\N	\N	2026-02-09 22:09:17.455+00	2026-02-09 22:09:17.276+00	/api/archivos/file/romero.webp	\N	romero.webp	image/webp	144314	1300	866	50	50	/api/archivos/file/romero-400x300.webp	400	300	image/webp	26858	romero-400x300.webp	/api/archivos/file/romero-768x576.webp	768	576	image/webp	62796	romero-768x576.webp	/api/archivos/file/romero.webp	\N	\N	\N	\N	\N
68			2026-02-09 22:14:51.216+00	2026-02-09 20:25:11.156+00	/api/archivos/file/comedor-privado-Warynessy-2.webp	\N	comedor-privado-Warynessy-2.webp	image/webp	66622	1200	900	50	50	/api/archivos/file/comedor-privado-Warynessy-2-400x300.webp	400	300	image/webp	15066	comedor-privado-Warynessy-2-400x300.webp	/api/archivos/file/comedor-privado-Warynessy-2-768x576.webp	768	576	image/webp	36504	comedor-privado-Warynessy-2-768x576.webp	/api/archivos/file/comedor-privado-Warynessy-2.webp	\N	\N	\N	\N	\N
71	\N	\N	2026-02-09 22:26:52.441+00	2026-02-09 22:26:52.288+00	/api/archivos/file/romero-warynessy.webp	\N	romero-warynessy.webp	image/webp	376966	6048	4024	50	50	/api/archivos/file/romero-warynessy-400x300.webp	400	300	image/webp	10482	romero-warynessy-400x300.webp	/api/archivos/file/romero-warynessy-768x576.webp	768	576	image/webp	22984	romero-warynessy-768x576.webp	/api/archivos/file/romero-warynessy-1920x1080.webp	1920	1080	image/webp	58740	romero-warynessy-1920x1080.webp
72	\N	\N	2026-02-09 22:40:53.652+00	2026-02-09 22:40:53.465+00	/api/archivos/file/tomillo-warynessy.webp	\N	tomillo-warynessy.webp	image/webp	423650	6016	4016	50	50	/api/archivos/file/tomillo-warynessy-400x300.webp	400	300	image/webp	15674	tomillo-warynessy-400x300.webp	/api/archivos/file/tomillo-warynessy-768x576.webp	768	576	image/webp	35884	tomillo-warynessy-768x576.webp	/api/archivos/file/tomillo-warynessy-1920x1080.webp	1920	1080	image/webp	89234	tomillo-warynessy-1920x1080.webp
73	\N	\N	2026-02-09 22:47:03.232+00	2026-02-09 22:47:03.086+00	/api/archivos/file/laurel-warynessy.webp	\N	laurel-warynessy.webp	image/webp	469856	5184	3456	50	50	/api/archivos/file/laurel-warynessy-400x300.webp	400	300	image/webp	20490	laurel-warynessy-400x300.webp	/api/archivos/file/laurel-warynessy-768x576.webp	768	576	image/webp	48518	laurel-warynessy-768x576.webp	/api/archivos/file/laurel-warynessy-1920x1080.webp	1920	1080	image/webp	124646	laurel-warynessy-1920x1080.webp
65	\N	\N	2026-02-09 22:59:29.468+00	2026-02-04 19:40:35.358+00	/api/archivos/file/Barra-1.webp	\N	Barra-1.webp	image/webp	1278468	4032	3024	50	50	/api/archivos/file/Barra-1-400x300.webp	400	300	image/webp	24758	Barra-1-400x300.webp	/api/archivos/file/Barra-1-768x576.webp	768	576	image/webp	74642	Barra-1-768x576.webp	/api/archivos/file/Barra-1-1920x1080.webp	1920	1080	image/webp	308644	Barra-1-1920x1080.webp
74	\N	\N	2026-02-10 16:15:47.032+00	2026-02-10 16:15:46.858+00	/api/archivos/file/warynessy-w-negra.svg	\N	warynessy-w-negra.svg	image/svg+xml	4305	63	53	\N	\N	/api/archivos/file/warynessy-w-negra.svg	\N	\N	\N	\N	\N	/api/archivos/file/warynessy-w-negra.svg	\N	\N	\N	\N	\N	/api/archivos/file/warynessy-w-negra.svg	\N	\N	\N	\N	\N
75	\N	\N	2026-02-10 17:52:36.46+00	2026-02-10 17:52:36.351+00	/api/archivos/file/carabibas_vendimia_seleccionada.webp	\N	carabibas_vendimia_seleccionada.webp	image/webp	10110	600	220	50	50	/api/archivos/file/carabibas_vendimia_seleccionada-400x300.webp	400	300	image/webp	8224	carabibas_vendimia_seleccionada-400x300.webp	/api/archivos/file/carabibas_vendimia_seleccionada.webp	\N	\N	\N	\N	\N	/api/archivos/file/carabibas_vendimia_seleccionada.webp	\N	\N	\N	\N	\N
77	\N	\N	2026-02-10 19:21:59.565+00	2026-02-10 19:21:59.433+00	/api/archivos/file/classica_hacienda_lpez_de_haro_gran_reserva_2013.webp	\N	classica_hacienda_lpez_de_haro_gran_reserva_2013.webp	image/webp	12948	600	220	50	50	/api/archivos/file/classica_hacienda_lpez_de_haro_gran_reserva_2013-400x300.webp	400	300	image/webp	9372	classica_hacienda_lpez_de_haro_gran_reserva_2013-400x300.webp	/api/archivos/file/classica_hacienda_lpez_de_haro_gran_reserva_2013.webp	\N	\N	\N	\N	\N	/api/archivos/file/classica_hacienda_lpez_de_haro_gran_reserva_2013.webp	\N	\N	\N	\N	\N
78	\N	\N	2026-02-10 19:26:41.968+00	2026-02-10 19:26:41.805+00	/api/archivos/file/rosado_classica_hacienda_lpez_de_haro_gran_reserva_2009.webp	\N	rosado_classica_hacienda_lpez_de_haro_gran_reserva_2009.webp	image/webp	10492	600	220	50	50	/api/archivos/file/rosado_classica_hacienda_lpez_de_haro_gran_reserva_2009-400x300.webp	400	300	image/webp	7022	rosado_classica_hacienda_lpez_de_haro_gran_reserva_2009-400x300.webp	/api/archivos/file/rosado_classica_hacienda_lpez_de_haro_gran_reserva_2009.webp	\N	\N	\N	\N	\N	/api/archivos/file/rosado_classica_hacienda_lpez_de_haro_gran_reserva_2009.webp	\N	\N	\N	\N	\N
79	\N	\N	2026-02-10 19:30:35.211+00	2026-02-10 19:30:35.12+00	/api/archivos/file/monasterio_de_san_miguel.webp	\N	monasterio_de_san_miguel.webp	image/webp	10386	600	220	50	50	/api/archivos/file/monasterio_de_san_miguel-400x300.webp	400	300	image/webp	7900	monasterio_de_san_miguel-400x300.webp	/api/archivos/file/monasterio_de_san_miguel.webp	\N	\N	\N	\N	\N	/api/archivos/file/monasterio_de_san_miguel.webp	\N	\N	\N	\N	\N
80	\N	\N	2026-02-10 19:31:21.888+00	2026-02-10 19:31:21.717+00	/api/archivos/file/monasterio_de_san_miguel_1940_crianza.webp	\N	monasterio_de_san_miguel_1940_crianza.webp	image/webp	8856	600	220	50	50	/api/archivos/file/monasterio_de_san_miguel_1940_crianza-400x300.webp	400	300	image/webp	6152	monasterio_de_san_miguel_1940_crianza-400x300.webp	/api/archivos/file/monasterio_de_san_miguel_1940_crianza.webp	\N	\N	\N	\N	\N	/api/archivos/file/monasterio_de_san_miguel_1940_crianza.webp	\N	\N	\N	\N	\N
81	\N	\N	2026-02-10 19:34:59.132+00	2026-02-10 19:34:59.023+00	/api/archivos/file/sangarida_godello.webp	\N	sangarida_godello.webp	image/webp	12590	600	220	50	50	/api/archivos/file/sangarida_godello-400x300.webp	400	300	image/webp	8706	sangarida_godello-400x300.webp	/api/archivos/file/sangarida_godello.webp	\N	\N	\N	\N	\N	/api/archivos/file/sangarida_godello.webp	\N	\N	\N	\N	\N
82	\N	\N	2026-02-10 19:35:39.141+00	2026-02-10 19:35:38.929+00	/api/archivos/file/el_canto_del_cuco_ribeiro.webp	\N	el_canto_del_cuco_ribeiro.webp	image/webp	11506	600	220	50	50	/api/archivos/file/el_canto_del_cuco_ribeiro-400x300.webp	400	300	image/webp	7656	el_canto_del_cuco_ribeiro-400x300.webp	/api/archivos/file/el_canto_del_cuco_ribeiro.webp	\N	\N	\N	\N	\N	/api/archivos/file/el_canto_del_cuco_ribeiro.webp	\N	\N	\N	\N	\N
83	\N	\N	2026-02-10 19:36:19.03+00	2026-02-10 19:36:18.917+00	/api/archivos/file/ondarea_txakoli_2019.webp	\N	ondarea_txakoli_2019.webp	image/webp	8834	600	220	50	50	/api/archivos/file/ondarea_txakoli_2019-400x300.webp	400	300	image/webp	6812	ondarea_txakoli_2019-400x300.webp	/api/archivos/file/ondarea_txakoli_2019.webp	\N	\N	\N	\N	\N	/api/archivos/file/ondarea_txakoli_2019.webp	\N	\N	\N	\N	\N
116	\N	\N	2026-02-12 20:03:47.756+00	2026-02-12 20:03:47.613+00	/api/archivos/file/la-vina.webp	\N	la-vina.webp	image/webp	33990	1696	608	50	50	/api/archivos/file/la-vina-400x300.png	400	300	image/png	166800	la-vina-400x300.png	/api/archivos/file/la-vina-768x576.png	768	576	image/png	610655	la-vina-768x576.png	/api/archivos/file/la-vina.webp	\N	\N	\N	\N	\N
119	\N	\N	2026-02-14 00:34:04.108+00	2026-02-14 00:34:03.98+00	/api/archivos/file/la-vina-1.webp	\N	la-vina-1.webp	image/webp	26752	1453	446	50	50	/api/archivos/file/la-vina-1-400x300.webp	400	300	image/webp	8878	la-vina-1-400x300.webp	/api/archivos/file/la-vina-1-768x576.webp	768	576	image/webp	14116	la-vina-1-768x576.webp	/api/archivos/file/la-vina-1.webp	\N	\N	\N	\N	\N
88	\N	\N	2026-02-12 10:00:59.639+00	2026-02-12 10:00:59.639+00	/api/archivos/file/premium_photo-1723507332664-030beec7a255.webp	\N	premium_photo-1723507332664-030beec7a255.webp	image/webp	123068	3000	1886	50	50	/api/archivos/file/premium_photo-1723507332664-030beec7a255-400x300.avif	400	300	image/avif	3169	premium_photo-1723507332664-030beec7a255-400x300.avif	/api/archivos/file/premium_photo-1723507332664-030beec7a255-768x576.avif	768	576	image/avif	6045	premium_photo-1723507332664-030beec7a255-768x576.avif	/api/archivos/file/premium_photo-1723507332664-030beec7a255-1920x1080.avif	1920	1080	image/avif	17297	premium_photo-1723507332664-030beec7a255-1920x1080.avif
121	\N	\N	2026-02-14 10:00:15.712+00	2026-02-14 10:00:15.556+00	/api/archivos/file/bot-the-orange-republic-2024-sa.webp	\N	bot-the-orange-republic-2024-sa.webp	image/webp	13560	739	198	50	50	/api/archivos/file/bot-the-orange-republic-2024-sa-400x300.webp	400	300	image/webp	7060	bot-the-orange-republic-2024-sa-400x300.webp	/api/archivos/file/bot-the-orange-republic-2024-sa.webp	\N	\N	\N	\N	\N	/api/archivos/file/bot-the-orange-republic-2024-sa.webp	\N	\N	\N	\N	\N
123	\N	\N	2026-02-14 10:05:17.587+00	2026-02-14 10:05:17.244+00	/api/archivos/file/00118784900054____1__1200x1200-1.webp	\N	00118784900054____1__1200x1200-1.webp	image/webp	75168	2400	614	50	50	/api/archivos/file/00118784900054____1__1200x1200-1-400x300.webp	400	300	image/webp	10222	00118784900054____1__1200x1200-1-400x300.webp	/api/archivos/file/00118784900054____1__1200x1200-1-768x576.webp	768	576	image/webp	20560	00118784900054____1__1200x1200-1-768x576.webp	/api/archivos/file/00118784900054____1__1200x1200-1-1920x1080.webp	1920	1080	image/webp	58378	00118784900054____1__1200x1200-1-1920x1080.webp
117	\N	\N	2026-02-13 11:17:30.261+00	2026-02-13 11:17:30.036+00	/api/archivos/file/infantil.webp	\N	infantil.webp	image/webp	38428	600	600	50	50	/api/archivos/file/infantil-400x300.webp	400	300	image/webp	16122	infantil-400x300.webp	/api/archivos/file/infantil-768x576.webp	768	576	image/webp	33486	infantil-768x576.webp	/api/archivos/file/infantil.webp	\N	\N	\N	\N	\N
120	\N	\N	2026-02-14 00:34:19.15+00	2026-02-14 00:34:19.05+00	/api/archivos/file/ukan-3.webp	\N	ukan-3.webp	image/webp	16692	1635	467	50	50	/api/archivos/file/ukan-3-400x300.webp	400	300	image/webp	5924	ukan-3-400x300.webp	/api/archivos/file/ukan-3-768x576.webp	768	576	image/webp	9084	ukan-3-768x576.webp	/api/archivos/file/ukan-3.webp	\N	\N	\N	\N	\N
102	\N	\N	2026-02-12 18:46:13.516+00	2026-02-12 18:46:13.37+00	/api/archivos/file/AnxoMartinbot_393x.webp	\N	AnxoMartinbot_393x.webp	image/webp	28814	964	279	50	50	/api/archivos/file/AnxoMartinbot_393x-400x300.webp	400	300	image/webp	8610	AnxoMartinbot_393x-400x300.webp	/api/archivos/file/AnxoMartinbot_393x-768x576.webp	768	576	image/webp	17592	AnxoMartinbot_393x-768x576.webp	/api/archivos/file/AnxoMartinbot_393x.webp	\N	\N	\N	\N	\N
122	\N	\N	2026-02-14 10:04:28.858+00	2026-02-14 10:04:28.594+00	/api/archivos/file/00118784900054____1__1200x1200.webp	\N	00118784900054____1__1200x1200.webp	image/webp	75168	2400	614	50	50	/api/archivos/file/00118784900054____1__1200x1200-400x300.webp	400	300	image/webp	10222	00118784900054____1__1200x1200-400x300.webp	/api/archivos/file/00118784900054____1__1200x1200-768x576.webp	768	576	image/webp	20560	00118784900054____1__1200x1200-768x576.webp	/api/archivos/file/00118784900054____1__1200x1200-1920x1080.webp	1920	1080	image/webp	58378	00118784900054____1__1200x1200-1920x1080.webp
103	\N	\N	2026-02-12 18:47:52.717+00	2026-02-12 18:47:52.536+00	/api/archivos/file/avan-12-meses.webp	\N	avan-12-meses.webp	image/webp	23818	816	236	50	50	/api/archivos/file/avan-12-meses-400x300.webp	400	300	image/webp	10486	avan-12-meses-400x300.webp	/api/archivos/file/avan-12-meses-768x576.webp	768	576	image/webp	21350	avan-12-meses-768x576.webp	/api/archivos/file/avan-12-meses.webp	\N	\N	\N	\N	\N
104	\N	\N	2026-02-12 18:48:12.064+00	2026-02-12 18:48:11.94+00	/api/archivos/file/clon-98-tinto-2023.webp	\N	clon-98-tinto-2023.webp	image/webp	13514	801	200	50	50	/api/archivos/file/clon-98-tinto-2023-400x300.webp	400	300	image/webp	7794	clon-98-tinto-2023-400x300.webp	/api/archivos/file/clon-98-tinto-2023-768x576.webp	768	576	image/webp	15054	clon-98-tinto-2023-768x576.webp	/api/archivos/file/clon-98-tinto-2023.webp	\N	\N	\N	\N	\N
124	\N	\N	2026-02-14 11:41:03.064+00	2026-02-14 11:41:02.857+00	/api/archivos/file/la-garnacha-salvaje.webp	\N	la-garnacha-salvaje.webp	image/webp	28192	986	264	50	50	/api/archivos/file/la-garnacha-salvaje-400x300.webp	400	300	image/webp	7136	la-garnacha-salvaje-400x300.webp	/api/archivos/file/la-garnacha-salvaje-768x576.webp	768	576	image/webp	15828	la-garnacha-salvaje-768x576.webp	/api/archivos/file/la-garnacha-salvaje.webp	\N	\N	\N	\N	\N
105	\N	\N	2026-02-12 18:48:35.922+00	2026-02-12 18:48:35.795+00	/api/archivos/file/cyatho.webp	\N	cyatho.webp	image/webp	9350	458	116	50	50	/api/archivos/file/cyatho-400x300.webp	400	300	image/webp	9140	cyatho-400x300.webp	/api/archivos/file/cyatho.webp	\N	\N	\N	\N	\N	/api/archivos/file/cyatho.webp	\N	\N	\N	\N	\N
106	\N	\N	2026-02-12 18:48:58.13+00	2026-02-12 18:48:58.01+00	/api/archivos/file/FyA%20crianza.webp	\N	FyA crianza.webp	image/webp	14050	735	177	50	50	/api/archivos/file/FyA%20crianza-400x300.webp	400	300	image/webp	8498	FyA crianza-400x300.webp	/api/archivos/file/FyA%20crianza.webp	\N	\N	\N	\N	\N	/api/archivos/file/FyA%20crianza.webp	\N	\N	\N	\N	\N
107	\N	\N	2026-02-12 18:50:02.643+00	2026-02-12 18:50:02.493+00	/api/archivos/file/la-mujer-caballo-naranja.webp	\N	la-mujer-caballo-naranja.webp	image/webp	19294	651	174	50	50	/api/archivos/file/la-mujer-caballo-naranja-400x300.webp	400	300	image/webp	10924	la-mujer-caballo-naranja-400x300.webp	/api/archivos/file/la-mujer-caballo-naranja.webp	\N	\N	\N	\N	\N	/api/archivos/file/la-mujer-caballo-naranja.webp	\N	\N	\N	\N	\N
108	\N	\N	2026-02-12 18:51:53.006+00	2026-02-12 18:51:52.013+00	/api/archivos/file/lias_1023x.webp	\N	lias_1023x.webp	image/webp	86154	2435	657	50	50	/api/archivos/file/lias_1023x-400x300.webp	400	300	image/webp	9912	lias_1023x-400x300.webp	/api/archivos/file/lias_1023x-768x576.webp	768	576	image/webp	21130	lias_1023x-768x576.webp	/api/archivos/file/lias_1023x-1920x1080.webp	1920	1080	image/webp	55238	lias_1023x-1920x1080.webp
110	\N	\N	2026-02-12 18:52:28.272+00	2026-02-12 18:52:27.983+00	/api/archivos/file/marieta_1023x.webp	\N	marieta_1023x.webp	image/webp	244660	2425	650	50	50	/api/archivos/file/marieta_1023x-400x300.webp	400	300	image/webp	13554	marieta_1023x-400x300.webp	/api/archivos/file/marieta_1023x-768x576.webp	768	576	image/webp	41940	marieta_1023x-768x576.webp	/api/archivos/file/marieta_1023x-1920x1080.webp	1920	1080	image/webp	153566	marieta_1023x-1920x1080.webp
76	\N	\N	2026-02-12 18:53:04.343+00	2026-02-10 18:23:56.263+00	/api/archivos/file/UKAN-Rioja-DOCa-bottle-shot-e1687348215431.webp	\N	UKAN-Rioja-DOCa-bottle-shot-e1687348215431.webp	image/webp	169958	3429	986	50	50	/api/archivos/file/UKAN-Rioja-DOCa-bottle-shot-e1687348215431-400x300.webp	400	300	image/webp	6108	UKAN-Rioja-DOCa-bottle-shot-e1687348215431-400x300.webp	/api/archivos/file/UKAN-Rioja-DOCa-bottle-shot-e1687348215431-768x576.webp	768	576	image/webp	17074	UKAN-Rioja-DOCa-bottle-shot-e1687348215431-768x576.webp	/api/archivos/file/UKAN-Rioja-DOCa-bottle-shot-e1687348215431-1920x1080.webp	1920	1080	image/webp	58098	UKAN-Rioja-DOCa-bottle-shot-e1687348215431-1920x1080.webp
111	\N	\N	2026-02-12 19:02:23.828+00	2026-02-12 19:02:23.735+00	/api/archivos/file/LA-VINA-DE-MATEO-dulce-Alicante.webp	\N	LA-VINA-DE-MATEO-dulce-Alicante.webp	image/webp	14592	538	165	50	50	/api/archivos/file/LA-VINA-DE-MATEO-dulce-Alicante-400x300.webp	400	300	image/webp	10488	LA-VINA-DE-MATEO-dulce-Alicante-400x300.webp	/api/archivos/file/LA-VINA-DE-MATEO-dulce-Alicante.webp	\N	\N	\N	\N	\N	/api/archivos/file/LA-VINA-DE-MATEO-dulce-Alicante.webp	\N	\N	\N	\N	\N
112	\N	\N	2026-02-12 19:35:44.514+00	2026-02-12 19:35:44.384+00	/api/archivos/file/LA-VINA-DE-MATEO-dulce-Alicante-1.webp	\N	LA-VINA-DE-MATEO-dulce-Alicante-1.webp	image/webp	14592	538	165	50	50	/api/archivos/file/LA-VINA-DE-MATEO-dulce-Alicante-1-400x300.webp	400	300	image/webp	10488	LA-VINA-DE-MATEO-dulce-Alicante-1-400x300.webp	/api/archivos/file/LA-VINA-DE-MATEO-dulce-Alicante-1.webp	\N	\N	\N	\N	\N	/api/archivos/file/LA-VINA-DE-MATEO-dulce-Alicante-1.webp	\N	\N	\N	\N	\N
113	\N	\N	2026-02-12 19:38:33.654+00	2026-02-12 19:38:33.508+00	/api/archivos/file/ukan.webp	\N	ukan.webp	image/webp	8798	558	160	50	50	/api/archivos/file/ukan-400x300.webp	400	300	image/webp	7382	ukan-400x300.webp	/api/archivos/file/ukan.webp	\N	\N	\N	\N	\N	/api/archivos/file/ukan.webp	\N	\N	\N	\N	\N
109	\N	\N	2026-02-12 19:55:39.496+00	2026-02-12 18:52:09.053+00	/api/archivos/file/Gemini_Generated_Image_3lldpt3lldpt3lld.webp	\N	Gemini_Generated_Image_3lldpt3lldpt3lld.webp	image/webp	41298	1696	608	50	50	/api/archivos/file/Gemini_Generated_Image_3lldpt3lldpt3lld-400x300.png	400	300	image/png	182181	Gemini_Generated_Image_3lldpt3lldpt3lld-400x300.png	/api/archivos/file/Gemini_Generated_Image_3lldpt3lldpt3lld-768x576.png	768	576	image/png	658248	Gemini_Generated_Image_3lldpt3lldpt3lld-768x576.png	/api/archivos/file/Gemini_Generated_Image_3lldpt3lldpt3lld.webp	\N	\N	\N	\N	\N
\.


--
-- Data for Name: banners; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.banners (id, titulo, texto, imagen_id, link_url, link_texto, link_externo, fecha_inicio, fecha_fin, posicion, tipo, activo, prioridad, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categorias (id, nombre, slug, descripcion, orden, activa, imagen_id, updated_at, created_at) FROM stdin;
1	Entrantes	entrantes	\N	1	t	\N	2026-01-15 12:07:42.986+00	2026-01-15 12:07:42.986+00
2	Carnes	carnes	\N	2	t	\N	2026-01-15 12:07:42.989+00	2026-01-15 12:07:42.989+00
3	Pescados	pescados	\N	3	t	\N	2026-01-15 12:07:42.991+00	2026-01-15 12:07:42.991+00
4	Arroces	arroces	\N	4	t	\N	2026-01-15 12:07:42.992+00	2026-01-15 12:07:42.992+00
5	Postres	postres	\N	5	t	\N	2026-01-15 12:07:42.996+00	2026-01-15 12:07:42.996+00
6	Aperitivos - Gran Variedad	aperitivos-gran-variedad	\N	1	t	\N	2026-01-21 19:45:03.911+00	2026-01-21 19:45:03.91+00
7	Aperitivos - El Mar	aperitivos-el-mar	\N	2	t	\N	2026-01-21 19:45:03.916+00	2026-01-21 19:45:03.916+00
8	Aperitivos - La Tierra	aperitivos-la-tierra	\N	3	t	\N	2026-01-21 19:45:03.918+00	2026-01-21 19:45:03.918+00
9	Aperitivos - La Granja	aperitivos-la-granja	\N	4	t	\N	2026-01-21 19:45:03.92+00	2026-01-21 19:45:03.92+00
10	Ensaladas	ensaladas	\N	5	t	\N	2026-01-21 19:45:03.922+00	2026-01-21 19:45:03.922+00
11	Cuchara	cuchara	\N	6	t	\N	2026-01-21 19:45:03.923+00	2026-01-21 19:45:03.923+00
12	Arroces - Arroces secos (por encargo)	arroces-arroces-secos-por-encargo	\N	7	t	\N	2026-01-21 19:45:03.925+00	2026-01-21 19:45:03.925+00
14	Montaditos y panes - Montaditos	montaditos-y-panes-montaditos	\N	11	t	\N	2026-01-21 19:45:03.93+00	2026-01-21 19:45:03.93+00
15	Montaditos y panes - Minibocata	montaditos-y-panes-minibocata	\N	12	t	\N	2026-01-21 19:45:03.932+00	2026-01-21 19:45:03.932+00
16	Montaditos y panes - Hamburguesas	montaditos-y-panes-hamburguesas	\N	13	t	\N	2026-01-21 19:45:03.933+00	2026-01-21 19:45:03.933+00
17	Montaditos y panes - Pan de cristal	montaditos-y-panes-pan-de-cristal	\N	14	t	\N	2026-01-21 19:45:03.935+00	2026-01-21 19:45:03.935+00
18	Vinos - Blancos D.O. Alicante	vinos-blancos-d-o-alicante	\N	16	t	\N	2026-01-21 19:45:03.936+00	2026-01-21 19:45:03.936+00
19	Vinos - Blancos D.O. Valencia	vinos-blancos-d-o-valencia	\N	17	t	\N	2026-01-21 19:45:03.938+00	2026-01-21 19:45:03.938+00
20	Vinos - Blancos D.O. Rías Baixas	vinos-blancos-d-o-rias-baixas	\N	18	t	\N	2026-01-21 19:45:03.94+00	2026-01-21 19:45:03.94+00
21	Vinos - Blancos D.O. Rueda	vinos-blancos-d-o-rueda	\N	19	t	\N	2026-01-21 19:45:03.941+00	2026-01-21 19:45:03.941+00
22	Vermut y Cervezas - Vermut	vermut-y-cervezas-vermut	\N	20	t	\N	2026-01-21 19:45:03.942+00	2026-01-21 19:45:03.942+00
23	Vermut y Cervezas - Cervezas	vermut-y-cervezas-cervezas	\N	21	t	\N	2026-01-21 19:45:03.943+00	2026-01-21 19:45:03.943+00
24	Espumosos y vinos dulces - Espumosos	espumosos-y-vinos-dulces-espumosos	\N	22	t	\N	2026-01-21 19:45:03.944+00	2026-01-21 19:45:03.944+00
25	Espumosos y vinos dulces - Vinos dulces	espumosos-y-vinos-dulces-vinos-dulces	\N	23	t	\N	2026-01-21 19:45:03.946+00	2026-01-21 19:45:03.946+00
13	Arroces - Arroces melosos (por encargo)	arroces-arroces-melosos	\N	8	t	\N	2026-02-08 20:26:55.22+00	2026-01-21 19:45:03.927+00
26	Vinos - Tintos D.O. Alicante	vinos-tintos-d-o-alicante	Vinos tintos D.O. Alicante	100	t	\N	2026-02-10 18:06:17.65+00	2026-02-10 17:48:40.867+00
27	Vinos - Tintos D.O. Valencia	vinos-tintos-d-o-valencia	Vinos tintos D.O. Valencia	101	t	\N	2026-02-10 18:06:17.704+00	2026-02-10 17:48:40.972+00
28	Vinos - Tintos D.O. Jumilla	vinos-tintos-d-o-jumilla	Vinos tintos D.O. Jumilla	102	t	\N	2026-02-10 18:06:17.755+00	2026-02-10 17:48:41.06+00
29	Vinos - Tintos D.O. Ribera del Duero	vinos-tintos-d-o-ribera-del-duero	Vinos tintos D.O. Ribera del Duero	103	t	\N	2026-02-10 18:06:17.815+00	2026-02-10 17:48:41.169+00
30	Vinos - Tintos D.O. Rioja	vinos-tintos-d-o-rioja	Vinos tintos D.O. Rioja	104	t	\N	2026-02-10 18:06:17.866+00	2026-02-10 17:48:41.257+00
31	Vinos - Tintos Otras Denominaciones	vinos-tintos-otras-denominaciones	Vinos tintos Otras Denominaciones	105	t	\N	2026-02-10 18:06:17.911+00	2026-02-10 17:48:41.347+00
32	Vinos - Blancos D.O. Rioja	vinos-blancos-d-o-rioja	\N	20	t	\N	2026-02-10 19:25:41.149+00	2026-02-10 19:23:17.309+00
33	Vinos - Blancos D.O. Ribera del Duero	vinos-blancos-d-o-ribera-duero	\N	21	t	\N	2026-02-10 19:29:30.567+00	2026-02-10 19:29:30.567+00
34	Vinos - Blancos otras D.O.	vinos-blancos-otras-d-o	\N	22	t	\N	2026-02-10 19:32:55.88+00	2026-02-10 19:32:55.879+00
35	Vinos - Sin alcohol	vinos-sin-alcohol	Vinos blancos y rosados desacoholizados	1	t	\N	2026-02-14 10:03:41.465+00	2026-02-14 10:03:41.464+00
\.


--
-- Data for Name: configuracion_sitio; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.configuracion_sitio (id, title, logo_id, description, contact_phone, contact_email, contact_address, contact_postal_code, contact_city, contact_province, contact_country, contact_google_maps_url, contact_coordinates_lat, contact_coordinates_lng, social_media_facebook, social_media_instagram, social_media_twitter, social_media_tiktok, social_media_youtube, social_media_tripadvisor, copyright, cover_manager_id, updated_at, created_at, contact_whatsapp, contact_whatsapp_message, instagram_config_method, instagram_config_api_token, instagram_config_api_user_id, instagram_config_embed_code) FROM stdin;
1	Restaurante Warynessy	74	Restaurante de alta cocina mediterránea en Villena, Alicante	+34 965 80 10 47	restaurante@warynessy.com	Isabel la Católica, 13 A	03400	Villena	Alicante	España	https://www.google.com/maps/place/Restaurante+Warynessy/@38.6309338,-0.8683216,17z/data=!3m1!4b1!4m6!3m5!1s0xd63df7505ed3a0d:0x7f9e510223ce67ae!8m2!3d38.6309338!4d-0.8657413!16s%2Fg%2F1tk70vns?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D	38.6309338	-0.8657413	https://facebook.com/warynessy	https://instagram.com/warynessy	\N	\N	\N	\N	© 2026 Restaurante Warynessy. Todos los derechos reservados. Desarrollado por eNeweb	\N	2026-02-10 16:58:29.731+00	2026-01-15 12:07:43.051+00	659438099	Necesito información.	widget	\N	\N	<div data-behold-id="yzuzn1Pr23ElwWN37HQT"></div>\n<script>\n  (function() {\n    const d=document,s=d.createElement("script");s.type="module";\n    s.src="https://w.behold.so/widget.js";d.head.append(s);\n  })();\n</script>
\.


--
-- Data for Name: configuracion_sitio_footer_logos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.configuracion_sitio_footer_logos (_order, _parent_id, id, logo_id, alt, link) FROM stdin;
1	1	678fce779946800000000001	17	Sicted	\N
2	1	678fce779946800000000002	18	Ruta del Vino	\N
3	1	678fce779946800000000003	19	L'Exquisit Mediterrani	\N
\.


--
-- Data for Name: configuracion_sitio_opening_hours; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.configuracion_sitio_opening_hours (_order, _parent_id, id, days, hours, closed) FROM stdin;
1	1	6968d88f0fc6c34945f23a1a	Lunes y martes		t
2	1	6968d88f0fc6c34945f23a1b	Miércoles a domingo	13:30 - 17:00	f
3	1	6968d88f0fc6c34945f23a1c	Viernes y sábado noche	20:00 - 00:00	f
\.


--
-- Data for Name: espacios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.espacios (id, nombre, slug, descripcion, capacidad, orden, activo, disponible_eventos, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: espacios_caracteristicas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.espacios_caracteristicas (_order, _parent_id, id, caracteristica) FROM stdin;
\.


--
-- Data for Name: espacios_galeria; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.espacios_galeria (_order, _parent_id, id, imagen_id) FROM stdin;
\.


--
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menus (id, nombre, slug, imagen_id, precio, fechas_dias, fecha_inicio, fecha_fin, descripcion, pdf_id, activo, destacado, orden, horario, updated_at, created_at, descripcion_menu, etiqueta) FROM stdin;
4	Menú Fin de Semana	menu-fin-de-semana	59	25		2026-02-21 12:00:00+00	2026-02-22 12:00:00+00	{"root": {"type": "root", "format": "", "version": 1, "children": [{"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Aperitivo central", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pan con picadita.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Ensaladilla rusa de la casa.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, sulfitos, pescado.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Salteado de chipirones, gulas y almejas.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: crustáceos, pescado, moluscos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Huevo a baja temperatura con patatas y boletus.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Plato principal", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Triguico villenero.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: apio, gluten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Salmón teriyaki con arroz basmati, espinacas salteadas y edamame.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: pescado, gluten, soja.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Codillo de cerdo salseado con cremoso de puré de patata.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos, lácteos. ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pollo katsu con arroz basmati y Sriracha mayo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, gluten, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Postre o café", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Café, cortado o infusión.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Flan de coco con caramelo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, gluten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Taquitos de melón.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Bola de helado de nata con nuez y caramelo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, frutos secos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Los menús no incluyen bebida.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Por rotura de stock se puede cambiar cualquier plato.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 2}], "textFormat": 1}}	\N	t	f	5	comidas	2026-02-15 16:09:31.401+00	2026-01-26 19:40:18.855+00	Este menú se ofrece al mediodía. Menú para toda la mesa. Mínimo para dos personas.	Los fines de semana
5	Menú del Día	menu-del-dia	48	15	Entre semana	2026-02-18 12:00:00+00	2026-02-20 12:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Primer plato", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"tag": "h5", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pelotas de relleno villenero.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos, huevo, gluten.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Lentejas estofadas con chorizo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Crema de calabaza con costrones de pan frito.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, lácteos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "EnsaladIlla rusa.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos, pescado, huevo.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Segundo plato", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"tag": "h5", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Crujiente de pescado blanco con salsa tártara y patatas al montón.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: pescado, huevo, gluten, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Chuletas de pavo a la parrilla con mezclun de lechugas y patatas.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Revuelto de verduritas con pan tostado.", "type": "text", "style": "", "detail": 0, "format": 3, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, gluten.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 3}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Secreto con ajetes tiernos y patatas al montón. (Suplemento: 3,80€).", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pad thai. Noodles salteados con pollo y verduras. (Suplemento: 3,80€).", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, huevo, apio, soja, sulfitos", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": ".", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bacalao en tempura con piquillo confitado, pisto y alioli de manzana. (Suplemento: 4,00€).", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, pescado, huevo, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Postre o café", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Natillas de la abuela con galleta.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, huevos, gluten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Taquitos de melón.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bola de helado de fresa.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Café, cortado o infusión.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bebida", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"tag": "h5", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "1/2 l. agua mineral, cerveza Águila, Fanta de naranja o limón, Coca-cola, tinto de verano o copa de vino de la casa.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Por rotura de stock se puede cambiar cualquier plato.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 2}], "direction": null, "textFormat": 1}}	\N	t	f	1	comidas	2026-02-18 12:35:11.055+00	2026-01-26 19:46:50.377+00	Este menú se ofrece de miércoles a viernes mediodía. Excepto festivos.\nA partir de 1 persona.	Entre semana
10	Para los más peques	para-peques	117	0	todos los días	2026-02-01 12:00:00+00	2026-04-30 12:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pechuga de pollo empanada con patatas fritas. 10,00 €.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, huevo. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Hamburguesa con queso y patatas fritas. 8,00 €.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "(carne de vacuno, queso, cebolla, tomate y lechuga). ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, sulfitos, lácteos. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Espaguetis. 9,00 €.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Como a ti te gustan:  ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "– Salsa boloñesa. – Tomate frito. – Atún. – Salsa carbonara: bacon y champiñón. – Con queso rallado. – Salteados con aceite.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, sulfitos, lácteos, pescado.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}], "direction": null, "textFormat": 1}}	\N	t	f	0	ambos	2026-02-13 11:53:22.247+00	2026-02-12 09:55:14.989+00	Elige el plato que más te gusta.\nHasta 10 años de edad.	Lo que te gusta
1	Menú Típico Villenero	menu-tipico	60	30	\N	\N	\N	{"root": {"type": "root", "format": "", "version": 1, "children": [{"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Entradas", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pan, aceitunas y alioli.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, huevo.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Tomate de temporada con capellán a la llama y encurtidos.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos, pescado.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Queso fresco frito con tomate.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Zarangollo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "(cebolla, calabacín, tomate, huevo).", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Primer plato", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Degustación:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pelota de relleno y gazpacho villenero.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: apio, sulfitos, apio, huevo, gluten, moluscos.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Postre o café", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Torrija con natillas y helado de vainilla.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, huevo, lácteos, frutos de cáscara.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "El menú no incluye bebida.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Por rotura de stock se puede cambiar cualquier plato.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}]}}	\N	t	t	3	comidas	2026-02-09 21:48:11.798+00	2026-01-26 19:40:09.062+00	Este menú se ofrece toda la semana. \nWarynessy homenajea a la cocina autóctona villenera de siempre.\nMínimo para dos personas.	Autóctono
3	Menú Vegetariano	menu-vegetariano	58	27	Todos los días	\N	\N	{"root": {"type": "root", "format": "", "version": 1, "children": [{"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Primer plato", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Crema de calabaza y zanahoria con costrones de pan frito.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, apio, gluten.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Ensalada verde.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "(lechuga, tomate, aceitunas, maíz, cebolla, pimiento).", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Ensalada de queso de cabra.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "(brotes de lechugas variadas, queso de cabra, frutos secos, etc).", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos, lácteos, frutos de cáscara.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Ensalada ¡Super Fresh!.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "(mango, queso parmesano, calabacín, etc).", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, soja.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Segundo plato", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Parrillada de verduras.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "(tomate, cebolla, calabacín, berenjena, champiñón)", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Verduras en tempura.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "(cebolla, calabacín, berenjena, pimiento).", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, huevos, soja.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Huevo a baja temperatura con crema de puré de patata, boletus, ajetes tiernos y trufa de temporada.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevos, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Pad thai. Noodles salteados con verduras y soja.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevos, gluten, apio, soja.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Postre o café", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Café, cortado o infusión.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pan de Calatrava con caramelo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, lácteos, gluten, frutos de cáscara.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Fruta natural.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "El menú no incluye bebida.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Por rotura de stock se puede cambiar cualquier plato.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}]}}	\N	t	f	4	ambos	2026-02-09 21:48:20.445+00	2026-01-26 19:40:18.855+00	De miércoles a domingo mediodía o noche.\nOpción vegana y vegetariana.\n\nA partir de 1 persona.	Todos los días
7	Menú Medievo 2026	menu-medievo	69	27	Fiestas del Medievo 2026	2026-03-06 12:00:00+00	2026-03-08 12:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Aperitivo central", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pan con picadita.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Ensaladilla rusa de la casa.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, sulfitos, pescado.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Lomo de orza con alioli.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos, huevo.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Huevo roto, patatas al montón y jamón de bodega.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Plato principal", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Triguico villenero.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: apio, gluten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Salmón teriyaki con arroz basmati, espinacas salteadas y edamame.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: pescado, gluten, soja.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Codillo de cerdo salseado con cremoso de puré de patata.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos, lácteos. ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Pollo katsu con arroz basmati y Sriracha mayo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, gluten, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Postre o café", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Café, cortado o infusión.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Pan de Calatrava con caramelo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, huevo, gluten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Taquitos de melón.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Bola de helado de nata con caramelo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, frutos secos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 1}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Los menús no incluyen bebida.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Por rotura de stock se puede cambiar cualquier plato.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 2}], "direction": null, "textFormat": 1}}	\N	t	f	6	comidas	2026-02-11 15:11:04.646+00	2026-02-09 21:43:20.907+00	Este menú se ofrece al mediodía.\nMenú para toda la mesa.\nMínimo para dos personas.	Fiestas
6	Menú Romero	romero	71	30	Celebraciones, cumpleaños, etc.	2026-02-01 12:00:00+00	2026-03-31 12:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Aperitivo central", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Una ración cada cuatro comensales:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Ensaladilla rusa de la casa.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevos, pescado, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Gyozas de pollo y verdura.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, soja.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Taco de salmón marinado,", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "aguacate, rábano, soja y lima.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, soja, pescado.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Berenjena asada, salsa de tomate, crema de queso feta, piñones y aceite de albahaca.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, fruto de cáscara.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Carne", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Al centro:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Secreto con ajetes tiernos y", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "patatas al montón.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Postre", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Al centro:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Torrijas, natillas y helado de vainilla y chocolate.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, lácteos, huevo, frutos de cáscara.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Café, cortado o infusión.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "El menú no incluye bebida.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Puede solicitar toda la bebida hasta el café.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "– Opción bebida +11€:", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino blanco D.O Alicante. Vinalopó S. Blanc.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino tinto D.O Alicante Fco. Gómez V. de Finca.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Cerveza El Águila, refrescos y aguas minerales.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "– Opción bebida 14€:", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino blanco D.O R. Baixas. Marqués de Vizhoja.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino tinto D.O R. del Duero Traslascuestas.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Cerveza El Águila, refrescos y aguas minerales.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "textFormat": 1}}	\N	t	f	8	ambos	2026-02-09 22:26:54.09+00	2026-02-09 19:28:44.865+00	Menú para toda la mesa.\nMínimo 8 personas.	Menú para compartir
8	Menú Tomillo	tomillo	72	36	Celebraciones, cumpleaños, bautizos, etc.	2026-02-01 12:00:00+00	2026-04-30 12:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Aperitivo central", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Una ración cada cuatro comensales:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Ensaladilla rusa de la casa.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevos, pescado, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Croqueta de boletus", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "con salsa de trufa.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, gluten, huevo.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Berenjena asada, salsa de tomate, crema de queso feta, piñones y aceite de albahaca.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, fruto de cáscara.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Plato principal", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "A elegir:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Bacalao en tempura con piquillo confitado, pisto y alioli de manzana.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, pescado, huevo, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Carrillada confitada con vino tinto y crema de patata.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos, fruto de cáscara, lácteos.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Postre", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Dulces variados al centro:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Profiteroles, tiramisú y pan de Calatrava.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, lácteos, fruto de cáscara, gluten.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Café, cortado o infusión.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "El menú no incluye bebida.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Puede solicitar toda la bebida hasta el café.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "– Opción bebida +11€:", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino blanco D.O Alicante. Vinalopó S. Blanc.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino tinto D.O Alicante Fco. Gómez V. de Finca.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Cerveza El Águila, refrescos y aguas minerales.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "– Opción bebida 14€:", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino blanco D.O R. Baixas. Marqués de Vizhoja.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino tinto D.O R. del Duero Traslascuestas.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Cerveza El Águila, refrescos y aguas minerales.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "textFormat": 1}}	\N	t	f	2	ambos	2026-02-09 22:44:16.719+00	2026-02-09 22:42:23.606+00	Menú para toda la mesa.\nMínimo 8 personas.	Menú plato individual
9	Menú Laurel	menu-laurel	73	43	Celebraciones, bautizos, Bodas de plata, oro, etc.	2026-02-01 12:00:00+00	2026-03-31 12:00:00+00	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Aperitivo central", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Una ración cada cuatro comensales:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Marineras:", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "(ensaladilla, anchoas en salmuera).", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, pesacdo, sulfitos, gluten.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Croqueta casera de jamón ibérico.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, lácteos, gluten.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Croqueta casera de boletus.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, lácteos, gluten, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Timbal de pulpo a feira con", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "patata, emulsión de alioli y pimentón.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: moluscos, huevo.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Plato principal", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "A elegir:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Salmón teriyaki con edamame,", "type": "text", "style": "", "detail": 0, "format": 3, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "arroz basmati y espinacas salteadas.", "type": "text", "style": "", "detail": 0, "format": 3, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: pescado, gluten, soja.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Codillo asado estilo alemán", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "guarnecido con patatas asadas al romero.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Postre", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Dulces variados al centro:", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Profiteroles, tiramisú y pan de Calatrava.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevo, lácteos, fruto de cáscara, gluten.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Café, cortado o infusión.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "El menú no incluye bebida.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Puede solicitar toda la bebida hasta el café.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "– Opción bebida +11€:", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino blanco D.O Alicante. Vinalopó S. Blanc.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino tinto D.O Alicante Fco. Gómez V. de Finca.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Cerveza El Águila, refrescos y aguas minerales.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "– Opción bebida 14€:", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino blanco D.O R. Baixas. Marqués de Vizhoja.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Vino tinto D.O R. del Duero Traslascuestas.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "      Cerveza El Águila, refrescos y aguas minerales.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null, "textFormat": 1}}	\N	t	f	3	ambos	2026-02-09 22:49:07.11+00	2026-02-09 22:47:31.313+00	Menú para toda la mesa.\nMínimo 8 personas.	Menú plato individual
2	Menú Ejecutivo	menu-ejecutivo	57	20	\N	\N	\N	{"root": {"type": "root", "format": "", "version": 1, "children": [{"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Aperitivo Central", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Frutos secos.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: fruto de cáscara.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Ensaladilla rusa de la casa.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: huevos, pescado, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Ensalada de queso de cabra:", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "brotes de lechuga, queso de cabra, pasas, frutos secos.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, f. secos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Calamares a la romana con mayonesa.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, moluscos, huevo.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Plato a elegir", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bacalao en tempura con piquillo confitado, pisto y alioli de manzana.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, pescado, huevo, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Secreto con ajetes tiernos y patatas al montón.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Cheeseburger  de ternera con bastones de patata.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, lácteos, huevo.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Espaguetis a la carbonara con queso rallado.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: gluten, lácteos, sulfitos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Salmón teriyaki con arroz basmati, espinacas salteadas y edamame.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "(suplemento 5,00€). Alérgenos: pescado, soja, gluten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Carrillada de cerdo confitada con vino tinto y puré de patata.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": "(suplemento 5,50€).", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: sulfitos, fruto de cáscara, lácteos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Postre o café", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Elegir:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Café, cortado o infusión.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Pan de Calatrava con caramelo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos, huevos, gluten.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Bola de helado de vainilla con caramelo.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos: lácteos.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Fruta natural.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "Alérgenos:.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "El menú no incluye bebida.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": " ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "Por rotura de stock se puede cambiar cualquier plato.", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}]}}	\N	t	f	2	comidas	2026-02-10 18:14:04.454+00	2026-01-26 19:40:09.062+00	Este menú se ofrece de miércoles a viernes mediodía. Excepto festivos.\nA partir de 2 personas.	Entre semana
\.


--
-- Data for Name: menus_dias_semana; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menus_dias_semana ("order", parent_id, value, id) FROM stdin;
1	3	miercoles	112
2	3	jueves	113
3	3	viernes	114
4	3	sabado	115
5	3	domingo	116
1	10	miercoles	203
2	10	jueves	204
3	10	viernes	205
4	10	sabado	206
5	10	domingo	207
1	6	miercoles	145
2	6	jueves	146
3	6	viernes	147
4	6	sabado	148
5	6	domingo	149
1	8	miercoles	155
1	4	sabado	226
2	4	domingo	227
2	8	jueves	156
3	8	viernes	157
1	5	miercoles	231
2	5	viernes	232
4	8	sabado	158
5	8	domingo	159
1	9	miercoles	160
3	5	jueves	233
2	9	jueves	161
3	9	viernes	162
4	9	sabado	163
5	9	domingo	164
1	2	miercoles	174
2	2	jueves	175
3	2	viernes	176
1	7	viernes	180
2	7	sabado	181
3	7	domingo	182
\.


--
-- Data for Name: menus_grupo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menus_grupo (id, nombre, descripcion, imagen_portada_id, orden, activo, updated_at, created_at) FROM stdin;
1	Menús para grupos	Selección de menús para grupos de más de 8 personas.	68	1	t	2026-02-09 22:49:41.881+00	2026-02-09 20:25:18.226+00
2	Para los más peques	\N	\N	2	t	2026-02-12 10:04:06.537+00	2026-02-12 10:04:06.537+00
\.


--
-- Data for Name: menus_grupo_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menus_grupo_rels (id, "order", parent_id, path, menus_id) FROM stdin;
14	1	1	menus	6
15	2	1	menus	8
16	3	1	menus	9
17	1	2	menus	10
\.


--
-- Data for Name: pagina_inicio; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pagina_inicio (id, hero_title, hero_subtitle, hero_image_id, welcome_title, welcome_text, cta_title, cta_text, cta_button_text, seo_title, seo_description, updated_at, created_at) FROM stdin;
1	Tu restaurante en Villena	Una amplia oferta gastronómica local, mediterránea e internacional.	1	¡Bienvenido a Warynessy!	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Fundado en 1979, combinamos tradición y creatividad para ofrecerte una experiencia gastronómica única en el corazón de Villena.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Te invitamos a descubrir un ambiente acogedor donde cada visita se convierte en un momento especial.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	No te quedes sin tu mesa	\N	Reservar ahora	Tu restaurante en Villena	Descubre Restaurante Warynessy en Villena. Desde 1979 ofreciendo la mejor cocina mediterránea, de mercado y platos típicos locales. ¡Reserva mesa!	2026-02-09 15:56:40.437+00	2026-01-15 13:46:36.957+00
\.


--
-- Data for Name: pagina_inicio_galeria_inicio; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pagina_inicio_galeria_inicio (_order, _parent_id, id, imagen_id) FROM stdin;
1	1	6968eed23b47a6cb2b235245	6
2	1	6968f0033b47a6cb2b235247	7
3	1	696e5ae80b6d38f5f74e07a0	12
4	1	696e57fd0b6d38f5f74e079a	14
5	1	696e5b770b6d38f5f74e07a2	13
6	1	696e58800b6d38f5f74e079c	15
7	1	69710eef24535f5f300fed7e	23
\.


--
-- Data for Name: pagina_inicio_galeria_regalo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pagina_inicio_galeria_regalo (_order, _parent_id, id, imagen_id) FROM stdin;
1	1	6979194cc29baa939ece739d	54
2	1	697918eac29baa939ece7399	50
3	1	6979190ec29baa939ece739b	51
4	1	6979195fc29baa939ece739f	55
\.


--
-- Data for Name: pagina_inicio_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pagina_inicio_rels (id, "order", parent_id, path, espacios_id, experiencias_id, menus_grupo_id, paginas_id) FROM stdin;
\.


--
-- Data for Name: paginas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.paginas (id, titulo_interno, slug, hero_image_id, hero_title, hero_subtitle, meta_title, meta_description, updated_at, created_at, imagen_espacio1_id, imagen_espacio2_id, imagen_espacio3_id, imagen_espacio4_id) FROM stdin;
5	Experiencias	experiencias	30	Regala una Experiencia Gastronómica	\N	\N	\N	2026-01-28 17:01:20.406+00	2026-01-21 18:46:45.436+00	\N	\N	\N	\N
3	Reservas	reservas	28	Reserva tu mesa en Warynessy	\N	\N	\N	2026-02-07 01:02:54.353+00	2026-01-21 18:44:45.297+00	\N	\N	\N	\N
4	Contacto	contacto	29	Contacta con nosotros	\N	\N	\N	2026-02-07 01:03:11.264+00	2026-01-21 18:45:57.435+00	\N	\N	\N	\N
1	Carta	carta	62	Carta	Gastronomía	\N	\N	2026-02-07 01:43:17.444+00	2026-01-21 18:41:37.247+00	\N	\N	\N	\N
2	Menús	menus	27	Elige un menú	\N	\N	\N	2026-02-09 19:11:34.413+00	2026-01-21 18:43:53.214+00	\N	\N	\N	\N
6	Espacios	espacios	63	Rincones en restaurante Warynessy	Espacios únicos	Espacios únicos 	Cada rincón de Warynessy ha sido diseñado para crear la atmósfera perfecta. Descubre donde la gastronomía se encuentra con el confort en un entorno incomparable.	2026-02-09 23:14:41.127+00	2026-02-04 17:00:10.732+00	64	65	66	67
\.


--
-- Data for Name: payload_kv; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_kv (id, key, data) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, usuarios_id, archivos_id, alergenos_id, categorias_id, platos_id, menus_id, espacios_id, banners_id, paginas_id, experiencias_id, menus_grupo_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	20260115_120514_initial	1	2026-01-15 12:07:14.771+00	2026-01-15 12:07:14.77+00
2	dev	-1	2026-02-03 13:05:35.932+00	2026-01-15 12:07:42.87+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
6	collection-archivos	{"editViewType": "default"}	2026-01-15 16:00:45.129+00	2026-01-15 16:00:45.13+00
7	global-configuracion-sitio	{"editViewType": "default"}	2026-01-15 16:08:47.344+00	2026-01-15 16:08:47.346+00
8	nav	{"groups": {"Medios": {"open": true}}}	2026-01-15 16:24:18.69+00	2026-01-15 16:24:17.38+00
9	collection-espacios	{}	2026-01-15 16:24:37.638+00	2026-01-15 16:24:37.638+00
10	collection-banners	{}	2026-01-15 16:24:44.144+00	2026-01-15 16:24:44.144+00
5	global-pagina-inicio	{"fields": {"galeriaInicio": {"collapsed": ["6968eed23b47a6cb2b235245", "6968f0033b47a6cb2b235247"]}}, "editViewType": "default"}	2026-01-15 16:26:12.236+00	2026-01-15 16:00:39.5+00
14	collection-opiniones	{}	2026-01-19 16:53:56.178+00	2026-01-19 16:53:56.178+00
13	collection-espacios	{"editViewType": "default"}	2026-01-20 11:52:15.06+00	2026-01-19 16:53:49.202+00
11	global-configuracion-sitio	{"fields": {"footerLogos": {"collapsed": []}}, "editViewType": "default"}	2026-01-21 17:20:53.134+00	2026-01-19 11:50:31.757+00
2	global-pagina-inicio	{"fields": {"galeriaInicio": {"collapsed": []}}, "editViewType": "default"}	2026-01-21 17:53:52.547+00	2026-01-15 13:36:27.329+00
12	collection-banners	{"sort": "-prioridad", "limit": 10}	2026-01-21 18:04:53.497+00	2026-01-19 16:53:43.227+00
19	collection-experiencias	{"editViewType": "default"}	2026-01-21 18:47:03.965+00	2026-01-21 17:59:10.656+00
16	collection-alergenos	{"sort": "orden", "limit": 10, "editViewType": "default"}	2026-01-26 17:13:29.438+00	2026-01-19 19:13:46.487+00
17	collection-platos	{"sort": "nombre", "limit": 10, "columns": [{"active": true, "accessor": "nombre"}, {"active": true, "accessor": "categoria"}, {"active": true, "accessor": "precio"}, {"active": true, "accessor": "activo"}, {"active": false, "accessor": "id"}, {"active": false, "accessor": "descripcion"}, {"active": false, "accessor": "imagen"}, {"active": true, "accessor": "alergenos"}, {"active": false, "accessor": "destacado"}, {"active": false, "accessor": "orden"}, {"active": false, "accessor": "etiquetas"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}], "editViewType": "default"}	2026-01-26 18:27:10.175+00	2026-01-19 19:13:49.876+00
20	collection-paginas	{"limit": 10, "editViewType": "default"}	2026-01-27 19:57:40.805+00	2026-01-21 18:16:15.604+00
21	collection-paginas-5	{"fields": {"_index-2": {"tabIndex": 0}}}	2026-01-28 17:00:56.745+00	2026-01-28 17:00:54.885+00
22	collection-paginas-3	{"fields": {"_index-2": {"tabIndex": 0}}}	2026-02-07 01:01:50.682+00	2026-02-03 16:39:12.571+00
24	collection-paginas-1	{"fields": {"_index-2": {"tabIndex": 0}}}	2026-02-07 01:43:04.564+00	2026-02-07 01:43:03.771+00
15	collection-categorias	{"sort": "nombre", "limit": 10, "editViewType": "default"}	2026-02-08 20:26:40.06+00	2026-01-19 19:13:43.595+00
23	collection-paginas-6	{"fields": {"_index-2": {"tabIndex": 0}}}	2026-02-09 23:14:14.263+00	2026-02-04 18:57:13.575+00
1	collection-usuarios	{"limit": 10, "editViewType": "default"}	2026-02-10 11:33:14.112+00	2026-01-15 13:35:01.283+00
18	collection-menus	{"sort": "orden", "limit": 25, "columns": [{"active": true, "accessor": "nombre"}, {"active": true, "accessor": "precio"}, {"active": true, "accessor": "activo"}, {"active": false, "accessor": "id"}, {"active": false, "accessor": "slug"}, {"active": false, "accessor": "imagen"}, {"active": false, "accessor": "fechasDias"}, {"active": false, "accessor": "fechaInicio"}, {"active": false, "accessor": "fechaFin"}, {"active": false, "accessor": "descripcion"}, {"active": false, "accessor": "pdf"}, {"active": false, "accessor": "destacado"}, {"active": true, "accessor": "orden"}, {"active": false, "accessor": "diasSemana"}, {"active": false, "accessor": "horario"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}], "editViewType": "default"}	2026-02-11 14:55:27.189+00	2026-01-19 19:13:54.664+00
25	collection-menus-grupo	{"sort": "orden", "limit": 10}	2026-02-12 10:02:56.547+00	2026-02-09 17:37:20.865+00
4	nav	{"open": true, "groups": {"Carta": {"open": true}, "Medios": {"open": true}}}	2026-02-12 20:03:16.325+00	2026-01-15 13:42:11.6+00
3	collection-archivos	{"sort": "-updatedAt", "limit": 10, "editViewType": "default"}	2026-02-13 11:53:01.617+00	2026-01-15 13:36:57.012+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, usuarios_id) FROM stdin;
14	\N	6	user	2
15	\N	7	user	2
17	\N	8	user	2
18	\N	9	user	2
19	\N	10	user	2
20	\N	5	user	2
32	\N	14	user	1
40	\N	13	user	1
45	\N	11	user	1
47	\N	2	user	1
49	\N	12	user	1
52	\N	19	user	1
60	\N	16	user	1
61	\N	17	user	1
65	\N	20	user	1
67	\N	21	user	1
76	\N	22	user	1
78	\N	24	user	1
80	\N	15	user	1
95	\N	23	user	1
98	\N	1	user	1
101	\N	18	user	1
102	\N	25	user	1
109	\N	4	user	1
110	\N	3	user	1
\.


--
-- Data for Name: platos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.platos (id, nombre, descripcion, precio, imagen_id, categoria_id, activo, destacado, orden, updated_at, created_at) FROM stdin;
1	Jamón Ibérico de Bellota	Jamón ibérico de bellota cortado a cuchillo con pan con tomate	28	\N	1	t	t	1	2026-01-15 12:07:43+00	2026-01-15 12:07:43+00
2	Croquetas de Jamón	Croquetas caseras de jamón ibérico (6 unidades)	14	\N	1	t	f	2	2026-01-15 12:07:43.005+00	2026-01-15 12:07:43.005+00
3	Ensalada de Burrata	Burrata fresca con tomate cherry, rúcula y reducción de módena	16	\N	1	t	f	3	2026-01-15 12:07:43.01+00	2026-01-15 12:07:43.01+00
6	Lubina a la Espalda	Lubina salvaje a la espalda con verduras de temporada	28	\N	3	t	f	1	2026-02-09 11:56:30.138+00	2026-01-15 12:07:43.02+00
47	Huevo de oca sobre mousse de hongos, foie fresco y trufa		23	\N	9	t	t	35	2026-02-14 00:52:41.306+00	2026-01-21 19:45:04.058+00
253	The Orange Republic	Vino blanco de la IGP Castilla y León elaborado con Godello por Casa Rojo.	20	121	34	t	f	0	2026-02-14 10:00:35.443+00	2026-02-14 10:00:35.443+00
106	Burger de vacuno	Carne 200gr, salsa de huesos, huevo frito, rúcula y patatas bastón.	13.5	\N	16	t	f	94	2026-02-09 11:59:11.598+00	2026-01-21 19:45:04.217+00
17	Jamón ibérico de bellota (ración)		16	\N	6	t	f	5	2026-01-21 19:45:03.963+00	2026-01-21 19:45:03.963+00
18	Jamón ibérico de bellota (doble)		22.5	\N	6	t	f	6	2026-01-21 19:45:03.967+00	2026-01-21 19:45:03.967+00
24	Mollejas de cordero salteadas con ajetes tiernos (unidad)		13.2	\N	6	t	f	12	2026-01-21 19:45:03.982+00	2026-01-21 19:45:03.982+00
25	Mollejas de cordero salteadas con ajetes tiernos (doble)		18.7	\N	6	t	f	13	2026-01-21 19:45:03.984+00	2026-01-21 19:45:03.984+00
204	Venta del Puerto No 12	Tempranillo, Cabernet, Merlot y Syrah. Bodega Vinos de la Viña.	20	\N	27	t	f	24	2026-02-11 14:26:49.696+00	2026-02-10 17:48:46.277+00
208	Valtosca 2023. Vino de parcela shiraz	Shyraz 100% Jumilla. Bodega Casa Castillo.	35	\N	28	t	f	28	2026-02-11 14:29:07.643+00	2026-02-10 17:48:47.234+00
209	Casa castillo el Molar. 2021	100% Garnacha. La expresión de la garnacha del mediterráneo.Jumilla. Bodega Casa Castillo.	30	\N	28	t	f	29	2026-02-11 14:30:30.368+00	2026-02-10 17:48:47.421+00
211	Machoman Monastrell	Monastrell 100%. Bdg Casa Rojo.	35	\N	28	t	f	31	2026-02-11 14:31:40.042+00	2026-02-10 17:48:47.818+00
26	Pad thai. Noodles salteados con gambas y verduras		12.5	\N	6	t	f	14	2026-02-11 15:21:22.654+00	2026-01-21 19:45:03.986+00
19	Anchoa en salmuera con tomate (unidad)		2.8	\N	6	t	f	7	2026-01-26 18:21:59.748+00	2026-01-21 19:45:03.969+00
20	Carpaccio de picaña con parmesano y aceite de nueces		15.5	\N	6	t	f	8	2026-01-26 18:24:39.185+00	2026-01-21 19:45:03.972+00
13	Sepia tártara		10	\N	6	t	f	1	2026-01-26 18:26:05.373+00	2026-01-21 19:45:03.953+00
16	Tomate de temporada con capellán a la llama y encurtidos		13	\N	6	t	f	4	2026-01-26 18:27:50.156+00	2026-01-21 19:45:03.961+00
21	Foie micuit caramelizado con Pedro Ximénez		21.5	\N	6	t	f	9	2026-01-26 18:32:48.74+00	2026-01-21 19:45:03.974+00
23	Queso frito con confitura de tomate (doble)		10.8	\N	6	t	f	11	2026-01-26 18:37:31.308+00	2026-01-21 19:45:03.979+00
22	Queso frito con confitura de tomate (ración)		8	\N	6	t	f	10	2026-01-26 18:37:46.098+00	2026-01-21 19:45:03.977+00
27	Gyozas de pollo con verduras (4 unidades)		8.2	\N	6	t	f	15	2026-01-26 19:10:54.752+00	2026-01-21 19:45:03.989+00
28	Croqueta casera de gamba (unidad)		2.6	\N	6	t	f	16	2026-01-26 19:11:29.197+00	2026-01-21 19:45:03.991+00
30	Croqueta de boletus con salsa de trufa (unidad)		2.5	\N	6	t	f	18	2026-01-26 19:12:27.528+00	2026-01-21 19:45:03.996+00
32	Tartar de salmón marinado y aguacate		16.9	\N	7	t	f	20	2026-01-26 19:13:24.897+00	2026-01-21 19:45:04+00
33	Tartar de atún rojo Balfegó y mango		21	\N	7	t	f	21	2026-01-26 19:14:17.4+00	2026-01-21 19:45:04.002+00
34	Tataki de atún rojo Balfegó		19.9	\N	7	t	f	22	2026-01-26 19:15:08.605+00	2026-01-21 19:45:04.005+00
35	Zamburiñas (unidad)		2.8	\N	7	t	f	23	2026-01-26 19:16:52.65+00	2026-01-21 19:45:04.007+00
37	Calamares a la romana con mayonesa (doble)		14	\N	7	t	f	25	2026-01-26 19:17:37.506+00	2026-01-21 19:45:04.011+00
38	Calamares a la romana con mayonesa (ración)		8.6	\N	7	t	f	26	2026-01-26 19:17:51.511+00	2026-01-21 19:45:04.015+00
39	Gambas al ajillo		18.9	\N	7	t	f	27	2026-01-26 19:18:36.879+00	2026-01-21 19:45:04.018+00
40	Gambón crujiente frito (unidad)		2.6	\N	7	t	f	28	2026-01-26 19:18:59.223+00	2026-01-21 19:45:04.02+00
41	Pulpo a la parrilla con salsa verde		16	\N	7	t	f	29	2026-01-26 19:19:15.443+00	2026-01-21 19:45:04.022+00
42	Chipirones a la parrilla con salsa verde (doble)		14	\N	7	t	f	30	2026-01-26 19:19:31.144+00	2026-01-21 19:45:04.024+00
43	Chipirones a la parrilla con salsa verde (ración)		8.6	\N	7	t	f	31	2026-01-26 19:19:41.586+00	2026-01-21 19:45:04.026+00
44	Fritura de chipirones con mayonesa negra		14.2	\N	7	t	f	32	2026-01-26 19:20:08.84+00	2026-01-21 19:45:04.051+00
45	Berenjena asada, salsa de tomate, crema de queso feta, piñones y aceite de albahaca		18	\N	8	t	f	33	2026-01-26 19:22:20.424+00	2026-01-21 19:45:04.053+00
46	Parrillada de verduras	Berenjena, calabacín, cebolla, tomate, champiñón, etc.	12	\N	8	t	f	34	2026-01-26 19:22:41.431+00	2026-01-21 19:45:04.056+00
48	Patatas al montón con jamón gran reserva, huevo frito y pimientos del padrón		14.5	\N	9	t	f	36	2026-01-26 19:23:15.785+00	2026-01-21 19:45:04.061+00
49	Huevo a 65º, boletus, ajetes tiernos, puré de patata y trufa		18.8	\N	9	t	f	37	2026-01-26 19:23:34.763+00	2026-01-21 19:45:04.064+00
50	Huevo a 65º, patatas, jamón ibérico y foie fresco		18.5	\N	9	t	f	38	2026-01-26 19:24:01.066+00	2026-01-21 19:45:04.067+00
55	Relleno villenero		12.5	\N	11	t	f	43	2026-02-03 17:34:39.962+00	2026-01-21 19:45:04.079+00
56	Degustación de relleno villenero		6.5	\N	11	t	f	44	2026-02-03 17:38:14.416+00	2026-01-21 19:45:04.082+00
57	Triguico villenero		14	\N	11	t	f	45	2026-02-03 17:43:02.387+00	2026-01-21 19:45:04.085+00
60	Degustación gazpacho villenero con caracoles		10.5	\N	11	t	f	48	2026-02-08 20:02:52.754+00	2026-01-21 19:45:04.092+00
59	Gazpacho villenero con caracoles		16.5	\N	11	t	f	47	2026-02-08 20:03:22.556+00	2026-01-21 19:45:04.089+00
61	Arroz de verduras		15.5	\N	12	t	f	49	2026-02-08 20:04:31.245+00	2026-01-21 19:45:04.094+00
62	Arroz de marisco y pescado		19.5	\N	12	t	f	50	2026-02-08 20:05:34.332+00	2026-01-21 19:45:04.096+00
63	Arroz de bacalao, gambón y coliflor		17	\N	12	t	f	51	2026-02-08 20:06:40.284+00	2026-01-21 19:45:04.099+00
64	Arroz a banda		15.5	\N	12	t	f	52	2026-02-08 20:07:19.222+00	2026-01-21 19:45:04.101+00
65	Arroz de magro y verduras		15.5	\N	12	t	f	53	2026-02-08 20:07:35.775+00	2026-01-21 19:45:04.104+00
66	Arroz negro de pescado		15.5	\N	12	t	f	54	2026-02-08 20:08:10.851+00	2026-01-21 19:45:04.106+00
67	Arroz y pata		17.5	\N	12	t	f	55	2026-02-08 20:08:53.518+00	2026-01-21 19:45:04.109+00
68	Arroz con conejo y caracoles		15.8	\N	12	t	f	56	2026-02-08 20:09:16.362+00	2026-01-21 19:45:04.112+00
14	Ensalada alicantina de salazones (ración)		14.5	\N	6	t	f	2	2026-02-09 11:27:41.746+00	2026-01-21 19:45:03.956+00
15	Ensalada alicantina de salazones (doble)		22	\N	6	t	f	3	2026-02-09 11:28:02.155+00	2026-01-21 19:45:03.959+00
51	Ensalada mediterránea	Lechuga, tomate, aceitunas, atún, huevo, maíz, espárragos, piparra dulce.	11	\N	10	t	f	39	2026-02-09 11:43:25.827+00	2026-01-21 19:45:04.069+00
52	¡Super Fresh! Ensalada	Mango, queso parmesano, calabacín, etc.	13.5	\N	10	t	f	40	2026-02-09 11:45:08.479+00	2026-01-21 19:45:04.071+00
54	Ensalada de la huerta	Lechuga, tomate, aceitunas, pimiento, etc.	8.5	\N	10	t	f	42	2026-02-09 11:46:06.905+00	2026-01-21 19:45:04.076+00
96	Completo	Atún, mayonesa y aceitunas rellenas.	3	\N	14	t	f	84	2026-02-09 11:58:09.614+00	2026-01-21 19:45:04.19+00
101	Warynessy	Lomo, tomate, salsa verde.	3	\N	14	t	f	89	2026-02-09 11:58:24.869+00	2026-01-21 19:45:04.204+00
105	Burger gourmet	Carne 200gr, salsa de huesos, foie fresco, rúcula y patatas.	16.5	\N	16	t	f	93	2026-02-09 11:58:55.439+00	2026-01-21 19:45:04.214+00
130	La Mujer Caballo	Moscatel romano. Vino Orange (naranja) Larga maceración y crianza. Filoxera y Cia.	32	107	19	t	f	118	2026-02-12 18:50:04.283+00	2026-01-21 19:45:04.283+00
73	Entrecot de ternera a la parrilla con patatas		24	\N	2	t	f	61	2026-01-21 19:45:04.124+00	2026-01-21 19:45:04.124+00
74	Entrecot raza angus (EEUU) con patatas		36	\N	2	t	f	62	2026-01-21 19:45:04.126+00	2026-01-21 19:45:04.126+00
125	Arrocero	Blanco semidulce con uvas moscatel, Sauvignon Blanc y Macabeo. Bodega las Virtudes.	10	\N	18	t	f	113	2026-02-10 19:15:10.341+00	2026-01-21 19:45:04.27+00
128	Marina Alta	Moscatel de la Marina. Fresco y ligero. Bodega Bocopa.	12	\N	18	t	f	116	2026-02-10 19:15:46.081+00	2026-01-21 19:45:04.278+00
129	Beberás de la copa de tu hermana	Macabeo, malvasía y otras.. Filoxera y Cia.	17	\N	19	t	f	117	2026-02-10 19:16:12.418+00	2026-01-21 19:45:04.28+00
132	Granbazán etq. verde	Albariño. Destaca su acidez y frescura. Bodega Granbazán.	21	\N	20	t	f	120	2026-02-10 19:17:03.301+00	2026-01-21 19:45:04.289+00
81	Secreto con ajetes tiernos, pimientos del padrón y patatas al montón		14	\N	2	t	f	69	2026-01-21 19:45:04.143+00	2026-01-21 19:45:04.143+00
138	José Pariente	Verdejo. Bodega José Pariente.	18	\N	21	t	f	126	2026-02-10 19:19:10.751+00	2026-01-21 19:45:04.307+00
139	El Gordo del Circo	Verdejo. Bodega Casa Rojo.	25	\N	21	t	f	127	2026-02-10 19:19:32.521+00	2026-01-21 19:45:04.31+00
181	Patojo ecológico roble	Monastrel. Ecológico potente y afinado. Bodega las Virtudes.	15	\N	26	t	f	1	2026-02-10 19:37:16.673+00	2026-02-10 17:48:41.434+00
120	Helado de vainilla con caramelo		3.8	\N	5	t	f	108	2026-02-12 09:37:29.519+00	2026-01-21 19:45:04.256+00
134	Lías de Martín Codax	Albariño. Redondez y expresión. Bodega Martín Codax.	30	108	20	t	f	122	2026-02-12 18:51:54.44+00	2026-01-21 19:45:04.294+00
135	Marieta semi-seco	Albariño. Fresco y fácil de beber. Bodega Martín Codax.	16	110	20	t	f	123	2026-02-12 18:52:34.036+00	2026-01-21 19:45:04.297+00
79	Chuletón de vacuno mayor selecto. 1 kg.	Peso de 800 a 1,200 gr.	49	\N	2	t	f	67	2026-02-15 10:55:46.058+00	2026-01-21 19:45:04.138+00
174	Parpatana de atún Balfegó con titaina. 100gr.	Peso de 190 a 280 gr.  80€ kg.	8	\N	3	t	f	0	2026-02-15 10:59:01.269+00	2026-02-08 20:23:28.731+00
140	Yzaguirre Blanco		3.2	\N	22	t	f	128	2026-01-21 19:45:04.313+00	2026-01-21 19:45:04.313+00
141	Yzaguirre rojo		3.2	\N	22	t	f	129	2026-01-21 19:45:04.316+00	2026-01-21 19:45:04.316+00
70	Arroz meloso de rape y gambas		19	\N	13	t	f	58	2026-02-08 20:10:51.492+00	2026-01-21 19:45:04.116+00
71	Arroz meloso del señoret		17	\N	13	t	f	59	2026-02-08 20:11:39.376+00	2026-01-21 19:45:04.119+00
72	Rissoto de setas de temporada		15	\N	13	t	f	60	2026-02-08 20:13:10.111+00	2026-01-21 19:45:04.121+00
80	Rabo de vaca al vino tinto		18	\N	2	t	f	68	2026-02-08 20:16:39.509+00	2026-01-21 19:45:04.141+00
82	Jarrete de cordero glaseado con cremoso de puré de patata		22	\N	2	t	f	70	2026-02-08 20:17:07.353+00	2026-01-21 19:45:04.146+00
84	Rodaballo a la parrilla con verduritas asadas.		25	\N	3	t	f	72	2026-02-08 20:19:26.924+00	2026-01-21 19:45:04.152+00
85	Lubina trufada con gambitas y almejas		30	\N	3	t	f	73	2026-02-08 20:20:21.407+00	2026-01-21 19:45:04.154+00
87	Lomo de bacalao Giraldo gratinado con alioli y pisto de verdura		26	\N	3	t	f	75	2026-02-08 20:21:31.514+00	2026-01-21 19:45:04.159+00
88	Tempura de dorada, rúcula, salsa tártara y tomatitos cherry		18	\N	3	t	f	76	2026-02-08 20:24:09.07+00	2026-01-21 19:45:04.168+00
89	Salmón teriyaki con arroz basmati, espinacas salteadas y edamame		18	\N	3	t	f	77	2026-02-08 20:24:50.38+00	2026-01-21 19:45:04.171+00
90	Ternera a la salsa roquefort		4.1	\N	14	t	f	78	2026-02-09 10:40:27.69+00	2026-01-21 19:45:04.173+00
91	Pepito de ternera		3.6	\N	14	t	f	79	2026-02-09 10:40:56.829+00	2026-01-21 19:45:04.175+00
92	Ternera con foie micuit		5.1	\N	14	t	f	80	2026-02-09 10:41:16.347+00	2026-01-21 19:45:04.178+00
93	Salmón marinado con mantequilla		3.5	\N	14	t	f	81	2026-02-09 10:41:46.738+00	2026-01-21 19:45:04.181+00
94	Queso fresco con gambas y salsa de anchoas		4.9	\N	14	t	f	82	2026-02-09 10:43:51.598+00	2026-01-21 19:45:04.185+00
95	Jamón ibérico de bellota		4.1	\N	14	t	f	83	2026-02-09 10:44:10.748+00	2026-01-21 19:45:04.188+00
97	Mojama de almadraba con rodaja de tomate		3.4	\N	14	t	f	85	2026-02-09 10:45:00.657+00	2026-01-21 19:45:04.192+00
98	Hueva de maruca con rodaja de tomate		3.6	\N	14	t	f	86	2026-02-09 10:45:19.923+00	2026-01-21 19:45:04.195+00
99	Anchoas en salmuera con rodaja de tomate		5.4	\N	14	t	f	87	2026-02-09 10:45:42.781+00	2026-01-21 19:45:04.198+00
100	Bacon con queso fundido		2.9	\N	14	t	f	88	2026-02-09 10:46:01.331+00	2026-01-21 19:45:04.201+00
102	Chipirón con pisto de verduras		6.2	\N	15	t	f	90	2026-02-09 10:46:53.754+00	2026-01-21 19:45:04.207+00
103	Ternera con jamón ibérico		7.8	\N	15	t	f	91	2026-02-09 10:49:20.533+00	2026-01-21 19:45:04.209+00
104	Ternera, queso de cabra y champiñón		6.7	\N	15	t	f	92	2026-02-09 10:49:37.998+00	2026-01-21 19:45:04.211+00
107	Pollo confitado, queso brie, tomate y salsa de curry		11.5	\N	17	t	f	95	2026-02-09 10:51:10.864+00	2026-01-21 19:45:04.22+00
108	Anchoas en salmuera con tomate rallado y piparra dulce		13.5	\N	17	t	f	96	2026-02-09 10:51:34.497+00	2026-01-21 19:45:04.223+00
109	Mojama de almadraba y hueva de maruca con tomate rallado y aceite de oliva		13.5	\N	17	t	f	97	2026-02-09 10:52:16.862+00	2026-01-21 19:45:04.226+00
110	Jamón ibérico de bellota con tomate rallado y aceite de oliva		14.8	\N	17	t	f	98	2026-02-09 10:52:34.477+00	2026-01-21 19:45:04.229+00
111	Pan de Calatrava		5.5	\N	5	t	f	99	2026-02-09 10:53:02.774+00	2026-01-21 19:45:04.231+00
112	Profiteroles de nata con cobertura de chocolate negro		6.5	\N	5	t	f	100	2026-02-09 10:53:28.755+00	2026-01-21 19:45:04.234+00
113	Tarta de queso con arándanos		7	\N	5	t	f	101	2026-02-09 10:54:33.401+00	2026-01-21 19:45:04.237+00
114	Crema tostada		5.5	\N	5	t	f	102	2026-02-09 10:54:51.439+00	2026-01-21 19:45:04.24+00
115	Tiramisú		7	\N	5	t	f	103	2026-02-09 10:55:16.061+00	2026-01-21 19:45:04.242+00
116	Flan de huevo de la abuela Maruja con quenelle de nata		5.5	\N	5	t	f	104	2026-02-09 10:55:41.758+00	2026-01-21 19:45:04.245+00
117	Brownie de chocolate y nueces con helado de vainilla		7	\N	5	t	f	105	2026-02-09 10:56:13.072+00	2026-01-21 19:45:04.248+00
119	Torrijas, natillas y helado de vainilla y chocolate		8	\N	5	t	f	107	2026-02-09 10:58:35.893+00	2026-01-21 19:45:04.254+00
121	Helado de chocolate		4.5	\N	5	t	f	109	2026-02-09 11:02:43.152+00	2026-01-21 19:45:04.258+00
122	Helado de turrón con almendras		5	\N	5	t	f	110	2026-02-09 11:25:39.859+00	2026-01-21 19:45:04.261+00
75	Solomillo de ternera a la parrilla con patatas		26	\N	2	t	f	63	2026-02-09 11:51:32.466+00	2026-01-21 19:45:04.129+00
76	Solomillo de ternera al estilo Villena		27.5	\N	2	t	f	64	2026-02-09 11:51:45.789+00	2026-01-21 19:45:04.131+00
78	Solomillo de ternera, salsa demi glace de ternera y foie fresco		31	\N	2	t	f	66	2026-02-09 11:51:55.107+00	2026-01-21 19:45:04.136+00
77	Solomillo de ternera, salsa de vino tinto, trufa y boletus		33	\N	2	t	f	65	2026-02-09 11:52:06.229+00	2026-01-21 19:45:04.133+00
142	Martini rojo		3.2	\N	22	t	f	130	2026-01-21 19:45:04.319+00	2026-01-21 19:45:04.319+00
143	Martini blanco Dry		3.5	\N	22	t	f	131	2026-01-21 19:45:04.322+00	2026-01-21 19:45:04.322+00
144	Martini blanco		3.2	\N	22	t	f	132	2026-01-21 19:45:04.324+00	2026-01-21 19:45:04.324+00
145	El Bandarra		3.5	\N	22	t	f	133	2026-01-21 19:45:04.33+00	2026-01-21 19:45:04.33+00
146	Lustau Blanco		3.5	\N	22	t	f	134	2026-01-21 19:45:04.332+00	2026-01-21 19:45:04.332+00
147	Lustau Rojo		3.5	\N	22	t	f	135	2026-01-21 19:45:04.335+00	2026-01-21 19:45:04.335+00
148	El Águila sin filtrar		3	\N	23	t	f	136	2026-01-21 19:45:04.338+00	2026-01-21 19:45:04.338+00
149	Mahou tostada 00		3	\N	23	t	f	137	2026-01-21 19:45:04.341+00	2026-01-21 19:45:04.341+00
150	Mahou Maestra		3	\N	23	t	f	138	2026-01-21 19:45:04.343+00	2026-01-21 19:45:04.343+00
151	Mahou Sin Gluten		2.8	\N	23	t	f	139	2026-01-21 19:45:04.346+00	2026-01-21 19:45:04.346+00
152	Mahou 5 estrellas		2.7	\N	23	t	f	140	2026-01-21 19:45:04.349+00	2026-01-21 19:45:04.349+00
153	Estrella de Galicia 00		2.8	\N	23	t	f	141	2026-01-21 19:45:04.351+00	2026-01-21 19:45:04.351+00
154	Estrella de Galicia		2.7	\N	23	t	f	142	2026-01-21 19:45:04.354+00	2026-01-21 19:45:04.354+00
155	El Aguila Dorada		2.5	\N	23	t	f	143	2026-01-21 19:45:04.356+00	2026-01-21 19:45:04.356+00
156	Voll Damm		3	\N	23	t	f	144	2026-01-21 19:45:04.359+00	2026-01-21 19:45:04.359+00
157	Heineken 00		2.8	\N	23	t	f	145	2026-01-21 19:45:04.362+00	2026-01-21 19:45:04.362+00
158	Heineken		2.8	\N	23	t	f	146	2026-01-21 19:45:04.364+00	2026-01-21 19:45:04.364+00
159	Amstel Oro Sin 00		2.7	\N	23	t	f	147	2026-01-21 19:45:04.367+00	2026-01-21 19:45:04.367+00
160	Amstel Radler		2.6	\N	23	t	f	148	2026-01-21 19:45:04.37+00	2026-01-21 19:45:04.37+00
161	Benjamín Codorniu		5.5	\N	24	t	f	149	2026-01-21 19:45:04.373+00	2026-01-21 19:45:04.373+00
162	Anna de Codorniu. Brut nature		16	\N	24	t	f	150	2026-01-21 19:45:04.376+00	2026-01-21 19:45:04.376+00
163	Aria. Segura Viudas. Brut nature		13	\N	24	t	f	151	2026-01-21 19:45:04.379+00	2026-01-21 19:45:04.379+00
164	Juve & Camps. Reserva de la familia		25	\N	24	t	f	152	2026-01-21 19:45:04.381+00	2026-01-21 19:45:04.381+00
165	Domino de la Vega. Authentique brut nature reserva		18	\N	24	t	f	153	2026-01-21 19:45:04.384+00	2026-01-21 19:45:04.384+00
166	Gramona III lustros		60	\N	24	t	f	154	2026-01-21 19:45:04.387+00	2026-01-21 19:45:04.387+00
167	Gramona Imperial. Gran reserva brut		40	\N	24	t	f	155	2026-01-21 19:45:04.389+00	2026-01-21 19:45:04.389+00
168	Fuego Lento. Rosado		30	\N	24	t	f	156	2026-01-21 19:45:04.391+00	2026-01-21 19:45:04.391+00
169	Fuego Lento Blanco. Catavino		7	\N	25	t	f	157	2026-01-21 19:45:04.394+00	2026-01-21 19:45:04.394+00
170	Fuego Lento Tinto. Catavino		7	\N	25	t	f	158	2026-01-21 19:45:04.397+00	2026-01-21 19:45:04.397+00
171	Fondillón Tesoro de Villena. Catavino		10	\N	25	t	f	159	2026-01-21 19:45:04.4+00	2026-01-21 19:45:04.4+00
29	Croqueta casera de rabo de toro con salsa wakame (unidad)		2.6	\N	6	t	f	17	2026-01-26 19:12:04.776+00	2026-01-21 19:45:03.994+00
12	Ensaladilla rusa de la casa		7	\N	6	t	f	0	2026-02-10 14:18:53.06+00	2026-01-21 19:45:03.95+00
58	Degustación de triguico villenero		9	\N	11	t	f	46	2026-02-08 20:00:09.908+00	2026-01-21 19:45:04.087+00
69	Arroz meloso de bogabante con almejas		22	\N	13	t	f	57	2026-02-08 20:10:17.895+00	2026-01-21 19:45:04.114+00
172	Paletilla de cabrito asada al horno.	\N	29	\N	2	t	f	0	2026-02-08 20:16:19.593+00	2026-02-08 20:16:19.593+00
173	Costilla de vaca asada a baja temperatura lacada con salsa de vino.	\N	26	\N	2	t	f	0	2026-02-08 20:17:49.021+00	2026-02-08 20:17:49.021+00
86	Lubina con refrito de ajos, piñones y verduritas asadas		22	\N	3	t	f	74	2026-02-08 20:21:05.48+00	2026-01-21 19:45:04.156+00
186	La Casica del abuelo	Monastrell, syrah, Petit Verdot. Bodega Casa Balaguer.	15	\N	26	f	f	6	2026-02-13 14:37:28.194+00	2026-02-10 17:48:42.413+00
118	Milhojas de crema con cobertura de chocolate negro y almendras		8	\N	5	t	f	106	2026-02-09 10:56:41.935+00	2026-01-21 19:45:04.251+00
175	Coulant de chocolate negro con helado de vainilla	\N	8	\N	5	t	f	0	2026-02-09 10:58:02.389+00	2026-02-09 10:58:02.389+00
176	Calamar de potera con sobrasada mallorquina y piñones	\N	26	\N	7	t	f	0	2026-02-09 11:31:58.853+00	2026-02-09 11:31:58.852+00
177	Calamar de potera a la parrilla con salsa verde	\N	22	\N	7	t	f	0	2026-02-09 11:32:30.803+00	2026-02-09 11:32:30.802+00
185	La viña de Mateo	Monastrell, Merlot. Bodegas Fco. Gómez.	19	119	26	t	f	5	2026-02-14 00:34:06.127+00	2026-02-10 17:48:42.219+00
254	La garnacha salvaje	Monovarietal (100% Garnacha). Vino fresco, joven y con una marcada expresión frutal.	16	124	31	t	f	0	2026-02-14 11:41:16.445+00	2026-02-14 11:41:16.445+00
180	Alcachofas con foie y reducción de PX	\N	15	\N	8	t	f	0	2026-02-09 11:38:10.388+00	2026-02-09 11:38:10.387+00
179	Alcachofa rellena de pescado y gamba con salsa marinera	\N	9	\N	8	t	t	0	2026-02-09 11:39:30.923+00	2026-02-09 11:37:35.582+00
53	Ensalada de queso de cabra	Brotes de lechuga, queso de cabra, frutos secos.	11.5	\N	10	t	f	41	2026-02-09 11:45:32.612+00	2026-01-21 19:45:04.074+00
83	Codillo asado estilo alemán con puré de patatas		17	\N	2	f	f	71	2026-02-15 13:08:46.319+00	2026-01-21 19:45:04.149+00
203	Sensal 2021	Tintos D.O. Valencia	30	\N	27	t	f	23	2026-02-10 17:48:46.052+00	2026-02-10 17:48:46.052+00
123	Salicornio Malvasia	100% malvasía. Blanco seco, cítrico y aromático. Casa Balaguer	24	\N	18	t	f	111	2026-02-10 19:14:28.408+00	2026-01-21 19:45:04.264+00
182	Casa Ritas	Monastrell. Vino ecológico.Bodega las Virtudes.	13	\N	26	t	f	2	2026-02-10 19:37:33.492+00	2026-02-10 17:48:41.64+00
183	Vinalopó joven	Monastrel. Bodega las Virtudes.	10	\N	26	t	f	3	2026-02-10 19:37:47.473+00	2026-02-10 17:48:41.833+00
184	Fruto Noble. Vino de Finca	Monastrell. Fresco y con caracter.Bodega Fco Gómez.	14	\N	26	t	f	4	2026-02-10 19:38:04.358+00	2026-02-10 17:48:42.025+00
188	Sein 2020	Monastrell, tintorera, shiraz. Bodega Casa Balaguer.	20	\N	26	t	f	8	2026-02-10 19:38:57.597+00	2026-02-10 17:48:42.795+00
189	El Telar. 2019	Monastrell 100%. Vino de parcela. Potente y con identidad.Bodega Casa Balaguer.	32	\N	26	t	f	9	2026-02-10 19:39:33.016+00	2026-02-10 17:48:42.994+00
191	Tarima Hill. 12 meses	Monastrell. Bodegas Volver.	20	\N	26	t	f	11	2026-02-10 19:40:07.316+00	2026-02-10 17:48:43.382+00
193	Fuego Lento 2013	Monastrell, shiraz. Complejidad y evolución. Bodegas Fuego Lento.	35	\N	26	t	f	13	2026-02-10 19:40:38.342+00	2026-02-10 17:48:43.948+00
194	Fuego Lento Secano Extremo	Monastrell. Fruta y expresión. Bodegas Fuego Lento.	20	\N	26	t	f	14	2026-02-10 19:40:51.025+00	2026-02-10 17:48:44.144+00
195	Umbría Salinas	Monastrell, otras. Bodega Sierra Salinas.	16	\N	26	t	f	15	2026-02-10 19:41:06.618+00	2026-02-10 17:48:44.523+00
197	Enrique Mendoza Cabernet, Monastrell	Potente con cuerpo. Bodega Enrique Mendoza.	19	\N	26	t	f	17	2026-02-10 19:41:31.966+00	2026-02-10 17:48:44.901+00
198	Enrique Mendoza Merlot, Monastrell	Con caracter. Bodega Enrique Mendoza.	19	\N	26	t	f	18	2026-02-10 19:41:43.903+00	2026-02-10 17:48:45.088+00
200	Casa agrícola. Pepe Mendoza	Monastrell, Giró, Alicante Bouchet. Esencia mediterránea. Bodega Pepe Mendoza.	20	\N	26	t	f	20	2026-02-11 14:23:06.671+00	2026-02-10 17:48:45.462+00
201	Sentada sobre la bestia. 2018	Monastrell, Tempranillo, otras.. Filoxera y Cia.	17	\N	27	t	f	21	2026-02-11 14:25:39.876+00	2026-02-10 17:48:45.656+00
202	El cordero y las vírgenes	Coupage monastrell,Garnacha y otras.Filoxera i cia.	35	\N	27	t	f	22	2026-02-11 14:26:04.11+00	2026-02-10 17:48:45.848+00
205	Juan Gil. Plata	(12meses). Jumilla. Bodega Juan Gil State.	22	\N	28	t	f	25	2026-02-11 14:27:27.66+00	2026-02-10 17:48:46.662+00
137	Cyatho Verdejo	100% verdejo. Vino fresco, fácil de beber, ideal para acompañar cualquier aperitivo.Bdg. Fernández de Pierola.	14	105	21	t	f	125	2026-02-12 18:48:37.263+00	2026-01-21 19:45:04.303+00
224	Dominio de Atauta. 2021	Tinta Fina . Bdg. Atauta.	45	\N	29	f	f	44	2026-02-13 14:38:05.562+00	2026-02-10 17:48:50.796+00
231	Ukan 2019	(Rioja Alta). 100 % Tempranillo. Bdg.Ukan.	60	120	30	t	f	51	2026-02-14 00:34:20.313+00	2026-02-10 17:48:52.352+00
36	Quisquilla hervida 100 gr		19	\N	7	t	f	24	2026-02-14 19:13:24.807+00	2026-01-21 19:45:04.009+00
31	Gambas chili-garlic con stracctiatella de burrata y pan de cristal.		18	\N	7	t	f	19	2026-02-14 19:58:26.844+00	2026-01-21 19:45:03.998+00
124	Vinalopo Blanco Sauvignon Blanc	Sauvignon Blanc. Afrutado y suave. Bodega Las Virtudes.	10	\N	18	t	f	112	2026-02-10 19:14:51.943+00	2026-01-21 19:45:04.267+00
126	Fruto noble organic	Suavignon blanc. Afrutado pero seco. Bodega Fco. Gómez.	14	\N	18	t	f	114	2026-02-10 19:15:21.281+00	2026-01-21 19:45:04.272+00
127	Casa Balaguer. Vino de finca	Ecológico y biodinámico. Merseguera, Malvasia, Moscatel,Verdil y Tortosi.Bodega Casa Balaguer.	20	\N	18	t	f	115	2026-02-10 19:15:34.017+00	2026-01-21 19:45:04.274+00
131	Paco & Lola	Albariño. Un albariño con un toque especial. Bodega S.C.V. Arousana.	25	\N	20	t	f	119	2026-02-10 19:16:51.508+00	2026-01-21 19:45:04.286+00
133	Marqués de Vizhoja	Albariño. Un todo terreno para tomar en cualquier momento. Bodega Marqués de Vizhoja.	14	\N	20	t	f	121	2026-02-10 19:17:17.199+00	2026-01-21 19:45:04.291+00
136	Envidia cochina	Albariño.Vino criado en el mar. Bodega Eladio Piñeiro.	45	\N	20	t	f	124	2026-02-10 19:18:01.742+00	2026-01-21 19:45:04.3+00
243	Classica. Hacienda López de Haro Gran Reserva 2013	viura,garnacha blanca y Malvasia. Bodega López de Haro.	55	77	32	t	f	0	2026-02-10 19:23:25.59+00	2026-02-10 19:23:25.59+00
244	Rosado Classica. Hacienda López de Haro Gran Reserva 2009	viura,garnacha blanca y Malvasia. Bodega López de Haro.	55	78	32	t	f	0	2026-02-10 19:27:08.581+00	2026-02-10 19:27:08.581+00
245	 Monasterio de San Miguel.	Albillo mayor. Bodegas Prado de Olmedo.	18	79	33	t	f	0	2026-02-10 19:30:49.584+00	2026-02-10 19:30:49.584+00
246	Monasterio de San Miguel 1940. Crianza.	Albillo mayor. 2019 Crianza 12 meses Bodegas Prado de Olmedo. Mejor vino blanco Ribera Duero.	29	80	33	t	f	0	2026-02-10 19:31:34.323+00	2026-02-10 19:31:34.323+00
248	Sangarida Godello	Godella 100% de la D.O. Bierzo. Bdg. ATTIS	20	81	34	t	f	0	2026-02-10 19:35:09.334+00	2026-02-10 19:35:09.334+00
249	 El canto del cuco ribeiro.	Ribeiro. Treixadura, albariño y godello. Redondo y expresivo. Lagar do meren.	20	82	34	t	f	0	2026-02-10 19:35:48.489+00	2026-02-10 19:35:48.489+00
250	Ondarea Txakoli. 2019	Txakoli. Hondarribi Zuri. Estructura, complejidad y crianza. Bdg Doniene Gorrondiona.	30	83	34	t	f	0	2026-02-10 19:36:32.801+00	2026-02-10 19:36:32.801+00
187	Casa Balaguer	Monastrell, Garnacha, Arcos, Valencia,Tortosí. Sabroso y fácil. Bodega Casa Balaguer.	20	\N	26	t	f	7	2026-02-10 19:38:43.226+00	2026-02-10 17:48:42.605+00
190	Carabibas Vendimia Seleccionada	Añada 2019. Cabernet Sauvignon, merlot y Monastrell. Sierra de Cabreras.	28	75	26	t	f	10	2026-02-10 19:39:48.075+00	2026-02-10 17:48:43.189+00
192	Laudum roble	Monastrell. Carácter mediterráneo. Bodegas Bocopa.	12	\N	26	t	f	12	2026-02-10 19:40:22.031+00	2026-02-10 17:48:43.576+00
196	Mira Salinas	Monastrell, Cabernet Sauvignon y otras. Potencia y elegancia. Bodegas Sierra Salinas.	25	\N	26	t	f	16	2026-02-10 19:41:17.856+00	2026-02-10 17:48:44.712+00
199	Santa Rosa Enrique Mendoza 2020	Cabernet, monastrell, merlot, shiraz. Elegancia y expresión. Bodega Enrique Mendoza.	34	\N	26	t	f	19	2026-02-11 14:19:20.895+00	2026-02-10 17:48:45.275+00
206	Juan Gil. Azul. 2022	Monastrell, cabernet, Shiraz. Jumilla. Bodega Juan Gil State.	40	\N	28	t	f	26	2026-02-11 14:27:54.95+00	2026-02-10 17:48:46.854+00
207	Matas Altas Pie Franco	Monastrell y otras. Jumilla. Bodega Casa Cerrón.	28	\N	28	t	f	27	2026-02-11 14:28:35.708+00	2026-02-10 17:48:47.041+00
210	Casa castillo Las Gravas 2021	Monastrell y Garnacha. Jumilla. Bodega Casa Castillo.	72	\N	28	t	f	30	2026-02-11 14:31:17.93+00	2026-02-10 17:48:47.622+00
213	Tintafina Tempranillo	Tempranillo 100%. Bdg Casa Rojo.	35	\N	29	t	f	33	2026-02-11 14:39:28.74+00	2026-02-10 17:48:48.199+00
214	Finca Resalso	Tempranillo Bodega Emilio Moro.	18	\N	29	t	f	34	2026-02-11 14:40:12.822+00	2026-02-10 17:48:48.392+00
215	Emilio Moro. Crianza	Tempranillo. Bodega Emilio Moro.	32	\N	29	t	f	35	2026-02-11 14:40:37.077+00	2026-02-10 17:48:48.579+00
216	Traslascuestas 8 meses	Tempranillo. Bodegas Traslascuestas.	16	\N	29	t	f	36	2026-02-11 14:41:26.486+00	2026-02-10 17:48:48.768+00
217	Pago de los Capellanes. Roble. 2024	Tempranillo. Bdg. Pago Capellanes.	26	\N	29	t	f	37	2026-02-11 14:41:55.314+00	2026-02-10 17:48:48.959+00
218	Pago de Capellanes «el Nogal» 2019	Tempranillo. Bdg. Pago de los Capellanes.	80	\N	29	t	f	38	2026-02-11 14:42:20.312+00	2026-02-10 17:48:49.154+00
220	Protos Roble	Tempranillo. Bdg. Protos.	15	\N	29	t	f	40	2026-02-11 14:43:10.781+00	2026-02-10 17:48:49.552+00
221	Protos. Crianza	Tempranillo. Bodega Protos.	29	\N	29	t	f	41	2026-02-11 14:43:44.761+00	2026-02-10 17:48:49.757+00
222	Matarromera Crianza	Tempranillo. Bodega Matarromera.	38	\N	29	t	f	42	2026-02-11 14:44:25.376+00	2026-02-10 17:48:50.409+00
223	Pesquera. Crianza	Tempranillo. Bodega Alejandro Fernández.	35	\N	29	t	f	43	2026-02-11 14:44:47.999+00	2026-02-10 17:48:50.601+00
225	Aalto. 2021	Tinta fina. Bdg Aalto.	65	\N	29	t	f	45	2026-02-11 14:46:03.457+00	2026-02-10 17:48:51.177+00
226	Fernández de Pierola Crianza	100% Tempranillo. Vino largo con personalidad. Guisos y carnes.	18	\N	30	t	f	46	2026-02-11 14:47:50.902+00	2026-02-10 17:48:51.364+00
227	Muga	Tempranillo, Garnacha,Graciano. Bodega Muga.	31	\N	30	t	f	47	2026-02-11 14:48:16.081+00	2026-02-10 17:48:51.558+00
228	Nada que ver. 2017	100 % Maturana Tinta. Bdg. Martinez Alesanco.	38	\N	30	t	f	48	2026-02-11 14:48:31.562+00	2026-02-10 17:48:51.749+00
229	Miguel Merino Vitola. 2020	(Rioja Alta). Tempranillo y un toque de Graciano. Bdg Miguel Merino	35	\N	30	t	f	49	2026-02-11 14:48:48.804+00	2026-02-10 17:48:51.939+00
232	Prado de Enea. Gran reserva	(2.000). Rioja. Bodega Muga.	95	\N	30	t	f	52	2026-02-11 14:50:52.638+00	2026-02-10 17:48:52.537+00
233	Marqués de Riscal. Reserva 2020	Tempranillo y Graciano. Bodega M. Riscal.	28	\N	30	t	f	53	2026-02-11 14:51:18.768+00	2026-02-10 17:48:52.723+00
234	Faustino Autor Reserva Especial	Tempranillo y Graciano. . Bodega Faustino.	45	\N	30	t	f	54	2026-02-11 14:51:43.724+00	2026-02-10 17:48:52.909+00
236	Abadía Retuerta. Selección especial 2020	Vinos de Castilla y León. Tempranillo y otras. Bdg Abadia Retuerta.	49	\N	31	t	f	56	2026-02-11 15:24:20.164+00	2026-02-10 17:48:53.287+00
237	Mauro. 2021	Vinos de Castilla y León. Tempranillo y otras. Bdg Mauro.	55	\N	31	t	f	57	2026-02-11 15:24:38.901+00	2026-02-10 17:48:53.477+00
238	San Román. 2018	Toro. Tinta de Toro. Bdg. San Román.	50	\N	31	t	f	58	2026-02-11 15:25:07.154+00	2026-02-10 17:48:53.671+00
239	San Román. 2020	Toro. Tinta de Toro. Bdg. San Román.	45	\N	31	t	f	59	2026-02-11 15:25:30.461+00	2026-02-10 17:48:53.866+00
240	Flor de Vetus	D.O. Toro. 100% tinta de Toro. Bdg. Vetus.	18	\N	31	t	f	60	2026-02-11 15:25:47.843+00	2026-02-10 17:48:54.054+00
242	Pissarres tinto	Priorat . Garnacha y Samson. Bdg. Costers del Priorat.	25	\N	31	t	f	62	2026-02-11 15:26:31.879+00	2026-02-10 17:48:54.427+00
247	Anxo Martín Ribeiro	Treixadura, Albarño y Godello. Untuoso, largo y aromático.	18.5	102	34	t	f	0	2026-02-12 18:46:15.735+00	2026-02-10 19:34:26.413+00
252	FyA Crianza Tinaja	100% Tempranillo. Combinación de tinaja y barrica.Bdg. FYA. Rioja Alavesa.	20	106	30	t	f	0	2026-02-12 18:49:01.505+00	2026-02-11 14:47:32.626+00
219	Pago de Capellanes «el Nogal» 2016. Magnum	Vino de parcela. Tempranillo. . Bdg. Pago de los Capellanes.	160	\N	29	t	f	39	2026-02-11 14:42:52.226+00	2026-02-10 17:48:49.347+00
230	Conde de los Andes. 2016	(Rioja Alta). 100 % Tempranillo. Bdg.Ollaurri.	30	\N	30	t	f	50	2026-02-11 14:49:03.623+00	2026-02-10 17:48:52.122+00
235	Alaya Tierra	Almansa. Garnacha tintorera. Bdg. Atalaya. Juan Gil State.	38	\N	31	t	f	55	2026-02-11 14:51:59.391+00	2026-02-10 17:48:53.095+00
241	Matsu «El Recio». Viñas viejas	D.O. Toro. 100% tinta de Toro. Crianza. Bodegas Matsu	24	\N	31	t	f	61	2026-02-11 15:26:08.575+00	2026-02-10 17:48:54.237+00
251	Avan 12 meses	100% Tinta Fina. Vino sabroso, maduro y equilibrado. Bdg. J.M. Burgos.	22	103	29	t	f	0	2026-02-12 18:47:55.975+00	2026-02-11 14:34:49.628+00
212	Clon-98 Tempranillo	Tempranillo 100%. Bdg Casa Rojo.	20	104	29	t	f	32	2026-02-12 18:48:19.336+00	2026-02-10 17:48:48.011+00
178	Parpatana de atún Balfegó con titaina. 100gr.	Peso de 190 a 280 gr.  80€ kg.	8	\N	7	t	f	0	2026-02-15 10:58:47.568+00	2026-02-09 11:33:48.975+00
\.


--
-- Data for Name: platos_etiquetas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.platos_etiquetas (_order, _parent_id, id, etiqueta) FROM stdin;
1	61	6988ec458af7c402d23217f8	Vegano
1	72	6988ee4fbd2e900a23ab1650	Vegetariano
\.


--
-- Data for Name: platos_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.platos_rels (id, "order", parent_id, path, alergenos_id) FROM stdin;
1	1	2	alergenos	1
2	2	2	alergenos	7
3	3	2	alergenos	3
4	1	3	alergenos	7
24	1	19	alergenos	4
25	2	19	alergenos	12
26	1	20	alergenos	1
27	2	20	alergenos	8
28	3	20	alergenos	7
29	4	20	alergenos	6
33	1	13	alergenos	3
34	2	13	alergenos	13
35	3	13	alergenos	12
40	1	16	alergenos	4
41	2	16	alergenos	12
42	1	21	alergenos	12
43	1	23	alergenos	7
44	1	22	alergenos	7
52	1	27	alergenos	1
53	2	27	alergenos	6
54	1	28	alergenos	2
55	2	28	alergenos	1
56	3	28	alergenos	7
57	4	28	alergenos	3
58	5	28	alergenos	12
59	1	29	alergenos	1
60	2	29	alergenos	3
61	3	29	alergenos	7
62	4	29	alergenos	12
63	1	30	alergenos	1
64	2	30	alergenos	3
65	3	30	alergenos	7
66	4	30	alergenos	12
71	1	32	alergenos	1
72	2	32	alergenos	4
73	3	32	alergenos	6
74	1	33	alergenos	1
75	2	33	alergenos	4
76	3	33	alergenos	6
77	1	34	alergenos	1
78	2	34	alergenos	4
79	3	34	alergenos	6
80	1	35	alergenos	13
83	1	37	alergenos	1
84	2	37	alergenos	3
85	3	37	alergenos	13
86	1	38	alergenos	1
87	2	38	alergenos	3
88	3	38	alergenos	13
89	1	39	alergenos	12
90	2	39	alergenos	2
91	1	40	alergenos	1
92	2	40	alergenos	2
93	3	40	alergenos	3
94	4	40	alergenos	12
95	1	41	alergenos	13
96	1	42	alergenos	13
97	1	43	alergenos	13
98	1	44	alergenos	1
99	2	44	alergenos	3
100	3	44	alergenos	13
101	1	45	alergenos	8
102	2	45	alergenos	7
105	1	48	alergenos	3
106	1	49	alergenos	3
107	2	49	alergenos	7
108	3	49	alergenos	12
109	1	50	alergenos	3
116	1	55	alergenos	9
117	2	55	alergenos	1
118	3	55	alergenos	3
119	4	55	alergenos	12
120	1	56	alergenos	9
121	2	56	alergenos	1
122	3	56	alergenos	3
123	4	56	alergenos	12
124	1	57	alergenos	9
125	2	57	alergenos	1
135	1	58	alergenos	1
136	2	58	alergenos	9
137	1	60	alergenos	1
138	2	60	alergenos	13
139	3	60	alergenos	9
140	1	59	alergenos	1
141	2	59	alergenos	9
142	3	59	alergenos	13
143	1	61	alergenos	9
144	1	62	alergenos	9
145	2	62	alergenos	2
146	3	62	alergenos	13
147	4	62	alergenos	4
148	5	62	alergenos	12
149	1	63	alergenos	9
150	2	63	alergenos	2
151	3	63	alergenos	4
152	4	63	alergenos	12
153	1	64	alergenos	9
154	2	64	alergenos	2
155	3	64	alergenos	13
156	4	64	alergenos	4
157	5	64	alergenos	12
158	1	65	alergenos	9
159	1	66	alergenos	9
160	2	66	alergenos	2
161	3	66	alergenos	13
162	4	66	alergenos	4
163	5	66	alergenos	12
164	1	67	alergenos	9
165	1	68	alergenos	9
166	2	68	alergenos	13
167	1	69	alergenos	9
168	2	69	alergenos	2
169	3	69	alergenos	13
170	4	69	alergenos	4
171	1	70	alergenos	9
172	2	70	alergenos	2
173	3	70	alergenos	4
174	4	70	alergenos	12
175	1	71	alergenos	9
176	2	71	alergenos	2
177	3	71	alergenos	13
178	4	71	alergenos	4
179	5	71	alergenos	12
183	1	72	alergenos	9
184	2	72	alergenos	7
185	3	72	alergenos	12
190	1	172	alergenos	12
191	1	80	alergenos	12
192	1	82	alergenos	7
193	2	82	alergenos	12
194	1	173	alergenos	7
195	2	173	alergenos	12
197	1	84	alergenos	4
199	1	85	alergenos	9
200	2	85	alergenos	2
201	3	85	alergenos	13
202	4	85	alergenos	4
203	1	86	alergenos	8
204	2	86	alergenos	4
205	3	86	alergenos	12
206	1	87	alergenos	3
207	2	87	alergenos	4
209	1	88	alergenos	1
210	2	88	alergenos	3
211	3	88	alergenos	4
212	4	88	alergenos	12
213	1	89	alergenos	1
214	2	89	alergenos	4
215	3	89	alergenos	11
216	4	89	alergenos	6
217	1	90	alergenos	1
218	2	90	alergenos	7
219	3	90	alergenos	12
220	1	91	alergenos	1
221	2	91	alergenos	7
222	1	92	alergenos	1
223	1	93	alergenos	1
224	2	93	alergenos	7
225	3	93	alergenos	4
226	1	94	alergenos	1
227	2	94	alergenos	2
228	3	94	alergenos	3
229	4	94	alergenos	7
230	5	94	alergenos	4
231	1	95	alergenos	1
234	1	97	alergenos	1
235	2	97	alergenos	4
236	1	98	alergenos	1
237	2	98	alergenos	4
238	1	99	alergenos	1
239	2	99	alergenos	4
240	1	100	alergenos	1
241	2	100	alergenos	7
243	1	102	alergenos	1
244	2	102	alergenos	13
245	1	103	alergenos	1
246	1	104	alergenos	1
247	2	104	alergenos	7
256	1	107	alergenos	1
257	2	107	alergenos	7
258	3	107	alergenos	6
259	1	108	alergenos	1
260	2	108	alergenos	4
261	3	108	alergenos	12
262	1	109	alergenos	1
263	2	109	alergenos	4
264	1	110	alergenos	1
265	1	111	alergenos	1
266	2	111	alergenos	8
267	3	111	alergenos	3
268	4	111	alergenos	7
269	1	112	alergenos	1
270	2	112	alergenos	3
271	3	112	alergenos	7
272	1	113	alergenos	1
273	2	113	alergenos	3
274	3	113	alergenos	7
275	1	114	alergenos	3
276	2	114	alergenos	7
277	1	115	alergenos	1
278	2	115	alergenos	3
279	3	115	alergenos	7
280	1	116	alergenos	8
281	2	116	alergenos	1
282	3	116	alergenos	3
283	4	116	alergenos	7
284	1	117	alergenos	8
285	2	117	alergenos	1
286	3	117	alergenos	3
287	4	117	alergenos	7
288	1	118	alergenos	8
289	2	118	alergenos	1
290	3	118	alergenos	3
291	4	118	alergenos	7
292	1	175	alergenos	8
293	2	175	alergenos	1
294	3	175	alergenos	3
295	4	175	alergenos	7
296	1	119	alergenos	8
297	2	119	alergenos	1
298	3	119	alergenos	3
299	4	119	alergenos	7
300	1	121	alergenos	7
301	1	122	alergenos	7
302	2	122	alergenos	8
303	1	14	alergenos	4
304	2	14	alergenos	12
305	1	15	alergenos	4
306	2	15	alergenos	12
307	1	176	alergenos	8
308	2	176	alergenos	13
309	1	177	alergenos	13
317	1	180	alergenos	12
318	1	179	alergenos	2
319	2	179	alergenos	1
320	3	179	alergenos	7
321	4	179	alergenos	4
322	5	179	alergenos	12
323	1	51	alergenos	3
324	2	51	alergenos	4
325	3	51	alergenos	12
327	1	52	alergenos	7
328	1	53	alergenos	8
329	2	53	alergenos	7
330	1	78	alergenos	9
331	2	78	alergenos	12
332	1	77	alergenos	9
333	2	77	alergenos	12
336	1	6	alergenos	4
337	1	96	alergenos	1
338	2	96	alergenos	4
339	1	101	alergenos	1
340	1	105	alergenos	1
341	2	105	alergenos	3
342	3	105	alergenos	7
343	4	105	alergenos	12
344	1	106	alergenos	1
345	2	106	alergenos	3
346	3	106	alergenos	7
347	4	106	alergenos	12
351	1	12	alergenos	3
352	2	12	alergenos	4
353	3	12	alergenos	12
358	1	26	alergenos	9
359	2	26	alergenos	2
360	3	26	alergenos	1
361	4	26	alergenos	4
362	5	26	alergenos	6
363	6	26	alergenos	12
364	1	120	alergenos	7
366	1	47	alergenos	7
367	2	47	alergenos	3
368	1	36	alergenos	12
369	2	36	alergenos	2
370	1	31	alergenos	2
371	2	31	alergenos	1
372	3	31	alergenos	7
373	4	31	alergenos	12
377	1	178	alergenos	4
378	1	174	alergenos	4
379	1	83	alergenos	7
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.usuarios (id, first_name, last_name, role, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
2	Nemesio Juan	Navalón Gómez	admin	2026-02-03 13:02:28.21+00	2026-01-15 13:36:05.876+00	nemesio@nemodigital.net	3ceb7f905ca02bde96e087b8551db862f0fa6860	2026-02-03 14:02:28.173+00	196268fb1bd6f2881e0a8dd0f6f264a32e7aa9d6590742ca00276ba78a9bcc54	311f54cf5bb566b265a569ad6b0ac751d1fb7b07fbaf11034f22d5d6a257f884f66f7bb1ff9e345dcdf62d207f214cf164acbba87751d387feef4284af517b32840bb49ab0e53287a7826e1aa2db6df838acf7432cbd457f900ae3b13db53a74d12845fd3ace3e38f7fe399fd522b493e8b9914d09035a60df0ca8bf1cc8b2dea5d87c38cc99f48e3b2b1556fc42c040e309c21ba54983f731bdecb330efd51340e5112ea2a877411074e624412dc938c211b44022ecf9d6d000a7a05e2f38baa0ff79048f61a87a7473b21d7f1514094efb732be2759c7f6b96df3c81aea97c009ed8db2d09693993a955c38760765f2a01d2dad8fb50fa6607643e809edca96dfa4c187cb07d0b556426823df790b08b1e5e260ce9d61dbd74f384637bb41f52c017282affd2d84dedf2c069f0d3376d071c00cbe431de66d0d03116a97ed47ab45a393b4bdacf8aab131d256c863d99a127372330459a853693356cf93f9b0dfa8c847938164b7ca360f6114cd1296b77a4036e43833cb1accee8ccc4d9f01e4970ff08112cc6d3f019f20b21445afd056605814565aaf686823751ca0647333bec1d396cdbd17bf5d7122c1c7971e837c8463bcdf634c25b6866e61bedda8b3234821d1f61ac2a78d8861c340f45c97256bf1acbbd85d4d7d7578fbebaded66babfe6c6c10b5155a30cc81b742ca8197dde05eb50b43ffbcc41d887a01d5	0	\N
1	Admin	Warynessy	admin	2026-02-03 19:55:26.932+00	2026-01-15 12:07:42.955+00	info@warynessy.com	\N	\N	8d846fcb7f5c125a8e9f5b486489aea87aed93d3e273bff13a8e8e46b4f0f6e0	7b7c19696c3e7ff7c6c048aa110f14aec200e0c3c4855e4c041811dfd051f2bd635b5df3772d6758b5553acc4c3d41c3fb3b859afc46278a9ee56705109631717adf45efce81e779c38a1cc3a421c67dc639e09e64969e50e16f59878b3033e1e7112d5959ae8a32b30a97b05d3e62d27d7cd8d9da749f73d625d580b98eb4045e337e04a786fc6dddbbf07170252e415f4e7765a855eff9f7418a7ebde92329737e19d1e199ba8be4757a115fff2d3404ae31d3b1d913a750ac4bc1f5b3c88037b2f1601944162b8a236de8d534e2c225e6ab7dbd743d1e342ac6e196fab53847ce238dae7fa583d86e445a195639f3bb95bf79b27d22098aa5ec80f89ca91d9800bed5012334c1842dda10214370189e375ae862b34adf046c3484173024cfc42103fe9409c4d35044744cf56cb214eac946c2f6bdacc7340a52aea959cc5ce3ba9b50f88944bfbe7222d85c32466d5e531838c9fc3beea59d0732d07b1cde3ba0fbd436016db336ee7d6f410db46c1535d5392b0ebaf6e4c50651bd9a0784335e21c0f41ff68f1d2930d324f103b85bc0be24c3fe28cdf49116c8bd677b667bf64c125ef6b51cfc721737a08b21a84ccf831827272f433dd7a9b2f344df33d03cb51ad9cb0a713ef74646fcf64254eaabb0d6e525e66669e65cf034ba1f6949ddf673a337e83bcbd9996ba86280d16688822b59b0c6e235131e9fcd0852f7	0	\N
\.


--
-- Data for Name: usuarios_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.usuarios_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	2	c4087ecd-595b-4b45-a6d6-70a1cd9221af	2026-01-15 16:00:33.995+00	2026-01-15 18:00:33.995+00
1	1	1292a425-f8b8-4b7e-9287-1fd3f342e2cf	2026-02-18 12:32:45.616+00	2026-02-18 14:32:45.616+00
\.


--
-- Name: alergenos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alergenos_id_seq', 14, true);


--
-- Name: archivos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.archivos_id_seq', 124, true);


--
-- Name: banners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.banners_id_seq', 1, false);


--
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categorias_id_seq', 35, true);


--
-- Name: configuracion_sitio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.configuracion_sitio_id_seq', 1, true);


--
-- Name: espacios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.espacios_id_seq', 1, false);


--
-- Name: menus_dias_semana_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.menus_dias_semana_id_seq', 233, true);


--
-- Name: menus_grupo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.menus_grupo_id_seq', 2, true);


--
-- Name: menus_grupo_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.menus_grupo_rels_id_seq', 17, true);


--
-- Name: menus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.menus_id_seq', 10, true);


--
-- Name: pagina_inicio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pagina_inicio_id_seq', 1, true);


--
-- Name: pagina_inicio_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pagina_inicio_rels_id_seq', 1, false);


--
-- Name: paginas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.paginas_id_seq', 6, true);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 451, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 866, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 2, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 25, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 110, true);


--
-- Name: platos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.platos_id_seq', 254, true);


--
-- Name: platos_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.platos_rels_id_seq', 379, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);


--
-- Name: alergenos alergenos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alergenos
    ADD CONSTRAINT alergenos_pkey PRIMARY KEY (id);


--
-- Name: archivos archivos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.archivos
    ADD CONSTRAINT archivos_pkey PRIMARY KEY (id);


--
-- Name: banners banners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (id);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: configuracion_sitio_footer_logos configuracion_sitio_footer_logos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuracion_sitio_footer_logos
    ADD CONSTRAINT configuracion_sitio_footer_logos_pkey PRIMARY KEY (id);


--
-- Name: configuracion_sitio_opening_hours configuracion_sitio_opening_hours_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuracion_sitio_opening_hours
    ADD CONSTRAINT configuracion_sitio_opening_hours_pkey PRIMARY KEY (id);


--
-- Name: configuracion_sitio configuracion_sitio_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuracion_sitio
    ADD CONSTRAINT configuracion_sitio_pkey PRIMARY KEY (id);


--
-- Name: espacios_caracteristicas espacios_caracteristicas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.espacios_caracteristicas
    ADD CONSTRAINT espacios_caracteristicas_pkey PRIMARY KEY (id);


--
-- Name: espacios_galeria espacios_galeria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.espacios_galeria
    ADD CONSTRAINT espacios_galeria_pkey PRIMARY KEY (id);


--
-- Name: espacios espacios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.espacios
    ADD CONSTRAINT espacios_pkey PRIMARY KEY (id);


--
-- Name: menus_dias_semana menus_dias_semana_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus_dias_semana
    ADD CONSTRAINT menus_dias_semana_pkey PRIMARY KEY (id);


--
-- Name: menus_grupo menus_grupo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus_grupo
    ADD CONSTRAINT menus_grupo_pkey PRIMARY KEY (id);


--
-- Name: menus_grupo_rels menus_grupo_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus_grupo_rels
    ADD CONSTRAINT menus_grupo_rels_pkey PRIMARY KEY (id);


--
-- Name: menus menus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pkey PRIMARY KEY (id);


--
-- Name: pagina_inicio_galeria_inicio pagina_inicio_galeria_inicio_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_galeria_inicio
    ADD CONSTRAINT pagina_inicio_galeria_inicio_pkey PRIMARY KEY (id);


--
-- Name: pagina_inicio_galeria_regalo pagina_inicio_galeria_regalo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_galeria_regalo
    ADD CONSTRAINT pagina_inicio_galeria_regalo_pkey PRIMARY KEY (id);


--
-- Name: pagina_inicio pagina_inicio_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio
    ADD CONSTRAINT pagina_inicio_pkey PRIMARY KEY (id);


--
-- Name: pagina_inicio_rels pagina_inicio_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_rels
    ADD CONSTRAINT pagina_inicio_rels_pkey PRIMARY KEY (id);


--
-- Name: paginas paginas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.paginas
    ADD CONSTRAINT paginas_pkey PRIMARY KEY (id);


--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: platos_etiquetas platos_etiquetas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platos_etiquetas
    ADD CONSTRAINT platos_etiquetas_pkey PRIMARY KEY (id);


--
-- Name: platos platos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platos
    ADD CONSTRAINT platos_pkey PRIMARY KEY (id);


--
-- Name: platos_rels platos_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platos_rels
    ADD CONSTRAINT platos_rels_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: usuarios_sessions usuarios_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios_sessions
    ADD CONSTRAINT usuarios_sessions_pkey PRIMARY KEY (id);


--
-- Name: alergenos_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alergenos_created_at_idx ON public.alergenos USING btree (created_at);


--
-- Name: alergenos_imagen_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alergenos_imagen_idx ON public.alergenos USING btree (imagen_id);


--
-- Name: alergenos_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX alergenos_updated_at_idx ON public.alergenos USING btree (updated_at);


--
-- Name: archivos_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX archivos_created_at_idx ON public.archivos USING btree (created_at);


--
-- Name: archivos_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX archivos_filename_idx ON public.archivos USING btree (filename);


--
-- Name: archivos_sizes_card_sizes_card_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX archivos_sizes_card_sizes_card_filename_idx ON public.archivos USING btree (sizes_card_filename);


--
-- Name: archivos_sizes_hero_sizes_hero_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX archivos_sizes_hero_sizes_hero_filename_idx ON public.archivos USING btree (sizes_hero_filename);


--
-- Name: archivos_sizes_thumbnail_sizes_thumbnail_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX archivos_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.archivos USING btree (sizes_thumbnail_filename);


--
-- Name: archivos_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX archivos_updated_at_idx ON public.archivos USING btree (updated_at);


--
-- Name: banners_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX banners_created_at_idx ON public.banners USING btree (created_at);


--
-- Name: banners_imagen_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX banners_imagen_idx ON public.banners USING btree (imagen_id);


--
-- Name: banners_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX banners_updated_at_idx ON public.banners USING btree (updated_at);


--
-- Name: categorias_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categorias_created_at_idx ON public.categorias USING btree (created_at);


--
-- Name: categorias_imagen_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categorias_imagen_idx ON public.categorias USING btree (imagen_id);


--
-- Name: categorias_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX categorias_slug_idx ON public.categorias USING btree (slug);


--
-- Name: categorias_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categorias_updated_at_idx ON public.categorias USING btree (updated_at);


--
-- Name: configuracion_sitio_footer_logos_logo_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX configuracion_sitio_footer_logos_logo_idx ON public.configuracion_sitio_footer_logos USING btree (logo_id);


--
-- Name: configuracion_sitio_footer_logos_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX configuracion_sitio_footer_logos_order_idx ON public.configuracion_sitio_footer_logos USING btree (_order);


--
-- Name: configuracion_sitio_footer_logos_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX configuracion_sitio_footer_logos_parent_id_idx ON public.configuracion_sitio_footer_logos USING btree (_parent_id);


--
-- Name: configuracion_sitio_logo_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX configuracion_sitio_logo_idx ON public.configuracion_sitio USING btree (logo_id);


--
-- Name: configuracion_sitio_opening_hours_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX configuracion_sitio_opening_hours_order_idx ON public.configuracion_sitio_opening_hours USING btree (_order);


--
-- Name: configuracion_sitio_opening_hours_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX configuracion_sitio_opening_hours_parent_id_idx ON public.configuracion_sitio_opening_hours USING btree (_parent_id);


--
-- Name: espacios_caracteristicas_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX espacios_caracteristicas_order_idx ON public.espacios_caracteristicas USING btree (_order);


--
-- Name: espacios_caracteristicas_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX espacios_caracteristicas_parent_id_idx ON public.espacios_caracteristicas USING btree (_parent_id);


--
-- Name: espacios_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX espacios_created_at_idx ON public.espacios USING btree (created_at);


--
-- Name: espacios_galeria_imagen_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX espacios_galeria_imagen_idx ON public.espacios_galeria USING btree (imagen_id);


--
-- Name: espacios_galeria_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX espacios_galeria_order_idx ON public.espacios_galeria USING btree (_order);


--
-- Name: espacios_galeria_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX espacios_galeria_parent_id_idx ON public.espacios_galeria USING btree (_parent_id);


--
-- Name: espacios_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX espacios_slug_idx ON public.espacios USING btree (slug);


--
-- Name: espacios_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX espacios_updated_at_idx ON public.espacios USING btree (updated_at);


--
-- Name: menus_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_created_at_idx ON public.menus USING btree (created_at);


--
-- Name: menus_dias_semana_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_dias_semana_order_idx ON public.menus_dias_semana USING btree ("order");


--
-- Name: menus_dias_semana_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_dias_semana_parent_idx ON public.menus_dias_semana USING btree (parent_id);


--
-- Name: menus_grupo_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_grupo_created_at_idx ON public.menus_grupo USING btree (created_at);


--
-- Name: menus_grupo_imagen_portada_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_grupo_imagen_portada_idx ON public.menus_grupo USING btree (imagen_portada_id);


--
-- Name: menus_grupo_orden_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_grupo_orden_idx ON public.menus_grupo USING btree (orden);


--
-- Name: menus_grupo_rels_menus_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_grupo_rels_menus_id_idx ON public.menus_grupo_rels USING btree (menus_id);


--
-- Name: menus_grupo_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_grupo_rels_order_idx ON public.menus_grupo_rels USING btree ("order");


--
-- Name: menus_grupo_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_grupo_rels_parent_idx ON public.menus_grupo_rels USING btree (parent_id);


--
-- Name: menus_grupo_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_grupo_rels_path_idx ON public.menus_grupo_rels USING btree (path);


--
-- Name: menus_imagen_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_imagen_idx ON public.menus USING btree (imagen_id);


--
-- Name: menus_pdf_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_pdf_idx ON public.menus USING btree (pdf_id);


--
-- Name: menus_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX menus_slug_idx ON public.menus USING btree (slug);


--
-- Name: menus_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menus_updated_at_idx ON public.menus USING btree (updated_at);


--
-- Name: pagina_inicio_galeria_inicio_imagen_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_galeria_inicio_imagen_idx ON public.pagina_inicio_galeria_inicio USING btree (imagen_id);


--
-- Name: pagina_inicio_galeria_inicio_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_galeria_inicio_order_idx ON public.pagina_inicio_galeria_inicio USING btree (_order);


--
-- Name: pagina_inicio_galeria_inicio_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_galeria_inicio_parent_id_idx ON public.pagina_inicio_galeria_inicio USING btree (_parent_id);


--
-- Name: pagina_inicio_galeria_regalo_imagen_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_galeria_regalo_imagen_idx ON public.pagina_inicio_galeria_regalo USING btree (imagen_id);


--
-- Name: pagina_inicio_galeria_regalo_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_galeria_regalo_order_idx ON public.pagina_inicio_galeria_regalo USING btree (_order);


--
-- Name: pagina_inicio_galeria_regalo_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_galeria_regalo_parent_id_idx ON public.pagina_inicio_galeria_regalo USING btree (_parent_id);


--
-- Name: pagina_inicio_hero_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_hero_image_idx ON public.pagina_inicio USING btree (hero_image_id);


--
-- Name: pagina_inicio_rels_espacios_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_rels_espacios_id_idx ON public.pagina_inicio_rels USING btree (espacios_id);


--
-- Name: pagina_inicio_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_rels_order_idx ON public.pagina_inicio_rels USING btree ("order");


--
-- Name: pagina_inicio_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_rels_parent_idx ON public.pagina_inicio_rels USING btree (parent_id);


--
-- Name: pagina_inicio_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pagina_inicio_rels_path_idx ON public.pagina_inicio_rels USING btree (path);


--
-- Name: paginas_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX paginas_created_at_idx ON public.paginas USING btree (created_at);


--
-- Name: paginas_hero_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX paginas_hero_image_idx ON public.paginas USING btree (hero_image_id);


--
-- Name: paginas_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX paginas_slug_idx ON public.paginas USING btree (slug);


--
-- Name: paginas_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX paginas_updated_at_idx ON public.paginas USING btree (updated_at);


--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_alergenos_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_alergenos_id_idx ON public.payload_locked_documents_rels USING btree (alergenos_id);


--
-- Name: payload_locked_documents_rels_archivos_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_archivos_id_idx ON public.payload_locked_documents_rels USING btree (archivos_id);


--
-- Name: payload_locked_documents_rels_banners_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_banners_id_idx ON public.payload_locked_documents_rels USING btree (banners_id);


--
-- Name: payload_locked_documents_rels_categorias_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_categorias_id_idx ON public.payload_locked_documents_rels USING btree (categorias_id);


--
-- Name: payload_locked_documents_rels_espacios_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_espacios_id_idx ON public.payload_locked_documents_rels USING btree (espacios_id);


--
-- Name: payload_locked_documents_rels_menus_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_menus_id_idx ON public.payload_locked_documents_rels USING btree (menus_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_paginas_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_paginas_id_idx ON public.payload_locked_documents_rels USING btree (paginas_id);


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_platos_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_platos_id_idx ON public.payload_locked_documents_rels USING btree (platos_id);


--
-- Name: payload_locked_documents_rels_usuarios_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_usuarios_id_idx ON public.payload_locked_documents_rels USING btree (usuarios_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_usuarios_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_usuarios_id_idx ON public.payload_preferences_rels USING btree (usuarios_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: platos_categoria_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX platos_categoria_idx ON public.platos USING btree (categoria_id);


--
-- Name: platos_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX platos_created_at_idx ON public.platos USING btree (created_at);


--
-- Name: platos_etiquetas_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX platos_etiquetas_order_idx ON public.platos_etiquetas USING btree (_order);


--
-- Name: platos_etiquetas_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX platos_etiquetas_parent_id_idx ON public.platos_etiquetas USING btree (_parent_id);


--
-- Name: platos_imagen_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX platos_imagen_idx ON public.platos USING btree (imagen_id);


--
-- Name: platos_rels_alergenos_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX platos_rels_alergenos_id_idx ON public.platos_rels USING btree (alergenos_id);


--
-- Name: platos_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX platos_rels_order_idx ON public.platos_rels USING btree ("order");


--
-- Name: platos_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX platos_rels_parent_idx ON public.platos_rels USING btree (parent_id);


--
-- Name: platos_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX platos_rels_path_idx ON public.platos_rels USING btree (path);


--
-- Name: platos_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX platos_updated_at_idx ON public.platos USING btree (updated_at);


--
-- Name: usuarios_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX usuarios_created_at_idx ON public.usuarios USING btree (created_at);


--
-- Name: usuarios_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX usuarios_email_idx ON public.usuarios USING btree (email);


--
-- Name: usuarios_sessions_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX usuarios_sessions_order_idx ON public.usuarios_sessions USING btree (_order);


--
-- Name: usuarios_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX usuarios_sessions_parent_id_idx ON public.usuarios_sessions USING btree (_parent_id);


--
-- Name: usuarios_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX usuarios_updated_at_idx ON public.usuarios USING btree (updated_at);


--
-- Name: alergenos alergenos_imagen_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alergenos
    ADD CONSTRAINT alergenos_imagen_id_archivos_id_fk FOREIGN KEY (imagen_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: banners banners_imagen_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_imagen_id_archivos_id_fk FOREIGN KEY (imagen_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: categorias categorias_imagen_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_imagen_id_archivos_id_fk FOREIGN KEY (imagen_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: configuracion_sitio_footer_logos configuracion_sitio_footer_logos_logo_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuracion_sitio_footer_logos
    ADD CONSTRAINT configuracion_sitio_footer_logos_logo_id_archivos_id_fk FOREIGN KEY (logo_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: configuracion_sitio_footer_logos configuracion_sitio_footer_logos_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuracion_sitio_footer_logos
    ADD CONSTRAINT configuracion_sitio_footer_logos_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.configuracion_sitio(id) ON DELETE CASCADE;


--
-- Name: configuracion_sitio configuracion_sitio_logo_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuracion_sitio
    ADD CONSTRAINT configuracion_sitio_logo_id_archivos_id_fk FOREIGN KEY (logo_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: configuracion_sitio_opening_hours configuracion_sitio_opening_hours_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuracion_sitio_opening_hours
    ADD CONSTRAINT configuracion_sitio_opening_hours_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.configuracion_sitio(id) ON DELETE CASCADE;


--
-- Name: espacios_caracteristicas espacios_caracteristicas_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.espacios_caracteristicas
    ADD CONSTRAINT espacios_caracteristicas_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.espacios(id) ON DELETE CASCADE;


--
-- Name: espacios_galeria espacios_galeria_imagen_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.espacios_galeria
    ADD CONSTRAINT espacios_galeria_imagen_id_archivos_id_fk FOREIGN KEY (imagen_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: espacios_galeria espacios_galeria_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.espacios_galeria
    ADD CONSTRAINT espacios_galeria_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.espacios(id) ON DELETE CASCADE;


--
-- Name: menus_dias_semana menus_dias_semana_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus_dias_semana
    ADD CONSTRAINT menus_dias_semana_parent_fk FOREIGN KEY (parent_id) REFERENCES public.menus(id) ON DELETE CASCADE;


--
-- Name: menus menus_imagen_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_imagen_id_archivos_id_fk FOREIGN KEY (imagen_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: menus menus_pdf_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pdf_id_archivos_id_fk FOREIGN KEY (pdf_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: pagina_inicio_galeria_inicio pagina_inicio_galeria_inicio_imagen_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_galeria_inicio
    ADD CONSTRAINT pagina_inicio_galeria_inicio_imagen_id_archivos_id_fk FOREIGN KEY (imagen_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: pagina_inicio_galeria_inicio pagina_inicio_galeria_inicio_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_galeria_inicio
    ADD CONSTRAINT pagina_inicio_galeria_inicio_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pagina_inicio(id) ON DELETE CASCADE;


--
-- Name: pagina_inicio_galeria_regalo pagina_inicio_galeria_regalo_imagen_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_galeria_regalo
    ADD CONSTRAINT pagina_inicio_galeria_regalo_imagen_id_archivos_id_fk FOREIGN KEY (imagen_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: pagina_inicio_galeria_regalo pagina_inicio_galeria_regalo_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_galeria_regalo
    ADD CONSTRAINT pagina_inicio_galeria_regalo_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pagina_inicio(id) ON DELETE CASCADE;


--
-- Name: pagina_inicio pagina_inicio_hero_image_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio
    ADD CONSTRAINT pagina_inicio_hero_image_id_archivos_id_fk FOREIGN KEY (hero_image_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: pagina_inicio_rels pagina_inicio_rels_espacios_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_rels
    ADD CONSTRAINT pagina_inicio_rels_espacios_fk FOREIGN KEY (espacios_id) REFERENCES public.espacios(id) ON DELETE CASCADE;


--
-- Name: pagina_inicio_rels pagina_inicio_rels_paginas_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_rels
    ADD CONSTRAINT pagina_inicio_rels_paginas_id_fk FOREIGN KEY (paginas_id) REFERENCES public.paginas(id) ON DELETE SET NULL;


--
-- Name: pagina_inicio_rels pagina_inicio_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagina_inicio_rels
    ADD CONSTRAINT pagina_inicio_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.pagina_inicio(id) ON DELETE CASCADE;


--
-- Name: paginas paginas_hero_image_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.paginas
    ADD CONSTRAINT paginas_hero_image_id_archivos_id_fk FOREIGN KEY (hero_image_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: paginas paginas_imagen_espacio1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.paginas
    ADD CONSTRAINT paginas_imagen_espacio1_id_fkey FOREIGN KEY (imagen_espacio1_id) REFERENCES public.archivos(id);


--
-- Name: paginas paginas_imagen_espacio2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.paginas
    ADD CONSTRAINT paginas_imagen_espacio2_id_fkey FOREIGN KEY (imagen_espacio2_id) REFERENCES public.archivos(id);


--
-- Name: paginas paginas_imagen_espacio3_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.paginas
    ADD CONSTRAINT paginas_imagen_espacio3_id_fkey FOREIGN KEY (imagen_espacio3_id) REFERENCES public.archivos(id);


--
-- Name: paginas paginas_imagen_espacio4_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.paginas
    ADD CONSTRAINT paginas_imagen_espacio4_id_fkey FOREIGN KEY (imagen_espacio4_id) REFERENCES public.archivos(id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_alergenos_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_alergenos_fk FOREIGN KEY (alergenos_id) REFERENCES public.alergenos(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_archivos_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_archivos_fk FOREIGN KEY (archivos_id) REFERENCES public.archivos(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_banners_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_banners_fk FOREIGN KEY (banners_id) REFERENCES public.banners(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_categorias_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_categorias_fk FOREIGN KEY (categorias_id) REFERENCES public.categorias(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_espacios_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_espacios_fk FOREIGN KEY (espacios_id) REFERENCES public.espacios(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_menus_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_menus_fk FOREIGN KEY (menus_id) REFERENCES public.menus(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_paginas_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_paginas_fk FOREIGN KEY (paginas_id) REFERENCES public.paginas(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_platos_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_platos_fk FOREIGN KEY (platos_id) REFERENCES public.platos(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_usuarios_fk FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_usuarios_fk FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: platos platos_categoria_id_categorias_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platos
    ADD CONSTRAINT platos_categoria_id_categorias_id_fk FOREIGN KEY (categoria_id) REFERENCES public.categorias(id) ON DELETE SET NULL;


--
-- Name: platos_etiquetas platos_etiquetas_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platos_etiquetas
    ADD CONSTRAINT platos_etiquetas_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.platos(id) ON DELETE CASCADE;


--
-- Name: platos platos_imagen_id_archivos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platos
    ADD CONSTRAINT platos_imagen_id_archivos_id_fk FOREIGN KEY (imagen_id) REFERENCES public.archivos(id) ON DELETE SET NULL;


--
-- Name: platos_rels platos_rels_alergenos_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platos_rels
    ADD CONSTRAINT platos_rels_alergenos_fk FOREIGN KEY (alergenos_id) REFERENCES public.alergenos(id) ON DELETE CASCADE;


--
-- Name: platos_rels platos_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platos_rels
    ADD CONSTRAINT platos_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.platos(id) ON DELETE CASCADE;


--
-- Name: usuarios_sessions usuarios_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios_sessions
    ADD CONSTRAINT usuarios_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict VNeSpvXXLMfJHNMXCcpQWfY9WjaFExR61B67Ae6ooSGrDCh9jiC5PbvWvJvM3f0

