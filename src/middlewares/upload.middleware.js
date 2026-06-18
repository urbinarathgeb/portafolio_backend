import multer from 'multer';

const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp'];

const storage = multer.memoryStorage();

const imageFilter = (_req, file, cb) => {
  if (IMAGE_MIMES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('Solo se permiten imágenes (JPEG, PNG, WebP)');
    error.name = 'FileFilterError';
    cb(error, false);
  }
};

const uploadImageOnly = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export const uploadSingleImage = uploadImageOnly.single('image');