import postgres from 'postgres';
import { Env } from '../../..';
import { drizzle } from 'drizzle-orm/postgres-js';
import { getExercises } from '../../muscleWiki/exercises';
import { exerciseMuscles, exercises, muscles } from '../../../db/schema';
import { eq } from 'drizzle-orm';

const getMuscle = async (wikiMuscleId: number, db: any) => {
	const newMuscle = await db.select().from(muscles).where(eq(muscles.wikiId, wikiMuscleId)).limit(1);
	return newMuscle[0].id; // return the id of the muscle that was just inserted, or the id of the muscle that already exists
};

const createExerciseMuscles = async (db: any, wikiExercises: any, resultNewExercises: any) => {
	console.log('Creating exercises muscles...');
	const newExercisesMuscles = wikiExercises.filter((wikiExercise: any) =>
		resultNewExercises.find((currentExercise: any) => currentExercise.wikiId === wikiExercise.id)
	);

	const formatMuscle = async (wikiExercise: any) => {
		const exercise = resultNewExercises.find((newExercise: any) => newExercise.wikiId === wikiExercise.id);
		const muscleIds = await Promise.all(wikiExercise.muscles.map((wikiMuscle: any) => getMuscle(wikiMuscle.id, db)));
		if (exercise && muscleIds) {
			return {
				exerciseId: exercise.id,
				muscleIds,
			};
		}
		return {};
	};

	const reduceMuscle = (acc: any, curr: any) => {
		const ids = curr.muscleIds.map((muscleId: any) => ({ exerciseId: curr.exerciseId, muscleId: muscleId }));
		return [...acc, ...ids];
	};

	// create the rows for the exercises_muscles table
	const exercisesMusclesRows = await Promise.all(newExercisesMuscles.map(async (wikiExercise: any) => await formatMuscle(wikiExercise)));
	const rows = exercisesMusclesRows.reduce(reduceMuscle, []);

	console.log(`newExercisesMuscles: ${rows.length} found`);

	if (rows && rows.length > 0) {
		const response = await db.insert(exerciseMuscles).values(rows).returning();
		console.log(`inserted ${response.length} exercises_muscles`);
	}
};

const createRows = async (db: any, wikiExercises: any, currentExercises: any) => {
	const newExercises = wikiExercises
		.filter((wikiExercise: any) => !currentExercises.find((currentExercise: any) => currentExercise.wikiId === wikiExercise.id))
		.map((wikiExercise: any) => ({
			wikiId: wikiExercise.id,
			name: wikiExercise.name,
			description: wikiExercises.description,
			image: wikiExercise?.images[0]?.og_image,
			video: wikiExercise?.images[0]?.original_video,
			long_video: wikiExercise?.long_form_content[0]?.youtube_link,
			link: `https://musclewiki.com/${wikiExercise.target_url.male}`,
			steps: wikiExercise.current_steps?.map((step: any) => step?.text),
		}));

	if (newExercises && newExercises.length > 0) {
		const resultNewExercises = await db.insert(exercises).values(newExercises).returning();
		console.log(`inserted ${resultNewExercises.length} exercises`);
		return resultNewExercises;
	}

	return [];
};

const integration = async (env: Env) => {
	const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const wikiExercises = await getExercises();
	const currentExercises = await db.select().from(exercises);

	await db.transaction(async (tx) => {
		// ### Inserting new muscles
		const newExercisesMuscles = await createRows(tx, wikiExercises, currentExercises);
		// # New exercises muscles by newExercisesMuscles
		await createExerciseMuscles(tx, wikiExercises, newExercisesMuscles);

		// ### Updating existing muscles
		// await updateRows(db, wikiMuscles, currentMuscles);
	});

	return 'ok';
};

export default integration;
