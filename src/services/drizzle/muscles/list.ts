import postgres from 'postgres';
import { Env } from '../../..';
import { drizzle } from 'drizzle-orm/postgres-js';
import { muscles } from '../../../db/schema';
import { eq, ilike, } from 'drizzle-orm';

const withFiltersQuery = (db: any, params: { wikiId?: number, name?: string }) => {
	if (params?.wikiId) db = db.where(eq(muscles.wikiId, params.wikiId));
  if (params?.name) db = db.where(ilike(muscles.name, `%${params.name}%`)); 

	return db;
};

const getListMuscles = async (env: Env) => {
	const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const baseQuery = db.select().from(muscles);
	const AllMuscles = await withFiltersQuery(baseQuery, {});

	return AllMuscles;
};

export default getListMuscles;
