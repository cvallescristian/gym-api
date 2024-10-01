CREATE TABLE IF NOT EXISTS "exercise_muscles" (
	"id" serial PRIMARY KEY NOT NULL,
	"exercise_id" integer NOT NULL,
	"muscle_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"image" text,
	"video" text,
	"long_video" text,
	"wiki_id" integer,
	"seo_tags" text[],
	"steps" jsonb,
	"link" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "muscles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"wiki_id" integer,
	"level" integer,
	"parent" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trainings" (
	"id" serial PRIMARY KEY NOT NULL,
	"series" integer,
	"repetitions" integer,
	"date" date,
	"weight" integer,
	"exercise_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_muscles" ADD CONSTRAINT "exercise_muscles_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_muscles" ADD CONSTRAINT "exercise_muscles_muscle_id_muscles_id_fk" FOREIGN KEY ("muscle_id") REFERENCES "public"."muscles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trainings" ADD CONSTRAINT "trainings_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
