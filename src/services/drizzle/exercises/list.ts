import postgres from "postgres";
import { Env } from "../../..";
import { drizzle } from "drizzle-orm/postgres-js";
import { exercises } from "../../../db/schema";

const getListExercises = async (env: Env) => {
  const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const AllExercises = await db.select().from(exercises);

  return AllExercises;
}

export default getListExercises;