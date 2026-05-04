import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "pages" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "pages_locales" (
      "meta_title" varchar,
      "meta_description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    ALTER TABLE "pages_locales"
      ADD CONSTRAINT "pages_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
    CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
    CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
    CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique"
      ON "pages_locales" USING btree ("_locale", "_parent_id");

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;

    ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_pages_fk"
      FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "payload_locked_documents_rels_pages_id_idx"
      ON "payload_locked_documents_rels" USING btree ("pages_id");

    ALTER TABLE "blog_posts_locales" DROP COLUMN IF EXISTS "cover_image_alt";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_posts_locales" ADD COLUMN "cover_image_alt" varchar;

    DROP INDEX IF EXISTS "payload_locked_documents_rels_pages_id_idx";

    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_pages_fk";

    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "pages_id";

    DROP TABLE IF EXISTS "pages_locales" CASCADE;
    DROP TABLE IF EXISTS "pages" CASCADE;
  `)
}
