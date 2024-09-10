import { Hono } from 'hono';
import { saveImage } from '../../../services/cloudinary/utils';
import getListExercises from '../../../services/drizzle/exercises/list';
import { NewExercise } from '../../../db/schema';
import createExercise from '../../../services/drizzle/exercises/create';
import { Env } from '../../../index';

const exerciseApp = new Hono<{ Bindings: Env }>();

exerciseApp.get('/', async (c) => {
	const listExercises = await getListExercises(c.env);
	return c.json(listExercises);
});

exerciseApp.post('/create', async (c) => {
	const form = await c.req.formData();
	const file = form.get('exercise_photo') as File;
	const name = form.get('name') as string;
	const link = form.get('link') as string;
	const muscleId = parseInt(form.get('muscle_id') as string);
	const description = form.get('description') as string;

	if (!file) {
		return c.json({ message: 'No image provided' }, 400);
	}

	const folderName = 'exercises';
	const savedFilePath = await saveImage({file, env: c.env, folder: folderName});

	const newExercise: NewExercise = {
		name,
		description,
		muscleId,
		link,
		image: savedFilePath.secure_url,
	};
	const exercise = await createExercise(c.env, newExercise);
	return c.json(exercise);
});

export default exerciseApp;
