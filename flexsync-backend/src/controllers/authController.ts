import { Request, Response } from 'express';
import { hashPassword, generateToken, comparePassword } from '../services/authService';
import { getUserByEmail, createUser } from '../services/userService';
import { Prisma } from '@prisma/client';
import prisma from '../models/prismaClient';

// Fonction pour l'inscription des clients
export const registerClient = async (req: Request, res: Response): Promise<void> => {
  const {
    email, password, first_name, last_name, weight, height, body_fat_percentage, muscle_mass,
    phone_number, profile_picture, location
  } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'Utilisateur déjà existant' });
      return;
    }

    // Hacher le mot de passe
    const hashedPassword: string = await hashPassword(password);

    // Récupérer le rôle client
    const clientRole = await prisma.role.findUnique({ where: { role_name: 'client' } });
    if (!clientRole) {
      res.status(400).json({ error: 'Rôle client non trouvé' });
      return;
    }

    // Vérification des valeurs de mesure
    const hasMeasurements = weight || height || body_fat_percentage || muscle_mass;

    // Créer un nouvel utilisateur
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
                weight: weight ? new Prisma.Decimal(weight) : null,
                height: height ? new Prisma.Decimal(height) : null,
                body_fat_percentage: body_fat_percentage ? new Prisma.Decimal(body_fat_percentage) : null,
                muscle_mass: muscle_mass ? new Prisma.Decimal(muscle_mass) : null,
              },
            ],
          }
        : undefined,
    });

    res.status(201).json({ message: 'Client créé avec succès', user: newUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
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
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'Utilisateur déjà existant' });
      return;
    }

    const hashedPassword: string = await hashPassword(password);

    const coachRole = await prisma.role.findUnique({ where: { role_name: 'coach' } });
    if (!coachRole) {
      res.status(400).json({ error: 'Rôle coach non trouvé' });
      return;
    }

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
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(400).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    const isPasswordValid: boolean = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(400).json({ error: 'Mot de passe incorrect' });
      return;
    }

    const token: string = generateToken(user.user_id);

    res.status(200).json({ token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
