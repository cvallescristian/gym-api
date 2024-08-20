import postgres from "postgres";
import { Env } from "../../..";
import { drizzle } from "drizzle-orm/postgres-js";
import { trainings, NewTraining } from "../../../db/schema";

const createTraining = async (env: Env, newTraining: NewTraining) => {
  const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const response = await await db.insert(trainings).values(newTraining).returning();

  return response;
}

export default createTraining;