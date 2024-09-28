import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validateRegister, validateLogin } from '../middlewares/validation/userValidation';

const router: Router = Router();

// Route d'inscription avec validation
router.post('/api/users/register', validateRegister, register);

// Route de connexion avec validation
router.post('/login', validateLogin, login);

export default router;
