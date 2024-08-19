import { drizzle } from 'drizzle-orm/postgres-js';
import { Hono } from 'hono';
import postgres from 'postgres';
import { exercises } from './db/schema';

export type Env = {
	DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();


app.get('/', async (c) => {
	const queryClient = postgres(c.env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const AllExercises = await db.select().from(exercises);
	return c.json(AllExercises);
});

export default app;
