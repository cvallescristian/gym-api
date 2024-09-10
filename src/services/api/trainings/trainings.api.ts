import { Hono } from 'hono';
import getListTrainings from '../../drizzle/trainings/list';
import { NewTraining } from '../../../db/schema';
import createTraining from '../../drizzle/trainings/create';

export type Env = {
	DATABASE_URL: string;
	CLOUDINARY_API_KEY: string;
	CLOUDINARY_API_SECRET: string;
	CLOUDINARY_CLOUD_NAME: string;
	CLOUDINARY_FOLDER_NAME: string;
};

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
