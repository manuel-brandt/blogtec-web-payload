import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    INSERT INTO "pages" ("title", "slug", "updated_at", "created_at")
    VALUES
      ('Homepage', 'home', NOW(), NOW()),
      ('Blog', 'blog', NOW(), NOW())
    ON CONFLICT ("slug") DO NOTHING;

    INSERT INTO "pages_locales" ("meta_title", "meta_description", "_locale", "_parent_id")
    SELECT NULL, NULL, 'de', id FROM "pages" WHERE slug IN ('home', 'blog')
    ON CONFLICT ("_locale", "_parent_id") DO NOTHING;

    INSERT INTO "pages_locales" ("meta_title", "meta_description", "_locale", "_parent_id")
    SELECT NULL, NULL, 'en', id FROM "pages" WHERE slug IN ('home', 'blog')
    ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "pages" WHERE slug IN ('home', 'blog');
  `)
}
