import { Hono } from 'hono';
import { saveImage } from './services/cloudinary/utils';
import exerciseApp from './services/api/exercises/exercises.api';
import trainingApp from './services/api/trainings/trainings.api';
import muscleApp from './services/api/muscles/muscles.api';
import { cors } from 'hono/cors';

export type Env = {
	DATABASE_URL: string;
	CLOUDINARY_API_KEY: string;
	CLOUDINARY_API_SECRET: string;
	CLOUDINARY_CLOUD_NAME: string;
	CLOUDINARY_FOLDER_NAME: string;
};

// Init App
const api = new Hono<{ Bindings: Env }>();

// Cors
api.use('/api/*', cors())

// Routes
api.route('/api/exercises', exerciseApp);
api.route('/api/trainings', trainingApp);
api.route('/api/muscles', muscleApp);

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
	const folderName = 'file_upload';
	const savedFilePath = await saveImage({file, env: c.env, folder: folderName});

	return c.json({ message: 'Image Uploaded Successfully', path: savedFilePath });
});

export default api;
