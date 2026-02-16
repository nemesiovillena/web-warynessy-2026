import { sql } from '@payloadcms/db-postgres'
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ 
  BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='configuracion_sitio' AND column_name='contact_whatsapp') THEN
      ALTER TABLE "configuracion_sitio" ADD COLUMN "contact_whatsapp" TEXT;
    END IF;
  END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "configuracion_sitio" DROP COLUMN IF EXISTS "contact_whatsapp";
  `)
}