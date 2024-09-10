import postgres from 'postgres';
import { Env } from '../../..';
import { drizzle } from 'drizzle-orm/postgres-js';
import { exercises, trainings } from '../../../db/schema';
import { eq } from 'drizzle-orm';

const getListTrainings = async (env: Env) => {
	const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const AllTrainings = await db.select().from(trainings).leftJoin(exercises, eq(trainings.exerciseId, exercises.id));

	return AllTrainings;
};

export default getListTrainings;
