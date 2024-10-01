import { Hono } from 'hono';
import { saveImage } from '../../../services/cloudinary/utils';
import { Env } from '../../../index';
import { NewMuscle } from '../../../db/schema';
import getListMuscles from '../../drizzle/muscles/list';
import createMuscle from '../../drizzle/muscles/create';
import { getMuscles } from '../../muscleWiki/muscles';
import integration from '../../drizzle/muscles/integration';


const muscleApp = new Hono<{ Bindings: Env }>();

muscleApp.get('/', async (c) => {
	 const listMuscles = await getListMuscles(c.env);
	
	return c.json(listMuscles);
});

muscleApp.post('/integration', async (c) => {
	const response = await integration(c.env);
	return c.json(response);
});

export default muscleApp;
