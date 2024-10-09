import { Router } from 'express';
import { registerClient, registerCoach, login } from '../controllers/authController';
import { validateRegisterCoach, validateRegisterClient, validateLogin } from '../validator/userValidator';


const router: Router = Router();

// Route d'inscription pour les coachs avec validation
router.post('/api/users/register/coach', validateRegisterCoach, registerCoach);

// Route d'inscription pour les clients avec validation
router.post('/api/users/register/client', validateRegisterClient, registerClient);

// Route de connexion avec validation
router.post('/login', validateLogin, login);

export default router;
