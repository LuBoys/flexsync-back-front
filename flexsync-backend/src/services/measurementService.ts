import prisma from '../models/prismaClient';

// Fonction pour ajouter une mesure corporelle
export const addMeasurement = async (data: any) => {
  return await prisma.measurement.create({ data });
};

// Fonction pour récupérer les mesures corporelles par ID utilisateur
export const getMeasurementsByUserId = async (user_id: number) => {
  return await prisma.measurement.findMany({
    where: { user_id },
    orderBy: { date: 'asc' },
  });
};
