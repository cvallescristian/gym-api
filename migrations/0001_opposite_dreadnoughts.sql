CREATE TABLE IF NOT EXISTS "muscles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"image" text
);
--> statement-breakpoint
ALTER TABLE "exercises" ADD COLUMN "link" text;--> statement-breakpoint
ALTER TABLE "exercises" ADD COLUMN "muscle_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_muscle_id_muscles_id_fk" FOREIGN KEY ("muscle_id") REFERENCES "public"."muscles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
