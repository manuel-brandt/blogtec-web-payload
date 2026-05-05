import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "no_index" boolean DEFAULT false;
    ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "no_index" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "no_index";
    ALTER TABLE "blog_posts" DROP COLUMN IF EXISTS "no_index";
  `)
}
