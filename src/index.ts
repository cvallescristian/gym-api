import { drizzle } from 'drizzle-orm/postgres-js';
import { Hono } from 'hono';
import postgres from 'postgres';
import { exercises } from './db/schema';
import { saveImage } from './services/cloudinary/utils';

export type Env = {
	DATABASE_URL: string;
	CLOUDINARY_API_KEY: string;
	CLOUDINARY_API_SECRET: string;
	CLOUDINARY_CLOUD_NAME: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
	const queryClient = postgres(c.env.DATABASE_URL!);
	const db = drizzle(queryClient);
	const AllExercises = await db.select().from(exercises);
	return c.json(AllExercises);
});

app.post('/upload', async (c) => {
	const form = await c.req.formData();
	const file = form.get('exercise_photo') as File;

	if (!file) {
		return c.json({message: 'No image provided'}, 400);
	}

	// Save image action
	const savedFilePath = await saveImage(file, c.env);

	return c.json({message: 'Image Uploaded Successfully', path: savedFilePath});

});

export default app;
