import { date, integer, jsonb, pgTable, serial, text } from 'drizzle-orm/pg-core';

// Muscles
export const muscles = pgTable('muscles', {
	id: serial('id').primaryKey(),
	name: text('name'),
	description: text('description'),
	wikiId: integer('wiki_id'),
	level: integer('level'),
	parent: integer('parent'),
})
export type NewMuscle = typeof muscles.$inferInsert;
export type Muscle = typeof muscles.$inferSelect;

// Exercises
export const exercises = pgTable('exercises', {
	id: serial('id').primaryKey(),
	name: text('name'),
	description: text('description'),
	image: text('image'),
	video: text('video'), 
	longVideo: text('long_video'),
	wikiId: integer('wiki_id'),
	seoTags: text('seo_tags').array(),
	steps: jsonb('steps'),
	link: text('link'),
});
export type NewExercise = typeof exercises.$inferInsert;

// Exercises Muscles
export const exerciseMuscles = pgTable('exercise_muscles', {
	id: serial('id').primaryKey(),
	exerciseId: integer('exercise_id')
		.notNull()
		.references(() => exercises.id),
	muscleId: integer('muscle_id')
		.notNull()
		.references(() => muscles.id),
});
export type NewExerciseMuscle = typeof exerciseMuscles.$inferInsert;

export const trainings = pgTable('trainings', {
	id: serial('id').primaryKey(),
	series: integer('series'),
	repetitions: integer('repetitions'),
	date: date('date'),
	weight: integer('weight'),
	exerciseId: integer('exercise_id')
		.notNull()
		.references(() => exercises.id),
});
export type NewTraining = typeof trainings.$inferInsert;
