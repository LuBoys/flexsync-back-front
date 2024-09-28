import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Schéma de validation pour ajouter une nouvelle mesure corporelle
export const validateMeasurement = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    user_id: Joi.number().required(), // ID de l'utilisateur
    weight: Joi.number().precision(2).optional(), // Le poids peut être fourni, mais n'est pas obligatoire
    body_fat_percentage: Joi.number().precision(2).optional(), // Pourcentage de graisse corporelle optionnel
    muscle_mass: Joi.number().precision(2).optional(), // Masse musculaire optionnelle
    other_metrics: Joi.object().optional(), // Autres mesures (facultatif)
  });

  // Validation des données reçues
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next(); // Passer au middleware suivant si validation réussie
};
