import User from '../models/user.model.js'
import Project from '../models/project.model.js'
import Contact from '../models/contact.model.js'
import Service from '../models/service.model.js'

const userSeed = {
  name: 'Javier',
  lastname: 'Urbina',
  email: 'admin@mail.com',
  password: 'admin123'
};

const projectsSeed = [
  {
    title: 'CutLog',
    subtitle: 'Panel de administración',
    description: 'Dashboard interactivo para gestión de productos, pedidos y usuarios con gráficos en tiempo real y sistema de notificaciones.',
    githubURL: 'https://github.com/jurbina/ecommerce-dashboard',
    deployURL: 'https://ecommerce-dashboard.vercel.app',
    isFeatured: true
  },
  {
    title: 'Blog Personal',
    subtitle: 'CMS con markdown',
    description: 'Blog personal con soporte para markdown, categorías y sistema de etiquetas. Incluye panel de administración para crear y editar publicaciones.',
    githubURL: 'https://github.com/jurbina/personal-blog',
    deployURL: 'https://jurbina-blog.vercel.app',
    isFeatured: false
  },
  {
    title: 'Weather App',
    subtitle: 'Consumo de APIs',
    description: 'Aplicación del clima que consume multiples APIs para mostrar pronósticos, mapas interactivos y alertas meteorológicas.'
  }
];

const contactsSeed = [
  {
    name: 'María González',
    email: 'maria@email.com',
    message: 'Hola Javier, vi tu portafolio y me encantó tu trabajo. ¿Tienes disponibilidad para un proyecto freelance de desarrollo web?',
    isRead: false
  },
  {
    name: 'Carlos Mendoza',
    email: 'carlos@empresa.cl',
    message: 'Excelente portafolio. Somos una empresa de tecnología y nos gustaría contactarte para una entrevista técnica. Quedamos atentos a tu respuesta.',
    isRead: false
  },
  {
    name: 'Ana López',
    email: 'ana@startup.io',
    message: 'Buscamos un desarrollador fullstack para unirte a nuestro equipo. Tu perfil encaja perfectamente con lo que necesitamos.',
    isRead: true
  }
];

const servicesSeed = [
  {
    title: 'Desarrollo Web',
    description: 'Creación de aplicaciones web modernas y escalables utilizando React, Node.js y bases de datos relacionales. Enfoque en rendimiento y experiencia de usuario.',
    icon: 'code'
  },
  {
    title: 'Aplicaciones Móviles',
    description: 'Desarrollo de apps nativas y multiplataforma con tecnologías como React Native y Flutter. Desde prototipos hasta publicación en stores.',
    icon: 'smartphone'
  },
  {
    title: 'UI/UX Design',
    description: 'Diseño de interfaces centradas en el usuario, desde wireframes hasta prototipos interactivos. Investigación de usuarios y tests de usabilidad.',
    icon: 'palette'
  }
];

export const seed = async () => {
  const [user] = await User.findOrCreate({
    where: { email: userSeed.email },
    defaults: userSeed
  });

  for (const project of projectsSeed) {
    await Project.findOrCreate({
      where: { title: project.title, subtitle: project.subtitle, userId: user.id },
      defaults: { ...project, userId: user.id }
    });
  }

  for (const contact of contactsSeed) {
    await Contact.findOrCreate({
      where: { email: contact.email, message: contact.message },
      defaults: contact
    });
  }

  for (const service of servicesSeed) {
    await Service.findOrCreate({
      where: { title: service.title },
      defaults: service
    });
  }
};