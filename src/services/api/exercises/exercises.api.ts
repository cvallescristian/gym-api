import { Hono } from 'hono';
import { saveImage } from '../../../services/cloudinary/utils';
import getListExercises from '../../../services/drizzle/exercises/list';
import { NewExercise } from '../../../db/schema';
import createExercise from '../../../services/drizzle/exercises/create';

export type Env = {
	DATABASE_URL: string;
	CLOUDINARY_API_KEY: string;
	CLOUDINARY_API_SECRET: string;
	CLOUDINARY_CLOUD_NAME: string;
};

const exerciseApp = new Hono<{ Bindings: Env }>();

exerciseApp.get('/', async (c) => {
	const listExercises = await getListExercises(c.env);
	return c.json(listExercises);
});

exerciseApp.post('/create', async (c) => {
	const form = await c.req.formData();
	const file = form.get('exercise_photo') as File;
	const name = form.get('name') as string;
	const description = form.get('description') as string;

	if (!file) {
		return c.json({ message: 'No image provided' }, 400);
	}

	const savedFilePath = await saveImage(file, c.env);

	const newExercise: NewExercise = {
		name,
		description,
		image: savedFilePath.secure_url,
	};
	const exercise = await createExercise(c.env, newExercise);
	return c.json(exercise);
});

export default exerciseApp;
