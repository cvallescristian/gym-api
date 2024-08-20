import { Hono } from 'hono';
import getListTrainings from '../../drizzle/trainings/list';

export type Env = {
	DATABASE_URL: string;
	CLOUDINARY_API_KEY: string;
	CLOUDINARY_API_SECRET: string;
	CLOUDINARY_CLOUD_NAME: string;
};

const trainingApp = new Hono<{ Bindings: Env }>();

trainingApp.get('/', async (c) => {
	const listTrainings = await getListTrainings(c.env);
	return c.json(listTrainings);
});

export default trainingApp;
