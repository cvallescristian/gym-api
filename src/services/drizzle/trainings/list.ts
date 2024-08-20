import postgres from "postgres";
import { Env } from "../../..";
import { drizzle } from "drizzle-orm/postgres-js";
import { trainings } from "../../../db/schema";

const getListTrainings = async (env: Env) => {
  const queryClient = postgres(env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const AllTrainings = await db.select().from(trainings);

  return AllTrainings;
}

export default getListTrainings;