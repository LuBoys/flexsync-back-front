import express from 'express';
import { addCoachClientRelation, removeCoachClientRelation } from '../controllers/coachClientController';

const router = express.Router();

// Route pour ajouter une relation coach-client
router.post('/relation', addCoachClientRelation);

// Route pour supprimer une relation coach-client
router.delete('/relation/:coach_id/:client_id', removeCoachClientRelation);

export default router;
