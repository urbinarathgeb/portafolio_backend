import User from '../models/user.model.js'
import Project from '../models/project.model.js'

const userSeed = {
	name: 'user',
	lastname: 'user',
	email: 'admin@mail.com',
	password: 'admin123'
};

const projectsSeed = [
	{
		title: 'Proyecto',
		subtitle: 'número 1',
		description: 'Descripción del proyecto 1'
	},
	{
		title: 'Proyecto',
		subtitle: 'número 2',
		description: 'Descripción del proyecto 2'
	},
	{
		title: 'Proyecto',
		subtitle: 'número 3',
		description: 'Descripción del proyecto 3'
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