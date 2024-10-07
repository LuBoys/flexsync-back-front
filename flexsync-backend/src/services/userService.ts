import prisma from '../models/prismaClient';

// Service pour récupérer un utilisateur par email
export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

// Service pour créer un nouvel utilisateur
export const createUser = async (userData: any) => {
  return await prisma.user.create({
    data: userData,
  });
};

// Autres services liés aux utilisateurs...
