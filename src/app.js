import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env.config.js';
import sequelize, { testConnection } from './config/db.config.js';
import { notFound } from './middlewares/notFound.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import './models/index.js';
import {seed} from './seeders/initial.seed.js';
import projectRoutes from './routes/project.routes.js';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import serviceRoutes from './routes/service.routes.js';
import projectImageRoutes from './routes/projectImage.routes.js';
import experienceRoutes from './routes/experience.routes.js';
import technologyRoutes from './routes/technology.routes.js';
import profileRoutes from './routes/profile.routes.js';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: env.CORS_ORIGIN,
}));

app.use(express.json());

// Rutas
app.use('/', authRoutes);
app.use('/', projectRoutes);
app.use('/', contactRoutes);
app.use('/', serviceRoutes);
app.use('/', projectImageRoutes);
app.use('/', experienceRoutes);
app.use('/', technologyRoutes);
app.use('/', profileRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await testConnection();

    await sequelize.sync({force: env.NODE_ENV === 'development'});

    if (env.NODE_ENV === 'development') {
      await seed();
    }

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