import postgres from "postgres";
import { Env } from "../../..";
import { drizzle } from "drizzle-orm/postgres-js";
import { muscles } from "../../../db/schema";

const getListMuscles = async (env: Env) => {
  const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const AllMuscles = await db.select().from(muscles);

  return AllMuscles;
}

export default getListMuscles;