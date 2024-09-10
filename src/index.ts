import { Hono } from 'hono';
import { saveImage } from './services/cloudinary/utils';
import exerciseApp from './services/api/exercises/exercises.api';
import trainingApp from './services/api/trainings/trainings.api';
import { cors } from 'hono/cors';

export type Env = {
	DATABASE_URL: string;
	CLOUDINARY_API_KEY: string;
	CLOUDINARY_API_SECRET: string;
	CLOUDINARY_CLOUD_NAME: string;
	CLOUDINARY_FOLDER_NAME: string;
};

const api = new Hono<{ Bindings: Env }>();

// Cors
const app = new Hono();

api.use('/api/*', cors())

// Routes
api.route('/api/exercises', exerciseApp);
api.route('/api/trainings', trainingApp);

// General routes
api.get('/', async (c) => {
	return c.json({ message: 'Hello, this is the GYM Api' });
});

api.post('/upload', async (c) => {
	const form = await c.req.formData();
	const file = form.get('exercise_photo') as File;

	if (!file) {
		return c.json({ message: 'No image provided' }, 400);
	}

	// Save image action
	const savedFilePath = await saveImage(file, c.env);

	return c.json({ message: 'Image Uploaded Successfully', path: savedFilePath });
});

export default api;
