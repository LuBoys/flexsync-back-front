import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Fonction pour l'inscription
export const register = async (req: Request, res: Response): Promise<void> => {
  const {
    email, password, first_name, last_name, role, bio, specializations, certifications, experience_years,
    phone_number, profile_picture, location
  } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Utilisateur déjà existant' });
      return; // On utilise return pour arrêter l'exécution, mais pas pour retourner un objet Response.
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    let newUser: Prisma.UserCreateInput;

    if (role === 'coach') {
      newUser = {
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
      };
    } else if (role === 'client') {
      newUser = {
        email,
        password_hash: hashedPassword,
        first_name,
        last_name,
        phone_number: phone_number || null,
        profile_picture: profile_picture || null,
        location: location || null,
      };
    } else {
      res.status(400).json({ error: 'Rôle invalide, doit être "coach" ou "client".' });
      return;
    }

    // Insérer l'utilisateur dans la base de données
    const createdUser = await prisma.user.create({
      data: newUser,
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès', user: createdUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour la connexion
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(400).json({ error: 'Mot de passe incorrect' });
      return;
    }

    // Générer un token JWT
    const token = jwt.sign({ sub: user.user_id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
