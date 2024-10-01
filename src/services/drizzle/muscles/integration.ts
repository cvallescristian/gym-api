import postgres from 'postgres';
import { Env } from '../../..';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Muscle, muscles, NewMuscle } from '../../../db/schema';
import { getMuscles } from '../../muscleWiki/muscles';
import { eq } from 'drizzle-orm';

const muscleFormat = (muscle: any) => ({
	name: muscle.name,
	description: muscle.description,
	wikiId: muscle.id,
	level: muscle.level,
	parent: muscle.parent,
});

const updateRows = async (db: PostgresJsDatabase<Record<string, never>>, wikiMuscles: any[]) => {
	const currentMuscles = await db.select().from(muscles);

	// Find the current muscles that exist in the wikiMuscles
	const isExistingMuscle = (muscle: any) => currentMuscles.find((currentMuscle) => currentMuscle.wikiId === muscle.id);
	const updatedMuscles = wikiMuscles.filter((currentMuscle) => isExistingMuscle(currentMuscle)).map((muscle) => muscleFormat(muscle));

	const updateRowQuery = (db: any, wikiId: number, updatedMuscle: NewMuscle) =>
		db.update(muscles).set(updatedMuscle).where(eq(muscles.wikiId, wikiId))
	const result = await Promise.all(updatedMuscles.map((updatedMuscle) => updateRowQuery(db, updatedMuscle.wikiId, updatedMuscle)));
	console.log(`Updated ${result.length} muscles`);
	return result;
};

const createRows = async (db: PostgresJsDatabase<Record<string, never>>, wikiMuscles: any[]) => {
	const currentMuscles = await db.select().from(muscles);

	// Find the wikiMuscles that are not in the current muscles
	const isNewMuscle = (muscle: any) => !currentMuscles.find((currentMuscle) => currentMuscle.wikiId === muscle.id);

	const newMuscles = wikiMuscles.filter((muscle) => isNewMuscle(muscle)).map((muscle) => muscleFormat(muscle));

	if (newMuscles && newMuscles.length > 0) {
		const result = await db.insert(muscles).values(newMuscles).returning();
		console.log(`Created ${result.length} new muscles`);
	}
	return [];
};

const integration = async (env: Env) => {
	const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const wikiMuscles = await getMuscles();

	// ### Inserting new muscles
	await createRows(db, wikiMuscles);

	// ### Updating existing muscles
	await updateRows(db, wikiMuscles);

	return 'ok';
};

export default integration;
