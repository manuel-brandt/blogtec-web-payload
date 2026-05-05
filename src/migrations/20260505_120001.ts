import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Move no_index from main tables to locales tables (field is now localized)
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "no_index";
    ALTER TABLE "blog_posts" DROP COLUMN IF EXISTS "no_index";
    ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "no_index" boolean DEFAULT false;
    ALTER TABLE "blog_posts_locales" ADD COLUMN IF NOT EXISTS "no_index" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "no_index";
    ALTER TABLE "blog_posts_locales" DROP COLUMN IF EXISTS "no_index";
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "no_index" boolean DEFAULT false;
    ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "no_index" boolean DEFAULT false;
  `)
}
