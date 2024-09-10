import postgres from "postgres";
import { Env } from "../../..";
import { drizzle } from "drizzle-orm/postgres-js";
import { muscles, NewMuscle } from "../../../db/schema";

const createMuscle = async (env: Env, newMuscle: NewMuscle) => {
  const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const response = await await db.insert(muscles).values(newMuscle).returning();

  return response;
}

export default createMuscle;