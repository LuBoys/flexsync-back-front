import express from 'express';
import { addMeasurementController, getMeasurementsController } from '../controllers/measurementController';
import passport from 'passport';
import { requireClientOrCoachAccess } from '../middlewares/roleMiddleware';  // Middleware d'accès

const router = express.Router();

// Route pour ajouter une mesure corporelle (nécessite authentification)
router.post('/add', passport.authenticate('jwt', { session: false }), addMeasurementController);

// Route pour récupérer l'historique des mesures corporelles d'un utilisateur
router.get('/:user_id', passport.authenticate('jwt', { session: false }), requireClientOrCoachAccess, getMeasurementsController);

export default router;
