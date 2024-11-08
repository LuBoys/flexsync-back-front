import express from 'express';
import { addMeasurementController, getMeasurementsController, updateMeasurementController, deleteMeasurementController } from '../controllers/measurementController';
import { authenticateJWT } from '../middlewares/authMiddleware';  // Middleware d'authentification
import { requireClientOrCoachAccess } from '../middlewares/roleMiddleware';  // Middleware d'autorisation

const router = express.Router();

// Route pour ajouter une mesure corporelle (nécessite authentification)
router.post('/add', authenticateJWT, addMeasurementController);

// Route pour récupérer l'historique des mesures corporelles d'un utilisateur
router.get('/:user_id', authenticateJWT, requireClientOrCoachAccess, getMeasurementsController);

// Route pour mettre à jour une mesure corporelle
router.put('/update/:measurement_id', authenticateJWT, requireClientOrCoachAccess, updateMeasurementController);

// Route pour supprimer une mesure corporelle
router.delete('/delete/:measurement_id', authenticateJWT, requireClientOrCoachAccess, deleteMeasurementController);

export default router;
