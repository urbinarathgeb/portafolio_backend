import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.config.js';

export const uploadImage = (file, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        use_filename: true,
        unique_filename: true,
        filename_override: file.originalname,
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Error al subir imagen a Cloudinary: ${error.message}`));
        } else {
          resolve(result);
        }
      }
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
};
