import { Hono } from 'hono';
import { Env } from '../../../index';
import integration from '../../drizzle/exercises/integration';
import getListExercises, { ExerciseFilter } from '../../drizzle/exercises/list';
import { Context } from 'hono/jsx';

const exerciseApp = new Hono<{ Bindings: Env }>();

const getFilters = (c: any) => {
	const muscleId = c.req.query('muscle_id');
	const name = c.req.query('name');

	let filter: ExerciseFilter = {};
	if (muscleId) filter['muscleId'] = parseInt(muscleId);
	if (name) filter['name'] = name;

	return filter;
};

exerciseApp.get('/', async (c) => {
	const muscleId = c.req.query('muscle_id');
	const filters = getFilters(c);
	// const muscleWikiExercises = await getExercises(exerciseFilter);
	console.log({ filters });
	const exercises = await getListExercises(c.env, filters);

	return c.json(exercises);
});

exerciseApp.post('/integration', async (c) => {
	const response = await integration(c.env);
	return c.json(response);
});

export default exerciseApp;
