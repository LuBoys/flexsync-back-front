import { Request, Response } from 'express';
import prisma from '../models/prismaClient';  // Utilisation de votre client Prisma depuis models

// Fonction pour récupérer les informations d'un utilisateur
export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { user_id: Number(userId) },
    });

    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
