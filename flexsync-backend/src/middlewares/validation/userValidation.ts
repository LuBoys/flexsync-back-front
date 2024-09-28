import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Schéma de validation pour l'inscription des coachs
const coachSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  bio: Joi.string().required(),
  specializations: Joi.string().required(),
  certifications: Joi.string().optional(),
  experience_years: Joi.number().integer().min(0).optional(),
  phone_number: Joi.string().optional(),
  profile_picture: Joi.string().optional(),
  location: Joi.string().optional(),
});

// Schéma de validation pour l'inscription des clients
const clientSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  weight: Joi.number().precision(2).required(),
  height: Joi.number().precision(2).required(),
  body_fat_percentage: Joi.number().precision(2).optional(),
  muscle_mass: Joi.number().precision(2).optional(),
  phone_number: Joi.string().optional(),
  profile_picture: Joi.string().optional(),
  location: Joi.string().optional(),
});

// Middleware pour valider l'inscription
export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { role } = req.body;
  
  let schema;

  if (role === 'coach') {
    schema = coachSchema;
  } else if (role === 'client') {
    schema = clientSchema;
  } else {
    res.status(400).json({ error: 'Le rôle doit être soit "coach" soit "client".' });
    return;  // Assurez-vous d'ajouter "return" ici après avoir envoyé la réponse
  }

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;  // Assurez-vous d'ajouter "return" ici après avoir envoyé la réponse
  }

  next(); // Continuer si tout est bon
};

// Validation pour la connexion
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;  // Ajoutez "return" ici pour arrêter l'exécution
  }

  next(); // Continuer si tout est bon
};
