import { Hono } from 'hono';
import { saveImage } from '../../../services/cloudinary/utils';
import { Env } from '../../../index';
import { NewMuscle } from '../../../db/schema';
import getListMuscles from '../../drizzle/muscles/list';
import createMuscle from '../../drizzle/muscles/create';


const muscleApp = new Hono<{ Bindings: Env }>();

muscleApp.get('/', async (c) => {
	const listMuscles = await getListMuscles(c.env);
	return c.json(listMuscles);
});

muscleApp.post('/create', async (c) => {
	const form = await c.req.formData();
	const file = form.get('muscle_photo') as File;
	const name = form.get('name') as string;

  console.log({form, name, file})

	if (!file) {
		return c.json({ message: 'No image provided' }, 400);
	}

  const folderName = 'muscles'
	const savedFilePath = await saveImage({file, env: c.env, folder: folderName});

	const newMuscle: NewMuscle = {
		name,
		image: savedFilePath.secure_url,
	};
	const muscle= await createMuscle(c.env, newMuscle);
	return c.json(muscle);
});

export default muscleApp;
