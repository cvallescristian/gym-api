import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const exercises = pgTable('exercises', {
	id: serial('id').primaryKey(),
	name: text('name'),
	description: text('description'),
});
