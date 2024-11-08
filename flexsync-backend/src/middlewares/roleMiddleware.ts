import { Request, Response, NextFunction } from 'express';
import prisma from '../models/prismaClient'; // Assurez-vous d'importer Prisma

// Type pour l'utilisateur avec les rôles
export interface AuthenticatedUser {
  user_id: number;
  roles: string[]; // Tableau de rôles comme ['client', 'coach']
}

// Middleware pour vérifier si l'utilisateur est un client ou un coach et qu'il a accès aux données
export const requireClientOrCoachAccess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user as AuthenticatedUser | undefined; // Cast pour avoir les rôles et user_id

    // Ajoute un log pour vérifier le contenu de req.user
    console.log('Utilisateur authentifié:', user);

    // Vérifier que l'utilisateur est défini
    if (!user) {
      res.status(401).json({ error: 'Utilisateur non authentifié' });
      return;
    }

    const { user_id } = req.params; // ID de l'utilisateur dans les paramètres de la route

    // Vérifier si l'utilisateur est un client accédant à ses propres données
    if (user.roles.includes('client') && user.user_id === parseInt(user_id)) {
      return next(); // Accès autorisé
    } else 

    // Vérifier si l'utilisateur est un coach accédant aux données de ses clients
    if (user.roles.includes('coach')) {
      // Vérifier si ce coach suit ce client
      const isClientCoach = await prisma.coachClientRelation.findFirst({
        where: {
          coach_id: user.user_id,
          client_id: parseInt(user_id),
        },
      });

      if (isClientCoach) {
        return next(); // Accès autorisé
      }
    } 

    // Si aucune condition n'est remplie, accès refusé
    res.status(403).json({ error: 'Accès refusé' });
  } catch (error) {
    console.error('Erreur lors de la vérification des rôles :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
