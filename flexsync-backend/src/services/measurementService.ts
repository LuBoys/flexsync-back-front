import prisma from '../models/prismaClient';

// Fonction pour ajouter une nouvelle mesure
export const addMeasurement = async (measurementData: any) => {
  return prisma.measurement.create({
    data: measurementData,
  });
};

// Fonction pour obtenir les mesures d'un utilisateur par son ID
export const getMeasurementsByUserId = async (userId: number) => {
  return prisma.measurement.findFirst({
    where: {
      user_id: userId,
    },
  });
};

// Fonction pour mettre à jour une mesure
export const updateMeasurement = async (measurement_id: number, user_id: number, data: any) => {
  // Vérifier que la mesure appartient bien à cet utilisateur
  const existingMeasurement = await prisma.measurement.findFirst({
    where: {
      measurement_id: measurement_id,
      user_id: user_id,  // Vérifie que cette mesure appartient à cet utilisateur
    },
  });

  if (!existingMeasurement) {
    throw new Error('Mesure non trouvée ou vous n\'êtes pas autorisé à la modifier');
  }

  // Mettre à jour la mesure si elle existe et appartient bien à cet utilisateur
  return prisma.measurement.update({
    where: { measurement_id },
    data,
  });
};


// Fonction pour supprimer une mesure
export const deleteMeasurement = async (measurementId: number) => {
  return prisma.measurement.delete({
    where: { measurement_id: measurementId },
  });
};
