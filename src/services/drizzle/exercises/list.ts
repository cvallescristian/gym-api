import postgres from 'postgres';
import { Env } from '../../..';
import { drizzle } from 'drizzle-orm/postgres-js';
import { exerciseMuscles, exercises, muscles } from '../../../db/schema';
import { eq, ilike, sql } from 'drizzle-orm';

export interface ExerciseFilter {
	muscleId?: number;
	name?: string;
}

const withFiltersQuery = (db: any, params?: ExerciseFilter) => {
	if (params?.muscleId) db = db.where(eq(exerciseMuscles.muscleId, params.muscleId));
	if (params?.name) db = db.where(ilike(exercises.name, `%${params.name}%`));

	return db;
};

const getListExercises = async (env: Env, exerciseFilter?: ExerciseFilter) => {
	const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);

	const baseQuery = db
		.select({
			id: exercises.id,
			name: exercises.name,
			description: exercises.description,
			image: exercises.image,
			video: exercises.video,
			longVideo: exercises.longVideo,
			wikiId: exercises.wikiId,
			seoTags: exercises.seoTags,
			steps: exercises.steps,
			muscles: sql`array_agg(json_build_object('id', ${muscles.id}, 'name', ${muscles.name}))`.as('muscles'),
		})
		.from(exercises)
		.innerJoin(exerciseMuscles, eq(exerciseMuscles.exerciseId, exercises.id))
    .innerJoin(muscles, eq(muscles.id, exerciseMuscles.muscleId))
    .groupBy(exercises.id)
		.limit(10);
	const AllExercises = await withFiltersQuery(baseQuery, exerciseFilter);
	console.log({ AllExercises });

	return AllExercises;
};

export default getListExercises;
