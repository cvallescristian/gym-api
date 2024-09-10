import { Env } from '../..';
import getCloudinaryVariables from './config';

export type UploadImageResponse = {
	secure_url: string;
}

export const saveImage = async (file: File, env: Env) => {
	const env_variables = getCloudinaryVariables(env);
	const formData = new FormData();
	formData.append('upload_preset', 'exercise');
	formData.append('api_key', env_variables.api_key);
	formData.append('file', file);
	formData.append('folder', `${env_variables.folder_name}/exercises`);

	const requestOptions = {
		method: 'POST',
		body: formData,
	};
	const url = `https://api.cloudinary.com/v1_1/${env_variables.cloud_name}/image/upload`

	const response = await fetch(url, requestOptions);
	const imageResponse = (await response.json()) as UploadImageResponse;

	return imageResponse;
};
