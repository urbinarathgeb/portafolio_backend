import User from '../models/user.model.js'
import Project from '../models/project.model.js'

const userSeed = {
	name: 'Javier',
	lastname: 'Urbina',
	email: 'admin@mail.com',
	password: 'admin123'
};

const projectsSeed = [
	{
		title: 'E-Commerce Dashboard',
		subtitle: 'Panel de administración',
		description: 'Dashboard interactivo para gestión de productos, pedidos y usuarios con gráficos en tiempo real y sistema de notificaciones.',
		imagePreview: 'https://res.cloudinary.com/demo/image/upload/ecommerce-dashboard.png',
		githubURL: 'https://github.com/jurbina/ecommerce-dashboard',
		deployURL: 'https://ecommerce-dashboard.vercel.app',
		isFeatured: true
	},
	{
		title: 'Blog Personal',
		subtitle: 'CMS con markdown',
		description: 'Blog personal con soporte para markdown, categorías y sistema de etiquetas. Incluye panel de administración para crear y editar publicaciones.',
		imagePreview: 'https://res.cloudinary.com/demo/image/upload/personal-blog.png',
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
};