import { Request, Response } from 'express';
import { addMeasurement, getMeasurementsByUserId } from '../services/measurementService';

// Fonction pour ajouter une nouvelle mesure corporelle
export const addMeasurementController = async (req: Request, res: Response) => {
  const { user_id, weight, body_fat_percentage, muscle_mass, other_metrics } = req.body;

  try {
    const measurement = await addMeasurement({
      user_id: parseInt(user_id), // S'assurer que user_id est bien un entier
      weight: weight || null,
      body_fat_percentage: body_fat_percentage || null,
      muscle_mass: muscle_mass || null,
      other_metrics: other_metrics || null,
      date: new Date(), // Date actuelle pour la mesure
    });

    res.status(201).json({ message: 'Mesure ajoutée avec succès', measurement });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour récupérer l'historique des mesures corporelles d'un utilisateur
export const getMeasurementsController = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.params;

  try {
    const measurements = await getMeasurementsByUserId(parseInt(user_id));

    if (!measurements.length) {
      res.status(404).json({ message: 'Aucune mesure trouvée pour cet utilisateur.' });
      return;
    }

    res.status(200).json(measurements);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export { addMeasurement };

