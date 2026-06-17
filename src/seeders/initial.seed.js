import User from '../models/user.model.js'
import Project from '../models/project.model.js'
import Contact from '../models/contact.model.js'
import Service from '../models/service.model.js'
import Technology from '../models/technology.model.js'
import Experience from '../models/experience.model.js'

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
    isRead: false,
    interest: 'freelance',
  },
  {
    name: 'Carlos Mendoza',
    email: 'carlos@empresa.cl',
    message: 'Excelente portafolio. Somos una empresa de tecnología y nos gustaría contactarte para una entrevista técnica. Quedamos atentos a tu respuesta.',
    isRead: false,
    interest: 'fulltime',
  },
  {
    name: 'Ana López',
    email: 'ana@startup.io',
    message: 'Buscamos un desarrollador fullstack para unirte a nuestro equipo. Tu perfil encaja perfectamente con lo que necesitamos.',
    isRead: true,
    interest: 'fulltime',
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

const technologiesSeed = [
  { name: 'Vue.js', category: 'Frontend Framework', description: 'Framework progresivo para construir interfaces de usuario.', icon: 'i-lucide-code-2', span: 4 },
  { name: 'TypeScript', category: 'Language', description: 'Superset tipado de JavaScript que compila a JS limpio.', icon: 'i-lucide-braces', span: 8 },
  { name: 'Tailwind CSS', category: 'Styling Engine', description: 'Framework CSS utility-first para diseño rápido.', icon: 'i-lucide-palette', span: 7 },
  { name: 'Nuxt', category: 'Full-Stack Framework', description: 'Framework de Vue.js para aplicaciones universales.', icon: 'i-lucide-layers', span: 5 },
  { name: 'Node.js', category: 'Runtime', description: 'Entorno de ejecución para JavaScript del lado del servidor.', icon: 'i-lucide-terminal', span: 5 },
  { name: 'PostgreSQL', category: 'Database', description: 'Sistema de base de datos relacional objeto-orientado.', icon: 'i-lucide-database', span: 7 },
  { name: 'React', category: 'Frontend Library', description: 'Biblioteca para construir interfaces de usuario interactivas.', icon: 'i-lucide-atom', span: 5 },
  { name: 'Next.js', category: 'Full-Stack Framework', description: 'Framework de React con renderizado híbrido y estático.', icon: 'i-lucide-globe', span: 5 },
  { name: 'JavaScript', category: 'Language', description: 'Lenguaje de programación multiplataforma y orientado a objetos.', icon: 'i-lucide-file-type', span: 8 },
  { name: 'Express', category: 'Backend Framework', description: 'Framework web minimalista para Node.js.', icon: 'i-lucide-server', span: 5 },
];

const experiencesSeed = [
  {
    year: 2024,
    role: 'Desarrollador Frontend Senior',
    company: 'Tech Company',
    location: 'Santiago, CL',
    description: 'Lideré el desarrollo de aplicaciones web escalables utilizando Vue.js y Nuxt, implementando arquitecturas de componentes reutilizables y optimizando el rendimiento. Colaboré con equipos multidisciplinarios para entregar productos de alta calidad.',
    order: 0,
    techNames: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind CSS'],
  },
  {
    year: 2022,
    role: 'Desarrollador Frontend',
    company: 'Digital Agency',
    location: 'Remoto',
    description: 'Desarrollé interfaces de usuario modernas y responsivas para diversos clientes, utilizando React y Next.js. Participé en la migración de aplicaciones legacy a arquitecturas modernas basadas en componentes.',
    order: 1,
    techNames: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS'],
  },
  {
    year: 2020,
    role: 'Desarrollador Web Junior',
    company: 'Startup',
    location: 'Santiago, CL',
    description: 'Inicié mi carrera desarrollando aplicaciones web full-stack con Node.js y Express. Contribuí a la construcción de APIs REST y la integración con bases de datos relacionales.',
    order: 2,
    techNames: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
  },
];

const projectTechMap = [
  { title: 'CutLog', techNames: ['Node.js', 'PostgreSQL', 'Vue.js'] },
  { title: 'Blog Personal', techNames: ['Nuxt', 'Tailwind CSS', 'TypeScript', 'PostgreSQL'] },
  { title: 'Weather App', techNames: ['Vue.js', 'TypeScript', 'Node.js'] },
];

export const seed = async () => {
  const [user] = await User.findOrCreate({
    where: { email: userSeed.email },
    defaults: userSeed
  });

  const projects = {};
  for (const project of projectsSeed) {
    const [record] = await Project.findOrCreate({
      where: { title: project.title, subtitle: project.subtitle, userId: user.id },
      defaults: { ...project, userId: user.id }
    });
    projects[project.title] = record;
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

  const technologies = {};
  for (const tech of technologiesSeed) {
    const [record] = await Technology.findOrCreate({
      where: { name: tech.name },
      defaults: tech
    });
    technologies[tech.name] = record;
  }

  for (const experience of experiencesSeed) {
    const { techNames, ...expData } = experience;
    const [record] = await Experience.findOrCreate({
      where: { year: expData.year, role: expData.role, company: expData.company },
      defaults: expData
    });
    const techRecords = techNames.map(name => technologies[name]).filter(Boolean);
    if (techRecords.length > 0) {
      await record.setTechnologies(techRecords.map(t => t.id));
    }
  }

  for (const { title, techNames } of projectTechMap) {
    const project = projects[title];
    if (!project) continue;
    const techRecords = techNames.map(name => technologies[name]).filter(Boolean);
    if (techRecords.length > 0) {
      await project.setTechStackDetails(techRecords.map(t => t.id));
    }
  }
};