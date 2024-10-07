import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../models/prismaClient';

// Service pour hacher le mot de passe
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// Service pour comparer le mot de passe
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Service pour générer un JWT
export const generateToken = (userId: number): string => {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};
