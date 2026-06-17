import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.config.js';
import ProjectImage from '../models/projectImage.model.js';
import Project from '../models/project.model.js';
import { NotFoundError } from '../utils/errors.js';

const FOLDER = 'portafolio-javierUrbina';

export const getAll = async () => {
  return await ProjectImage.findAll({
    include: [{ model: Project, as: 'project', attributes: ['title'] }],
    order: [['createdAt', 'DESC']],
  });
};

export const getByProject = async (projectId) => {
  const project = await Project.findByPk(projectId);
  if (!project) throw new NotFoundError('Proyecto no encontrado');

  return await ProjectImage.findAll({
    where: { projectId },
    order: [['createdAt', 'DESC']],
  });
};

export const uploadImage = async (projectId, file) => {
  const project = await Project.findByPk(projectId);
  if (!project) throw new NotFoundError('Proyecto no encontrado');

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `${FOLDER}/projects/${projectId}`,
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

  const isFirstImage = !project.imagePreview;

  const projectImage = await ProjectImage.create({
    projectId,
    url: result.secure_url,
    publicId: result.public_id,
    originalName: file.originalname,
    format: result.format,
    bytes: result.bytes,
    isPreview: isFirstImage,
  });

  if (isFirstImage) {
    await project.update({ imagePreview: result.secure_url });
  }

  return projectImage;
};

export const setPreview = async (id, isPreview) => {
  const image = await ProjectImage.findByPk(id);
  if (!image) throw new NotFoundError('Imagen no encontrada');

  if (isPreview) {
    const projectImages = await ProjectImage.findAll({
      where: { projectId: image.projectId },
    });
    for (const img of projectImages) {
      await img.update({ isPreview: img.id === Number(id) });
    }
    const project = await Project.findByPk(image.projectId);
    if (project) {
      await project.update({ imagePreview: image.url });
    }
  } else {
    await image.update({ isPreview: false });
    const project = await Project.findByPk(image.projectId);
    if (project && project.imagePreview === image.url) {
      await project.update({ imagePreview: null });
    }
  }

  return ProjectImage.findByPk(id, {
    include: [{ model: Project, as: 'project', attributes: ['title'] }],
  });
};
