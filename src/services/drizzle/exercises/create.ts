import postgres from "postgres";
import { Env } from "../../..";
import { drizzle } from "drizzle-orm/postgres-js";
import { exercises, NewExercise } from "../../../db/schema";

const createExercise = async (env: Env, newExercise: NewExercise) => {
  const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const response = await await db.insert(exercises).values(newExercise).returning();

  return response;
}

export default createExercise;