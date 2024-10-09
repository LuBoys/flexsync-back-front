import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Schéma de validation pour l'inscription des coachs
export const validateRegisterCoach = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    bio: Joi.string().required(),
    specializations: Joi.string().required(),
    certifications: Joi.string().optional(),
    experience_years: Joi.number().integer().min(0).optional(),
    phone_number: Joi.string().optional(),
    profile_picture: Joi.string().allow(null, '').optional(),
    location: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};

// Schéma de validation pour l'inscription des clients
export const validateRegisterClient = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    weight: Joi.number().precision(2).required(),
    height: Joi.number().precision(2).required(),
    body_fat_percentage: Joi.number().precision(2).optional(),
    muscle_mass: Joi.number().precision(2).optional(),
    phone_number: Joi.string().optional(),
    profile_picture: Joi.string().uri().allow(null).optional(), // Autorise null ou une URL
    location: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};

// Validation pour la connexion (inchangé)
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};
