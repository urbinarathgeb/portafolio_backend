import express from 'express';
import cors from 'cors';
import env from './config/env.config.js';
import sequelize, { testConnection } from './config/db.config.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors({
	origin: env.CORS_ORIGIN,
}));

app.use(express.json());

// Rutas

app.use(notFound);
app.use(errorHandler);

async function start() {
	try {
		await testConnection();

		await sequelize.sync({force: env.NODE_ENV === 'development'});

		// if (env.NODE_ENV === 'development') {
		// 	await seed();
		// }

		app.listen(env.PORT, () => {
			console.log(`✅ Servidor corriendo en el puerto ${env.PORT}`);
		});
	} catch (error) {
		console.error('❌ No se pudo iniciar el servidor:', error.message);
		process.exit(1);
	}
}

start().catch((error) => {
	console.error('❌ Error fatal:', error);
	process.exit(1);
});