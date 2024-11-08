import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

// Fonction pour ajouter une relation coach-client
export const addCoachClientRelation = async (req: Request, res: Response): Promise<void> => {
  const { coach_id, client_id } = req.body;

  try {
    // Vérifier que le coach et le client existent
    const coach = await prisma.user.findUnique({ where: { user_id: coach_id } });
    const client = await prisma.user.findUnique({ where: { user_id: client_id } });

    if (!coach || !client) {
      res.status(404).json({ error: 'Coach ou client non trouvé' });
      return;
    }

    // Créer la relation coach-client
    await prisma.coachClientRelation.create({
      data: {
        coach_id,
        client_id,
      },
    });

    res.status(201).json({ message: 'Relation coach-client créée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de la relation coach-client:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de la relation' });
  }
};

// Fonction pour supprimer une relation coach-client
export const removeCoachClientRelation = async (req: Request, res: Response): Promise<void> =>  {
  const { coach_id, client_id } = req.params;

  try {
    // Suppression de la relation dans la base de données
    const deletedRelation = await prisma.coachClientRelation.deleteMany({
      where: {
        coach_id: parseInt(coach_id),
        client_id: parseInt(client_id),
      },
    });

    if (deletedRelation.count === 0) {
      res.status(404).json({ message: 'Relation non trouvée' });
    return;
    }

    res.status(200).json({ message: 'Relation coach-client supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
