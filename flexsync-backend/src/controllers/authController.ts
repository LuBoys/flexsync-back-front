import { Request, Response } from 'express';
import { hashPassword, generateToken, comparePassword } from '../services/authService';
import { getUserByEmail, createUser } from '../services/userService';
import { Decimal } from '@prisma/client/runtime/library';
import prisma from '../models/prismaClient';

// Type pour la gestion des erreurs
interface CustomError extends Error {
  code?: string;
}

// Fonction pour l'inscription des clients
export const registerClient = async (req: Request, res: Response): Promise<void> => {
  const {
    email, password, first_name, last_name, weight, height, body_fat_percentage, muscle_mass,
    phone_number, profile_picture, location
  } = req.body;

  try {
    // Validation des champs requis
    if (!email || !password || !first_name || !last_name) {
      res.status(400).json({ error: 'Les champs email, password, first_name et last_name sont requis' });
      return;
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Format d\'email invalide' });
      return;
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'Utilisateur déjà existant' });
      return;
    }

    // Hachage du mot de passe
    const hashedPassword: string = await hashPassword(password);

    // Récupération du rôle client
    const clientRole = await prisma.role.findUnique({ where: { role_name: 'client' } });
    if (!clientRole) {
      res.status(400).json({ error: 'Rôle client non trouvé' });
      return;
    }

    const hasMeasurements = weight || height || body_fat_percentage || muscle_mass;

    // Validation des mesures
    if (hasMeasurements) {
      if (weight && (weight < 0 || weight > 500)) {
        res.status(400).json({ error: 'Poids invalide' });
        return;
      }
      if (height && (height < 0 || height > 300)) {
        res.status(400).json({ error: 'Taille invalide' });
        return;
      }
    }

    // Création du nouvel utilisateur avec son rôle et ses mesures
    const newUser = await createUser({
      email,
      password_hash: hashedPassword,
      first_name,
      last_name,
      phone_number: phone_number || null,
      profile_picture: profile_picture || null,
      location: location || null,
      userRoles: {
        create: {
          role: {
            connect: { role_id: clientRole.role_id },
          },
        },
      },
      measurements: hasMeasurements
        ? {
            create: [
              {
                weight: weight ? new Decimal(weight) : null,
                height: height ? new Decimal(height) : null,
                body_fat_percentage: body_fat_percentage ? new Decimal(body_fat_percentage) : null,
                muscle_mass: muscle_mass ? new Decimal(muscle_mass) : null,
                date: new Date(),
              },
            ],
          }
        : undefined,
    });

    // Réponse de succès
    res.status(201).json({ 
      message: 'Client créé avec succès', 
      user: {
        id: newUser.user_id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name
      }
    });

  } catch (error: unknown) {
    console.error('Erreur lors de l\'inscription du client:', error);
    
    const customError = error as CustomError;
    if (customError.code === 'P2002') {
      res.status(400).json({ error: 'Cette adresse email est déjà utilisée' });
    } else if (error instanceof Error) {
      res.status(500).json({ error: 'Erreur lors de la création du compte' });
    } else {
      res.status(500).json({ error: 'Une erreur inattendue est survenue' });
    }
  }
};

// Fonction pour l'inscription des coachs
export const registerCoach = async (req: Request, res: Response): Promise<void> => {
  const {
    email, password, first_name, last_name, bio, specializations, certifications, experience_years,
    phone_number, profile_picture, location
  } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'Utilisateur déjà existant.' });
      return;
    }

    // Hachage du mot de passe
    const hashedPassword: string = await hashPassword(password);

    // Récupération du rôle coach
    const coachRole = await prisma.role.findUnique({ where: { role_name: 'coach' } });
    if (!coachRole) {
      res.status(400).json({ error: 'Rôle coach non trouvé.' });
      return;
    }

    // Création du nouvel utilisateur avec son rôle coach
    const newUser = await createUser({
      email,
      password_hash: hashedPassword,
      first_name,
      last_name,
      bio,
      specializations,
      certifications: certifications || null,
      experience_years: experience_years || null,
      phone_number: phone_number || null,
      profile_picture: profile_picture || null,
      location: location || null,
      userRoles: {
        create: {
          role: {
            connect: { role_id: coachRole.role_id },
          },
        },
      },
    });

    // Réponse de succès
    res.status(201).json({ message: 'Coach créé avec succès', user: newUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// Fonction pour la connexion
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Vérification de l'utilisateur par email
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(400).json({ error: 'Utilisateur non trouvé.' });
      return;
    }

    // Validation du mot de passe
    const isPasswordValid: boolean = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(400).json({ error: 'Mot de passe incorrect.' });
      return;
    }

    // Génération du JWT token
    const token: string = generateToken(user.user_id);

    // Ajout du token dans un cookie sécurisé
    res.cookie('jwt', token, {
      httpOnly: true,  // Protection XSS
      secure: process.env.NODE_ENV === 'production',  // Utilise 'secure' uniquement en production
      sameSite: 'strict',  // Protection CSRF
      maxAge: 60 * 60 * 1000 // Expiration du cookie (1 heure)
    });

    res.status(200).json({ message: 'Connexion réussie' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
