CREATE TABLE IF NOT EXISTS "trainings" (
	"id" serial PRIMARY KEY NOT NULL,
	"series" integer,
	"repetitions" integer,
	"date" date,
	"exercise_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trainings" ADD CONSTRAINT "trainings_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
