import { Env } from '../..';
import getCloudinaryVariables from './config';

export const saveImage = async (file: File, env: Env) => {
	const env_variables = getCloudinaryVariables(env);
	const formData = new FormData();
	formData.append('upload_preset', 'exercise');
	formData.append('api_key', env_variables.api_key);
	formData.append('file', file);

	const requestOptions = {
		method: 'POST',
		body: formData,
	};
	const url = `https://api.cloudinary.com/v1_1/${env_variables.cloud_name}/image/upload`

	const response = await fetch(url, requestOptions);

	return response.json();
};
