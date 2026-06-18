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
	password: 'admin123',
	title: 'Desarrollador Full-Stack',
	tagline: 'CÓDIGO. DISEÑO. INNOVAR.',
	heroDescription: 'Construyo productos web rápidos, limpios y escalables. Del diseño de base de datos a la interfaz que se ve viva.',
	bio: 'Soy desarrollador full stack. Vivo en Santiago, Chile y me apasiona convertir ideas en productos, desde el diseño de bases de datos hasta interfaces que se sienten vivas.\n\n' + 'Trabajo con Vue, Node.js y PostgreSQL como stack principal, pero lo que realmente me mueve es la intersección entre lógica robusta y UX que no requiere manual de usuario. El mejor código es el que el usuario nunca nota, Solo siente que todo funciona. \n\n' + 'Actualmente estoy abierto a posiciones full-time en equipos técnicos donde el craft importa tanto como el delivery.',
	availability: true,
	location: 'Santiago, Chile',
	avatar: null
};

const projectsSeed = [
	{
		title: 'CutLog',
		subtitle: 'API',
		description: 'Sistema inteligente para eliminar la carga mental en la producción de madera y garantizar el cumplimiento de pedidos.',
		imagePreview: 'https://res.cloudinary.com/jurbina/image/upload/v1781795064/portafolio-javierUrbina/projects/1/cutlog_hwflt4.webp',
		githubURLBack: 'https://github.com/urbinarathgeb/cutlog_api',
		caseStudy: JSON.stringify({
			'title': 'Eficiencia Just-in-Time para la Industria Maderera',

			'challenge': 'En un aserradero, la producción no solo depende de la maquinaria, sino de la precisión en el apilado y el cumplimiento de pedidos. Tradicionalmente, los operarios deben gestionar mentalmente múltiples variables: dimensiones de escuadría, configuraciones de apilado y cantidades pendientes. Este modelo manual es propenso a errores, genera desperdicio de material y dificulta enormemente la trazabilidad total, creando cuellos de botella y errores de despacho que afectan directamente la rentabilidad.',

			'solution': 'Desarrollé CutLog API, un asistente de producción diseñado bajo la filosofía Just-in-Time. Este sistema no intenta digitalizar un inventario infinito, sino que se centra exclusivamente en el flujo de pedidos reales. La plataforma permite que los operarios registren su producción en tiempo real con una interfaz simplificada, delegando el cálculo técnico de volúmenes y configuraciones al motor del sistema.',

			'highlights': [
				{
					'title': 'Arquitectura Orientada a la Trazabilidad',
					'description': 'Implementación de Soft Deletes (Paranoid) en todos los modelos para garantizar que el historial de producción sea inmutable y recuperable ante errores.'
				},
				{
					'title': 'Gestión de Configuración Flexible',
					'description': 'El sistema permite el uso de configuraciones de apilado predefinidas, con la capacidad de realizar Overrides inmediatos en planta sin comprometer la integridad de la base de datos.'
				},
				{
					'title': 'Cálculos Automáticos de Precisión',
					'description': 'Automatización del cálculo de piezas totales y volumen (m³) basado en las dimensiones específicas de cada pieza, eliminando el error humano.'
				},
				{
					'title': 'Stock Global Inteligente',
					'description': 'Un dashboard que agrupa pedidos por dimensión, permitiendo a los gerentes de planta visualizar el estado de cada orden (pendiente, en producción, completada) de un solo vistazo.'
				}
			],
			'impact': [
				{
					'stat': '90%',
					'subtitle': 'Reducción de tiempo administrativo',
					'description': 'Al automatizar la sugerencia de configuraciones de apilado según la escuadría.'
				},
				{
					'stat': '10h/semana',
					'subtitle': 'Ahorro en gestión administrativa',
					'description': 'Eliminando reportes manuales y conciliación de datos.'
				},
				{
					'stat': '100%',
					'subtitle': 'Trazabilidad total',
					'description': 'Cada pieza registrada desde su origen hasta el despacho.'
				},
				{
					'stat': '<5 seg',
					'subtitle': 'Registro por paquete de producción',
					'description': 'Sin interrumpir el flujo de trabajo del operario.'
				}
			]
		}),
		isFeatured: false,
		isFrontend: false,
		isBackend: true
	},
	{
		title: 'Protocolos',
		subtitle: 'Cerveceros',
		description: 'Digitalización y automatización de estándares de higiene para garantizar la inocuidad en la industria cervecera artesanal.',
		imagePreview: 'https://res.cloudinary.com/jurbina/image/upload/v1781816929/portafolio-javierUrbina/projects/2/protocolos-cerveceros_scj3bj.webp',
		githubURLFront: 'https://github.com/urbinarathgeb/mvp-protocolos-cervecerias-front',
		githubURLBack: 'https://github.com/urbinarathgeb/mvp-protocolos-cervecerias-back',
		deployURL: 'https://mvp-protocolos-cervecerias-front-j82x0vlch-jotaurbinas-projects.vercel.app/',
		caseStudy: JSON.stringify({
			'title': 'Automatización e Inocuidad en la Producción Cervecera',

			'challenge': 'La gestión de los Procedimientos Operativos Estándar (SOP) en las cervecerías era un proceso manual, lento y propenso a errores críticos. La falta de una guía estandarizada que considere las variaciones de limpieza según el material del equipo (acero inoxidable vs. otros) o el método (CIP o manual) incrementaba el riesgo de contaminaciones de lotes y fallos en auditorías sanitarias.',

			'solution': 'Diseñé una solución Full-Stack centrada en la eficiencia operativa que permite a los maestros cerveceros generar protocolos de limpieza técnicos y personalizados de forma instantánea. El sistema centraliza la lógica de sanitización, eliminando la ambigüedad y asegurando que cada equipo reciba el tratamiento químico y mecánico exacto que requiere.',

			'highlights': [
				{
					'title': 'Asignación Dinámica de Protocolos',
					'description': 'Implementación de lógica de negocio en el backend que filtra y asigna procedimientos específicos basados en el material del equipo y el sistema de limpieza (CIP/Manual).'
				},
				{
					'title': 'Motor de Reportes PDF',
					'description': 'Integración de @react-pdf/renderer en el frontend para la generación automatizada de documentos oficiales descargables, personalizados por equipo y operario.'
				},
				{
					'title': 'Seguridad y Autenticación Robusta',
					'description': 'Gestión de usuarios e identidad mediante Firebase Auth y Firebase Admin SDK, garantizando un acceso seguro y protegido a la gestión de protocolos.'
				},
				{
					'title': 'Interfaz Orientada a la Experiencia de Usuario (UX)',
					'description': 'Desarrollo de una UI moderna y responsiva utilizando Mantine UI, optimizada para el entorno de trabajo en planta.'
				},
				{
					'title': 'Persistencia de Datos Relacional',
					'description': 'Diseño de una base de datos en PostgreSQL para manejar la integridad y trazabilidad de los protocolos de limpieza.'
				}
			],
			'impact': [
				{
					'stat': '95%',
					'subtitle': 'Precisión en protocolos sanitarios',
					'description': 'Garantizada mediante la lógica de asignación automática basada en el material del equipo y el método de limpieza (CIP/Manual).'
				},
				{
					'stat': '15h/mes',
					'subtitle': 'Ahorro en gestión administrativa',
					'description': 'Al automatizar la creación de reportes PDF personalizados, eliminando la redacción y formato manual de SOPs.'
				},
				{
					'stat': '100%',
					'subtitle': 'Disponibilidad de estándares (SOP)',
					'description': 'Acceso digital centralizado y dinámico a los procedimientos operativos para todo el personal de planta.'
				},
				{
					'stat': '<3 seg',
					'subtitle': 'Generación de reportes técnicos',
					'description': 'Creación instantánea de documentación lista para auditoría mediante la integración de @react-pdf/renderer.'
				}
			]
		}),
		isFeatured: false,
		isFrontend: true,
		isBackend: true
	},
	{
		title: 'The Verb',
		subtitle: 'Project',
		description: 'Juego educativo interactivo diseñado para dominar la conjugación de verbos irregulares en inglés mediante gamificación.',
		imagePreview: 'https://res.cloudinary.com/jurbina/image/upload/v1781817478/portafolio-javierUrbina/projects/3/the-verb-project_vfjfxd.webp',
		isFeatured: false,
		isFrontend: true,
		isBackend: false,
		caseStudy: JSON.stringify({
			'title': 'Gamificando la Gramática: Aprender Inglés Jugando',

			'challenge': 'El aprendizaje de verbos irregulares en inglés suele ser un proceso puramente memorístico y monótono. La desconexión entre las tres formas verbales (Presente, Pasado, Participio) dificulta su retención a largo plazo, y las herramientas de estudio existentes carecen de un componente interactivo que mantenga al usuario motivado para practicar de manera constante.',

			'solution': 'Desarrollé una plataforma web de aprendizaje activo. El juego presenta un sistema de columnas desordenadas que el usuario debe organizar, transformando la memorización en un desafío de lógica y velocidad. La interfaz fomenta la memoria visual y la asociación cognitiva inmediata entre las tres formas verbales.',

			'highlights': [
				{
					'title': 'Mecánica de Juego Intuitiva',
					'description': 'Sistema de drag-and-drop o selección lógica que obliga al usuario a identificar las tríadas verbales correctamente para avanzar.'
				},
				{
					'title': 'Arquitectura de Aprendizaje',
					'description': 'Diseño orientado a la repetición espaciada y el refuerzo positivo mediante retroalimentación visual inmediata ante cada acierto o error.'
				},
				{
					'title': 'Diseño Responsivo y Dinámico',
					'description': 'Interfaz moderna construida para funcionar fluidamente en dispositivos móviles y escritorio, facilitando sesiones de práctica rápidas en cualquier lugar.'
				},
				{
					'title': 'Gestión de Estado Eficiente',
					'description': 'Implementación de lógica de estado en el frontend para manejar la aleatorización de los verbos y el cronometraje de los desafíos.'
				}
			],
			'impact': [
				{
					'stat': '+100',
					'subtitle': 'Verbos integrados',
					'description': 'Base de datos completa de los verbos irregulares más utilizados en el idioma inglés.'
				},
				{
					'stat': '0% fricción',
					'subtitle': '100% experiencia de usuario',
					'description': 'Juego sin necesidad de registro previo para comenzar a aprender instantáneamente.'
				},
				{
					'stat': '5 min',
					'subtitle': 'Tiempo de sesión',
					'description': 'Ideal para micro-aprendizaje diario gracias a una mecánica rápida y gratificante.'
				},
				{
					'stat': '+90%',
					'subtitle': 'Tasa de retención',
					'description': 'La gamificación incrementa significativamente la memoria de largo plazo en comparación con la lectura tradicional.'
				}
			]
		})
	}
];

const contactsSeed = [
	{
		name: 'María González',
		email: 'maria@email.com',
		message: 'Hola Javier, vi tu portafolio y me encantó tu trabajo. ¿Tienes disponibilidad para un proyecto freelance de desarrollo web?',
		isRead: false,
		interest: 'freelance'
	},
	{
		name: 'Carlos Mendoza',
		email: 'carlos@empresa.cl',
		message: 'Excelente portafolio. Somos una empresa de tecnología y nos gustaría contactarte para una entrevista técnica. Quedamos atentos a tu respuesta.',
		isRead: false,
		interest: 'fulltime'
	},
	{
		name: 'Ana López',
		email: 'ana@startup.io',
		message: 'Buscamos un desarrollador fullstack para unirte a nuestro equipo. Tu perfil encaja perfectamente con lo que necesitamos.',
		isRead: true,
		interest: 'fulltime'
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
	{
		name: 'Vue.js',
		category: 'Frontend Framework',
		description: 'Framework progresivo para construir interfaces de usuario.',
		icon: 'i-lucide-code-2',
		span: 4,
		order: 2,
		showInStack: true
	},
	{
		name: 'TypeScript',
		category: 'Language',
		description: 'Superset tipado de JavaScript que compila a JS limpio.',
		icon: 'i-lucide-braces',
		span: 8,
		order: 1,
		showInStack: true
	},
	{
		name: 'Tailwind CSS',
		category: 'Styling Engine',
		description: 'Framework CSS utility-first para diseño rápido.',
		icon: 'i-lucide-palette',
		span: 7,
		order: 4,
		showInStack: true
	},
	{
		name: 'Nuxt',
		category: 'Full-Stack Framework',
		description: 'Framework de Vue.js para aplicaciones universales.',
		icon: 'i-lucide-layers',
		span: 5,
		order: 3,
		showInStack: true
	},
	{
		name: 'Node.js',
		category: 'Runtime',
		description: 'Entorno de ejecución para JavaScript del lado del servidor.',
		icon: 'i-lucide-terminal',
		span: 6,
		order: 5,
		showInStack: true
	},
	{
		name: 'PostgreSQL',
		category: 'Database',
		description: 'Sistema de base de datos relacional objeto-orientado.',
		icon: 'i-lucide-database',
		span: 12,
		order: 7,
		showInStack: true
	},
	{
		name: 'React',
		category: 'Frontend Library',
		description: 'Biblioteca para construir interfaces de usuario interactivas.',
		icon: 'i-lucide-atom',
		span: 5,
		order: 6,
		showInStack: false
	},
	{
		name: 'Next.js',
		category: 'Full-Stack Framework',
		description: 'Framework de React con renderizado híbrido y estático.',
		icon: 'i-lucide-globe',
		span: 5,
		order: 7,
		showInStack: false
	},
	{
		name: 'JavaScript',
		category: 'Language',
		description: 'Lenguaje de programación multiplataforma y orientado a objetos.',
		icon: 'i-lucide-file-type',
		span: 12,
		order: 0,
		showInStack: true
	},
	{
		name: 'Express',
		category: 'Backend Framework',
		description: 'Framework web minimalista para Node.js.',
		icon: 'i-lucide-server',
		span: 6,
		order: 6,
		showInStack: true
	}
];

const experiencesSeed = [
	{
		year: 2026,
		role: 'Desarrollo Full-Stack JavaScript',
		company: 'Talento digital / Kibernum',
		location: 'Santiago, CL',
		description: 'Programa de especialización intensiva en desarrollo Full-Stack. Enfoque en la arquitectura de aplicaciones escalables, diseño de APIs RESTful robustas y gestión de bases de datos relacionales, aplicando metodologías ágiles en entornos de alta exigencia técnica.',
		order: 0,
		techNames: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL']
	}
];

const projectTechMap = [
	{title: 'CutLog', techNames: ['Node.js', 'Express', 'PostgreSQL']},
	{title: 'Protocolos', techNames: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL']},
	{title: 'The Verb', techNames: ['React', 'Tailwind CSS']}
];

export const seed = async () => {
	const [user] = await User.findOrCreate({
		where: {email: userSeed.email},
		defaults: userSeed
	});

	const projects = {};
	for (const project of projectsSeed) {
		const [record] = await Project.findOrCreate({
			where: {title: project.title, subtitle: project.subtitle, userId: user.id},
			defaults: {...project, userId: user.id}
		});
		projects[project.title] = record;
	}

	for (const contact of contactsSeed) {
		await Contact.findOrCreate({
			where: {email: contact.email, message: contact.message},
			defaults: contact
		});
	}

	for (const service of servicesSeed) {
		await Service.findOrCreate({
			where: {title: service.title},
			defaults: service
		});
	}

	const technologies = {};
	for (const tech of technologiesSeed) {
		const [record] = await Technology.findOrCreate({
			where: {name: tech.name},
			defaults: tech
		});
		technologies[tech.name] = record;
	}

	for (const experience of experiencesSeed) {
		const {techNames, ...expData} = experience;
		const [record] = await Experience.findOrCreate({
			where: {year: expData.year, role: expData.role, company: expData.company},
			defaults: expData
		});
		const techRecords = techNames.map(name => technologies[name]).filter(Boolean);
		if (techRecords.length > 0) {
			await record.setTechnologies(techRecords.map(t => t.id));
		}
	}

	for (const {title, techNames} of projectTechMap) {
		const project = projects[title];
		if (!project) continue;
		const techRecords = techNames.map(name => technologies[name]).filter(Boolean);
		if (techRecords.length > 0) {
			await project.setTechStackDetails(techRecords.map(t => t.id));
		}
	}
};