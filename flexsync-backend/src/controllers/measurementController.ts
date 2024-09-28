import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction pour ajouter une nouvelle mesure corporelle
export const addMeasurement = async (req: Request, res: Response) => {
  const { user_id, weight, body_fat_percentage, muscle_mass, other_metrics } = req.body;

  try {
    // Ajouter une nouvelle mesure pour l'utilisateur
    const measurement = await prisma.measurement.create({
      data: {
        user_id: parseInt(user_id), // On s'assure que user_id est bien un entier
        weight: weight || null, // Si non fourni, stocker null
        body_fat_percentage: body_fat_percentage || null, // Facultatif
        muscle_mass: muscle_mass || null, // Facultatif
        other_metrics: other_metrics || null, // Facultatif
        date: new Date(), // Date actuelle pour la mesure
      },
    });

    res.status(201).json({ message: 'Mesure ajoutée avec succès', measurement });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour récupérer l'historique des mesures corporelles d'un utilisateur
export const getMeasurements = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.params;

  try {
    // Récupérer toutes les mesures de l'utilisateur, triées par date
    const measurements = await prisma.measurement.findMany({
      where: { user_id: parseInt(user_id) },
      orderBy: { date: 'asc' }, // Trier par date croissante
    });

    if (!measurements.length) {
      res.status(404).json({ message: 'Aucune mesure trouvée pour cet utilisateur.' });
      return;
    }

    res.status(200).json(measurements);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
