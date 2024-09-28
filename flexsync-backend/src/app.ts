import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import dotenv from 'dotenv';

// Importer les routes
import userRoutes from './routes/userRoutes';
import measurementRoutes from './routes/measurementRoutes';

// Charger les variables d'environnement depuis .env
dotenv.config({ path: '../.env' });

// Importer la documentation Swagger
const swaggerDocument = require('./swagger/swagger.json'); // Swagger JSON n'a pas besoin d'être typé

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Initialiser Passport
app.use(passport.initialize());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes pour les utilisateurs
app.use(userRoutes);

// Routes pour les mesures corporelles
app.use('/api/measurements', measurementRoutes);


// Middleware global de gestion des erreurs
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

export default app;
