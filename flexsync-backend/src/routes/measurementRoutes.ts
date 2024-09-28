import express from 'express';
import { addMeasurement, getMeasurements } from '../controllers/measurementController';
import passport from 'passport';

const router = express.Router();

// Route pour ajouter une mesure corporelle (nécessite authentification)
router.post('/add', passport.authenticate('jwt', { session: false }), addMeasurement);

// Route pour récupérer l'historique des mesures corporelles d'un utilisateur
router.get('/:user_id', passport.authenticate('jwt', { session: false }), getMeasurements);

export default router;
