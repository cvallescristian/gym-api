import { Hono } from 'hono';
import { Env } from '../../../index';
import { getExercises } from '../../muscleWiki/exercises';
import integration from '../../drizzle/exercises/integration';

const exerciseApp = new Hono<{ Bindings: Env }>();

exerciseApp.get('/', async (c) => {
	const muscleId = c.req.query('muscle_id');
	const exerciseFilter = muscleId ? {muscle_id: parseInt(muscleId)} : undefined;
	console.log({exerciseFilter})

	// const listExercises = await getListExercises(c.env);
	const muscleWikiExercises = await getExercises(exerciseFilter);

	return c.json(muscleWikiExercises);
});

exerciseApp.post('/integration', async (c) => {
	const response = await integration(c.env);
	return c.json(response);
});

export default exerciseApp;
