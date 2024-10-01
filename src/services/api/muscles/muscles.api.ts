import { Hono } from 'hono';
import { Env } from '../../../index';
import getListMuscles from '../../drizzle/muscles/list';
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
