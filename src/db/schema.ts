import { date, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';


export const muscles = pgTable('muscles', {
	id: serial('id').primaryKey(),
	name: text('name'),
	image: text('image'),
})
export type NewMuscle = typeof muscles.$inferInsert;

export const exercises = pgTable('exercises', {
	id: serial('id').primaryKey(),
	name: text('name'),
	image: text('image'),
	description: text('description'),
	link: text('link'),
	muscleId: integer('muscle_id')
	.notNull()
	.references(() => muscles.id),
});
export type NewExercise = typeof exercises.$inferInsert;

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
