import {Env} from '../../index';

export type CloudinaryVariable = {
  api_key: string;
  api_secret: string;
  cloud_name: string;
  folder_name: string;
}



const getCloudinaryVariables = (env: Env): CloudinaryVariable => {
  return {
    api_key: env.CLOUDINARY_API_KEY!,
    api_secret: env.CLOUDINARY_API_SECRET!,
    cloud_name: env.CLOUDINARY_CLOUD_NAME!,
    folder_name: env.CLOUDINARY_FOLDER_NAME!
  }
}

export default getCloudinaryVariables;