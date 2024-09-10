import { Hono } from 'hono';
import getListTrainings from '../../drizzle/trainings/list';
import { NewTraining } from '../../../db/schema';
import createTraining from '../../drizzle/trainings/create';
import { Env } from '../../../index';


const trainingApp = new Hono<{ Bindings: Env }>();

trainingApp.get('/', async (c) => {
	const listTrainings = await getListTrainings(c.env);
	return c.json(listTrainings);
});

trainingApp.post('/create', async (c) => {
	const { exerciseId, series, repetitions, date, weight } = await c.req.json();

	const newTraining: NewTraining = {
		exerciseId,
		series,
		repetitions,
		date,
		weight,
	};
	const training = await createTraining(c.env, newTraining);

	return c.json(training);
});

export default trainingApp;
