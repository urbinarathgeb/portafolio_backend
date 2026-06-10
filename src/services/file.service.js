import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.config.js';
import env from '../config/env.config.js';

const FOLDER = 'portafolio-javierUrbina';

export const uploadFile = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: FOLDER,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true,
        filename_override: file.originalname,
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Error al subir archivo a Cloudinary: ${error.message}`));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            bytes: result.bytes,
            originalName: file.originalname,
          });
        }
      }
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
};

export const listFiles = async () => {
  if (!env.CLOUDINARY_CLOUD_NAME) {
    return [];
  }

  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: `${FOLDER}/`,
    max_results: 100,
  });

  return result.resources.map((resource) => ({
    publicId: resource.public_id,
    url: resource.secure_url,
    format: resource.format,
    bytes: resource.bytes,
    createdAt: resource.created_at,
  }));
};
